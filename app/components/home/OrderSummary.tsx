import {
  BlockStack,
  Button,
  ButtonGroup,
  Card,
  InlineGrid,
  Text,
  Badge,
  Grid,
} from "@shopify/polaris";
import styles from "./Home.module.css";

export const OrderSummary = ({ orders }: { orders: boolean }) => {
  return (
    <Card>
      <BlockStack gap="800">
        <InlineGrid columns="1fr auto">
          <Text as="h2" variant="headingSm">
            {!orders ? "Recent Orders" : "Quick Overview"}
          </Text>
          {!orders && (
            <ButtonGroup>
              <Button
                variant="plain"
                onClick={() => {}}
                accessibilityLabel="Preview"
              >
                View All
              </Button>
            </ButtonGroup>
          )}
        </InlineGrid>

        <div className={styles.orderGrid}>
          <div className={styles.orderGridItem}>
            <OrderItem type="attention" text="Awaiting Fulfillment" qty="3" />
          </div>
          <div className={styles.orderGridItem}>
            <OrderItem type="success" text="Fulfilled" qty="203" />
          </div>
          <div className={styles.orderGridItem}>
            <OrderItem type="critical" text="Failed" qty="1" />
          </div>
        </div>
      </BlockStack>
    </Card>
  );
};

const OrderItem = ({
  type,
  text,
  qty,
}: {
  type: "success" | "attention" | "critical";
  text: string;
  qty: string;
}) => {
  return (
    <div
      style={{
        display: "flex",
        height: "auto",
      }}
    >
      <Badge tone={type}>{qty}</Badge>
      <div
        style={{
          paddingLeft: "10px",
        }}
      >
        <Text variant="bodyMd" as="p">
          {text}
        </Text>
      </div>
    </div>
  );
};
