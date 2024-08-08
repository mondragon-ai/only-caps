import { Badge, Banner, BlockStack, Layout, Page } from "@shopify/polaris";
import { Footer } from "~/components/layout/Footer";
import { DeleteIcon, ProductAddIcon } from "@shopify/polaris-icons";
import { MockupImageCard } from "~/components/mockups/MockupImageCard";
import { Colors } from "~/components/mockups/Colors";
import { MockupImage } from "~/components/mockups/MockupImage";
import { Dimensions } from "~/components/mockups/Dimensions";
import { MockupDetail } from "~/components/mockups/MockupDetail";
import { Address, WholeSale } from "~/components/mockups/WholeSale";
import { mockup_dummy } from "~/lib/data/mockups";
import {
  Await,
  json,
  useFetcher,
  useLoaderData,
  useNavigate,
} from "@remix-run/react";
import { authenticate } from "~/shopify.server";
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { Suspense, useCallback, useEffect, useState } from "react";
import { LoadingSkeleton } from "~/components/skeleton";
import { MockupProps } from "~/lib/types/mockups";
import {
  createProduct,
  deleteMockup,
  purchaseWholesale,
} from "./models/mockups.server";
import { useAppBridge } from "@shopify/app-bridge-react";
import {
  createProductMockupCallback,
  deleteMockupCallback,
  purchaseWholesaleCallback,
} from "~/services/mockups";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const { session, admin } = await authenticate.admin(request);
  const id = params.id;
  console.log("START");

  const shopRespons = await admin.graphql(
    `query {
      shop {
        name
        currencyCode
        billingAddress {
          address1
          city
          provinceCode
          zip
        }
      }
    }`,
  );
  const responseJson = await shopRespons.json();
  console.log(responseJson.data);

  // Introduce a delay
  await new Promise((resolve) => setTimeout(resolve, 10000)); // 2 second delay

  const mockups = mockup_dummy;
  return json({
    shop: session.shop,
    mockups,
    id,
    address: responseJson.data?.shop.billingAddress,
  });
}

export default function MockupPage() {
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
    deleteMockupCallback(data as any, fetcher, setLoading, setError);
  }, [data, fetcher, navigate, setLoading, setError]);

  const handleCreateProduct = useCallback(async () => {
    createProductMockupCallback(data as any, fetcher, setLoading, setError);
  }, [data, fetcher, navigate, setLoading, setError]);

  const address = data.address;
  const handleWholesale = useCallback(
    async (quantity: number, address: Address, color: string) => {
      const payload = {
        address,
        quantity,
        color,
        mockup_id: data.id,
      };
      purchaseWholesaleCallback(payload, fetcher, setLoading, setError);
    },
    [data, fetcher, navigate, setLoading, setError],
  );

  const mockup_response = fetcher.data;

  useEffect(() => {
    if (mockup_response) {
      if (mockup_response?.error) {
        setError({
          title:
            mockup_response.type == "DELETE"
              ? "Deleting Mockup"
              : mockup_response.type == "CREATE"
                ? "Creating Product"
                : mockup_response.type == "WHOLESALE"
                  ? "Purchasing Wholesale"
                  : "Unknown Error",
          message: mockup_response.error,
          type: "critical",
        });
        setLoading(false);
      } else {
        shopify.toast.show(
          mockup_response.type == "PURCHASE"
            ? "Product Created"
            : mockup_response.type == "WHOLESALE"
              ? "Wholesale Purchased"
              : "Mockup Deleted",
        );
        setLoading(false);
      }
    }
  }, [shopify, mockup_response, data]);

  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <Await resolve={data}>
        {(loadedData) => {
          const mockup = loadedData.mockups as MockupProps;
          return (
            <Page
              titleMetadata={
                mockup.product_id !== "" ? (
                  <Badge progress="complete" tone="success">
                    Product Created
                  </Badge>
                ) : (
                  <Badge progress="incomplete" tone="critical">
                    Product Not Created
                  </Badge>
                )
              }
              backAction={{ content: "Order", url: "/app/mockups" }}
              title={`${String(mockup.name)}`}
              subtitle={mockup.created}
              secondaryActions={[
                {
                  content: "Delete Mockup",
                  icon: DeleteIcon,
                  destructive: true,
                  onAction: handleDelete,
                  loading: loading,
                },
                {
                  content: "Create Product",
                  disabled: mockup.product_id !== "",
                  icon: ProductAddIcon,
                  onAction: handleCreateProduct,
                  loading: loading,
                },
              ]}
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
                    <MockupImageCard mockup={mockup} />
                    <WholeSale
                      mockup={mockup}
                      handleWholesale={handleWholesale}
                      address={address}
                    />
                  </BlockStack>
                </Layout.Section>

                <Layout.Section variant="oneThird">
                  <BlockStack gap={"500"}>
                    <Colors mockup={mockup} />
                    <MockupImage mockup={mockup} />
                    <Dimensions mockup={mockup} />
                    <MockupDetail mockup={mockup} />
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
      response = await deleteMockup(shop, String(params.id || ""));
      return redirect("/app/mockups", 303);
    case "create":
      response = await createProduct(shop, payload);
      return json({ shop, mockup: null, error: null, type: "CREATE" });
    case "wholesale":
      response = await purchaseWholesale(shop, payload);
      return json({ shop, mockup: null, error: null, type: "WHOLESALE" });

    default:
      return json(
        { error: "", shop, mockup: null, type: null },
        { status: 400 },
      );
  }
}
