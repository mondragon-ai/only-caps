import type { LoaderFunctionArgs } from "@remix-run/node";
import {
  Await,
  defer,
  json,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "@remix-run/react";
import {
  Page,
  Layout,
  Text,
  SkeletonPage,
  SkeletonDisplayText,
  SkeletonBodyText,
} from "@shopify/polaris";
import { authenticate } from "../shopify.server";
import {
  FeaturedProducts,
  HowTo,
  VideoCard,
  OrderSummary,
  ProFroma,
  RecommendedApps,
  HighlightStats,
} from "~/components/home/index";
import { Footer } from "~/components/layout/Footer";
import { ShopifyMerchantInit } from "~/lib/data/merchant";
import { Suspense, useEffect, useState } from "react";

// Function to add a delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function loader({ request }: LoaderFunctionArgs) {
  const admin = await authenticate.admin(request);

  // Mock a delay of 3 seconds
  await delay(3000);

  // Return deferred data
  return defer({
    shop: admin.session.shop,
    orders_summary: ShopifyMerchantInit.analytics.orders_summary,
    highlight_stats: ShopifyMerchantInit.analytics.highlight_stats,
  });
}

interface MerchantData {
  shop: string;
  orders_summary: {
    awaiting: number;
    fulfilled: number;
    failed: number;
  };
  highlight_stats: {
    revenue: number;
    sold: number;
  };
}

export default function Index() {
  const data = useLoaderData<MerchantData>();
  const navigate = useNavigate();
  const navigation = useNavigation();

  return (
    <Page
      title={`Welcome Back, ${data.shop}`}
      subtitle="Dashboard"
      primaryAction={{
        content: "Create Mockup",
        disabled: false,
        onAction: () => navigate("/app/catalog"),
      }}
    >
      <Suspense fallback={<LoadingSkeleton />}>
        <Await resolve={data}>
          {(loadedData) => (
            <Layout>
              <Layout.Section>
                <OrderSummary
                  orders={false}
                  awaiting={loadedData.orders_summary.awaiting}
                  fulfilled={loadedData.orders_summary.fulfilled}
                  failed={loadedData.orders_summary.failed}
                />
              </Layout.Section>
              <Layout.Section>
                <HighlightStats
                  sold={loadedData.highlight_stats.sold}
                  revenue={loadedData.highlight_stats.revenue}
                  analytics={false}
                />
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
          )}
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

// const createProductFetcher = useFetcher<any>();

// const productId = createProductFetcher.data?.product?.id.replace(
//   "gid://shopify/Product/",
//   "",
// );

// const isLoading = createProductFetcher.state === "loading";

// useEffect(() => {
//   if (createProductFetcher.data?.product) {
//     shopify.toast.show("Product created");
//   }
// }, [createProductFetcher.data, shopify]);

// const generateProduct = () => {
//   createProductFetcher.submit({}, { method: "post", action: "/product" });
// };
