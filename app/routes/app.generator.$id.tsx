import { BlockStack, Layout, Page } from "@shopify/polaris";
import { Footer } from "~/components/layout/Footer";
import { ProductAddIcon } from "@shopify/polaris-icons";
import { GeneratorStateProps, MockupTypes } from "~/lib/types/mockups";
import { useCallback, useEffect, useState } from "react";
import { MockupInfo } from "~/components/mockups/MockupInfo";
import { useFetcher, useLoaderData, useLocation } from "@remix-run/react";
import { GenoratorMockupImageCard } from "~/components/generator/GenoratorMockupImageCard";
import { GeneratorColors } from "~/components/generator/GeneratorColors";
import { GeneratorMockupImage } from "~/components/generator/GeneratorMockupImage";
import { GeneratorDimensions } from "~/components/generator/GeneratorDimensions";
import { GeneratorMockupDetail } from "~/components/generator/GeneratorMockupDetail";
import { mockup_dummy } from "~/lib/data/mockups";
import { ActionFunction, json, LoaderFunctionArgs } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import { useAppBridge } from "@shopify/app-bridge-react";
import { uploadToServer } from "~/lib/util/images";

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

export async function loader({ request }: LoaderFunctionArgs) {
  const admin = await authenticate.admin(request);

  // Return deferred data
  return json({
    shop: admin.session.shop,
  });
}

export default function GeneratorPage() {
  const fetcher = useFetcher<typeof action>();
  const data = useLoaderData<typeof loader>();
  const shopify = useAppBridge();

  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const slug = pathSegments[pathSegments.length - 1];

  const [mockup, setMockup] = useState<GeneratorStateProps>({
    ...mockup_dummy,
    base_sku: generateRandomString(5),
    type: slug as MockupTypes,
    original_file: null,
    progress: 0,
  });

  const isLoading =
    ["loading", "submitting"].includes(fetcher.state) &&
    fetcher.formMethod === "POST";

  const shop = fetcher.data;

  useEffect(() => {
    if (data) {
      setMockup((prev) => ({ ...prev, shop_name: data.shop }));
    }
    if (shop) {
      shopify.toast.show("Mockup Created");
      console.log(shop);
      console.log(data.shop);
    }
  }, [shopify, shop, data]);

  const handleSubmit = useCallback(async () => {
    await uploadToServer(mockup.original_file, setMockup, mockup);

    const formData = new FormData();
    formData.append("mockup", JSON.stringify(mockup));

    fetcher.submit(formData, { method: "POST" });
  }, [mockup, data]);

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
