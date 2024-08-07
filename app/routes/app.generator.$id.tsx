import { BlockStack, Layout, Page } from "@shopify/polaris";
import { Footer } from "~/components/layout/Footer";
import { ProductAddIcon } from "@shopify/polaris-icons";
import { MockupProps, MockupTypes } from "~/lib/types/mockups";
import { act, useCallback, useEffect, useState } from "react";
import { MockupInfo } from "~/components/mockups/MockupInfo";
import { useFetcher, useLocation } from "@remix-run/react";
import { GenoratorMockupImageCard } from "~/components/generator/GenoratorMockupImageCard";
import { GeneratorColors } from "~/components/generator/GeneratorColors";
import { GeneratorMockupImage } from "~/components/generator/GeneratorMockupImage";
import { GeneratorDimensions } from "~/components/generator/GeneratorDimensions";
import { GeneratorMockupDetail } from "~/components/generator/GeneratorMockupDetail";
import { mockup_dummy } from "~/lib/data/mockups";
import { ActionFunction, json } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import { useAppBridge } from "@shopify/app-bridge-react";

function generateRandomString(length: number) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomString = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return "POD-" + randomString.toLocaleUpperCase();
}

export default function GeneratorPage() {
  const fetcher = useFetcher<typeof action>();
  const shopify = useAppBridge();

  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const slug = pathSegments[pathSegments.length - 1];
  const [mockup, setMockup] = useState<MockupProps>({
    ...mockup_dummy,
    base_sku: generateRandomString(5),
    type: slug as MockupTypes,
  });

  const isLoading =
    ["loading", "submitting"].includes(fetcher.state) &&
    fetcher.formMethod === "POST";

  const shop = fetcher.data;

  useEffect(() => {
    if (shop) {
      shopify.toast.show("Mockup Created");
      console.log(shop);
    }
  }, [shopify, shop]);

  const handleSubmit = useCallback(() => {
    const formData = new FormData();
    formData.append("mockup", JSON.stringify(mockup));

    fetcher.submit(formData, { method: "POST" });
  }, [mockup]);

  return (
    <Page
      backAction={{ content: "Order", url: "/app/catalog" }}
      title={`${String(mockup.name !== "" ? mockup.name : "Create Name")}`}
      subtitle={"Deisgn and Generate Your Mockup"}
      primaryAction={{
        content: "Create Mockup",
        disabled: mockup.product_id !== "",
        icon: ProductAddIcon,
        loading: isLoading,
        onAction: handleSubmit,
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

export let action: ActionFunction = async ({ request, params }) => {
  const { session } = await authenticate.admin(request);
  const { shop } = session;

  // Parsing the mockup data from the formData
  const formData = await request.formData();
  const mockup = formData.get("mockup");

  return json({ shop, mockup: mockup ? JSON.parse(String(mockup)) : null });
};
