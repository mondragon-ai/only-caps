import { FetcherWithComponents } from "@remix-run/react";
import { ResponseProp } from "~/lib/types/shared";

type ErrorState = {
  title: string;
  message: string;
  type: "critical" | "warning";
};

/**
 * Handles the Order deletion.
 * @param {FetcherWithComponents<ResponseProp>} fetcher - The fetcher to submit the request.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setLoading - Function to set the loading state.
 * @param {React.Dispatch<React.SetStateAction<ErrorState | null>>} setError - Function to set the error state.
 */
export const deleteOrderCallback = async (
  fetcher: FetcherWithComponents<ResponseProp>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
): Promise<void> => {
  setLoading(true);

  try {
    const formData = new FormData();
    formData.append("action", "delete");
    fetcher.submit(formData, { method: "POST" });
  } catch (error) {
    console.error("Error deleting orders:", error);
  } finally {
    setLoading(false);
  }
};

/**
 * Creates the payload required for the delete request.
 * @param {string[]} ids - The IDs of the orders to delete.
 * @param {string} shop - The shop domain.
 * @returns {FormData} The form data containing the delete payload.
 */
const createDeletePayload = (ids: string[], shop: string): FormData => {
  const payload = { id: ids, domain: shop };
  const formData = new FormData();
  formData.append("action", "delete");
  formData.append("order_ids", JSON.stringify(payload));
  return formData;
};

interface BulkDeleteData {
  shop: string;
  ids: string[] | undefined;
}

/**
 * Handles the bulk deletion of orders.
 * @param {BulkDeleteData} data - The data required to perform the bulk delete.
 * @param {FetcherWithComponents<ResponseProp>} fetcher - The fetcher to submit the request.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setLoading - Function to set the loading state.
 * @param {React.Dispatch<React.SetStateAction<ErrorState | null>>} setError - Function to set the error state.
 */
export const bulkDeleteOrdersCallback = async (
  data: BulkDeleteData,
  fetcher: FetcherWithComponents<ResponseProp>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<ErrorState | null>>,
) => {
  try {
    setLoading(true);

    if (!data.ids || data.ids.length === 0) {
      return setError({
        title: "Select Orders",
        message: "Please select orders to be deleted.",
        type: "critical",
      });
    }

    const formData = createDeletePayload(data.ids, data.shop);
    fetcher.submit(formData, { method: "POST" });
  } catch (error) {
    console.error("Error deleting orders:", error);
    return setError({
      title: "Error Deleting Orders",
      message:
        "An unexpected error occurred while deleting orders. Please try again.",
      type: "critical",
    });
  } finally {
    setLoading(false);
  }
};
