import {
  Await,
  FetcherWithComponents,
  useFetcher,
  useLoaderData,
} from "@remix-run/react";
import {
  Banner,
  BlockStack,
  Layout,
  MenuActionDescriptor,
  Page,
} from "@shopify/polaris";
import { Suspense, useCallback, useEffect, useState } from "react";
import { ErrorStateProps, ResponseProp } from "~/lib/types/shared";
import { OrderDetail } from "~/components/orders/OrderDetail";
import { formatDateLong } from "~/lib/formatters/numbers";
import { useAppBridge } from "@shopify/app-bridge-react";
import {
  changeAddress,
  deleteOrderCallback,
  requestCancel,
  requestExchange,
  requestRefund,
} from "~/services/orders";
import { LoadingSkeleton } from "~/components/skeleton";
import { Customer } from "~/components/orders/Customer";
import { orderLoader } from "./models/orders.server";
import { orderAction } from "./models/orders.server";
import { Footer } from "~/components/layout/Footer";
import {
  DeleteIcon,
  ReceiptRefundIcon,
  LabelPrinterIcon,
  ExchangeIcon,
  PackageReturnedIcon,
} from "@shopify/polaris-icons";
import { OrderDocument } from "~/lib/types/orders";
import { Order } from "~/components/orders/Order";
import { Price } from "~/components/orders/Price";

export const loader = orderLoader;
export const action = orderAction;

export type FetcherProp = FetcherWithComponents<ResponseProp>;

type Address = {
  address1: string;
  city: string;
  country: string;
  zip: string;
};

export default function OrdersPage() {
  const shopify = useAppBridge();
  const data = useLoaderData<typeof orderLoader>();
  const fetcher = useFetcher<typeof orderAction>() as FetcherProp;
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorStateProps>(null);
  const [action, setAction] = useState<"refund" | "exchange" | null>(null);

  const response = fetcher.data;

  const isLoading =
    ["loading", "submitting"].includes(fetcher.state) &&
    fetcher.formMethod === "POST";

  const handleDelete = useCallback(async () => {
    await deleteOrderCallback(fetcher, setLoading);
  }, [fetcher]);

  const handleAddressChange = useCallback(
    async (address: Address) => {
      console.log("SAVED: ", address);
      setAction(null);
      await changeAddress(fetcher, address, setLoading);
    },
    [fetcher],
  );

  const handleCancelOrder = useCallback(async () => {
    console.log("CANCEL ORDER ");
    setAction(null);
    await requestCancel(fetcher, setLoading);
  }, [fetcher]);

  const handleRequestExchange = useCallback(async () => {
    console.log("REQUEST EXCHANGE");
    setAction(null);
    await requestExchange(fetcher, setLoading);
  }, [fetcher]);

  const handleOrderRefund = useCallback(async () => {
    console.log("REQUEST REFUND");
    setAction(null);
    await requestRefund(fetcher, setLoading);
  }, [fetcher]);

  useEffect(() => {
    if (response) {
      handleMockupResponse(response, shopify, setError, setLoading);
    }
  }, [shopify, response]);

  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <Await resolve={data}>
        {(loadedData) => {
          const order = loadedData.order as OrderDocument;

          let secondaryActions: MenuActionDescriptor[] = [];

          if (order.tracking_number !== "") {
            secondaryActions = [
              {
                content: "Request Refund",
                disabled: isLoading || loading,
                loading: isLoading || loading,
                icon: ReceiptRefundIcon,
                destructive: false,
                onAction: () => setAction("refund"),
              },
              {
                content: "Request Exchange",
                disabled: isLoading || loading,
                loading: isLoading || loading,
                icon: ExchangeIcon,
                destructive: false,
                onAction: () => setAction("exchange"),
              },
            ];
          } else {
            secondaryActions = [
              {
                content: "Cancel Order",
                disabled: isLoading || loading,
                loading: isLoading || loading,
                icon: PackageReturnedIcon,
                destructive: false,
                onAction: handleCancelOrder,
              },
              {
                content: "Request Exchange",
                disabled: isLoading || loading,
                loading: isLoading || loading,
                icon: ExchangeIcon,
                destructive: false,
                onAction: () => setAction("exchange"),
              },
            ];
          }
          return (
            <Page
              backAction={{ content: "Order", url: "/app/orders" }}
              title={`#${String(order.merchant_order.order_number)}`}
              subtitle={formatDateLong(
                Number(order.created_at?._seconds) * 1000,
              )}
              primaryAction={{
                content: "Delete Order",
                disabled: isLoading || loading,
                loading: isLoading || loading,
                icon: DeleteIcon,
                destructive: true,
                onAction: handleDelete,
              }}
              secondaryActions={secondaryActions}
            >
              <Layout>
                <Layout.Section>
                  {error && (
                    <Banner
                      title={error.title}
                      tone={error.type}
                      onDismiss={() => setError(null)}
                    >
                      <p>{error.message}</p>
                    </Banner>
                  )}
                </Layout.Section>
                <Layout.Section>
                  <Banner tone={"info"}>
                    <p>
                      Keep in mind, deleting orders here will NOT affect the
                      shopify order in the admin pannel
                    </p>
                  </Banner>
                </Layout.Section>
                <Layout.Section>
                  <BlockStack gap={"500"}>
                    <Order
                      order={order}
                      action={action}
                      handleOrderRefund={handleOrderRefund}
                      handleRequestExchange={handleRequestExchange}
                    />
                    <Price order={order} />
                  </BlockStack>
                </Layout.Section>

                <Layout.Section variant="oneThird">
                  <BlockStack gap={"500"}>
                    <Customer
                      handleAddressChange={handleAddressChange}
                      order={order}
                    />
                    <OrderDetail order={order} />
                  </BlockStack>
                </Layout.Section>
              </Layout>
              <Layout>
                <Layout.Section>
                  <Footer />
                </Layout.Section>
              </Layout>
            </Page>
          );
        }}
      </Await>
    </Suspense>
  );
}

/**
 * Handle the response from the order API.
 * @param {ResponseProp} response - The response from the API.
 * @param {any} shopify - The Shopify app bridge instance.
 * @param {Function} setError - The function to set the error state.
 * @param {Function} setLoading - The function to set the loading state.
 */
function handleMockupResponse(
  response: ResponseProp,
  shopify: any,
  setError: Function,
  setLoading: Function,
) {
  if (response && response.error) {
    switch (response.type) {
      case "DELETE": {
        setError({
          title: "Deleting Order",
          message: "Couldn't Find Order",
          type: "critical",
        });
        break;
      }
      case "address": {
        setError({
          title: "Updating Order Addres",
          message: "The order is already in transit.",
          type: "critical",
        });
        break;
      }
      case "exchange": {
        setError({
          title: "Exchanging Items",
          message: "Item goes against our policy",
          type: "critical",
        });
        break;
      }
      case "refund": {
        setError({
          title: "Refunding Order",
          message: "Order goes against our return policy",
          type: "critical",
        });
        break;
      }
      case "cancel": {
        setError({
          title: "Canceling Order",
          message: "Order already in tranist",
          type: "critical",
        });
        break;
      }

      default: {
        setError({
          title: "Unknown Error",
          message: "Try Again later",
          type: "critical",
        });
        break;
      }
    }
  }

  if (response) {
    switch (response.type) {
      case "DELETE": {
        shopify.toast.show("Order Deleted");
        break;
      }
      case "address": {
        shopify.toast.show("Address Changed");
        break;
      }
      case "exchange": {
        shopify.toast.show("Exchange Requested");
        break;
      }
      case "refund": {
        shopify.toast.show("Items Refunded");
        break;
      }
      case "cancel": {
        shopify.toast.show("Order Cancled");
        break;
      }

      default:
        break;
    }
  }
  setLoading(false);
}
