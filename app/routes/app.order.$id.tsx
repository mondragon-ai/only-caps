import {
  BlockStack,
  Card,
  Layout,
  Link,
  List,
  Page,
  Text,
} from "@shopify/polaris";
import { Footer } from "~/components/layout/Footer";
import { DeleteIcon, ProductAddIcon } from "@shopify/polaris-icons";

const order = {
  id: "1005",
  order_name: 1005,
  name: "Bob Brown",
  status: "completed",
  total: 45,
  delivery: "2024-07-31",
  date: new Date().toLocaleDateString(),
};

export default function OrdersPage() {
  return (
    <Page
      title={`#${String(order.order_name)}`}
      subtitle={order.date}
      secondaryActions={[
        {
          content: "Delete Mockup",
          disabled: false,
          icon: DeleteIcon,
          destructive: true,
        },
        { content: "Create Product", disabled: false, icon: ProductAddIcon },
      ]}
    >
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="300">
              <Text as="p" variant="bodyMd">
                The app template comes with an additional page which
                demonstrates how to create multiple pages within app navigation
                using{" "}
                <Link
                  url="https://shopify.dev/docs/apps/tools/app-bridge"
                  target="_blank"
                  removeUnderline
                >
                  App Bridge
                </Link>
                .
              </Text>
              <Text as="p" variant="bodyMd">
                To create your own page and have it show up in the app
                navigation, add a page inside.
              </Text>
            </BlockStack>
          </Card>
        </Layout.Section>

        <Layout.Section variant="oneThird">
          <Card>
            <BlockStack gap="200">
              <Text as="h2" variant="headingMd">
                Resources
              </Text>
              <List>
                <List.Item>
                  <Link
                    url="https://shopify.dev/docs/apps/design-guidelines/navigation#app-nav"
                    target="_blank"
                    removeUnderline
                  >
                    App nav best practices
                  </Link>
                </List.Item>
              </List>
            </BlockStack>
          </Card>
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
