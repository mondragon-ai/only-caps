import { BlockStack, Card, Icon, Text } from "@shopify/polaris";
import styles from "./Mockups.module.css";
import { MockupProps } from "~/lib/types/mockups";
import { CheckIcon } from "@shopify/polaris-icons";

export const Colors = ({ mockup }: { mockup: MockupProps }) => {
  return (
    <Card>
      <BlockStack gap="500">
        <div className={styles.info}>
          <Text as="h2" variant="headingMd">
            Colors
          </Text>
        </div>

        <div className={styles.colorGrid}>
          {mockup.colors &&
            mockup.colors.map((c) => {
              return (
                <div className={styles.color}>
                  <div style={{ background: c }}>
                    <Icon source={CheckIcon} tone="subdued" />
                  </div>
                </div>
              );
            })}
        </div>
      </BlockStack>
    </Card>
  );
};
