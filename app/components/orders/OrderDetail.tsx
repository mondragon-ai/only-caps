import { BlockStack, Card, Text } from "@shopify/polaris";
import styles from "./Orders.module.css";
import { OrderProps } from "~/lib/types/orders";

export const OrderDetail = ({ order }: { order: OrderProps }) => {
  return (
    <Card>
      <BlockStack gap="500">
        <div className={styles.info}>
          <Text as="h2" variant="headingMd">
            Order Detail
          </Text>
          <div>
            <Text as="p" variant="bodyMd" tone="disabled">
              {order.id}
            </Text>
            <Text as="p" variant="bodyMd" tone="disabled">
              {order.date}
            </Text>
          </div>
        </div>
      </BlockStack>
    </Card>
  );
};
