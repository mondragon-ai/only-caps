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
