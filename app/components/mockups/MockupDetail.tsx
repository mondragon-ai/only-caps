import { Badge, BlockStack, Card, Link, Text } from "@shopify/polaris";
import { MockupDocument } from "~/lib/types/mockups";
import styles from "./Mockups.module.css";
import { formatDateLong } from "~/lib/formatters/numbers";

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
              <Link
                url={`https://${mockup.domain}/admin/products/${mockup.product_id}`}
                target="_blank"
              >
                {mockup.product_id}
              </Link>
            </Text>
            <Text as="p" variant="bodyMd" tone="disabled">
              {formatDateLong(mockup.state)}
            </Text>
          </BlockStack>
        </div>
      </BlockStack>
    </Card>
  );
};
