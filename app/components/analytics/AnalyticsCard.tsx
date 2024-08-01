import { BlockStack, Card, Text } from "@shopify/polaris";
import styles from "./Analytics.module.css";

export const AnalyticsCard = ({
  title,
  mainValue,
  subValue,
  children,
}: {
  title: string;
  mainValue?: string;
  subValue?: string;
  children: React.ReactNode;
}) => (
  <Card>
    <BlockStack gap="400">
      <Text as="h4" variant="headingXs" fontWeight="regular">
        {title}
      </Text>
      {mainValue && (
        <div className={styles.analyticsHeader}>
          <Text as="h1" variant="heading2xl" fontWeight="regular">
            {mainValue}
          </Text>
          {subValue && (
            <div className={styles.subValue}>
              <Text as="p" variant="bodyXs" fontWeight="regular">
                {subValue}
              </Text>
            </div>
          )}
        </div>
      )}
      <div className={styles.chartContainer}>{children}</div>
    </BlockStack>
  </Card>
);
