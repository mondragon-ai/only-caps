import { Button } from "@shopify/ui-extensions-react/admin";
import { OrderResponseType } from "./types/shared";

/**
 * Fetch order data from Shopify GraphQL API
 * @param {string} orderId - The ID of the order to fetch.
 * @returns {Promise<OrderResponseType>} - The fetched order data.
 * @throws Will throw an error if the network request fails or if the response is not ok.
 */
export const fetchOrderData = async (
  orderId: string,
): Promise<OrderResponseType> => {
  const getOrderData = {
    query: `
      query order($id: ID!) {
        order(id: $id) {
          id
          name
          fulfillmentOrders(first: 10) {
            nodes {
              id
              status
              requestStatus
              assignedLocation {
                name
                location {
                  id
                }
              }
            }
          }
        }
      }
    `,
    variables: { id: orderId },
  };

  const res = (await makeGraphQLQuery(
    getOrderData.query,
    getOrderData.variables,
  )) as OrderResponseType;

  return res;
};

/**
 * Request fulfilment from Shopify GraphQL API
 * @param {string} fulfillmentId - The ID of the order to fetch.
 * @returns {Promise<OrderResponseType>} - The fetched order data.
 * @throws Will throw an error if the network request fails or if the response is not ok.
 */
export const requestFulfillment = async (fulfillmentId: string) => {
  const requestFulfillment = {
    query: `
      mutation fulfillmentOrderSubmitFulfillmentRequest($id: ID!) {
        fulfillmentOrderSubmitFulfillmentRequest(id: $id) {
          originalFulfillmentOrder {
            id
            status
            requestStatus
          }
          submittedFulfillmentOrder {
            id
            status
            requestStatus
          }
          unsubmittedFulfillmentOrder {
            id
            status
            requestStatus
          }
          userErrors {
            field
            message
          }
        }
      }
    `,
    variables: {
      id: fulfillmentId,
    },
  };

  const res = (await makeGraphQLQuery(
    requestFulfillment.query,
    requestFulfillment.variables,
  )) as OrderResponseType;

  return res;
};

/**
 * Accept fulfilment request from Shopify GraphQL API
 * @param {string} fulfillmentId - The ID of the order to fetch.
 * @returns {Promise<OrderResponseType>} - The fetched order data.
 * @throws Will throw an error if the network request fails or if the response is not ok.
 */
export const acceptRequestFulfillment = async (fulfillmentId: string) => {
  const acceptFulfillment = {
    query: `
      mutation fulfillmentOrderAcceptFulfillmentRequest($id: ID!, $message: String) {
        fulfillmentOrderAcceptFulfillmentRequest(id: $id, message: $message) {
          fulfillmentOrder {
            id
            status
            requestStatus
          }
          userErrors {
            field
            message
          }
        }
      }
    `,
    variables: {
      id: fulfillmentId,
      message: "Cancelled",
    },
  };

  const res = (await makeGraphQLQuery(
    acceptFulfillment.query,
    acceptFulfillment.variables,
  )) as OrderResponseType;

  return res;
};

async function makeGraphQLQuery(query: string, variables: any) {
  const graphQLQuery = {
    query,
    variables,
  };

  const res = await fetch("shopify:admin/api/graphql.json", {
    method: "POST",
    body: JSON.stringify(graphQLQuery),
  });

  if (!res.ok) {
    console.error("Network error");
  }

  return await res.json();
}
