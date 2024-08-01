import { BlockStack, Layout, Page } from "@shopify/polaris";
import { Footer } from "~/components/layout/Footer";
import { DeleteIcon, ProductAddIcon } from "@shopify/polaris-icons";
import { Order } from "~/components/orders/Order";
import { Price } from "~/components/orders/Price";
import { Customer } from "~/components/orders/Customer";
import { OrderDetail } from "~/components/orders/OrderDetail";
import { mock_order } from "~/lib/data/orders";

export default function OrdersPage() {
  return (
    <Page
      backAction={{ content: "Order", url: "/app/orders" }}
      title={`#${String(mock_order.order_name)}`}
      subtitle={mock_order.date}
      secondaryActions={[
        {
          content: "Delete Mockup",
          disabled: false,
          icon: DeleteIcon,
          destructive: true,
        },
        { content: "Create Product", disabled: false, icon: ProductAddIcon },
      ]}
    >
      <Layout>
        <Layout.Section>
          <BlockStack gap={"500"}>
            <Order order={mock_order} />
            <Price order={mock_order} />
          </BlockStack>
        </Layout.Section>

        <Layout.Section variant="oneThird">
          <BlockStack gap={"500"}>
            <Customer order={mock_order} />
            <OrderDetail order={mock_order} />
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
}
