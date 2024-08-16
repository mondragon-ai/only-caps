import { SERVER_BASE_URL } from "~/lib/contants";
import { ResponseProp } from "~/lib/types/shared";

export const deleteMockup = async (
  shop: string,
  payload: { id: string[] | string; domain: string } | null,
  isBulk?: boolean,
): Promise<ResponseProp> => {
  try {
    console.log({ DELETE: payload });
    if (payload) {
      let url = `${SERVER_BASE_URL}/store/${shop}/mockups?id=${payload.id}`;
      if (isBulk && payload.id && payload.id.length > 0) {
        const ids = (payload.id as string[]).join(",");
        console.log({ ids });
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
        error: null,
        status: response.status,
        type: "",
      };
    } else {
      return {
        shop,
        result: null,
        error: `Error: ${"Likley due to incompatable format. Try again soon."}`,
        status: 400,
        type: "",
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

export const createProduct = async (
  shop: string,
  payload: { id: string; domain: string } | null,
  shpat: string | undefined,
): Promise<ResponseProp> => {
  try {
    console.log({ CREATE: payload });
    if (payload && shpat) {
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
        error: null,
        status: response.status,
        type: "",
      };
    } else {
      return {
        shop,
        result: null,
        error: `Error: ${"Likley due to incompatable format. Try again soon."}`,
        status: 400,
        type: "",
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

export const purchaseWholesale = async (
  shop: string,
  payload: any,
): Promise<ResponseProp> => {
  try {
    // const response = await fetch('YOUR_API_ENDPOINT', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(payload),
    // });

    if (payload) {
      const data = payload;
      return { shop, result: data, error: null, status: 200, type: "" };
    } else {
      return {
        shop,
        result: null,
        error: `Error: ${"Likley due to incompatable image format. Try again soon."}`,
        status: 400,
        type: "",
      };
    }
  } catch (error) {
    return {
      shop,
      result: null,
      error: `Server Error: Try again in a minute.`,
      status: 500,
      type: "",
    };
  }
};
