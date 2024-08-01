import { BlockStack, Card, Text } from "@shopify/polaris";
import { MockupProps } from "~/lib/types/mockups";
import styles from "./Mockups.module.css";

interface DimensionProps {
  value: number;
  label: string;
}

export const Dimensions = ({ mockup }: { mockup: MockupProps }) => {
  return (
    <Card>
      <BlockStack gap="400">
        <Text as="h4" variant="headingMd">
          Dimensions
        </Text>
        <div className={styles.sizeWrapper}>
          <DimensionField label="Width" value={mockup.size.width} />
          <DimensionField label="Height" value={mockup.size.height} />
        </div>
        <div className={styles.sizeWrapper}>
          <DimensionField label="Top" value={mockup.location.top} />
          <DimensionField label="Left" value={mockup.location.left} />
        </div>
      </BlockStack>
    </Card>
  );
};

const DimensionField = ({ label, value }: DimensionProps) => {
  return (
    <div>
      <Text as="p" variant="bodyXs" tone="disabled">
        {label}
      </Text>
      <div className={styles.txtField}>
        <Text as="p" variant="bodyXs" tone="disabled">
          {value}
        </Text>
        <div>
          <Text as="p" variant="bodyXs" tone="disabled">
            px
          </Text>
        </div>
      </div>
    </div>
  );
};
