import {
  BlockStack,
  Button,
  ButtonGroup,
  Card,
  InlineGrid,
  Text,
  Badge,
} from "@shopify/polaris";
import styles from "./Home.module.css";
import { useNavigate } from "@remix-run/react";

interface OrderSummaryProps {
  orders: boolean;
  awaiting: number;
  fulfilled: number;
  failed: number;
}

export const OrderSummary = ({
  orders,
  awaiting = 0,
  fulfilled = 0,
  failed = 0,
}: OrderSummaryProps) => {
  const navigate = useNavigate();

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
                onClick={() => navigate("/app/orders")}
                accessibilityLabel="Preview"
              >
                View All
              </Button>
            </ButtonGroup>
          )}
        </InlineGrid>

        <div className={styles.orderGrid}>
          <div className={styles.orderGridItem}>
            <OrderItem
              type="attention"
              text="Awaiting Fulfillment"
              qty={awaiting}
            />
          </div>
          <div className={styles.orderGridItem}>
            <OrderItem type="success" text="Fulfilled" qty={fulfilled} />
          </div>
          <div className={styles.orderGridItem}>
            <OrderItem type="critical" text="Failed" qty={failed} />
          </div>
        </div>
      </BlockStack>
    </Card>
  );
};

export type OrderItemType = "success" | "attention" | "critical";

interface OrderItemProps {
  type: OrderItemType;
  text: string;
  qty: number;
}

const OrderItem = ({ type, text, qty }: OrderItemProps) => {
  return (
    <div
      style={{
        display: "flex",
        height: "auto",
      }}
    >
      <Badge tone={type}>{String(qty)}</Badge>
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
