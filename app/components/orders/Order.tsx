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
import { LineItemProps, OrderProps } from "~/lib/types/orders";

export const Order = ({ order }: { order: OrderProps }) => {
  return (
    <Card padding="400">
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
            items={order.line_items}
            renderItem={renderLineItem}
          />
        </Box>
      </BlockStack>
    </Card>
  );
};

const renderLineItem = (item: LineItemProps) => {
  const { id, url, quantity, img, title, variants, cost, price, sku } = item;
  const media = <Thumbnail source={img || ""} alt={sku} />;
  const vars = variants.map((v) => v).join(" / ");

  return (
    <ResourceItem
      id={id}
      url={url}
      media={media}
      accessibilityLabel={`View details for ${title}`}
    >
      <InlineGrid columns={["twoThirds", "oneThird", "oneThird", "oneThird"]}>
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
};
