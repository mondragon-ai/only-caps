import { InlineGrid } from "@shopify/polaris";
import { useState } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Sector } from "recharts";
import {
  calculateTotalValue,
  formatNumber,
  formatToMoney,
} from "~/lib/formatters/numbers";
import { DataProps, TopSellerProps } from "~/lib/types/analytics";
import { COLORS } from "~/lib/data/analytics";
import { AnalyticsCard } from "./AnalyticsCard";
import { LineChartStats, PieChartStats } from "./Charts";

type BottomAnalyticsProps = {
  fulfillment: DataProps[];
  types: TopSellerProps[];
  shipping: DataProps[];
};

export const BottomAnalytics = ({
  fulfillment,
  types,
  shipping,
}: BottomAnalyticsProps) => {
  const total_fulfillment = calculateTotalValue(fulfillment);
  const total_shipping = calculateTotalValue(shipping);

  return (
    <InlineGrid gap="400" columns={{ xs: 1, sm: 1, md: 3, lg: 3, xl: 3 }}>
      <AnalyticsCard
        title="Avg. Time To Ship"
        mainValue={String(
          Number(total_fulfillment / fulfillment.length).toFixed(2),
        )}
        subValue="days"
      >
        <LineChartStats data={fulfillment} prefix="" fixed={0} suffix="d" />
      </AnalyticsCard>
      <AnalyticsCard title="Type of Hats Sold">
        <PieChartStats data={types} />
      </AnalyticsCard>
      <AnalyticsCard
        title="Avg. Shipping Cost"
        mainValue={`$${formatToMoney(total_shipping / shipping.length)}`}
      >
        <LineChartStats data={shipping} prefix="$" fixed={2} />
      </AnalyticsCard>
    </InlineGrid>
  );
};
