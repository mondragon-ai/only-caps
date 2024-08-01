import { BlockStack, Card, InlineGrid, Text } from "@shopify/polaris";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { calculateTotalValue, formatNumber } from "~/lib/formatters/numbers";
import styles from "./Analytics.module.css";
import { DataProps, TopSellerProps } from "~/lib/types/analytics";
import { AnalyticsCard } from "./AnalyticsCard";
import { BarChartStats, LineChartStats } from "./Charts";

type TopAnalyticsProps = {
  revenue: DataProps[];
  sold: DataProps[];
  top_sellers: TopSellerProps[];
};

export const TopAnalytics = ({
  revenue,
  sold,
  top_sellers,
}: TopAnalyticsProps) => {
  const total_sold = calculateTotalValue(top_sellers);
  const total_items = calculateTotalValue(sold);
  const total_revenue = calculateTotalValue(revenue);

  return (
    <InlineGrid gap="400" columns={{ xs: 1, sm: 1, md: 3, lg: 3, xl: 3 }}>
      <AnalyticsCard
        title="Total Revenue"
        mainValue={`$${formatNumber(total_revenue)}`}
      >
        <LineChartStats data={revenue} />
      </AnalyticsCard>
      <AnalyticsCard title="Items Sold" mainValue={formatNumber(total_items)}>
        <BarChartStats data={sold} />
      </AnalyticsCard>
      <Card>
        <BlockStack gap="400">
          <Text as="h4" variant="headingXs" fontWeight="regular">
            Top Seller
          </Text>
          <BlockStack gap="600">
            {top_sellers.map((ts) => {
              return (
                <TopSeller
                  title={ts.name}
                  amount={ts.value}
                  width={Math.round((ts.value / total_sold) * 200)}
                />
              );
            })}
          </BlockStack>
        </BlockStack>
      </Card>
    </InlineGrid>
  );
};

const TopSeller = ({
  title,
  amount,
  width = 80,
}: {
  title: string;
  amount: number;
  width: number;
}) => {
  return (
    <div className={styles.topSeller}>
      <Text as="p" variant="bodyXs" fontWeight="regular" tone="subdued">
        {title}
      </Text>
      <div className={styles.sellerDetail}>
        <div className={styles.sellerBar} style={{ width: `${width}%` }}></div>
        <Text as="p" variant="bodyXs" fontWeight="regular" tone="disabled">
          {formatNumber(amount)}
        </Text>
      </div>
    </div>
  );
};
