import {
  Avatar,
  Badge,
  BlockStack,
  Box,
  Card,
  InlineGrid,
  ResourceItem,
  ResourceList,
  Text,
  Thumbnail,
} from "@shopify/polaris";
import styles from "./Orders.module.css";
import { OrderFulfilledIcon, ShippingLabelIcon } from "@shopify/polaris-icons";
import { formatToMoney } from "~/lib/formatters/numbers";

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

export const Order = () => {
  return (
    <Card padding={"400"}>
      <BlockStack gap="300">
        <div className={styles.orderBadges}>
          <div style={{ marginRight: "0.5rem" }}>
            <Badge tone={"success"} icon={OrderFulfilledIcon}>
              Fulilled
            </Badge>
          </div>
          <Badge tone={"success"} icon={ShippingLabelIcon}>
            Delivered
          </Badge>
        </div>
        <Text as="h4" variant="headingMd">
          Order
        </Text>
        <Text as="p" variant="bodyMd">
          Shipping Profile
          <Text as="p" variant="bodyMd" tone="disabled">
            No Tracking
          </Text>
        </Text>

        <Box borderColor="border" borderWidth="025" borderRadius="100">
          <ResourceList
            resourceName={{ singular: "Line Item", plural: "Line Items" }}
            items={line_items}
            renderItem={(item) => {
              const {
                id,
                url,
                quantity,
                img,
                title,
                variants,
                cost,
                price,
                sku,
              } = item;
              const media = <Thumbnail source={img || ""} alt={sku} />;
              const vars = variants.map((v) => v).join(" / ");

              return (
                <ResourceItem
                  id={id}
                  url={url}
                  media={media}
                  accessibilityLabel={`View details for ${title}`}
                >
                  <InlineGrid
                    columns={["twoThirds", "oneThird", "oneThird", "oneThird"]}
                  >
                    <div>
                      <Text variant="bodyMd" fontWeight="bold" as="h3">
                        {title}
                      </Text>
                      <Text variant="bodySm" as="h4" tone="subdued">
                        {vars}
                      </Text>
                      <Text variant="bodySm" as="h4" tone="subdued">
                        {sku}
                      </Text>
                    </div>
                    <div>
                      <Text variant="bodyMd" fontWeight="bold" as="h3">
                        {`$${formatToMoney(cost)}`}
                      </Text>
                    </div>
                    <div>
                      <Text variant="bodyMd" fontWeight="bold" as="h3">
                        {`x ${quantity}`}
                      </Text>
                    </div>
                    <div>
                      <Text variant="bodyMd" fontWeight="bold" as="h3">
                        {`$${formatToMoney(price)}`}
                      </Text>
                    </div>
                  </InlineGrid>
                </ResourceItem>
              );
            }}
          />
        </Box>
      </BlockStack>
    </Card>
  );
};
