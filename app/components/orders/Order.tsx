import {
  Badge,
  BlockStack,
  Box,
  Card,
  InlineGrid,
  Link,
  ResourceItem,
  ResourceList,
  Text,
  Thumbnail,
} from "@shopify/polaris";
import styles from "./Orders.module.css";
import { OrderFulfilledIcon, ShippingLabelIcon } from "@shopify/polaris-icons";
import { formatToMoney } from "~/lib/formatters/numbers";
import { LineItem, OrderDocument, PODLineItemsProps } from "~/lib/types/orders";
import { PRODUCT_PLACEHODLER } from "~/lib/contants";

export const Order = ({ order }: { order: OrderDocument }) => {
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
            {order.tracking_number ? (
              <Link url={order.tracking_number} target="_blank">
                {order.tracking_number}{" "}
              </Link>
            ) : (
              <Text as="p" variant="bodyMd" tone="disabled">
                No Tracking
              </Text>
            )}
          </Text>
        </Text>

        <Box borderColor="border" borderWidth="025" borderRadius="100">
          <ResourceList
            resourceName={{ singular: "Line Item", plural: "Line Items" }}
            items={order.merchant_order.line_items}
            renderItem={(items, id, i) =>
              renderLineItem(items, order.pod_line_items, i)
            }
          />
        </Box>
      </BlockStack>
    </Card>
  );
};

const renderLineItem = (
  item: LineItem,
  pod_li: PODLineItemsProps[],
  i: number,
) => {
  const j = Math.abs(i - (pod_li.length - 1));
  const { title, product_id, sku, variant_title, price, quantity } = item;
  const media = (
    <Thumbnail
      source={
        pod_li[j] && pod_li[j].image ? pod_li[j].image : PRODUCT_PLACEHODLER
      }
      alt={`${sku}`}
    />
  );
  // const vars = variants.map((v) => v).join(" / ");

  return (
    <ResourceItem
      id={String(product_id)}
      url={"#"}
      media={media}
      accessibilityLabel={`View details for ${title}`}
    >
      <InlineGrid columns={["twoThirds", "oneThird", "oneThird", "oneThird"]}>
        <div>
          <Text variant="bodyMd" fontWeight="bold" as="h3">
            {title}
          </Text>
          <Text variant="bodySm" as="h4" tone="subdued">
            {variant_title}
          </Text>
          <Text variant="bodySm" as="h4" tone="subdued">
            {sku}
          </Text>
        </div>
        <div>
          <Text variant="bodyMd" fontWeight="bold" as="h3">
            {`$${formatToMoney(Number(pod_li[j] && pod_li[j].cost))}`}
          </Text>
        </div>
        <div>
          <Text variant="bodyMd" fontWeight="bold" as="h3">
            {`x ${quantity}`}
          </Text>
        </div>
        <div>
          <Text variant="bodyMd" fontWeight="bold" as="h3">
            {`$${formatToMoney(Number(price))}`}
          </Text>
        </div>
      </InlineGrid>
    </ResourceItem>
  );
};
