import { FetcherWithComponents, NavigateFunction } from "@remix-run/react";
import { Address } from "~/components/mockups/WholeSale";
import { MockupDocument } from "~/lib/types/mockups";
import { ResponseProp } from "~/lib/types/shared";

type ErrorState = {
  title: string;
  message: string;
  type: "critical" | "warning";
};

/**
 * Handles the bulk deletion of mockups.
 * @param {Object} data - The data containing shop and mockup IDs.
 * @param {string} data.shop - The shop identifier.
 * @param {string[] | undefined} data.ids - The mockup IDs to delete.
 * @param {FetcherWithComponents<ResponseProp>} fetcher - The fetcher component for submitting data.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setLoading - Function to set the loading state.
 * @param {React.Dispatch<React.SetStateAction<ErrorState | null>>} setError - Function to set the error state.
 * @returns {Promise<void>} A promise that resolves when the mockups deletion is handled.
 */
export const bulkDeleteMockupCallback = async (
  data: { shop: string; ids: string[] | undefined },
  fetcher: FetcherWithComponents<ResponseProp>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<ErrorState | null>>,
): Promise<void> => {
  setLoading(true);

  try {
    if (!data.ids || data.ids.length === 0) {
      setError({
        title: "Select Mockups",
        message: "Please select mockups to be deleted.",
        type: "critical",
      });
      return;
    }

    const payload = { id: data.ids, domain: data.shop };
    const formData = prepareBulkFormData(payload, "delete");
    fetcher.submit(formData, { method: "POST" });
  } catch (error) {
    console.error("Error deleting mockups:", error);
    setError({
      title: "Error",
      message: "An error occurred while deleting mockups. Please try again.",
      type: "critical",
    });
  } finally {
    setLoading(false);
  }
};

/**
 * Prepares form data for a specific action.
 * @param {Object} payload - The payload data to include in the form.
 * @param {string} action - The action to perform.
 * @returns {FormData} The prepared form data.
 */
const prepareBulkFormData = (payload: any, action: string): FormData => {
  const formData = new FormData();
  formData.append("action", action);
  formData.append("mockup", JSON.stringify(payload));
  return formData;
};

// ! ================================================================
// ? Mockups Detail (page)
// ! ================================================================

/**
 * Prepares form data for a specific action.
 * @param {Object} payload - The payload data to include in the form.
 * @param {string} action - The action to perform.
 * @returns {FormData} The prepared form data.
 */
const prepareFormData = (payload: any, action: string): FormData => {
  const formData = new FormData();
  formData.append("action", action);
  formData.append("mockup", JSON.stringify(payload));
  return formData;
};

// ! ================================================================

/**
 *  * Handles the deletion of a mockup.
 * @param {Object} data - The data containing shop and mockup details.
 * @param {FetcherWithComponents} fetcher - The fetcher component for submitting data.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setLoading - Function to set the loading state.
 * @param {React.Dispatch<React.SetStateAction<ErrorState | null>>} setError - Function to set the error state.
 * @returns {Promise<void>} - A promise that resolves when the mockup deletion is handled.
 */
export const deleteMockupCallback = async (
  data: {
    shop: string;
    mockups: { mockups: MockupDocument[] };
    id: string | undefined;
  },
  fetcher: FetcherWithComponents<ResponseProp>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<ErrorState | null>>,
) => {
  setLoading(true);

  try {
    const mockup = data.mockups.mockups[0];
    if (!mockup || !mockup.id) {
      setError({
        title: "Mockup Deleted",
        message: "The mockup may have been deleted.",
        type: "critical",
      });
      setLoading(false);
      return;
    }

    const payload = { id: data.id, domain: data.shop };
    const formData = prepareFormData(payload, "delete");
    fetcher.submit(formData, { method: "POST" });
    return;
  } catch (error) {
    console.error("Error deleting mockup:", error);
    setError({
      title: "Deletion Error",
      message: "Failed to delete the mockup.",
      type: "critical",
    });
    return;
  } finally {
    setLoading(false);
  }
};

/**
 *  * Handles the creation of a product mockup.
 * @param {Object} data - The data containing shop and mockup details.
 * @param {FetcherWithComponents} fetcher - The fetcher component for submitting data.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setLoading - Function to set the loading state.
 * @param {React.Dispatch<React.SetStateAction<ErrorState | null>>} setError - Function to set the error state.
 * @returns {Promise<void>} - A promise that resolves when the product mockup creation is handled.
 */
export const createProductMockupCallback = async (
  data: {
    shop: string;
    mockups: { mockups: MockupDocument[] };
    id: string | undefined;
  },
  fetcher: FetcherWithComponents<ResponseProp>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<ErrorState | null>>,
) => {
  setLoading(true);

  try {
    const mockup = data.mockups.mockups[0];
    if (!mockup || !mockup.id) {
      setError({
        title: "Mockup Deleted",
        message: "The mockup may have been deleted.",
        type: "critical",
      });
      setLoading(false);
      return;
    }

    if (mockup.product_id !== "") {
      setError({
        title: "Product Exists",
        message: `The mockup already has a corresponding product: ${mockup.product_id}.`,
        type: "warning",
      });
      setLoading(false);
      return;
    }

    const payload = { id: mockup.id, domain: data.shop };
    const formData = prepareFormData(payload, "create");
    fetcher.submit(formData, { method: "POST" });
  } catch (error) {
    console.error("Error creating product:", error);
    setError({
      title: "Creation Error",
      message: "Failed to create the product.",
      type: "critical",
    });
  } finally {
    setLoading(false);
  }
};

type FormProps = {
  color: string;
  address: any;
  email: string;
};

/**
 * * Handles the purchase of a wholesale mockup.
 * @param {any} payload - The payload containing mockup and purchase details.
 * @param {FetcherWithComponents} fetcher - The fetcher component for submitting data.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setLoading - Function to set the loading state.
 * @param {React.Dispatch<React.SetStateAction<ErrorState | null>>} setError - Function to set the error state.
 * @returns {Promise<void>} - A promise that resolves when the wholesale purchase is handled.
 */
export const purchaseWholesaleCallback = async (
  payload: {
    form: FormProps;
    quantity: number;
    product_id: string | undefined;
  },
  fetcher: FetcherWithComponents<ResponseProp>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<ErrorState | null>>,
) => {
  setLoading(true);

  try {
    const isValid = validateWholesalePayload(payload, setError, setLoading);

    if (!isValid) {
      return;
    } else {
      const formData = prepareFormData(payload, "wholesale");
      fetcher.submit(formData, { method: "POST" });
    }
  } catch (error) {
    console.error("Error processing wholesale purchase:", error);
    setError({
      title: "Purchase Error",
      message: "",
      type: "critical",
    });
  } finally {
    setLoading(false);
  }
};

/**
 * Validates the wholesale payload.
 * @param {any} payload - The payload containing mockup and purchase details.
 * @throws {Error} - Throws an error if validation fails.
 */
const validateWholesalePayload = (
  payload: {
    form: FormProps;
    quantity: number;
    product_id: string | undefined;
  },
  setError: React.Dispatch<React.SetStateAction<ErrorState | null>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  if (!payload.product_id) {
    setError({
      title: "Wholesale Not Purchased",
      message: "Purchase could not be created.",
      type: "critical",
    });
    setLoading(false);
    return false;
  }
  if (!payload.form.color || payload.form.color == "") {
    setError({
      title: "Color Needed",
      message: "Please select a color.",
      type: "critical",
    });
    setLoading(false);
    return false;
  }
  if (!payload.quantity || payload.quantity == 0) {
    setError({
      title: "Quntity Required",
      message: "More than one quantity is required.",
      type: "critical",
    });
    setLoading(false);
    return false;
  }
  if (!payload.form.address.address1 || payload.form.address.address1 == "") {
    setError({
      title: "Address Required",
      message: "Street name is required.",
      type: "critical",
    });
    setLoading(false);
    return false;
  }
  if (!payload.form.address.city || payload.form.address.city == "") {
    setError({
      title: "Address Required",
      message: "City name is required.",
      type: "critical",
    });
    setLoading(false);
    return false;
  }
  if (
    !payload.form.address.province_code ||
    payload.form.address.province_code == ""
  ) {
    setError({
      title: "Address Required",
      message: "State Code is required.",
      type: "critical",
    });
    setLoading(false);
    return false;
  }
  if (!payload.form.address.zip || payload.form.address.zip == "") {
    setError({
      title: "Address Required",
      message: "Zip code is required.",
      type: "critical",
    });
    setLoading(false);
    return false;
  }
  if (
    !payload.form.address.first_name ||
    payload.form.address.first_name == ""
  ) {
    setError({
      title: "First Name Required",
      message: "First Name is required.",
      type: "critical",
    });
    setLoading(false);
    return false;
  }
  if (!payload.form.email || payload.form.email == "") {
    setError({
      title: "Email Required",
      message: "A contact email is required.",
      type: "critical",
    });
    setLoading(false);
    return false;
  }
  return true;
};

// ! ================================================================
// ? Mockups Detail (page)
// ! ================================================================
