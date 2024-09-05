import { useEffect, useState } from "react";
import { fetchOrderData } from "./util";

/**
 * Custom hook to fetch and manage order data.
 * @param {string} orderId - The ID of the order to fetch.
 * @returns {object} - An object containing fulfillment data and loading state.
 */
export const useOrderData = (orderId: string) => {
  const [fulfillment, setFulfillment] = useState({
    id: "",
    status: "" as
      | "IN_PROGRESS"
      | "UNSUBMITTED"
      | "SUBMITTED"
      | "CANCELLED"
      | "CLOSED"
      | "OPEN",
    request_status: "" as
      | "ACCEPTED"
      | "CLOSED"
      | "SUBMITTED"
      | "UNSUBMITTED"
      | "CANCELLATION_REQUESTED"
      | "CANCELLATION_ACCEPTED"
      | "REJECTED",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productData = await fetchOrderData(orderId);

        // Check if productData and its nested properties exist
        const fulfillmentOrders =
          productData?.data?.order?.fulfillmentOrders?.nodes;

        if (!fulfillmentOrders || fulfillmentOrders.length === 0) {
          setError("Fulfillment for this location unavailable");
        } else {
          // Filter for OnlyCaps Fulfillment
          const onlyCapsFulfillment = fulfillmentOrders.filter(
            (ful) => ful.assignedLocation?.name === "OnlyCaps Fulfillment",
          );

          if (onlyCapsFulfillment.length === 0) {
            setError("Fulfillment for this location unavailable");
          } else {
            const lastFulfillment =
              onlyCapsFulfillment[onlyCapsFulfillment.length - 1];

            setFulfillment({
              id: lastFulfillment?.id || "",
              status: lastFulfillment?.status || "UNSUBMITTED",
              request_status: lastFulfillment?.requestStatus || "UNSUBMITTED",
            });
          }
        }
      } catch (err) {
        setError(
          err.message || "An error occurred while fetching fulfillment data",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [orderId]);

  return { fulfillment, loading, error };
};
