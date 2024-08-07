import { BlockStack, Layout, Page } from "@shopify/polaris";
import { Footer } from "~/components/layout/Footer";
import { DeleteIcon, ProductAddIcon } from "@shopify/polaris-icons";
import { Order } from "~/components/orders/Order";
import { Price } from "~/components/orders/Price";
import { Customer } from "~/components/orders/Customer";
import { OrderDetail } from "~/components/orders/OrderDetail";
import { mock_order } from "~/lib/data/orders";
import { ActionFunctionArgs, json, LoaderFunctionArgs } from "@remix-run/node";
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

  const handleDelete = useCallback(async () => {
    setLoading(true);

    if (!data.id) {
      setError({
        title: "Mockup does not exist",
        message: "The mockup may have already been deleted.",
        type: "critical",
      });
      setLoading(false);
      navigate("/app/mockups");
      return;
    }

    try {
      if (data) {
        const formData = new FormData();
        formData.append(
          "mockup",
          JSON.stringify({ id: data.id, domain: data.shop }),
        );
        formData.append("action", "delete");
        fetcher.submit(formData, { method: "POST" });
        setLoading(false);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error deleting mockups:", error);
      setLoading(false);
    }
  }, [data, fetcher]);

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

    default:
      return json({ error: "" }, { status: 400 });
  }
}
