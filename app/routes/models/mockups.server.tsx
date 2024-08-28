import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  redirect,
  TypedResponse,
} from "@remix-run/node";
import { SERVER_BASE_URL } from "~/lib/contants";
import { MockupDocument } from "~/lib/types/mockups";
import { Address, OrderDocument } from "~/lib/types/orders";
import { ResponseProp } from "~/lib/types/shared";
import { authenticate } from "~/shopify.server";

// ! ================================================================
// ? Mockups(s) List (page)
// ! ================================================================

/**
 * Loader function to fetch mockups.
 * @param {LoaderFunctionArgs} args - The loader function arguments.
 * @returns {Promise<{ shop: string; mockups: MockupDocument[] }>} The response containing the mockups data or error.
 */
export async function mockupsLoader({ request }: LoaderFunctionArgs): Promise<
  TypedResponse<{
    shop: string;
    mockups: MockupDocument[];
  }>
> {
  const admin = await authenticate.admin(request);

  try {
    const response = await fetch(
      `${SERVER_BASE_URL}/store/${admin.session.shop}/mockups`,
    );

    if (!response.ok) {
      return json({
        shop: admin.session.shop,
        mockups: [],
      });
    }

    const data = (await response.json()) as { mockups: MockupDocument[] };

    return json({
      shop: admin.session.shop,
      mockups: data.mockups,
    });
  } catch (error) {
    console.error("Error loading mockups:", error);
    throw new Response("Failed to load mockups", { status: 500 });
  }
}

/**
 * Action function to handle mockup operations.
 * @param {ActionFunctionArgs} args - The action function arguments.
 * @returns {Promise<Response>} The response after performing the action.
 */
export async function mockupsAction({
  request,
}: ActionFunctionArgs): Promise<TypedResponse<ResponseProp>> {
  const { session } = await authenticate.admin(request);
  const { shop } = session;

  const formData = await request.formData();
  const type = formData.get("action");
  const mockup = formData.get("mockup");

  const payload = mockup
    ? (JSON.parse(String(mockup)) as { id: string[] | string; domain: string })
    : null;

  try {
    let response: ResponseProp;

    switch (type) {
      case "delete":
        response = await deleteMockup(shop, payload, true);
        return json({
          shop,
          result: null,
          error: null,
          type: "DELETE",
          status: 200,
        });
      case "next":
      // response = await nextMockupList(shop, "");
      // return json({ shop, mockups: null, error: null, type: "NEXT" });
      case "previous":
      // response = await previousMockupList(shop, "");
      // return json({ shop, mockups: null, error: null, type: "PREVIOUS" });
      default:
        return json(
          {
            error: "Invalid action",
            shop,
            result: null,
            type: "",
            status: 4200,
          },
          { status: 400 },
        );
    }
  } catch (error) {
    console.error("Error performing action:", error);
    return json(
      { error: "Server error", shop, result: null, type: "", status: 500 },
      { status: 500 },
    );
  }
}

// ! ================================================================
// ? Mockups Detail List (page)
// ! ================================================================

/**
 *  * Loader function to fetch mockup details.
 * @param {LoaderFunctionArgs} args - The loader function arguments.
 * @returns {Promise<Response>} The response containing mockup details or error.
 */
export async function mockupLoader({ request, params }: LoaderFunctionArgs) {
  const { session, admin } = await authenticate.admin(request);
  const id = params.id;

  try {
    const shopResponse = await admin.graphql(`
      query {
        shop {
          contactEmail
          ianaTimezone
          currencyCode
          billingAddress {
            address1
            city
            province
            provinceCode
            zip
            country
            countryCodeV2
            name
            firstName
            lastName
          }
        }
      }
    `);

    const shopData = await shopResponse.json();

    const mockupResponse = await fetch(
      `${SERVER_BASE_URL}/store/${session.shop}/mockups?id=${id}`,
    );

    if (!mockupResponse.ok) {
      return json({
        shop: session.shop,
        mockups: [],
        id,
        customer: {
          email: String(shopData.data?.shop.contactEmail || ""),
          name: String(shopData.data?.shop.name || ""),
        },
        address: shopData.data?.shop.billingAddress,
      });
    }

    const mockupData = (await mockupResponse.json()) as {
      text: string;
      mockups: MockupDocument[];
    };

    return json({
      shop: session.shop,
      mockups: mockupData,
      id,
      customer: {
        email: String(shopData.data?.shop.contactEmail || ""),
        name: String(shopData.data?.shop.name || ""),
      },
      address: shopData.data?.shop.billingAddress,
    });
  } catch (error) {
    console.error("Error loading mockup data:", error);
    throw new Response("Failed to load mockup details", { status: 500 });
  }
}

type FormProps = {
  color: string;
  address: Address;
  email: string;
};

/**
 *  * Action function to handle mockup operations (delete, create, wholesale).
 * @param {ActionFunctionArgs} args - The action function arguments.
 * @returns {Promise<Response>} The response after performing the action.
 */
export async function mockupAction({ request, params }: ActionFunctionArgs) {
  const { session } = await authenticate.admin(request);
  const { shop, accessToken } = session;

  const formData = await request.formData();
  const type = formData.get("action");
  const mockup = formData.get("mockup");

  const payload = mockup
    ? (JSON.parse(String(mockup)) as { id: string; domain: string })
    : null;

  try {
    let response: ResponseProp;

    switch (type) {
      case "delete":
        response = await deleteMockup(shop, payload, false);
        return redirect("/app/mockups", 303);
      case "create":
        response = await createProduct(shop, payload, accessToken);
        return json({
          shop,
          result: response.result,
          error: response.error,
          type: "CREATE",
          status: 201,
        } as ResponseProp);
      case "wholesale":
        response = await purchaseWholesale(
          shop,
          payload as unknown as {
            form: FormProps;
            quantity: number;
            product_id: string | undefined;
          },
        );
        if (response.error) {
          return json(response as ResponseProp);
        } else {
          return redirect("/app/orders", 302);
        }
      default:
        return json(
          {
            shop,
            result: null,
            error: "Invalid action",
            status: 400,
            type: type,
          } as ResponseProp,
          { status: 400 },
        );
    }
  } catch (error) {
    console.error("Error performing action:", error);
    return json(
      {
        shop,
        result: null,
        error: "Server error",
        status: 500,
        type: type,
      } as ResponseProp,
      { status: 500 },
    );
  }
}

// !  Actions
// ! ================================================================

/**
 *  * Deletes a mockup.
 * @param {string} shop - The shop identifier.
 * @param {Object} payload - The payload containing mockup details.
 * @param {boolean} isBulk - Indicates if the deletion is in bulk.
 * @returns {Promise<ResponseProp>} The response from the deletion operation.
 */
export const deleteMockup = async (
  shop: string,
  payload: { id: string[] | string; domain: string } | null,
  isBulk: boolean = false,
): Promise<ResponseProp> => {
  try {
    if (!payload) {
      return {
        shop,
        result: null,
        error: "Error: Invalid payload",
        status: 400,
        type: "",
      };
    }

    let url = `${SERVER_BASE_URL}/store/${shop}/mockups?id=${payload.id}`;
    if (isBulk && Array.isArray(payload.id)) {
      const ids = payload.id.join(",");
      url = `${SERVER_BASE_URL}/store/${shop}/mockups?mockups=${ids}`;
    }

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
      error: response.ok ? null : "Failed to delete mockup",
      status: response.status,
      type: "delete",
    };
  } catch (error) {
    console.error("Error deleting mockup:", error);
    return {
      shop,
      result: null,
      error: "Server error: Unable to delete mockup",
      status: 500,
      type: "delete",
    };
  }
};

export const purchaseWholesale = async (
  shop: string,
  payload: {
    form: FormProps;
    quantity: number;
    product_id: string | undefined;
  },
): Promise<ResponseProp | any> => {
  try {
    if (!payload || !payload.product_id) {
      return {
        shop,
        result: null,
        error: `Error: ${"Invalid payload or product not created"}`,
        status: 409,
        type: "wholesale",
      };
    }

    const purchase_payload = {
      product_id: payload.product_id,
      quantity: payload.quantity,
      color: payload.form.color,
      customer: {
        email: payload.form.email,
        address: {
          address1: payload.form.address.address1,
          city: payload.form.address.city,
          zip: payload.form.address.zip,
          country: "United States",
          country_code: "US",
          first_name: payload.form.address.first_name,
          last_name: payload.form.address.last_name,
          name: `${payload.form.address.first_name} ${payload.form.address.last_name}`,
          province: payload.form.address.province,
          province_code: payload.form.address.province_code,
        },
      },
    };

    const response = await fetch(`${SERVER_BASE_URL}/store/${shop}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(purchase_payload),
    });

    const data = (await response.json()) as {
      text: string;
      error: null | string | boolean;
      data: OrderDocument;
    };
    return {
      shop,
      result: data,
      error: response.ok ? null : "Failed to create wholesale",
      status: response.status,
      type: "wholesale",
    };
  } catch (error) {
    console.error("Error making purchase:", error);
    return {
      shop,
      result: null,
      error: "Server error: Unable to making purchase",
      status: 500,
      type: "wholesale",
    };
  }
};

/**
 *  * Creates a product from a mockup.
 * @param {string} shop - The shop identifier.
 * @param {Object} payload - The payload containing mockup details.
 * @param {string} shpat - The access token for the shop.
 * @returns {Promise<ResponseProp>} The response from the product creation operation.
 */
export const createProduct = async (
  shop: string,
  payload: { id: string; domain: string } | null,
  shpat: string | undefined,
): Promise<ResponseProp> => {
  try {
    if (!payload || !shpat) {
      return {
        shop,
        result: null,
        error: `Error: ${"Invalid payload or missing access token"}`,
        status: 401,
        type: "",
      };
    }

    const response = await fetch(
      `${SERVER_BASE_URL}/generate/${shop}/products/${shpat}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          design_id: payload.id,
        }),
      },
    );

    const data = await response.json();
    return {
      shop,
      result: data,
      error: response.ok ? null : "Failed to create product",
      status: response.status,
      type: "create",
    };
  } catch (error) {
    console.error("Error creating product:", error);
    return {
      shop,
      result: null,
      error: "Server error: Unable to create product",
      status: 500,
      type: "create",
    };
  }
};

// !  Actions
// ! ================================================================

export const nextMockupList = async (shop: string, last_mockup: string) => {
  try {
    // const response = await fetch('YOUR_API_ENDPOINT', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(payload),
    // });

    if (last_mockup) {
      const data = last_mockup;
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

export const previousMockupList = async (
  shop: string,
  first_mockup: string,
) => {
  try {
    // const response = await fetch('YOUR_API_ENDPOINT', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(payload),
    // });

    if (first_mockup) {
      const data = first_mockup;
      return { shop, mockup: data, error: null };
    } else {
      return {
        shop,
        result: null,
        error: `Error: ${"Likley due to incompatable image format. Try again soon."}`,
        status: 400,
      };
    }
  } catch (error) {
    return {
      shop,
      result: null,
      error: `Server Error: Try again in a minute.`,
      status: 500,
    };
  }
};
