import { BlockStack, Card, Text } from "@shopify/polaris";
import styles from "./Orders.module.css";
import { OrderDocument } from "~/lib/types/orders";
import { formatDateLong } from "~/lib/formatters/numbers";

export const OrderDetail = ({ order }: { order: OrderDocument }) => {
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
              {formatDateLong(order.created_at)}
            </Text>
          </div>
        </div>
      </BlockStack>
    </Card>
  );
};
