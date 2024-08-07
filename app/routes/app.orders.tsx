import { ActionFunctionArgs, json, LoaderFunctionArgs } from "@remix-run/node";
import {
  Await,
  useFetcher,
  useLoaderData,
  useNavigate,
} from "@remix-run/react";
import { Box, Layout, Page, EmptyState } from "@shopify/polaris";
import { Suspense, useEffect, useState } from "react";
import { OrderSummary } from "~/components/home/OrderSummary";
import { Footer } from "~/components/layout/Footer";
import { OrderList } from "~/components/orders/OrderList";
import { LoadingSkeleton } from "~/components/skeleton";
import { mockOrders } from "~/lib/data/orders";
import { MockupProps } from "~/lib/types/mockups";
import { authenticate } from "~/shopify.server";
import {
  deleteOrder,
  nextOrderList,
  previousOrderList,
} from "./models/orders.server";
import { useAppBridge } from "@shopify/app-bridge-react";

export async function loader({ request }: LoaderFunctionArgs) {
  const admin = await authenticate.admin(request);
  const orders = mockOrders;

  return json({
    shop: admin.session.shop,
    orders: orders,
  });
}

export default function OrdersPage() {
  const shopify = useAppBridge();
  const data = useLoaderData<typeof loader>();
  const fetcher = useFetcher<typeof action>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<{
    title: string;
    message: string;
    type: "critical" | "warning";
  } | null>(null);

  const mockup_response = fetcher.data;

  useEffect(() => {
    if (mockup_response) {
      if (mockup_response?.error) {
        setError({
          title: "Generating Mockup",
          message: mockup_response.error,
          type: "critical",
        });
        setLoading(false);
      } else {
        shopify.toast.show("Product Created");
        setLoading(false);
        // navigate(`/app/mockup/${mockup_response.mockup?.id}`);
      }
    }
  }, [shopify, mockup_response, data]);

  return (
    <Page title="Your Orders" subtitle="Orders with OnlyCaps items">
      <Suspense fallback={<LoadingSkeleton />}>
        <Await resolve={data}>
          {(loadedData) => {
            return (
              <Layout>
                <Layout.Section>
                  <OrderSummary
                    orders={true}
                    awaiting={0}
                    fulfilled={0}
                    failed={0}
                  />
                </Layout.Section>
                {loadedData.orders && loadedData.orders.length > 0 ? (
                  <Layout.Section>
                    <OrderList orders={loadedData.orders} />
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
  const mockup = formData.get("mockup");
  const type = formData.get("action");

  // create pyalod
  const payload = mockup ? (JSON.parse(String(mockup)) as MockupProps) : null;

  let response;
  switch (type) {
    case "delete":
      response = await deleteOrder(shop, String(params.id));
      console.log(response);
      return json({ shop, orders: null, error: null });
    case "next":
      response = await nextOrderList(shop, "");
      return json({ shop, orders: null, error: null });
    case "previous":
      response = await previousOrderList(shop, "");
      return json({ shop, orders: null, error: null });

    default:
      return json({ error: "" }, { status: 400 });
  }
}
