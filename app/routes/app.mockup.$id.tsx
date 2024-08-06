import { Badge, BlockStack, Layout, Page } from "@shopify/polaris";
import { Footer } from "~/components/layout/Footer";
import { DeleteIcon, ProductAddIcon } from "@shopify/polaris-icons";
import { MockupImageCard } from "~/components/mockups/MockupImageCard";
import { Colors } from "~/components/mockups/Colors";
import { MockupImage } from "~/components/mockups/MockupImage";
import { Dimensions } from "~/components/mockups/Dimensions";
import { MockupDetail } from "~/components/mockups/MockupDetail";
import { WholeSale } from "~/components/mockups/WholeSale";
import { mockup_dummy } from "~/lib/data/mockups";
import { Await, json, useLoaderData } from "@remix-run/react";
import { authenticate } from "~/shopify.server";
import { LoaderFunctionArgs } from "@remix-run/node";
import { Suspense } from "react";
import { LoadingSkeleton } from "~/components/skeleton";
import { MockupProps } from "~/lib/types/mockups";

export async function loader({ request }: LoaderFunctionArgs) {
  const admin = await authenticate.admin(request);
  // Introduce a delay
  await new Promise((resolve) => setTimeout(resolve, 10000)); // 2 second delay

  const mockups = mockup_dummy;
  return json({
    shop: admin.session.shop,
    mockups,
  });
}

export default function MockupPage() {
  const data = useLoaderData<typeof loader>();

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
                },
                {
                  content: "Create Product",
                  disabled: mockup.product_id !== "",
                  icon: ProductAddIcon,
                },
              ]}
            >
              <Layout>
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
