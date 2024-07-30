import { Box, Layout, Page, EmptyState } from "@shopify/polaris";
import { Footer } from "~/components/layout/Footer";
import { MockupList } from "~/components/mockups/MockupList";
import { OrderList } from "~/components/orders/OrderList";

const mockups: any[] = [
  {
    id: "1",
    image:
      "https://cdn.shopify.com/s/files/1/0783/4802/6165/files/RetroTruckerCap.webp?v=1722090003",
    type: "trucker",
    status: "created",
    cost: 0,
    created: new Date().toLocaleString(),
    name: "Hawk Tuah",
    colors: ["red", "green", "black"],
    design: "",
    location: {
      top: 0,
      left: 0,
    },
    size: {
      width: 0,
      height: 0,
    },
    SKU: "",
    product_id: "",
    mockups: [""],
  },
];

export default function MockupsPage() {
  return (
    <Page title="Your Mockups" subtitle="Mockups Generated With OnlyCaps">
      <Layout>
        {mockups && mockups.length > 0 ? (
          <Layout.Section>
            <MockupList mockups={mockups} />
          </Layout.Section>
        ) : (
          <Layout.Section>
            <EmptyState
              heading="No Mockups Found"
              action={{
                content: "Generate Mockup",
                url: "#",
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
