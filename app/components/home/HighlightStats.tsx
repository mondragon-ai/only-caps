import {
  BlockStack,
  Card,
  InlineGrid,
  Text,
  Box,
  Icon,
  ButtonGroup,
  Button,
} from "@shopify/polaris";
import { CartIcon, MoneyIcon } from "@shopify/polaris-icons";
import styles from "./Home.module.css";
import { formatNumber } from "~/lib/formatters/numbers";
import { useWidth } from "~/hooks/util";
import { useNavigate } from "@remix-run/react";

interface HighlightStatsProps {
  sold: number;
  revenue: number;
  analytics: boolean;
}

export const HighlightStats = ({
  analytics = false,
  sold = 114600,
  revenue = 2987,
}: HighlightStatsProps) => {
  const navigate = useNavigate();
  const innerWidth = useWidth();
  const isMobile = innerWidth < 720;

  return (
    <Card>
      <BlockStack gap="500">
        <InlineGrid columns="1fr auto">
          <Text as="h2" variant="headingSm">
            Highlight Performance {`${analytics ? "" : "- last 30 days"}`}
          </Text>
          {!analytics && (
            <ButtonGroup>
              <Button
                variant="plain"
                onClick={() => navigate("/app/analytics")}
                accessibilityLabel="Preview"
              >
                View Analytics
              </Button>
            </ButtonGroup>
          )}
        </InlineGrid>

        <div className={styles.highlightGrid}>
          <HighlightStatBox
            icon="MoneyIcon"
            value={String(`$${formatNumber(revenue)}`)}
            label="Revenue by Only Caps"
            isMobile={isMobile}
          />
          <HighlightStatBox
            icon="CartIcon"
            value={String(`${formatNumber(sold)}`)}
            label="Orders with Only Caps"
            isMobile={isMobile}
          />
        </div>
      </BlockStack>
    </Card>
  );
};

interface HighlightStatBoxProps {
  icon: "MoneyIcon" | "CartIcon";
  value: string;
  label: string;
  isMobile: boolean;
}

export const HighlightStatBox = ({
  icon,
  value,
  label,
  isMobile,
}: HighlightStatBoxProps) => {
  const IconComponent = icon === "MoneyIcon" ? MoneyIcon : CartIcon;

  return (
    <Box
      borderColor="border"
      borderWidth="025"
      borderRadius="100"
      padding="400"
      width={isMobile ? "100" : "48%"}
    >
      <div className={styles.highlightGridItem}>
        <div className={styles.icon}>
          <Icon source={IconComponent} tone="base" />
        </div>
        <div className={styles.statsText}>
          <Text as="h1" variant="headingLg">
            {value}
          </Text>
          <Text as="h2" variant="bodySm" tone="subdued">
            {label}
          </Text>
        </div>
      </div>
    </Box>
  );
};
