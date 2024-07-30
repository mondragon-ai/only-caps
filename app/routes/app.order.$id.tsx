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
import { Order } from "~/components/orders/Order";
import { Price } from "~/components/orders/Price";
import { Customer } from "~/components/orders/Customer";

const line_items = [
  {
    id: "100",
    url: "#",
    title: "Hawk Tuah",
    sku: "POD-IUHE-BLK-BLK",
    variants: ["Black", "Black"],
    img: "https://cdn.shopify.com/s/files/1/0783/4802/6165/files/MidStructuredPolyesterCap.webp?v=1722090003",
    price: 60,
    cost: 30.5,
    quantity: 1,
  },
  {
    id: "102",
    url: "#",
    title: "Falcon Wing",
    sku: "POD-FW-RED-BLK",
    variants: ["Red", "Black"],
    img: "https://cdn.shopify.com/s/files/1/0783/4802/6165/files/MidStructuredPolyesterCap.webp?v=1722090003",
    price: 70,
    cost: 35.0,
    quantity: 2,
  },
  {
    id: "103",
    url: "#",
    title: "Raven Shadow",
    sku: "POD-RS-BLK-GRY",
    variants: ["Black", "Gray"],

    img: "https://cdn.shopify.com/s/files/1/0783/4802/6165/files/MidStructuredPolyesterCap.webp?v=1722090003",
    price: 75,
    cost: 37.5,
    quantity: 3,
  },
  {
    id: "104",
    url: "#",
    title: "Owl Night",
    sku: "POD-ON-NVY-BLK",
    variants: ["Navy", "Black"],

    img: "https://cdn.shopify.com/s/files/1/0783/4802/6165/files/MidStructuredPolyesterCap.webp?v=1722090003",
    price: 80,
    cost: 40.0,
    quantity: 1,
  },
  {
    id: "105",
    url: "#",
    title: "Phoenix Flame",
    sku: "POD-PF-ORG-YLW",
    variants: ["Orange", "Yellow"],

    img: "https://cdn.shopify.com/s/files/1/0783/4802/6165/files/MidStructuredPolyesterCap.webp?v=1722090003",
    price: 85,
    cost: 42.5,
    quantity: 2,
  },
];

const order = {
  id: "1005",
  order_name: 1005,
  name: "Bob Brown",
  status: "completed",
  total: 45,
  delivery: "2024-07-31",
  date: new Date().toLocaleDateString(),
  line_items: line_items,
  shipping: 5.99,
  customer: {
    id: 0,
    name: "Collin Sander",
    first_name: "Collin",
    last_name: "Sander",
    address: {
      line1: "420 Bigly",
      city: "Fay",
      state: "AR",
      country: "USA",
      zip: "72704",
    },
    email: "Colling@gobigly.com",
  },
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
          <BlockStack gap={"500"}>
            <Order />
            <Price order={order} />
          </BlockStack>
        </Layout.Section>

        <Layout.Section variant="oneThird">
          <Customer order={order} />
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
