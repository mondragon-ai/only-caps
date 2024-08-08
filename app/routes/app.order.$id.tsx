import { Banner, BlockStack, Layout, Page } from "@shopify/polaris";
import { Footer } from "~/components/layout/Footer";
import { DeleteIcon, ProductAddIcon } from "@shopify/polaris-icons";
import { Order } from "~/components/orders/Order";
import { Price } from "~/components/orders/Price";
import { Customer } from "~/components/orders/Customer";
import { OrderDetail } from "~/components/orders/OrderDetail";
import { mock_order } from "~/lib/data/orders";
import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import {
  Await,
  useFetcher,
  useLoaderData,
  useNavigate,
} from "@remix-run/react";
import { Suspense, useCallback, useEffect, useState } from "react";
import { LoadingSkeleton } from "~/components/skeleton";
import { OrderDocument } from "~/lib/types/orders";
import { formatDateLong } from "~/lib/formatters/numbers";
import { useAppBridge } from "@shopify/app-bridge-react";
import { MockupProps } from "~/lib/types/mockups";
import {
  deleteOrder,
  nextOrderList,
  previousOrderList,
} from "./models/orders.server";
import { deleteOrderCallback } from "~/services/orders";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const admin = await authenticate.admin(request);
  const order = mock_order as OrderDocument;

  return json({
    shop: admin.session.shop,
    params: params,
    order,
    id: params.id,
  });
}

export default function OrdersPage() {
  const navigate = useNavigate();
  const shopify = useAppBridge();
  const data = useLoaderData<typeof loader>();
  const fetcher = useFetcher<typeof action>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<{
    title: string;
    message: string;
    type: "critical" | "warning";
  } | null>(null);

  const mockup_response = fetcher.data;

  const handleDelete = useCallback(async () => {
    deleteOrderCallback(data as any, fetcher as any, setLoading, setError);
  }, [data, fetcher, navigate, setLoading, setError]);

  useEffect(() => {
    if (mockup_response) {
      if (mockup_response?.error) {
        setError({
          title:
            mockup_response.type == "DELETE"
              ? "Deleting Mockup"
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
    <Suspense fallback={<LoadingSkeleton />}>
      <Await resolve={data}>
        {(loadedData) => {
          const order = loadedData.order as OrderDocument;
          return (
            <Page
              backAction={{ content: "Order", url: "/app/orders" }}
              title={`#${String(order.merchant_order.order_number)}`}
              subtitle={formatDateLong(order.created_at)}
              primaryAction={{
                content: "Delete Order",
                disabled: loading,
                loading: loading,
                icon: DeleteIcon,
                destructive: true,
                onAction: handleDelete,
              }}
            >
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
  const type = formData.get("action");

  let response;
  switch (type) {
    case "delete":
      response = await deleteOrder(shop, String(params.id || ""));
      return redirect("/app/orders", 303);

    default:
      return json(
        { error: "", shop, mockup: null, type: null },
        { status: 400 },
      );
  }
}
