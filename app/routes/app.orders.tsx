import { json, LoaderFunctionArgs } from "@remix-run/node";
import { Box, Layout, Page, EmptyState } from "@shopify/polaris";
import { OrderSummary } from "~/components/home/OrderSummary";
import { Footer } from "~/components/layout/Footer";
import { OrderList } from "~/components/orders/OrderList";
import { order_list } from "~/lib/data/orders";
import { authenticate } from "~/shopify.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const admin = await authenticate.admin(request);
  return json({
    shop: admin.session.shop,
  });
}

export default function OrdersPage() {
  return (
    <Page title="Your Orders" subtitle="Orders with OnlyCaps items">
      <Layout>
        <Layout.Section>
          <OrderSummary orders={true} awaiting={0} fulfilled={0} faield={0} />
        </Layout.Section>
        {order_list && order_list.length > 0 ? (
          <Layout.Section>
            <OrderList orders={order_list} />
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
