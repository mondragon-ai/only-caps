import {
  BlockStack,
  Card,
  InlineGrid,
  Text,
  Box,
  Icon,
} from "@shopify/polaris";
import { CartIcon, MoneyIcon } from "@shopify/polaris-icons";
import styles from "./Home.module.css";
import { formatNumber } from "~/lib/formatters/numbers";
import { useWidth } from "~/hooks/util";

export const HighlightStats = () => {
  const innerWidth = useWidth();
  return (
    <Card>
      <BlockStack gap="500">
        <InlineGrid columns="1fr auto">
          <Text as="h2" variant="headingSm">
            Highlight Performance - last 30 days
          </Text>
        </InlineGrid>

        <div className={styles.highlightGrid}>
          <Box
            borderColor="border"
            borderWidth="025"
            borderRadius="100"
            padding="400"
            width={innerWidth < 720 ? "100" : "48%"}
          >
            <div className={styles.highlightGridItem}>
              <div className={styles.icon}>
                <Icon source={MoneyIcon} tone="base" />
              </div>
              <div className={styles.statsText}>
                <Text as="h1" variant="headingLg">
                  {`${formatNumber(114600)}`}
                </Text>
                <Text as="h2" variant="bodySm" tone="subdued">
                  Revenue by Only Caps
                </Text>
              </div>
            </div>
          </Box>
          <Box
            borderColor="border"
            borderWidth="025"
            borderRadius="100"
            padding="400"
            width={innerWidth < 720 ? "100" : "48%"}
          >
            <div className={styles.highlightGridItem}>
              <div className={styles.icon}>
                <Icon source={CartIcon} />
              </div>
              <div className={styles.statsText}>
                <Text as="h1" variant="headingLg">
                  {`${formatNumber(2987)}`}
                </Text>
                <Text as="h2" variant="bodySm" tone="subdued">
                  Orders with Only Caps
                </Text>
              </div>
            </div>
          </Box>
        </div>
      </BlockStack>
    </Card>
  );
};
