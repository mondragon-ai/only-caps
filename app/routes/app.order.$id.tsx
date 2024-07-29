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

const order = {
  id: "1005",
  order_name: 1005,
  name: "Bob Brown",
  status: "completed",
  total: 45,
  delivery: "2024-07-31",
  date: new Date().toLocaleDateString(),
};

export default function OrdersPage() {
  return (
    <Page title={`#${String(order.order_name)}`} subtitle={order.date}>
      <Layout>
        <Layout.Section>
          <Footer />
        </Layout.Section>
      </Layout>
    </Page>
  );
}
