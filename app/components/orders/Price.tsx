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
import { OrderProps } from "~/lib/types/orders";

export const Price = ({ order }: { order: OrderProps }) => {
  return (
    <Card padding={"400"}>
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
          padding={"400"}
        >
          <BlockStack gap="300">
            <InlineGrid columns={["oneThird", "twoThirds", "oneThird"]}>
              <Text variant="bodyMd" fontWeight="bold" as="h3">
                Subtotal
              </Text>
              <Text variant="bodyMd" as="h3" tone="subdued">
                {`${order.line_items.length == 0 || order.line_items.length > 1 ? order.line_items.length + " items" : " item"}`}
              </Text>
              <Text variant="bodyMd" as="h3" tone="subdued">
                {`$${formatToMoney(order.line_items.reduce((prev, li) => prev + li.cost, 0))}`}
              </Text>
            </InlineGrid>
            <InlineGrid columns={["oneThird", "twoThirds", "oneThird"]}>
              <Text variant="bodyMd" fontWeight="bold" as="h3">
                Shipping
              </Text>
              <Text variant="bodyMd" as="h3" tone="subdued">
                Standard Shipping
              </Text>
              <Text variant="bodyMd" as="h3" tone="subdued">
                {`$${formatToMoney(order.shipping)}`}
              </Text>
            </InlineGrid>
            <InlineGrid columns={["oneThird", "twoThirds", "oneThird"]}>
              <Text variant="bodyMd" fontWeight="bold" as="h3">
                Total
              </Text>
              <Text variant="bodyMd" as="h3" tone="subdued">
                -
              </Text>
              <Text variant="bodyMd" as="h3" tone="subdued">
                {`$${formatToMoney(order.line_items.reduce((prev, li) => prev + li.cost, 0) + order.shipping)}`}
              </Text>
            </InlineGrid>
          </BlockStack>
        </Box>
      </BlockStack>
    </Card>
  );
};
