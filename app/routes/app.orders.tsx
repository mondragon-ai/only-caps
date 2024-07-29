import {
  Box,
  Card,
  Layout,
  Link,
  List,
  Page,
  Text,
  BlockStack,
  FooterHelp,
  EmptyState,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { OrderSummary } from "~/components/home/OrderSummary";
import { Footer } from "~/components/layout/Footer";
import { OrderList } from "~/components/orders/OrderList";

const orders: any[] = [
  {
    id: "1001",
    order_name: 1001,
    name: "Collin Sander",
    status: "failed",
    total: 50,
    delivery: "",
    date: new Date().toLocaleDateString(),
  },
  {
    id: "1002",
    order_name: 1002,
    name: "Jane Doe",
    status: "completed",
    total: 75,
    delivery: "2024-07-30",
    date: new Date().toLocaleDateString(),
  },
  {
    id: "1003",
    order_name: 1003,
    name: "John Smith",
    status: "pending",
    total: 120,
    delivery: "",
    date: new Date().toLocaleDateString(),
  },
  {
    id: "1004",
    order_name: 1004,
    name: "Alice Johnson",
    status: "processing",
    total: 85,
    delivery: "",
    date: new Date().toLocaleDateString(),
  },
  {
    id: "1005",
    order_name: 1005,
    name: "Bob Brown",
    status: "completed",
    total: 45,
    delivery: "2024-07-31",
    date: new Date().toLocaleDateString(),
  },
];

export default function OrdersPage() {
  return (
    <Page title="Your Orders" subtitle="Orders with OnlyCaps items">
      <Layout>
        <Layout.Section>
          <OrderSummary orders={true} />
        </Layout.Section>
        {orders && orders.length > 1 ? (
          <Layout.Section>
            <OrderList orders={orders} />
          </Layout.Section>
        ) : (
          <Layout.Section>
            <EmptyState
              heading="No Orders Found"
              action={{
                content: "Generate Mockup",
                url: "#",
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
