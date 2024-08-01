import { BlockStack, Card, Link, Text } from "@shopify/polaris";
import styles from "./Orders.module.css";
import { OrderProps } from "~/lib/types/orders";
import { useAppBridge } from "@shopify/app-bridge-react";

export const Customer = ({ order }: { order: OrderProps }) => {
  const shopify = useAppBridge();

  const handleEmailClick = async () => {
    try {
      await navigator.clipboard.writeText(order.customer.email);
      shopify.toast.show("Email Copied");
    } catch (err) {
      console.error("Failed to copy email: ", err);
    }
  };

  return (
    <Card>
      <BlockStack gap="500">
        <RenderCustomerInfo order={order} />
        <RenderContactInfo order={order} copy={handleEmailClick} />
        <RenderShippingAddress order={order} />
      </BlockStack>
    </Card>
  );
};

const RenderCustomerInfo = ({ order }: { order: OrderProps }) => (
  <div className={styles.info}>
    <Text as="h2" variant="headingMd">
      Customer
    </Text>
    <div className={styles.info}>
      <Text as="p" variant="bodyMd" tone="disabled">
        {order.customer.name}
      </Text>
      <Link url={"#"}>{order.customer.id}</Link>
    </div>
  </div>
);

const RenderContactInfo = ({
  order,
  copy,
}: {
  order: OrderProps;
  copy: () => Promise<void>;
}) => (
  <div className={styles.info}>
    <Text as="h2" variant="headingMd">
      Contact Information
    </Text>
    <Link onClick={copy}>{order.customer.email}</Link>
  </div>
);

const RenderShippingAddress = ({ order }: { order: OrderProps }) => (
  <div className={styles.info}>
    <Text as="h2" variant="headingMd">
      Shipping Address
    </Text>
    <div>
      <Text as="p" variant="bodyMd" tone="disabled">
        {order.customer.address.line1}
      </Text>
      <Text as="p" variant="bodyMd" tone="disabled">
        {order.customer.address.city}
      </Text>
      <Text as="p" variant="bodyMd" tone="disabled">
        {`${order.customer.address.country} ${order.customer.address.zip}`}
      </Text>
    </div>
  </div>
);
