import {
  ActionList,
  Button,
  Icon,
  Layout,
  OptionList,
  Page,
  Popover,
  SkeletonBodyText,
  SkeletonDisplayText,
  SkeletonPage,
  Text,
} from "@shopify/polaris";
import { Suspense, useCallback, useState } from "react";
import { defer, type LoaderFunctionArgs } from "@remix-run/node";
import { HighlightStats } from "~/components/home/HighlightStats";
import { Footer } from "~/components/layout/Footer";
import { CheckSmallIcon } from "@shopify/polaris-icons";
import { TopAnalytics } from "~/components/analytics/TopAnalytics";
import { BottomAnalytics } from "~/components/analytics/BottomAnalytics";
import { AnalyticsInit, top_sellers } from "~/lib/data/analytics";
import { calculateTotalValue } from "~/lib/formatters/numbers";
import { authenticate } from "~/shopify.server";
import { Await, useLoaderData } from "@remix-run/react";
import {
  AnalyticsProps,
  DataProps,
  OrderAnalyticsProps,
  TopSellersProps,
} from "~/lib/types/analytics";

export async function loader({ request }: LoaderFunctionArgs) {
  const admin = await authenticate.admin(request);

  return defer({
    shop: admin.session.shop,
    analytics: AnalyticsInit,
  });
}

const handleAnalytics = (data: AnalyticsProps[]) => {
  let analytics = {
    total_orders: 0,
    total_items: 0,
    total_revenue: 0,
    top_sellers: {} as TopSellersProps,
    top_types: {} as Record<string, number>,
    orders: [] as OrderAnalyticsProps[],

    revenue_chart: [] as DataProps[],
    sold_chart: [] as DataProps[],
    fulfillment_chart: [] as DataProps[],
    shipping_chart: [] as DataProps[],

    total_shipping_cost: 0,
    total_fulfillment_time: 0,
  };

  for (const day of data) {
    analytics.total_orders += day.total_orders;
    analytics.total_items += day.total_items;
    analytics.total_revenue += day.total_revenue;

    Object.keys(day.top_sellers).forEach((ts) => {
      if (analytics.top_sellers[ts]) {
        analytics.top_sellers[ts] += day.top_sellers[ts];
      } else {
        analytics.top_sellers[ts] = day.top_sellers[ts];
      }
    });

    Object.keys(day.top_types).forEach((tt) => {
      if (analytics.top_types[tt]) {
        analytics.top_types[tt] += day.top_types[tt];
      } else {
        analytics.top_types[tt] = day.top_types[tt];
      }
    });

    analytics.orders.push(...day.orders);

    for (const order of day.orders) {
      analytics.total_shipping_cost += order.shipping_cost;

      if (order.fulfilled_date && Number(order.fulfilled_date) !== 0) {
        analytics.total_fulfillment_time += Number(
          Number(order.fulfilled_date) - Number(order.created_at),
        );
      }
    }

    analytics.revenue_chart.push({
      date: String(day.id),
      value: day.total_revenue,
    });
    analytics.sold_chart.push({ date: String(day.id), value: day.total_items });
    analytics.fulfillment_chart.push({
      date: String(day.id),
      value: analytics.total_fulfillment_time,
    });
    analytics.shipping_chart.push({
      date: String(day.id),
      value: analytics.total_shipping_cost,
    });
  }

  return analytics;
};

export default function AnalyticsPage() {
  const data = useLoaderData<typeof loader>();
  const analytics = handleAnalytics(data.analytics);

  const {
    top_sellers,
    total_items,
    total_revenue,
    revenue_chart,
    sold_chart,
    fulfillment_chart,
    shipping_chart,
  } = analytics;

  return (
    <Page
      title={`Analytics`}
      subtitle={"View the performance of your designs"}
      secondaryActions={<TimeFrameOptions />}
    >
      <Suspense fallback={<LoadingSkeleton />}>
        <Await resolve={data}>
          {(loadedData) => (
            <Layout>
              <Layout.Section>
                <HighlightStats
                  sold={total_items}
                  revenue={total_revenue}
                  analytics={true}
                />
              </Layout.Section>
              <Layout.Section>
                <TopAnalytics
                  revenue={revenue_chart}
                  sold={sold_chart}
                  top_sellers={top_sellers}
                />
              </Layout.Section>
              <Layout.Section>
                <BottomAnalytics
                  fulfillment={fulfillment_chart}
                  types={[]}
                  shipping={shipping_chart}
                />
              </Layout.Section>
              <Layout.Section>
                <Footer />
              </Layout.Section>
            </Layout>
          )}
        </Await>
      </Suspense>
    </Page>
  );
}

function TimeFrameOptions() {
  const [selected, setSelected] = useState<TimeFrameProps>("seven_days");
  const [popoverActive, setPopoverActive] = useState(false);

  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    [],
  );

  const selectOption = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    [],
  );

  const activator = (
    <Button onClick={togglePopoverActive} disclosure>
      Options
    </Button>
  );

  return (
    <div
      style={{
        height: "auto",
        minWidth: "150px",
        width: "150px",
        display: "flex",
        justifyContent: "end",
      }}
    >
      <Popover
        active={popoverActive}
        activator={activator}
        onClose={togglePopoverActive}
        fluidContent={false}
      >
        <ActionList
          actionRole="menuitem"
          items={[
            {
              onAction: () => setSelected("seven_days"),
              active: selected == "seven_days" && true,
              content: "Last 7 Days",
              suffix: selected == "seven_days" && (
                <Icon source={CheckSmallIcon} />
              ),
            },
            {
              onAction: () => setSelected("thirty_days"),
              active: selected == "thirty_days" && true,
              content: "Last 30 Days",
              suffix: selected == "thirty_days" && (
                <Icon source={CheckSmallIcon} />
              ),
            },
            {
              onAction: () => setSelected("ninety_days"),
              active: selected == "ninety_days" && true,
              content: "Last 90 Days",
              suffix: selected == "ninety_days" && (
                <Icon source={CheckSmallIcon} />
              ),
            },
            {
              onAction: () => setSelected("twelve_months"),
              active: selected == "twelve_months" && true,
              content: "Last 12 Months",
              suffix: selected == "twelve_months" && (
                <Icon source={CheckSmallIcon} />
              ),
            },
          ]}
        />
      </Popover>
    </div>
  );
}

export type TimeFrameProps =
  | "seven_days"
  | "thirty_days"
  | "ninety_days"
  | "twelve_months";

function LoadingSkeleton() {
  return (
    <SkeletonPage primaryAction title="Welcome Back, loading">
      <Layout>
        <Layout.Section>
          <SkeletonDisplayText size="small" />
          <SkeletonBodyText />
        </Layout.Section>
        <Layout.Section>
          <SkeletonDisplayText size="small" />
          <SkeletonBodyText />
        </Layout.Section>
        <Layout.Section>
          <SkeletonDisplayText size="small" />
          <SkeletonBodyText />
        </Layout.Section>
      </Layout>
    </SkeletonPage>
  );
}
