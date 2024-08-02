import { BlockStack, Layout, Page } from "@shopify/polaris";
import { Footer } from "~/components/layout/Footer";
import { DeleteIcon, ProductAddIcon } from "@shopify/polaris-icons";
import { Order } from "~/components/orders/Order";
import { Price } from "~/components/orders/Price";
import { Customer } from "~/components/orders/Customer";
import { OrderDetail } from "~/components/orders/OrderDetail";
import { mock_order } from "~/lib/data/orders";
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import { useLoaderData } from "@remix-run/react";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const admin = await authenticate.admin(request);
  return json({
    shop: admin.session.shop,
    params: params,
  });
}

export default function OrdersPage() {
  const data = useLoaderData<typeof loader>();
  console.log({ data });

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
