import { Badge, Banner, BlockStack, Layout, Page } from "@shopify/polaris";
import { Footer } from "~/components/layout/Footer";
import { DeleteIcon, ProductAddIcon } from "@shopify/polaris-icons";
import { MockupImageCard } from "~/components/mockups/MockupImageCard";
import { Colors } from "~/components/mockups/Colors";
import { MockupImage } from "~/components/mockups/MockupImage";
import { Dimensions } from "~/components/mockups/Dimensions";
import { MockupDetail } from "~/components/mockups/MockupDetail";
import { WholeSale } from "~/components/mockups/WholeSale";
import { mockup_dummy } from "~/lib/data/mockups";
import {
  Await,
  json,
  useFetcher,
  useLoaderData,
  useNavigate,
} from "@remix-run/react";
import { authenticate } from "~/shopify.server";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Suspense, useCallback, useEffect, useState } from "react";
import { LoadingSkeleton } from "~/components/skeleton";
import { MockupProps } from "~/lib/types/mockups";
import { createProduct, deleteMockup } from "./models/models.server";
import { useAppBridge } from "@shopify/app-bridge-react";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const admin = await authenticate.admin(request);
  const id = params.id;

  // Introduce a delay
  await new Promise((resolve) => setTimeout(resolve, 10000)); // 2 second delay

  const mockups = mockup_dummy;
  return json({
    shop: admin.session.shop,
    mockups,
    id,
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

  const handleCreateProduct = useCallback(async () => {
    setLoading(true);

    if (!data.id) {
      setError({
        title: "Mockup does not exist",
        message: "The mockup may have been deleted.",
        type: "critical",
      });
      setLoading(false);
      navigate("/app/mockups");
      return;
    }

    if (data.mockups.product_id && String(data.mockups.product_id) !== "") {
      setError({
        title: "Product already exist",
        message:
          "The mockup already has a corresponding product: " +
          String(data.mockups.product_id) +
          ".",
        type: "warning",
      });
      setLoading(false);
      return;
    }

    try {
      if (data) {
        const formData = new FormData();
        formData.append(
          "mockup",
          JSON.stringify({ id: data.id, domain: data.shop }),
        );
        formData.append("action", "create");
        fetcher.submit(formData, { method: "POST" });
        setLoading(false);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error creating product:", error);
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
                  disabled: false,
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
                    <WholeSale mockup={mockup} />
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
      response = await deleteMockup(shop, payload);
      console.log(response);
      return json({ shop, mockup: null, error: null });
    case "create":
      response = await createProduct(shop, payload);
      return json({ shop, mockup: null, error: null });

    default:
      return json({ error: "" }, { status: 400 });
  }
}
