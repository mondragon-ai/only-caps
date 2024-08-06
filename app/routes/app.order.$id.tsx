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
import { Await, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import { LoadingSkeleton } from "~/components/skeleton";
import { OrderDocument } from "~/lib/types/orders";
import { formatDateLong } from "~/lib/formatters/numbers";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const admin = await authenticate.admin(request);
  const order = mock_order as OrderDocument;
  return json({
    shop: admin.session.shop,
    params: params,
    order,
  });
}

export default function OrdersPage() {
  const data = useLoaderData<typeof loader>();
  console.log({ data });

  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <Await resolve={data}>
        {(loadedData) => {
          const order = loadedData.order as OrderDocument;
          return (
            <Page
              backAction={{ content: "Order", url: "/app/orders" }}
              title={`#${String(order.merchant_order.order_number)}`}
              subtitle={formatDateLong(order.created_at)}
              secondaryActions={[
                {
                  content: "Delete Mockup",
                  disabled: false,
                  icon: DeleteIcon,
                  destructive: true,
                },
                {
                  content: "Create Product",
                  disabled: false,
                  icon: ProductAddIcon,
                },
              ]}
            >
              <Layout>
                <Layout.Section>
                  <BlockStack gap={"500"}>
                    <Order order={order} />
                    <Price order={order} />
                  </BlockStack>
                </Layout.Section>

                <Layout.Section variant="oneThird">
                  <BlockStack gap={"500"}>
                    <Customer order={order} />
                    <OrderDetail order={order} />
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
        }}
      </Await>
    </Suspense>
  );
}
