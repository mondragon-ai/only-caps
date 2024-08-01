import { BlockStack, Layout, Page } from "@shopify/polaris";
import { Footer } from "~/components/layout/Footer";
import { ProductAddIcon } from "@shopify/polaris-icons";
import { MockupProps, MockupTypes } from "~/lib/types/mockups";
import { useState } from "react";
import { MockupInfo } from "~/components/mockups/MockupInfo";
import { useLocation } from "@remix-run/react";
import { GenoratorMockupImageCard } from "~/components/generator/GenoratorMockupImageCard";
import { GeneratorColors } from "~/components/generator/GeneratorColors";
import { GeneratorMockupImage } from "~/components/generator/GeneratorMockupImage";
import { GeneratorDimensions } from "~/components/generator/GeneratorDimensions";
import { GeneratorMockupDetail } from "~/components/generator/GeneratorMockupDetail";
import { mockup_init_state } from "~/lib/data/mockups";

export default function GeneratorPage() {
  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const slug = pathSegments[pathSegments.length - 1];
  const [mockup, setMockup] = useState<MockupProps>({
    ...mockup_init_state,
    type: slug as MockupTypes,
  });

  return (
    <Page
      backAction={{ content: "Order", url: "/app/catalog" }}
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
            <GenoratorMockupImageCard mockup={mockup} setMockup={setMockup} />
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
