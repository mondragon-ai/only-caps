import { FetcherWithComponents, NavigateFunction } from "@remix-run/react";
import { MockupProps } from "~/lib/types/mockups";

export const deleteMockupCallback = async (
  data:
    | any
    | {
        shop: string;
        mockups: MockupProps;
        id: string | undefined;
      },
  fetcher: FetcherWithComponents<
    | {
        shop: string;
        mockup: null;
        error: null;
      }
    | {
        error: string;
      }
  >,
  navigate: NavigateFunction,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<
    React.SetStateAction<{
      title: string;
      message: string;
      type: "critical" | "warning";
    } | null>
  >,
) => {
  setLoading(true);

  if (!data.id) {
    setError({
      title: "Mockup does not exist",
      message: "The mockup may have already been deleted.",
      type: "critical",
    });
    setLoading(false);
    navigate("/app/mockups");
    return;
  }

  try {
    if (data) {
      const formData = new FormData();
      formData.append(
        "mockup",
        JSON.stringify({ id: data.id, domain: data.shop }),
      );
      formData.append("action", "delete");
      fetcher.submit(formData, { method: "POST" });
      setLoading(false);
    }
    setLoading(false);
  } catch (error) {
    console.error("Error deleting mockups:", error);
    setLoading(false);
  }
};

export const createProductMockupCallback = async (
  data:
    | any
    | {
        shop: string;
        mockups: MockupProps;
        id: string | undefined;
      },
  fetcher: FetcherWithComponents<
    | {
        shop: string;
        mockup: null;
        error: null;
      }
    | {
        error: string;
      }
  >,
  navigate: NavigateFunction,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<
    React.SetStateAction<{
      title: string;
      message: string;
      type: "critical" | "warning";
    } | null>
  >,
) => {
  setLoading(true);

  if (!data.id) {
    setError({
      title: "Mockup does not exist",
      message: "The mockup may have been deleted.",
      type: "critical",
    });
    setLoading(false);
    navigate("/app/mockups");
    return;
  }

  if (data.mockups.product_id && String(data.mockups.product_id) !== "") {
    setError({
      title: "Product already exist",
      message:
        "The mockup already has a corresponding product: " +
        String(data.mockups.product_id) +
        ".",
      type: "warning",
    });
    setLoading(false);
    return;
  }

  try {
    if (data) {
      const formData = new FormData();
      formData.append(
        "mockup",
        JSON.stringify({ id: data.id, domain: data.shop }),
      );
      formData.append("action", "create");
      fetcher.submit(formData, { method: "POST" });
      setLoading(false);
    }
    setLoading(false);
  } catch (error) {
    console.error("Error creating product:", error);
    setLoading(false);
  }
};

export const purchaseWholesaleCallback = async (
  data:
    | any
    | {
        shop: string;
        mockups: MockupProps;
        id: string | undefined;
      },
  fetcher: FetcherWithComponents<
    | {
        shop: string;
        mockup: null;
        error: null;
      }
    | {
        error: string;
      }
  >,
  navigate: NavigateFunction,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<
    React.SetStateAction<{
      title: string;
      message: string;
      type: "critical" | "warning";
    } | null>
  >,
) => {
  setLoading(true);

  if (!data.id) {
    setError({
      title: "Mockup does not exist",
      message: "The mockup may have been deleted.",
      type: "critical",
    });
    setLoading(false);
    navigate("/app/mockups");
    return;
  }

  try {
    if (data) {
      const formData = new FormData();
      formData.append(
        "mockup",
        JSON.stringify({ id: data.id, domain: data.shop }),
      );
      formData.append("action", "wholesale");
      fetcher.submit(formData, { method: "POST" });
      setLoading(false);
    }
    setLoading(false);
  } catch (error) {
    console.error("Error creating product:", error);
    setLoading(false);
  }
};
