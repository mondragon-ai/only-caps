import { Badge, BlockStack, Card, Text } from "@shopify/polaris";
import { MockupDocument } from "~/lib/types/mockups";
import styles from "./Mockups.module.css";

const capitalizeFirstLetter = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const MockupDetail = ({ mockup }: { mockup: MockupDocument }) => {
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
              <Badge tone="magic">{`${capitalizeFirstLetter(mockup.type)} Hat`}</Badge>
            </Text>
            <Text as="p" variant="bodyMd" tone="disabled">
              {mockup.title}
            </Text>
            <Text as="p" variant="bodyMd" tone="disabled">
              {mockup.base_sku}
            </Text>
            <Text as="p" variant="bodyMd" tone="disabled">
              {mockup.product_id}
            </Text>
            <Text as="p" variant="bodyMd" tone="disabled">
              {mockup.state}
            </Text>
          </BlockStack>
        </div>
      </BlockStack>
    </Card>
  );
};
