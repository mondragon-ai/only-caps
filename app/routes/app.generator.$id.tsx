import { Banner, BlockStack, Layout, Page } from "@shopify/polaris";
import { Footer } from "~/components/layout/Footer";
import { ProductAddIcon } from "@shopify/polaris-icons";
import {
  GeneratorStateProps,
  MockupProps,
  MockupTypes,
} from "~/lib/types/mockups";
import { useCallback, useEffect, useState } from "react";
import { MockupInfo } from "~/components/mockups/MockupInfo";
import {
  useFetcher,
  useLoaderData,
  useLocation,
  useNavigate,
} from "@remix-run/react";
import { GeneratorMockupImageCard } from "~/components/generator/GenoratorMockupImageCard";
import { GeneratorColors } from "~/components/generator/GeneratorColors";
import { GeneratorMockupImage } from "~/components/generator/GeneratorMockupImage";
import { GeneratorDimensions } from "~/components/generator/GeneratorDimensions";
import { GeneratorMockupDetail } from "~/components/generator/GeneratorMockupDetail";
import { mockup_dummy } from "~/lib/data/mockups";
import { ActionFunctionArgs, json, LoaderFunctionArgs } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import { useAppBridge } from "@shopify/app-bridge-react";
import { uploadToServer } from "~/lib/util/images";

/**
 * Generates a random string with a specified length.
 *
 * @param {number} length - The length of the string to generate.
 * @returns {string} The generated random string.
 */
function generateRandomString(length: number): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomString = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return "POD-" + randomString.toLocaleUpperCase();
}

/**
 * Loader function to authenticate and fetch the shop data.
 *
 * @param {LoaderFunctionArgs} args - The loader function arguments.
 * @returns {Promise<Response>} The shop data.
 */
export async function loader({ request }: LoaderFunctionArgs) {
  const admin = await authenticate.admin(request);

  return json({
    shop: admin.session.shop,
  });
}

export default function GeneratorPage() {
  const fetcher = useFetcher<typeof action>();
  const data = useLoaderData<typeof loader>();
  const shopify = useAppBridge();

  const navigate = useNavigate();
  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const slug = pathSegments[pathSegments.length - 1];

  const [error, setError] = useState<{
    title: string;
    message: string;
    type: "critical" | "warning";
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
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

  const mockup_response = fetcher.data;

  useEffect(() => {
    if (data) {
      setMockup((prev) => ({ ...prev, domain: data.shop }));
    }
    if (mockup_response) {
      if (mockup_response?.error) {
        setError({
          title: "Generating Mockup",
          message: mockup_response.error,
          type: "critical",
        });
        setLoading(false);
      } else {
        shopify.toast.show("Mockup Created");
        setLoading(false);
        navigate(`/app/mockup/${mockup_response.mockup?.id}`);
      }
    }
  }, [shopify, mockup_response, data]);

  const handleSubmit = useCallback(async () => {
    setLoading(true);
    if (mockup.name === "" || mockup.name.length < 4) {
      setError({
        title: "Mockup Title",
        message: "Please add a title or make it greater than 3 characters",
        type: "warning",
      });
      setLoading(false);
      return;
    }
    if (!mockup.design || mockup.design === "") {
      setError({
        title: "Mockup Design",
        message: "Please upload a design image.",
        type: "warning",
      });
      setLoading(false);
      return;
    }
    if (!mockup.colors || mockup.colors.length === 0) {
      setError({
        title: "Mockup Colors",
        message: "Please select at least one color for the mockup.",
        type: "warning",
      });
      setLoading(false);
      return;
    }

    try {
      const design_url = await uploadToServer(
        mockup.original_file,
        setMockup,
        mockup,
      );
      const formData = new FormData();
      formData.append(
        "mockup",
        JSON.stringify({ ...mockup, design: design_url }),
      );

      fetcher.submit(formData, { method: "POST" });
      setLoading(false);
    } catch (error) {
      console.error("Error uploading design:", error);
      setLoading(false);
    }
  }, [mockup, fetcher]);

  return (
    <Page
      backAction={{ content: "Order", url: "/app/catalog" }}
      title={mockup.name !== "" ? mockup.name : "Create Name"}
      subtitle={"Design and Generate Your Mockup"}
      primaryAction={{
        content: "Create Mockup",
        disabled: !!mockup.product_id,
        icon: ProductAddIcon,
        loading: isLoading || loading,
        onAction: handleSubmit,
      }}
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
          <BlockStack gap="500">
            <GeneratorMockupImageCard mockup={mockup} setMockup={setMockup} />
            <MockupInfo mockup={mockup} />
          </BlockStack>
        </Layout.Section>

        <Layout.Section variant="oneThird">
          <BlockStack gap="500">
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

  // create pyalod
  const payload = mockup ? (JSON.parse(String(mockup)) as MockupProps) : null;

  try {
    // const response = await fetch('YOUR_API_ENDPOINT', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(payload),
    // });

    if (payload) {
      const data = payload;
      return json({ shop, mockup: data, error: null });
    } else {
      return json(
        {
          shop,
          mockup: null,
          error: `Error: ${"Likley due to incompatable image format. Try again soon."}`,
        },
        { status: 400 },
      );
    }
  } catch (error) {
    return json(
      { shop, mockup: null, error: `Server Error: Try again in a minute.` },
      { status: 500 },
    );
  }
}
