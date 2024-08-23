import { Badge, Banner, BlockStack, Layout, Page } from "@shopify/polaris";
import { MockupImageCard } from "~/components/mockups/MockupImageCard";
import { mockupAction, mockupLoader } from "./models/mockups.server";
import { DeleteIcon, ProductAddIcon } from "@shopify/polaris-icons";
import { Suspense, useCallback, useEffect, useState } from "react";
import { Address, WholeSale } from "~/components/mockups/WholeSale";
import { ErrorStateProps, ResponseProp } from "~/lib/types/shared";
import { MockupDetail } from "~/components/mockups/MockupDetail";
import { MockupImage } from "~/components/mockups/MockupImage";
import { Dimensions } from "~/components/mockups/Dimensions";
import { formatDateLong } from "~/lib/formatters/numbers";
import { useAppBridge } from "@shopify/app-bridge-react";
import { LoadingSkeleton } from "~/components/skeleton";
import { Colors } from "~/components/mockups/Colors";
import { MockupDocument } from "~/lib/types/mockups";
import { Footer } from "~/components/layout/Footer";
import {
  Await,
  FetcherWithComponents,
  useFetcher,
  useLoaderData,
  useNavigate,
} from "@remix-run/react";
import {
  createProductMockupCallback,
  deleteMockupCallback,
  purchaseWholesaleCallback,
} from "~/services/mockups";

export const loader = mockupLoader;
export const action = mockupAction;

export type FetcherProp = FetcherWithComponents<ResponseProp>;

type FormProps = {
  color: string;
  address: any;
  email: string;
};

export default function MockupPage() {
  const shopify = useAppBridge();
  const data = useLoaderData<typeof loader>();
  const fetcher = useFetcher<typeof action>() as FetcherProp;
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [complete, setComplete] = useState<boolean>(false);
  const [error, setError] = useState<ErrorStateProps>(null);
  const [image, setImage] = useState<string>("");

  const isLoading =
    ["loading", "submitting"].includes(fetcher.state) &&
    fetcher.formMethod === "POST";

  const handleDelete = useCallback(async () => {
    await deleteMockupCallback(data as any, fetcher, setLoading, setError);
  }, [data, fetcher, navigate, setLoading, setError]);

  const handleCreateProduct = useCallback(async () => {
    await createProductMockupCallback(
      data as any,
      fetcher,
      setLoading,
      setError,
    );
  }, [data, fetcher, navigate, setLoading, setError]);

  const { address, customer } = data;
  const handleWholesale = useCallback(
    async (quantity: number, form: FormProps) => {
      const mockup = data.mockups.mockups[0];
      const payload = {
        form,
        quantity,
        product_id: `${mockup ? mockup.product_id : ""}`,
      };
      purchaseWholesaleCallback(payload, fetcher, setLoading, setError);
    },
    [data, fetcher, navigate, setLoading, setError],
  );

  const response = fetcher.data;
  useEffect(() => {
    if (response) {
      handleMockupResponse(
        response,
        shopify,
        setError,
        setLoading,
        setComplete,
        loading,
        navigate,
      );
    }
  }, [shopify, response, data]);

  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <Await resolve={data}>
        {(loadedData) => {
          const mockups = loadedData.mockups.mockups as MockupDocument[];
          const mockup =
            mockups && mockups[0] ? mockups[0] : ({} as MockupDocument);
          return (
            <Page
              titleMetadata={
                mockup.product_id !== "" || complete ? (
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
              title={`${String(mockup.title)}`}
              subtitle={formatDateLong(mockup.state)}
              secondaryActions={[
                {
                  content: "Delete Mockup",
                  icon: DeleteIcon,
                  disabled: isLoading || loading,
                  loading: isLoading || loading,
                  destructive: true,
                  onAction: handleDelete,
                },
                {
                  content: "Create Product",
                  icon: ProductAddIcon,
                  onAction: handleCreateProduct,
                  disabled:
                    mockup.product_id !== "" ||
                    complete ||
                    isLoading ||
                    loading,
                  loading: isLoading || loading,
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
                    <MockupImageCard mockup={mockup} image={image} />
                    <WholeSale
                      isLoading={isLoading}
                      mockup={mockup}
                      handleWholesale={handleWholesale}
                      address={address as any}
                      customer={customer}
                    />
                  </BlockStack>
                </Layout.Section>

                <Layout.Section variant="oneThird">
                  <BlockStack gap={"500"}>
                    <Colors mockup={mockup} setImage={setImage} image={image} />
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
 * Handle the response from the mockup API.
 * @param {ResponseProp} response - The response from the API.
 * @param {any} shopify - The Shopify app bridge instance.
 * @param {Function} setError - The function to set the error state.
 * @param {Function} setLoading - The function to set the loading state.
 * @param {Function} setComplete - The function to set the completion state.
 * @param {boolean} loading - The current loading state.
 * @param {Function} navigate - The function to navigate between routes.
 */
function handleMockupResponse(
  response: ResponseProp,
  shopify: any,
  setError: Function,
  setLoading: Function,
  setComplete: Function,
  loading: boolean,
  navigate: Function,
) {
  if (response.error) {
    setError({
      title:
        response.type === "DELETE"
          ? "Deleting Mockup"
          : response.type === "CREATE"
            ? "Creating Product"
            : response.type === "WHOLESALE"
              ? "Purchasing Wholesale"
              : "Unknown Error",
      message: response.error || "",
      type: "critical",
    });
  } else {
    shopify.toast.show(
      response.type === "CREATE"
        ? "Product Created"
        : response.type === "WHOLESALE"
          ? "Wholesale Purchased"
          : "Mockup Deleted",
    );
    setComplete(true);

    if (response.type === "CREATE" && loading) {
      navigate(".", { replace: true });
    }
  }
  setLoading(false);
}
