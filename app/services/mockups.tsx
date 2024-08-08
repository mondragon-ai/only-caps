import { FetcherWithComponents, NavigateFunction } from "@remix-run/react";
import { Address } from "~/components/mockups/WholeSale";
import { MockupProps } from "~/lib/types/mockups";

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
 * Handles the deletion of a mockup.
 *
 * @param {Object} data - The data containing shop and mockup details.
 * @param {string} data.shop - The shop identifier.
 * @param {MockupProps} data.mockups - The mockup properties.
 * @param {string | undefined} data.id - The mockup ID.
 * @param {FetcherWithComponents} fetcher - The fetcher component for submitting data.
 * @param {NavigateFunction} navigate - The function to navigate to different routes.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setLoading - Function to set the loading state.
 * @param {React.Dispatch<React.SetStateAction<ErrorState | null>>} setError - Function to set the error state.
 * @returns {Promise<void>} - A promise that resolves when the mockup deletion is handled.
 */
export const deleteMockupCallback = async (
  data: {
    shop: string;
    mockups: MockupProps;
    id: string | undefined;
    address: any;
  },
  fetcher: FetcherWithComponents<
    { shop: string; mockup: null; error: null } | { error: string }
  >,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<ErrorState | null>>,
) => {
  setLoading(true);

  if (!data.id) {
    setError({
      title: "Mockup Deleted",
      message: "The mockup may have been deleted already.",
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
    console.error("Error deleting mockups:", error);
  } finally {
    setLoading(false);
  }
};

/**
 * Handles the creation of a product mockup.
 *
 * @param {Object} data - The data containing shop and mockup details.
 * @param {string} data.shop - The shop identifier.
 * @param {MockupProps} data.mockups - The mockup properties.
 * @param {string | undefined} data.id - The mockup ID.
 * @param {FetcherWithComponents} fetcher - The fetcher component for submitting data.
 * @param {NavigateFunction} navigate - The function to navigate to different routes.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setLoading - Function to set the loading state.
 * @param {React.Dispatch<React.SetStateAction<ErrorState | null>>} setError - Function to set the error state.
 * @returns {Promise<void>} - A promise that resolves when the product mockup creation is handled.
 */
export const createProductMockupCallback = async (
  data: { shop: string; mockups: MockupProps; id: string | undefined },
  fetcher: FetcherWithComponents<
    { shop: string; mockup: null; error: null } | { error: string }
  >,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<ErrorState | null>>,
) => {
  setLoading(true);

  if (!data.id) {
    setError({
      title: "Mockup Deleted",
      message: "The mockup may have been deleted.",
      type: "critical",
    });
    setLoading(false);
    return;
  }

  if (data.mockups.product_id) {
    setError({
      title: "Product Already Created",
      message: `The mockup already has a corresponding product: ${data.mockups.product_id}.`,
      type: "warning",
    });
    setLoading(false);
    return;
  }

  try {
    const payload = { id: data.id, domain: data.shop };
    const formData = prepareFormData(payload, "create");
    fetcher.submit(formData, { method: "POST" });
  } catch (error) {
    console.error("Error creating product:", error);
  } finally {
    setLoading(false);
  }
};

/**
 * Handles the purchase of a wholesale mockup.
 *
 * @param {any} payload - The payload containing mockup and purchase details.
 * @param {FetcherWithComponents} fetcher - The fetcher component for submitting data.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setLoading - Function to set the loading state.
 * @param {React.Dispatch<React.SetStateAction<ErrorState | null>>} setError - Function to set the error state.
 * @returns {Promise<void>} - A promise that resolves when the wholesale purchase is handled.
 */
export const purchaseWholesaleCallback = async (
  payload: {
    address: Address;
    quantity: number;
    color: string;
    mockup_id: string | undefined;
  },
  fetcher: FetcherWithComponents<
    | { error: string; shop: string; mockup: null; type: null }
    | { shop: string; mockup: null; error: null; type: string }
  >,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<ErrorState | null>>,
) => {
  setLoading(true);

  if (!payload.mockup_id) {
    setError({
      title: "Wholesale Not Purchased",
      message: "Purchase could not be created.",
      type: "critical",
    });
    setLoading(false);
    return;
  }
  if (!payload.color || payload.color == "") {
    setError({
      title: "Color Needed",
      message: "Please select a color.",
      type: "critical",
    });
    setLoading(false);
    return;
  }
  if (!payload.quantity || payload.quantity == 0) {
    setError({
      title: "Quntity Required",
      message: "More than one quantity is required.",
      type: "critical",
    });
    setLoading(false);
    return;
  }
  if (!payload.address.address1 || payload.address.address1 == "") {
    setError({
      title: "Address Required",
      message: "Street name is required.",
      type: "critical",
    });
    setLoading(false);
    return;
  }
  if (!payload.address.city || payload.address.city == "") {
    setError({
      title: "Address Required",
      message: "City name is required.",
      type: "critical",
    });
    setLoading(false);
    return;
  }
  if (!payload.address.provinceCode || payload.address.provinceCode == "") {
    setError({
      title: "Address Required",
      message: "State Code is required.",
      type: "critical",
    });
    setLoading(false);
    return;
  }
  if (!payload.address.zip || payload.address.zip == "") {
    setError({
      title: "Address Required",
      message: "Zip name is required.",
      type: "critical",
    });
    setLoading(false);
    return;
  }

  try {
    const formData = prepareFormData(payload, "wholesale");
    fetcher.submit(formData, { method: "POST" });
  } catch (error) {
    console.error("Error processing wholesale purchase:", error);
  } finally {
    setLoading(false);
  }
};
