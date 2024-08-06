import {
  Badge,
  BlockStack,
  Box,
  Card,
  InlineGrid,
  Text,
} from "@shopify/polaris";
import styles from "./Orders.module.css";
import { MoneyFilledIcon } from "@shopify/polaris-icons";
import { formatToMoney } from "~/lib/formatters/numbers";
import {
  LineItemProps,
  lineItemsShoppifyab,
  OrderDocument,
} from "~/lib/types/orders";

const calculateSubtotal = (lineItems: lineItemsShoppifyab[]) => {
  return lineItems.reduce((prev, li) => prev + Number(li.price), 0);
};

const renderPriceRow = (title: string, description: string, amount: number) => (
  <InlineGrid columns={["oneThird", "twoThirds", "oneThird"]}>
    <Text variant="bodyMd" fontWeight="bold" as="h3">
      {title}
    </Text>
    <Text variant="bodyMd" as="h3" tone="subdued">
      {description}
    </Text>
    <Text variant="bodyMd" as="h3" tone="subdued">
      {`$${formatToMoney(amount)}`}
    </Text>
  </InlineGrid>
);

export const Price = ({ order }: { order: OrderDocument }) => {
  const subtotal = calculateSubtotal(order.merchant_order.line_items);
  const total = subtotal + order.shipping_rate;

  return (
    <Card padding="400">
      <BlockStack gap="300">
        <div className={styles.orderBadges}>
          <div style={{ marginRight: "0.5rem" }}>
            <Badge tone={"success"} icon={MoneyFilledIcon}>
              Paid
            </Badge>
          </div>
          <Text as="h4" variant="headingMd">
            Merchant Costs
          </Text>
        </div>
        <Box
          borderColor="border"
          borderWidth="025"
          borderRadius="100"
          padding="400"
        >
          <BlockStack gap="300">
            {renderPriceRow(
              "Subtotal",
              `${order.merchant_order.line_items.length} ${order.merchant_order.line_items.length === 1 ? "item" : "items"}`,
              subtotal,
            )}
            {renderPriceRow(
              "Shipping",
              "Standard Shipping",
              order.shipping_rate,
            )}
            {renderPriceRow("Total", "-", total)}
          </BlockStack>
        </Box>
      </BlockStack>
    </Card>
  );
};
