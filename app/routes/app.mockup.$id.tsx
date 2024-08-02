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
import { json, useLoaderData } from "@remix-run/react";
import { authenticate } from "~/shopify.server";
import { LoaderFunctionArgs } from "@remix-run/node";

export async function loader({ request }: LoaderFunctionArgs) {
  const admin = await authenticate.admin(request);
  return json({
    shop: admin.session.shop,
  });
}

export default function MockupPage() {
  const shop = useLoaderData<typeof loader>();

  console.log({ shop });

  return (
    <Page
      titleMetadata={
        mockup_dummy.product_id !== "" ? (
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
      title={`${String(mockup_dummy.name)}`}
      subtitle={mockup_dummy.created}
      secondaryActions={[
        {
          content: "Delete Mockup",
          disabled: false,
          icon: DeleteIcon,
          destructive: true,
        },
        {
          content: "Create Product",
          disabled: mockup_dummy.product_id !== "",
          icon: ProductAddIcon,
        },
      ]}
    >
      <Layout>
        <Layout.Section>
          <BlockStack gap={"500"}>
            <MockupImageCard mockup={mockup_dummy} />
            <WholeSale mockup={mockup_dummy} />
          </BlockStack>
        </Layout.Section>

        <Layout.Section variant="oneThird">
          <BlockStack gap={"500"}>
            <Colors mockup={mockup_dummy} />
            <MockupImage mockup={mockup_dummy} />
            <Dimensions mockup={mockup_dummy} />
            <MockupDetail mockup={mockup_dummy} />
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
