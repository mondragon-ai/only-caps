import {
  ActionList,
  Button,
  EmptyState,
  Icon,
  Layout,
  Page,
  Popover,
  SkeletonBodyText,
  SkeletonDisplayText,
  SkeletonPage,
} from "@shopify/polaris";
import { Suspense, useCallback, useEffect, useState } from "react";
import {
  ActionFunctionArgs,
  defer,
  json,
  type LoaderFunctionArgs,
} from "@remix-run/node";
import { HighlightStats } from "~/components/home/HighlightStats";
import { Footer } from "~/components/layout/Footer";
import { CheckSmallIcon } from "@shopify/polaris-icons";
import { TopAnalytics } from "~/components/analytics/TopAnalytics";
import { BottomAnalytics } from "~/components/analytics/BottomAnalytics";
import { AnalyticsInit } from "~/lib/data/analytics";
import { authenticate } from "~/shopify.server";
import {
  Await,
  FetcherWithComponents,
  useFetcher,
  useLoaderData,
  useNavigate,
} from "@remix-run/react";
import { handleAnalytics } from "~/lib/util/analytics";
import { AnalyticsProps } from "~/lib/types/analytics";
import { LoadingSkeleton } from "~/components/skeleton";
import { SERVER_BASE_URL } from "~/lib/contants";
import { ResponseProp } from "~/lib/types/shared";

export async function loader({ request }: LoaderFunctionArgs) {
  const { session, admin } = await authenticate.admin(request);
  const url = new URL(request.url);

  // Extract the query parameter 'time_frame'
  const timeFrame = url.searchParams.get("time_frame");
  console.log({ timeFrame });

  const shopRespons = await admin.graphql(
    `query {
      shop {
        name
        currencyCode
        billingAddress {
          address1
          city
          provinceCode
          zip
        }
      }
    }`,
  );
  const responseJson = await shopRespons.json();

  const response = await fetch(
    `${SERVER_BASE_URL}/store/${session.shop}/analytics?time_frame=${timeFrame ? timeFrame : "seven_days"}&timezone=America/New_York`,
  );

  const data = (await response.json()) as {
    text: string;
    analytics: AnalyticsProps[];
  };

  console.log(data);

  return defer({
    shop: session.shop,
    analytics: data.analytics as AnalyticsProps[],
  });
}

export default function AnalyticsPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <Page
      title={`Analytics`}
      subtitle={"View the performance of your designs"}
      secondaryActions={<TimeFrameOptions />}
    >
      <Suspense fallback={<LoadingSkeleton />}>
        <Await resolve={data}>
          {(loadedData) => {
            const analytics = handleAnalytics(data.analytics as any[]);

            const {
              top_sellers,
              total_items,
              total_revenue,
              revenue_chart,
              sold_chart,
              fulfillment_chart,
              shipping_chart,
              top_types,
            } = analytics;
            if (loadedData.analytics.length == 0) {
              return (
                <Layout>
                  <Layout.Section>
                    <HighlightStats sold={0} revenue={0} analytics={true} />
                  </Layout.Section>
                  <Layout.Section>
                    <EmptyState
                      heading="No Orders Found"
                      action={{
                        content: "Generate Mockup",
                        url: "/app/catalog",
                      }}
                      image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
                    >
                      <p>Once an order comes in you will see data here.</p>
                    </EmptyState>
                  </Layout.Section>
                  <Layout.Section>
                    <Footer />
                  </Layout.Section>
                </Layout>
              );
            }
            return (
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
                    types={top_types}
                    shipping={shipping_chart}
                  />
                </Layout.Section>
                <Layout.Section>
                  <Footer />
                </Layout.Section>
              </Layout>
            );
          }}
        </Await>
      </Suspense>
    </Page>
  );
}

function TimeFrameOptions() {
  const [selected, setSelected] = useState<TimeFrameProps>("seven_days");
  const navigate = useNavigate();
  const [popoverActive, setPopoverActive] = useState(false);

  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    [],
  );

  const selectOption = useCallback((type: TimeFrameProps) => {
    setSelected(type);
    navigate(`/app/analytics?time_frame=${type}`);
    setPopoverActive((popoverActive) => !popoverActive);
  }, []);

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
              onAction: () => selectOption("seven_days"),
              active: selected == "seven_days" && true,
              content: "Last 7 Days",
              suffix: selected == "seven_days" && (
                <Icon source={CheckSmallIcon} />
              ),
            },
            {
              onAction: () => selectOption("thirty_days"),
              active: selected == "thirty_days" && true,
              content: "Last 30 Days",
              suffix: selected == "thirty_days" && (
                <Icon source={CheckSmallIcon} />
              ),
            },
            {
              onAction: () => selectOption("ninety_days"),
              active: selected == "ninety_days" && true,
              content: "Last 90 Days",
              suffix: selected == "ninety_days" && (
                <Icon source={CheckSmallIcon} />
              ),
            },
            {
              onAction: () => selectOption("twelve_months"),
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
