import {
  Page,
  Layout,
  SkeletonPage,
  SkeletonDisplayText,
  SkeletonBodyText,
} from "@shopify/polaris";
import {
  FeaturedProducts,
  HowTo,
  VideoCard,
  OrderSummary,
  ProFroma,
  RecommendedApps,
  HighlightStats,
} from "~/components/home/index";
import {
  calculateOrderHighlights,
  handleAnalytics,
} from "~/lib/util/analytics";
import { Suspense } from "react";
import { Footer } from "~/components/layout/Footer";
import { indexLoader } from "./models/index.server";
import { AnalyticsProps } from "~/lib/types/analytics";
import { capitalizeEachWord } from "~/lib/formatters/text";
import { Await, useLoaderData, useNavigate } from "@remix-run/react";

export const loader = indexLoader;

interface MerchantLoaderData {
  shop: string;
  analytics: AnalyticsProps[];
}

export default function Index() {
  // const data = useLoaderData<MerchantLoaderData>();
  const navigate = useNavigate();

  return (
    <Page
      title={`Welcome Back, ${capitalizeEachWord(String("").split(".")[0])}`}
      subtitle="Dashboard"
      primaryAction={{
        content: "Create Mockup",
        disabled: false,
        onAction: () => navigate("/app/catalog"),
      }}
    >
      <Suspense fallback={<LoadingSkeleton />}>
        <Await resolve={[]}>
          {(loadedData) => {
            // const analytics = handleAnalytics(loadedData.analytics as any[]);
            // const { awaiting, fulfilled } = calculateOrderHighlights(
            //   loadedData.analytics as any[],
            // );

            return (
              <Layout>
                <Layout.Section>
                  <OrderSummary
                    orders={false}
                    awaiting={0}
                    fulfilled={0}
                    failed={0}
                  />
                </Layout.Section>
                <Layout.Section>
                  <HighlightStats sold={0} revenue={0} analytics={false} />
                </Layout.Section>
                <Layout.Section>
                  <HowTo />
                </Layout.Section>
                <Layout.Section>
                  <FeaturedProducts />
                </Layout.Section>
                <Layout.Section>
                  <ProFroma />
                </Layout.Section>
                <Layout.Section>
                  <VideoCard />
                </Layout.Section>
                <Layout.Section>
                  <RecommendedApps />
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
