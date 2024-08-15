import { BlockStack, Card, Text } from "@shopify/polaris";
import { MockupDocument } from "~/lib/types/mockups";
import styles from "./Mockups.module.css";

interface DimensionProps {
  value: number;
  label: string;
}

export const Dimensions = ({ mockup }: { mockup: MockupDocument }) => {
  return (
    <Card>
      <BlockStack gap="400">
        <Text as="h4" variant="headingMd">
          Dimensions
        </Text>
        <div className={styles.sizeWrapper}>
          <DimensionField
            label="Width"
            value={mockup.dimension.resized_width || 0}
          />
          <DimensionField
            label="Height"
            value={mockup.dimension.resized_height || 0}
          />
        </div>
        <div className={styles.sizeWrapper}>
          <DimensionField label="Top" value={mockup.position.top || 0} />
          <DimensionField label="Left" value={mockup.position.left || 0} />
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
