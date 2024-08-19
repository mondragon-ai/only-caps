import {
  Await,
  FetcherWithComponents,
  useFetcher,
  useLoaderData,
} from "@remix-run/react";
import { Box, Layout, Page, EmptyState, Banner } from "@shopify/polaris";
import { ordersAction, ordersLoader } from "./models/orders.server";
import { Suspense, useCallback, useEffect, useState } from "react";
import { OrderSummary } from "~/components/home/OrderSummary";
import { bulkDeleteOrdersCallback } from "~/services/orders";
import { OrderList } from "~/components/orders/OrderList";
import { useAppBridge } from "@shopify/app-bridge-react";
import { LoadingSkeleton } from "~/components/skeleton";
import { getAnalyticss } from "~/lib/util/analytics";
import { Footer } from "~/components/layout/Footer";
import { ErrorStateProps, ResponseProp } from "~/lib/types/shared";

export const loader = ordersLoader;
export const action = ordersAction;

export default function OrdersPage() {
  const shopify = useAppBridge();
  const data = useLoaderData<typeof loader>();
  const fetcher = useFetcher<
    typeof action
  >() as FetcherWithComponents<ResponseProp>;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorStateProps>(null);

  const response = fetcher!.data as ResponseProp;

  const handleDelete = useCallback(
    async (ids: string[]) => {
      await bulkDeleteOrdersCallback(
        { ids: ids, shop: data.shop },
        fetcher,
        setLoading,
        setError,
      );
    },
    [data, fetcher, setLoading, setError],
  );

  useEffect(() => {
    if (response) {
      handleMockupResponse(response, shopify, setError, setLoading);
    }
  }, [response, shopify]);

  return (
    <Page title="Your Orders" subtitle="Orders with OnlyCaps items">
      <Suspense fallback={<LoadingSkeleton />}>
        <Await resolve={data}>
          {(loadedData) => {
            const { wait, fulfilled, failed } = getAnalyticss(
              loadedData.orders,
            );
            return (
              <Layout>
                <Layout.Section>
                  <OrderSummary
                    orders={true}
                    awaiting={wait}
                    fulfilled={fulfilled}
                    failed={failed}
                  />
                </Layout.Section>
                {error && (
                  <Banner
                    title={error.title}
                    tone={error.type}
                    onDismiss={() => setError(null)}
                  >
                    <p>{error.message}</p>
                  </Banner>
                )}
                {loadedData.orders && loadedData.orders.length > 0 ? (
                  <Layout.Section>
                    <OrderList
                      orders={loadedData.orders}
                      handleDelete={handleDelete}
                    />
                  </Layout.Section>
                ) : (
                  <Layout.Section>
                    <EmptyState
                      heading="No Orders Found"
                      action={{
                        content: "Generate Mockup",
                        url: "/app/catalog",
                      }}
                      image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
                    >
                      <p>Create a product and start making money now.</p>
                    </EmptyState>
                  </Layout.Section>
                )}
                <Layout.Section>
                  <Footer />
                </Layout.Section>
              </Layout>
            );
          }}
        </Await>
      </Suspense>
    </Page>
  );
}

/**
 * Handle the response from the mockup API.
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
      title: response.type === "DELETE" ? "Deleting Orders" : "Unknown Error",
      message: response.error,
      type: "critical",
    });
  } else {
    shopify.toast.show("Order Deleted");
  }
  setLoading(false);
}
