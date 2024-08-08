import { FetcherWithComponents, NavigateFunction } from "@remix-run/react";
import { Address } from "~/components/mockups/WholeSale";
import { MockupProps } from "~/lib/types/mockups";
import { OrderDocument } from "~/lib/types/orders";

type ErrorState = {
  title: string;
  message: string;
  type: "critical" | "warning";
};

const prepareFormData = (payload: object, action: string): FormData => {
  const formData = new FormData();
  formData.append("mockup", JSON.stringify(payload));
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
  data: {
    shop: string;
    orders: OrderDocument;
    id: string | undefined;
  },
  fetcher: FetcherWithComponents<
    { shop: string; order: null; error: null } | { error: string }
  >,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<ErrorState | null>>,
): Promise<void> => {
  setLoading(true);

  if (!data.id) {
    setError({
      title: "Order Deleted",
      message: "The order may have already been deleted.",
      type: "critical",
    });
    setLoading(false);
    return;
  }

  try {
    const payload = { id: data.id, domain: data.shop };
    const formData = prepareFormData(payload, "delete");
    fetcher.submit(formData, { method: "POST" });
  } catch (error) {
    console.error("Error deleting orders:", error);
  } finally {
    setLoading(false);
  }
};
