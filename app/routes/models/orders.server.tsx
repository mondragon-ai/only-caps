import { SERVER_BASE_URL } from "~/lib/contants";
import { ResponseProp } from "~/lib/types/shared";

export const deleteOrder = async (
  shop: string,
  order_id: string | string[],
  isBulk: boolean,
): Promise<ResponseProp> => {
  try {
    console.log({ DELETE: order_id });
    if (order_id) {
      let url = `${SERVER_BASE_URL}/store/${shop}/orders?id=${order_id}`;
      if (isBulk && order_id && order_id.length > 0) {
        const ids = (order_id as string[]).join(",");
        console.log({ ids });
        url = `${SERVER_BASE_URL}/store/${shop}/orders?orders=${ids}`;
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
        error: null,
        status: response.status,
        type: "delete",
      };
    } else {
      return {
        shop,
        result: null,
        error: `Please add IDs to be deleted`,
        status: 400,
        type: "delete",
      };
    }
  } catch (error) {
    return {
      shop,
      result: null,
      error: "Server Error: Try again in a minute.",
      status: 500,
      type: "",
    };
  }
};

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
