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
        const fulfillment_orders =
          productData.data.order.fulfillmentOrders.nodes.filter(
            (ful) => ful.assignedLocation.name === "OnlyCaps Fulfilmment",
          );
        if (!fulfillment_orders[0]) {
          throw new Error("OnlyCaps Fulfillment order doesn't exist.");
        }
        setFulfillment({
          id: fulfillment_orders[fulfillment_orders.length - 1].id,
          status: fulfillment_orders[fulfillment_orders.length - 1].status,
          request_status:
            fulfillment_orders[fulfillment_orders.length - 1].requestStatus,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [orderId]);

  return { fulfillment, loading, error };
};
