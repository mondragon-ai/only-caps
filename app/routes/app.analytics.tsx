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
import {
  AnalyitcsInit,
  fulfillment_data,
  revenue,
  shipping,
  sold,
  top_sellers,
  type_data,
} from "~/lib/data/analytics";
import { calculateTotalValue } from "~/lib/formatters/numbers";
import { authenticate } from "~/shopify.server";
import { Await, useLoaderData } from "@remix-run/react";

export async function loader({ request }: LoaderFunctionArgs) {
  const admin = await authenticate.admin(request);

  return defer({
    shop: admin.session.shop,
    analytics: AnalyitcsInit,
  });
}

export default function AnalyticsPage() {
  const data = useLoaderData<typeof loader>();
  const total_sold = calculateTotalValue(sold);
  const total_revenue = calculateTotalValue(revenue);

  console.log({ data });

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
                  sold={total_sold}
                  revenue={total_revenue}
                  analytics={true}
                />
              </Layout.Section>
              <Layout.Section>
                <TopAnalytics
                  revenue={revenue}
                  sold={sold}
                  top_sellers={top_sellers}
                />
              </Layout.Section>
              <Layout.Section>
                <BottomAnalytics
                  fulfillment={fulfillment_data}
                  types={type_data}
                  shipping={shipping}
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
