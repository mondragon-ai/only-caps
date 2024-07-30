import {
  Badge,
  BlockStack,
  Box,
  Card,
  InlineGrid,
  Link,
  Text,
} from "@shopify/polaris";
import styles from "./Orders.module.css";
import { MoneyFilledIcon } from "@shopify/polaris-icons";
import { formatToMoney } from "~/lib/formatters/numbers";
import { OrderProps } from "~/lib/types/orders";
import { useCallback, useState } from "react";
import { useAppBridge } from "@shopify/app-bridge-react";

export const Customer = ({ order }: { order: OrderProps }) => {
  const shopify = useAppBridge();

  const handleEmailClick = async () => {
    try {
      await navigator.clipboard.writeText(order.customer.email);
      shopify.toast.show("Email Saved");
    } catch (err) {
      console.error("Failed to copy email: ", err);
    }
  };

  return (
    <Card>
      <BlockStack gap="500">
        <div className={styles.info}>
          <Text as="h2" variant="headingMd">
            Customer
          </Text>
          <div className={styles.info}>
            <Text as="p" variant="bodyMd" tone="disabled">
              {order.customer.name}
            </Text>
            <Link
            //   url={`https://${shopify}/customers/${order.customer.id}`}
            >
              {order.customer.id}
            </Link>
          </div>
        </div>
        <div className={styles.info}>
          <Text as="h2" variant="headingMd">
            Contact Information
          </Text>
          <Link onClick={handleEmailClick}>{order.customer.email}</Link>
        </div>
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
      </BlockStack>
    </Card>
  );
};
