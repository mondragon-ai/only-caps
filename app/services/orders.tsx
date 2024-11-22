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

// ! MODIFY ORDER

type Address = {
  address1: string;
  city: string;
  country: string;
  zip: string;
};

/**
 * Handles the Order Address Change.
 * @param {FetcherWithComponents<ResponseProp>} fetcher - The fetcher to submit the request.
 * @param {Address} address - The fetcher to submit the request.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setLoading - Function to set the loading state.
 */
export const changeAddress = async (
  fetcher: FetcherWithComponents<ResponseProp>,
  address: Address,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
): Promise<void> => {
  setLoading(true);

  try {
    const formData = new FormData();
    formData.append("action", "address");
    formData.append(JSON.stringify(address), "payload");
    fetcher.submit(formData, { method: "POST" });
  } catch (error) {
    console.error("Error deleting orders:", error);
  } finally {
    setLoading(false);
  }
};

/**
 * Handles the Order Request to exchange item.
 * @param {FetcherWithComponents<ResponseProp>} fetcher - The fetcher to submit the request.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setLoading - Function to set the loading state.
 */
export const requestExchange = async (
  fetcher: FetcherWithComponents<ResponseProp>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
): Promise<void> => {
  setLoading(true);

  try {
    const formData = new FormData();
    formData.append("action", "exchange");
    fetcher.submit(formData, { method: "POST" });
  } catch (error) {
    console.error("Error exchanging items:", error);
  } finally {
    setLoading(false);
  }
};

/**
 * Handles the Order Request for refund.
 * @param {FetcherWithComponents<ResponseProp>} fetcher - The fetcher to submit the request.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setLoading - Function to set the loading state.
 */
export const requestRefund = async (
  fetcher: FetcherWithComponents<ResponseProp>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
): Promise<void> => {
  setLoading(true);

  try {
    const formData = new FormData();
    formData.append("action", "refund");
    fetcher.submit(formData, { method: "POST" });
  } catch (error) {
    console.error("Error refunding orders:", error);
  } finally {
    setLoading(false);
  }
};

/**
 * Handles the Order cancelation.
 * @param {FetcherWithComponents<ResponseProp>} fetcher - The fetcher to submit the request.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setLoading - Function to set the loading state.
 */
export const requestCancel = async (
  fetcher: FetcherWithComponents<ResponseProp>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
): Promise<void> => {
  setLoading(true);

  try {
    const formData = new FormData();
    formData.append("action", "cancel");
    fetcher.submit(formData, { method: "POST" });
  } catch (error) {
    console.error("Error cancelling order:", error);
  } finally {
    setLoading(false);
  }
};
