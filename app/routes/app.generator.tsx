import { BlockStack, Layout, Page } from "@shopify/polaris";
import { Footer } from "~/components/layout/Footer";
import { ProductAddIcon } from "@shopify/polaris-icons";
import { GenoratorMockupImageCard } from "~/components/mockups/MockupImageCard";
import { MockupProps, MockupTypes } from "~/lib/types/mockups";
import { GeneratorColors } from "~/components/mockups/Colors";
import { GeneratorMockupImage } from "~/components/mockups/MockupImage";
import { GeneratorDimensions } from "~/components/mockups/Dimensions";
import { GeneratorMockupDetail } from "~/components/mockups/MockupDetail";
import { useState } from "react";
import { MockupInfo } from "~/components/mockups/MockupInfo";

const mockup_dummy = {
  id: "",
  image:
    "https://cdn.shopify.com/s/files/1/0783/4802/6165/files/RetroTruckerCap.webp?v=1722090003",
  type: "foam_trucker" as MockupTypes,
  status: "created",
  cost: 0,
  created: new Date().toLocaleString(),
  name: "",
  colors: [],
  design: "",
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
  design_dimensions: {
    height: 0,
    width: 0,
  },
  resized_design: "",
  resized_dimensions: {
    height: 0,
    width: 0,
  },
} as MockupProps;

export default function GeneratorPage() {
  const [mockup, setMockup] = useState<MockupProps>(mockup_dummy);

  return (
    <Page
      backAction={{ content: "Order", url: "/app/mockups" }}
      title={`${String(mockup.name !== "" ? mockup.name : "Create Name")}`}
      subtitle={"Deisgn and Generate Your Mockup"}
      primaryAction={{
        content: "Create Mockup",
        disabled: mockup.product_id !== "",
        icon: ProductAddIcon,
      }}
    >
      <Layout>
        <Layout.Section>
          <BlockStack gap={"500"}>
            <GenoratorMockupImageCard mockup={mockup} />
            <MockupInfo mockup={mockup} />
          </BlockStack>
        </Layout.Section>

        <Layout.Section variant="oneThird">
          <BlockStack gap={"500"}>
            <GeneratorColors mockup={mockup} setMockup={setMockup} />
            <GeneratorMockupImage mockup={mockup} setMockup={setMockup} />
            <GeneratorDimensions mockup={mockup} setMockup={setMockup} />
            <GeneratorMockupDetail mockup={mockup} setMockup={setMockup} />
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
