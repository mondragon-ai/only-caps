import { FetcherWithComponents } from "@remix-run/react";
import { ResponseProp } from "~/lib/types/shared";

type ErrorState = {
  title: string;
  message: string;
  type: "critical" | "warning";
};

const prepareFormData = (action: string): FormData => {
  const formData = new FormData();
  formData.append("action", action);
  return formData;
};
/**
 * Handles the deletion of an order.
 *
 * @param {Object} data - The data containing shop and order details.
 * @param {string} data.shop - The shop identifier.
 * @param {OrderProps} data.orders - The order properties.
 * @param {string | undefined} data.id - The order ID.
 * @param {FetcherWithComponents} fetcher - The fetcher component for submitting data.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setLoading - Function to set the loading state.
 * @param {React.Dispatch<React.SetStateAction<ErrorState | null>>} setError - Function to set the error state.
 * @returns {Promise<void>} - A promise that resolves when the order deletion is handled.
 */
export const deleteOrderCallback = async (
  fetcher: FetcherWithComponents<
    { shop: string; order: null; error: null } | { error: string }
  >,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
): Promise<void> => {
  setLoading(true);

  try {
    const formData = prepareFormData("delete");
    fetcher.submit(formData, { method: "POST" });
  } catch (error) {
    console.error("Error deleting orders:", error);
  } finally {
    setLoading(false);
  }
};

export const bulkDeleteOrdersCallback = async (
  data: {
    shop: string;
    ids: string[] | undefined;
  },
  fetcher: FetcherWithComponents<ResponseProp>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<ErrorState | null>>,
) => {
  setLoading(true);

  console.log({ ids: data.ids });

  if (!data.ids || data.ids.length == 0) {
    setError({
      title: "Select Orders",
      message: "Please select orders to be deleted.",
      type: "critical",
    });
    setLoading(false);
    return;
  }

  try {
    console.log("CLICKED: DELETED BULK");
    const payload = { id: data.ids, domain: data.shop };
    console.log({ payload });
    const formData = new FormData();
    formData.append("action", "delete");
    formData.append("order_ids", JSON.stringify(payload));
    fetcher.submit(formData, { method: "POST" });
  } catch (error) {
    console.error("Error deleting mockups:", error);
  } finally {
    setLoading(false);
  }
};
