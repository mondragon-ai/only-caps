export const deleteOrder = async (shop: string, order_id: string) => {
  try {
    // const response = await fetch('YOUR_API_ENDPOINT', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(payload),
    // });

    if (order_id) {
      const data = order_id;
      return { shop, mockup: data, error: null, status: 200 };
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
