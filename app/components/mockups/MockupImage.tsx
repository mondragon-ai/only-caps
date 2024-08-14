import { BlockStack, Card, Text } from "@shopify/polaris";
import { MockupDocument } from "~/lib/types/mockups";
import styles from "./Mockups.module.css";

export const MockupImage = ({ mockup }: { mockup: MockupDocument }) => {
  return (
    <Card>
      <BlockStack gap={"400"}>
        <Text as={"h4"} variant="headingMd">
          Your Design
        </Text>
        <img src={mockup.design_url} alt="" className={styles.designImg} />
      </BlockStack>
    </Card>
  );
};
