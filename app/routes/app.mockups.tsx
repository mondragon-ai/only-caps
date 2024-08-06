import { json, LoaderFunctionArgs } from "@remix-run/node";
import { Await, useLoaderData } from "@remix-run/react";
import { Box, Layout, Page, EmptyState } from "@shopify/polaris";
import { Suspense } from "react";
import { Footer } from "~/components/layout/Footer";
import { MockupList } from "~/components/mockups/MockupList";
import { LoadingSkeleton } from "~/components/skeleton";
import { mockup_init_state } from "~/lib/data/mockups";
import { MockupProps } from "~/lib/types/mockups";
import { authenticate } from "~/shopify.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const admin = await authenticate.admin(request);
  const mockups = mockup_init_state as MockupProps[];

  return json({
    shop: admin.session.shop,
    mockups,
  });
}

export default function MockupsPage() {
  const data = useLoaderData<typeof loader>();
  return (
    <Page title="Your Mockups" subtitle="Mockups Generated With OnlyCaps">
      <Suspense fallback={<LoadingSkeleton />}>
        <Await resolve={data}>
          {(loadedData) => {
            return (
              <Layout>
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
