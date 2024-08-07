import { ActionFunctionArgs, json, LoaderFunctionArgs } from "@remix-run/node";
import {
  Await,
  useFetcher,
  useLoaderData,
  useNavigate,
} from "@remix-run/react";
import { Box, Layout, Page, EmptyState, Banner } from "@shopify/polaris";
import { Suspense, useCallback, useEffect, useState } from "react";
import { Footer } from "~/components/layout/Footer";
import { MockupList } from "~/components/mockups/MockupList";
import { LoadingSkeleton } from "~/components/skeleton";
import { mockup_init_state } from "~/lib/data/mockups";
import { MockupProps } from "~/lib/types/mockups";
import { authenticate } from "~/shopify.server";
import { createProduct, deleteMockup } from "./models/models.server";
import { useAppBridge } from "@shopify/app-bridge-react";

export async function loader({ request }: LoaderFunctionArgs) {
  const admin = await authenticate.admin(request);
  const mockups = mockup_init_state as MockupProps[];

  return json({
    shop: admin.session.shop,
    mockups,
  });
}

export default function MockupsPage() {
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
    <Page title="Your Mockups" subtitle="Mockups Generated With OnlyCaps">
      <Suspense fallback={<LoadingSkeleton />}>
        <Await resolve={data}>
          {(loadedData) => {
            return (
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
                {loadedData.mockups && loadedData.mockups.length > 0 ? (
                  <Layout.Section>
                    <MockupList mockups={loadedData.mockups as MockupProps[]} />
                  </Layout.Section>
                ) : (
                  <Layout.Section>
                    <EmptyState
                      heading="No Mockups Found"
                      action={{
                        content: "Generate Mockup",
                        url: "/app/catalog",
                      }}
                      image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
                    >
                      <p>Create a product and start making money now.</p>
                    </EmptyState>
                  </Layout.Section>
                )}
                <Layout.Section>
                  <Footer />
                </Layout.Section>
              </Layout>
            );
          }}
        </Await>
      </Suspense>
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
  const type = formData.get("action");

  // create pyalod
  const payload = mockup ? (JSON.parse(String(mockup)) as MockupProps) : null;

  let response;
  switch (type) {
    case "delete":
      response = await deleteMockup(shop, payload);
      console.log(response);
      return json({ shop, mockup: null, error: null });
    case "next":
      return json({ shop, mockup: null, error: null });
    case "prev":
      return json({ shop, mockup: null, error: null });

    default:
      return json({ error: "" }, { status: 400 });
  }
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <Box
      as="span"
      padding="025"
      paddingInlineStart="100"
      paddingInlineEnd="100"
      background="bg-surface-active"
      borderWidth="025"
      borderColor="border"
      borderRadius="100"
    >
      <code>{children}</code>
    </Box>
  );
}
