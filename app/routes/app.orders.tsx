import { ActionFunctionArgs, json, LoaderFunctionArgs } from "@remix-run/node";
import {
  Await,
  FetcherWithComponents,
  useFetcher,
  useLoaderData,
  useNavigate,
} from "@remix-run/react";
import { Box, Layout, Page, EmptyState, Banner } from "@shopify/polaris";
import { Suspense, useCallback, useEffect, useState } from "react";
import { OrderSummary } from "~/components/home/OrderSummary";
import { Footer } from "~/components/layout/Footer";
import { OrderList } from "~/components/orders/OrderList";
import { LoadingSkeleton } from "~/components/skeleton";
import { MockupDocument } from "~/lib/types/mockups";
import { authenticate } from "~/shopify.server";
import {
  deleteOrder,
  nextOrderList,
  previousOrderList,
} from "./models/orders.server";
import { useAppBridge } from "@shopify/app-bridge-react";
import { OrderDocument } from "~/lib/types/orders";
import { SERVER_BASE_URL } from "~/lib/contants";
import { getAnalyticss } from "~/lib/util/analytics";
import { bulkDeleteOrdersCallback } from "~/services/orders";
import { ResponseProp } from "~/lib/types/shared";

export async function loader({ request }: LoaderFunctionArgs) {
  const admin = await authenticate.admin(request);

  const response = await fetch(
    `${SERVER_BASE_URL}/store/${admin.session.shop}/orders`,
  );

  const data = (await response.json()) as {
    text: string;
    orders: OrderDocument[];
  };

  return json({
    shop: admin.session.shop,
    orders: data.orders,
  });
}

export default function OrdersPage() {
  const shopify = useAppBridge();
  const data = useLoaderData<typeof loader>();
  const fetcher = useFetcher<
    typeof action
  >() as FetcherWithComponents<ResponseProp>;
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<{
    title: string;
    message: string;
    type: "critical" | "warning";
  } | null>(null);

  const mockup_response = fetcher.data;

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
    if (mockup_response) {
      if (mockup_response?.error) {
        setError({
          title:
            mockup_response.type == "DELETE"
              ? "Deleting Mockups"
              : "Unknown Error",
          message: mockup_response.error,
          type: "critical",
        });
        setLoading(false);
      } else {
        shopify.toast.show("Order Deleted");
        setLoading(false);
      }
    }
  }, [shopify, mockup_response, data]);

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

function Code({ children }: { children: React.ReactNode }) {
  return (
    <Box
      as="span"
      padding="025"
      paddingInlineStart="100"
      paddingInlineEnd="100"
      background="bg-surface-active"
      borderWidth="025"
      borderColor="border"
      borderRadius="100"
    >
      <code>{children}</code>
    </Box>
  );
}

/**
 * Action function to handle mockup creation.
 *
 * @param {any} args - The action function arguments.
 * @returns {Promise<Response>} The response containing the mockup data.
 */
export async function action({ request, params }: ActionFunctionArgs) {
  const { session } = await authenticate.admin(request);
  const { shop } = session;

  // Parsing the mockup data from the formData
  const formData = await request.formData();
  const order_ids = formData.get("order_ids");
  const type = formData.get("action");

  // create pyalod
  const payload = order_ids
    ? (JSON.parse(String(order_ids)) as {
        id: string[];
        domain: string;
      })
    : null;

  let response;
  switch (type) {
    case "delete":
      response = await deleteOrder(shop, payload!.id, true);
      return json({
        shop,
        result: null,
        error: null,
        type: "DELETE",
      } as ResponseProp);
    case "next":
      response = await nextOrderList(shop, "");
      return json({
        shop,
        result: null,
        error: null,
        type: "NEXT",
      } as ResponseProp);
    case "previous":
      response = await previousOrderList(shop, "");
      return json({
        shop,
        result: null,
        error: "Server Error",
        status: 400,
        type: "DELETE",
      } as ResponseProp);

    default:
      return json(
        {
          shop,
          result: null,
          error: "Server Error",
          status: 400,
          type: "DELETE",
        } as ResponseProp,
        { status: 400 },
      );
  }
}
