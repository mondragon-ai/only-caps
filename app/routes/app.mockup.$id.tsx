import { Badge, BlockStack, Layout, Page } from "@shopify/polaris";
import { Footer } from "~/components/layout/Footer";
import { DeleteIcon, ProductAddIcon } from "@shopify/polaris-icons";
import { MockupImageCard } from "~/components/mockups/MockupImageCard";
import { MockupProps, MockupTypes } from "~/lib/types/mockups";
import { Colors } from "~/components/mockups/Colors";
import { MockupImage } from "~/components/mockups/MockupImage";
import { Dimensions } from "~/components/mockups/Dimensions";
import { MockupDetail } from "~/components/mockups/MockupDetail";
import { WholeSale } from "~/components/mockups/WholeSale";

const mockup = {
  id: "1",
  image:
    "https://cdn.shopify.com/s/files/1/0783/4802/6165/files/RetroTruckerCap.webp?v=1722090003",
  type: "trucker" as MockupTypes,
  status: "created",
  cost: 0,
  created: new Date().toLocaleString(),
  name: "Hawk Tuah",
  colors: ["red", "green", "black"],
  design:
    "https://cdn.shopify.com/app-store/listing_images/58928b5d71d8f97ebd905e289c151269/icon/CKqbxsDgrP8CEAE=.png",
  location: {
    top: 0,
    left: 0,
  },
  size: {
    width: 0,
    height: 0,
  },
  SKU: "POD-TRCK-",
  product_id: "",
  mockups: [""],
} as MockupProps;

export default function MockupPage() {
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
}
