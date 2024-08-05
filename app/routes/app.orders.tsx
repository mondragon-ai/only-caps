import { json, LoaderFunctionArgs } from "@remix-run/node";
import { Await, useLoaderData } from "@remix-run/react";
import { Box, Layout, Page, EmptyState } from "@shopify/polaris";
import { Suspense } from "react";
import { OrderSummary } from "~/components/home/OrderSummary";
import { Footer } from "~/components/layout/Footer";
import { OrderList } from "~/components/orders/OrderList";
import { LoadingSkeleton } from "~/components/skeleton";
import { mockOrders } from "~/lib/data/orders";
import { authenticate } from "~/shopify.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const admin = await authenticate.admin(request);
  const orders = mockOrders;

  return json({
    shop: admin.session.shop,
    orders: orders,
  });
}

export default function OrdersPage() {
  const data = useLoaderData<typeof loader>();

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
