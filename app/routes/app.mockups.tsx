import { Box, Layout, Page, EmptyState } from "@shopify/polaris";
import { Footer } from "~/components/layout/Footer";
import { MockupList } from "~/components/mockups/MockupList";
import { mockup_list } from "~/lib/data/mockups";

export default function MockupsPage() {
  return (
    <Page title="Your Mockups" subtitle="Mockups Generated With OnlyCaps">
      <Layout>
        {mockup_list && mockup_list.length > 0 ? (
          <Layout.Section>
            <MockupList mockups={mockup_list} />
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
