import { mockupsLoader, mockupsAction } from "./models/mockups.server";
import { Layout, Page, EmptyState, Banner } from "@shopify/polaris";
import { ErrorStateProps, ResponseProp } from "~/lib/types/shared";
import { Suspense, useCallback, useEffect, useState } from "react";
import { bulkDeleteMockupCallback } from "~/services/mockups";
import { MockupList } from "~/components/mockups/MockupList";
import { useAppBridge } from "@shopify/app-bridge-react";
import { LoadingSkeleton } from "~/components/skeleton";
import { MockupDocument } from "~/lib/types/mockups";
import { Footer } from "~/components/layout/Footer";
import {
  Await,
  FetcherWithComponents,
  useFetcher,
  useLoaderData,
} from "@remix-run/react";

export const loader = mockupsLoader;
export const action = mockupsAction;

export type FetcherProp = FetcherWithComponents<ResponseProp>;

export default function MockupsPage() {
  const shopify = useAppBridge();
  const data = useLoaderData<typeof loader>();
  const fetcher = useFetcher<typeof action>() as FetcherProp;
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorStateProps>(null);

  const handleDelete = useCallback(
    async (ids: string[]) => {
      await bulkDeleteMockupCallback(
        { ids: ids, shop: data.shop },
        fetcher,
        setLoading,
        setError,
      );
    },
    [data, fetcher, setLoading, setError],
  );

  const response = fetcher.data;

  const isLoading =
    ["loading", "submitting"].includes(fetcher.state) &&
    fetcher.formMethod === "POST";

  useEffect(() => {
    if (response) {
      handleMockupResponse(response, shopify, setError, setLoading);
    }
  }, [shopify, response]);

  return (
    <Page title="Your Mockups" subtitle="Mockups Generated With OnlyCaps">
      <Suspense fallback={<LoadingSkeleton />}>
        <Await resolve={data}>
          {(loadedData) => {
            return (
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
                {loadedData.mockups && loadedData.mockups.length > 0 ? (
                  <Layout.Section>
                    <MockupList
                      mockups={loadedData.mockups as MockupDocument[]}
                      handleDelete={handleDelete}
                    />
                  </Layout.Section>
                ) : (
                  <Layout.Section>
                    <EmptyState
                      heading="No Mockups Found"
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
  if (response) {
    if (response?.error) {
      setError({
        title: response.type === "DELETE" ? "Deleting Mockup" : "Unknown Error",
        message: response.error,
        type: "critical",
      });
      setLoading(false);
    } else {
      shopify.toast.show("Order Deleted");
      setLoading(false);
    }
  }
  setLoading(false);
}
