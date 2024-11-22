import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { SERVER_BASE_URL } from "~/lib/contants";
import { OrderDocument } from "~/lib/types/orders";
import { ResponseProp } from "~/lib/types/shared";
import { authenticate } from "~/shopify.server";

// ! ================================================================
// ? Delete Order(s)
// ! ================================================================
/**
 * Deletes an order or multiple orders for a shop.
 * @param {string} shop - The Shopify shop domain.
 * @param {string | string[]} orderId - The order ID or list of order IDs to delete.
 * @param {boolean} isBulk - Indicates if the operation is a bulk delete.
 * @returns {Promise<ResponseProp>} The response object containing the result or error.
 */
export const deleteOrder = async (
  shop: string,
  orderId: string | string[],
  isBulk: boolean,
): Promise<ResponseProp> => {
  try {
    if (!orderId) {
      throw new Error("Please provide IDs to be deleted.");
    }

    const url = constructDeleteUrl(shop, orderId, isBulk);
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    return {
      shop,
      result: data,
      error: response.ok ? null : "Failed to delete orders.",
      status: response.status,
      type: "delete",
    };
  } catch (error) {
    console.error("Error deleting order(s):", error);
    return {
      shop,
      result: null,
      error: "Server Error: Unable to delete orders. Please try again later.",
      status: 500,
      type: "delete",
    };
  }
};

/**
 * Constructs the URL for the delete request.
 * @param {string} shop - The Shopify shop domain.
 * @param {string | string[]} orderId - The order ID or list of order IDs to delete.
 * @param {boolean} isBulk - Indicates if the operation is a bulk delete.
 * @returns {string} The constructed URL.
 */
const constructDeleteUrl = (
  shop: string,
  orderId: string | string[],
  isBulk: boolean,
): string => {
  if (isBulk && Array.isArray(orderId)) {
    const ids = orderId.join(",");
    return `${SERVER_BASE_URL}/store/${shop}/orders?orders=${ids}`;
  } else {
    return `${SERVER_BASE_URL}/store/${shop}/orders?id=${orderId}`;
  }
};

// ! ================================================================
// ? Orders Page (list)
// ! ================================================================

/**
 * Loader function to fetch orders for the Shopify store.
 * @param {LoaderFunctionArgs} args - The loader function arguments.
 * @returns {Promise<{ shop: string; orders: OrderDocument[] }>} The shop name and order data.
 */
export async function ordersLoader({ request }: LoaderFunctionArgs) {
  const admin = await authenticate.admin(request);

  try {
    const response = await fetch(
      //admin.session.shop
      `${SERVER_BASE_URL}/store/${admin.session.shop}/orders`,
    );

    if (!response.ok) {
      return json({
        shop: admin.session.shop,
        orders: [],
      });
    }

    const data = (await response.json()) as {
      text: string;
      orders: OrderDocument[];
    };

    return json({
      shop: admin.session.shop,
      orders: data.orders,
    });
  } catch (error) {
    console.error("Error loading orders:", error);
    throw new Response("Failed to load orders", { status: 500 });
  }
}

/**
 * Action function to handle order-related operations (delete, next, previous).
 * @param {ActionFunctionArgs} args - The action function arguments.
 * @returns {Promise<Response>} The JSON response with operation result.
 */
export async function ordersAction({ request, params }: ActionFunctionArgs) {
  const { session } = await authenticate.admin(request);
  const { shop } = session;

  const formData = await request.formData();
  const order_ids = formData.get("order_ids");
  const type = formData.get("action");

  const payload = order_ids
    ? (JSON.parse(String(order_ids)) as { id: string[]; domain: string })
    : null;

  try {
    let response;
    switch (type) {
      case "delete": {
        response = await deleteOrder(shop, payload!.id, true);
        return json({
          shop,
          result: null,
          error: null,
          type: "DELETE",
        } as ResponseProp);
      }
      case "next": {
        response = await nextOrderList(shop, "");
        return json({
          shop,
          result: null,
          error: null,
          type: "NEXT",
        } as ResponseProp);
      }
      case "previous": {
        response = await previousOrderList(shop, "");
        return json({
          shop,
          result: null,
          error: "Server Error",
          status: 400,
          type: "DELETE",
        } as ResponseProp);
      }
      default:
        return json(
          {
            shop,
            result: null,
            error: "Server Error",
            status: 500,
            type: type,
          },
          { status: 500 },
        );
    }
  } catch (error) {
    console.error("Error performing order action:", error);
    return json(
      { shop, result: null, error: "Server Error", status: 500, type: type },
      { status: 500 },
    );
  }
}

// ! ================================================================
// ? Order Detail Page
// ! ================================================================

/**
 * Loader function to fetch order details by ID.
 * @param {LoaderFunctionArgs} args - The loader function arguments.
 * @returns {Promise<Response>} The response containing order details or error.
 */
export async function orderLoader({ request, params }: LoaderFunctionArgs) {
  const admin = await authenticate.admin(request);

  try {
    const response = await fetch(
      //admin.session.shop
      `${SERVER_BASE_URL}/store/${admin.session.shop}/orders?id=${params.id}`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch order data");
    }

    const data = (await response.json()) as {
      text: string;
      orders: OrderDocument[];
    };

    return json({
      shop: admin.session.shop,
      params,
      order: data.orders[0] || null,
      id: params.id,
    });
  } catch (error) {
    console.error("Error loading order:", error);
    throw new Response("Failed to load order", { status: 500 });
  }
}

/**
 * Action function to handle order deletion.
 * @param {ActionFunctionArgs} args - The action function arguments.
 * @returns {Promise<Response>} The response after handling the action.
 */
export async function orderAction({ request, params }: ActionFunctionArgs) {
  const { session } = await authenticate.admin(request);
  const { shop } = session;

  const formData = await request.formData();
  const type = formData.get("action");

  if (!params.id) {
    return json(
      {
        shop,
        result: null,
        error: "ID Not Found",
        status: 400,
        type: "DELETE",
      } as ResponseProp,
      { status: 400 },
    );
  }

  try {
    let response: ResponseProp;

    switch (type) {
      case "delete": {
        response = await deleteOrder(shop, params.id, false);
        return redirect("/app/orders", 303);
      }

      case "address": {
        const address = formData.get("payload");
        console.log({ address, id: params.id });
        return json({
          shop,
          result: null,
          error: null,
          type: "address",
        } as ResponseProp);
      }
      case "exchange": {
        console.log({ type: "EXCHANGE", id: params.id });
        return json({
          shop,
          result: null,
          error: null,
          type: "exchange",
        } as ResponseProp);
      }
      case "refund": {
        console.log({ type: "refund", id: params.id });
        return json({
          shop,
          result: null,
          error: null,
          type: "refund",
        } as ResponseProp);
      }
      case "cancel": {
        console.log({ type: "cancel", id: params.id });
        return json({
          shop,
          result: null,
          error: null,
          type: "cancel",
        } as ResponseProp);
      }
      default:
        return json(
          {
            shop,
            result: null,
            error: "Server Error",
            status: 500,
            type: "DELETE",
          } as ResponseProp,
          { status: 500 },
        );
    }
  } catch (error) {
    console.error("Error handling action:", error);
    return json(
      {
        shop,
        result: null,
        error: "Server Error",
        status: 500,
        type: "DELETE",
      } as ResponseProp,
      { status: 500 },
    );
  }
}

// ! ================================================================
// ? Pagination
// ! ================================================================

export const nextOrderList = async (shop: string, last_order: string) => {
  try {
    // const response = await fetch('YOUR_API_ENDPOINT', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(payload),
    // });

    if (last_order) {
      const data = last_order;
      return { shop, mockup: data, error: null };
    } else {
      return {
        shop,
        mockup: null,
        error: `Error: ${"Likley due to incompatable image format. Try again soon."}`,
        status: 400,
      };
    }
  } catch (error) {
    return {
      shop,
      mockup: null,
      error: `Server Error: Try again in a minute.`,
      status: 500,
    };
  }
};

export const previousOrderList = async (shop: string, first_order: string) => {
  try {
    // const response = await fetch('YOUR_API_ENDPOINT', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(payload),
    // });

    if (first_order) {
      const data = first_order;
      return { shop, mockup: data, error: null };
    } else {
      return {
        shop,
        mockup: null,
        error: `Error: ${"Likley due to incompatable image format. Try again soon."}`,
        status: 400,
      };
    }
  } catch (error) {
    return {
      shop,
      mockup: null,
      error: `Server Error: Try again in a minute.`,
      status: 500,
    };
  }
};
