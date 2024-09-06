import {
  Await,
  FetcherWithComponents,
  useFetcher,
  useLoaderData,
} from "@remix-run/react";
import { Banner, BlockStack, Layout, Page } from "@shopify/polaris";
import { Suspense, useCallback, useEffect, useState } from "react";
import { ErrorStateProps, ResponseProp } from "~/lib/types/shared";
import { OrderDetail } from "~/components/orders/OrderDetail";
import { formatDateLong } from "~/lib/formatters/numbers";
import { useAppBridge } from "@shopify/app-bridge-react";
import { deleteOrderCallback } from "~/services/orders";
import { LoadingSkeleton } from "~/components/skeleton";
import { Customer } from "~/components/orders/Customer";
import { orderLoader } from "./models/orders.server";
import { orderAction } from "./models/orders.server";
import { Footer } from "~/components/layout/Footer";
import { DeleteIcon } from "@shopify/polaris-icons";
import { OrderDocument } from "~/lib/types/orders";
import { Order } from "~/components/orders/Order";
import { Price } from "~/components/orders/Price";

export const loader = orderLoader;
export const action = orderAction;

export type FetcherProp = FetcherWithComponents<ResponseProp>;

export default function OrdersPage() {
  const shopify = useAppBridge();
  const data = useLoaderData<typeof orderLoader>();
  const fetcher = useFetcher<typeof orderAction>() as FetcherProp;
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorStateProps>(null);

  const response = fetcher.data;

  const isLoading =
    ["loading", "submitting"].includes(fetcher.state) &&
    fetcher.formMethod === "POST";

  const handleDelete = useCallback(async () => {
    await deleteOrderCallback(fetcher, setLoading);
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
                    <Order order={order} />
                    <Price order={order} />
                  </BlockStack>
                </Layout.Section>

                <Layout.Section variant="oneThird">
                  <BlockStack gap={"500"}>
                    <Customer order={order} />
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
  if (response.error) {
    setError({
      title: response.type === "DELETE" ? "Deleting Order" : "Unknown Error",
      message: response.error,
      type: "critical",
    });
  } else {
    shopify.toast.show("Order Deleted");
  }
  setLoading(false);
}
