import { TimeFrameOptions } from "~/components/analytics/TimeFrameOptions";
import { BottomAnalytics } from "~/components/analytics/BottomAnalytics";
import { Await, useLoaderData, useLocation } from "@remix-run/react";
import { TopAnalytics } from "~/components/analytics/TopAnalytics";
import { HighlightStats } from "~/components/home/HighlightStats";
import { EmptyState, Layout, Page } from "@shopify/polaris";
import { analyticsLoader } from "./models/analytics.server";
import { LoadingSkeleton } from "~/components/skeleton";
import { handleAnalytics } from "~/lib/util/analytics";
import { Footer } from "~/components/layout/Footer";
import { Suspense } from "react";

export const loader = analyticsLoader;

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
            const analytics = handleAnalytics(loadedData.analytics as any[]);

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
