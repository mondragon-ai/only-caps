import {
  Badge,
  BlockStack,
  Box,
  Card,
  Text,
  TextField,
} from "@shopify/polaris";
import { MockupProps } from "~/lib/types/mockups";
import styles from "./Mockups.module.css";

export const MockupDetail = ({ mockup }: { mockup: MockupProps }) => {
  return (
    <Card>
      <BlockStack gap="300">
        <div className={styles.info}>
          <Text as="h2" variant="headingMd">
            Mockup Detail
          </Text>
        </div>
        <div>
          <BlockStack gap="050">
            <Text as="p" variant="bodyMd" tone="disabled">
              <Badge tone="magic">{`${mockup.type
                .split("")
                .map((l, i) => {
                  if (i === 0) return l.toLocaleUpperCase();
                  else return l;
                })
                .join("")} Hat`}</Badge>
            </Text>
            <Text as="p" variant="bodyMd" tone="disabled">
              {mockup.name}
            </Text>
            <Text as="p" variant="bodyMd" tone="disabled">
              {mockup.SKU}
            </Text>
            <Text as="p" variant="bodyMd" tone="disabled">
              {mockup.product_id}
            </Text>
            <Text as="p" variant="bodyMd" tone="disabled">
              {mockup.created}
            </Text>
          </BlockStack>
        </div>
      </BlockStack>
    </Card>
  );
};
