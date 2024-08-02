import type { LoaderFunctionArgs } from "@remix-run/node";
import {
  defer,
  json,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "@remix-run/react";
import { Page, Layout } from "@shopify/polaris";
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
import { useEffect, useState } from "react";

// Function to add a delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function loader({ request }: LoaderFunctionArgs) {
  const admin = await authenticate.admin(request);

  console.log("start");
  // Mock a delay of 3 seconds
  await delay(3000);
  console.log("end");

  // TODO: Fetch data from external API Route
  // const merchant = await fetch()

  // TODO: Check if the data was fetched successfully
  // redirect to error page with status 400+
  // if (merchant === null) {
  //   throw json("Not Found", { status: 404 });
  // }

  // Else return the data
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
  // const shopify = useAppBridge();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isLoading = navigation.state === "loading";

  const [merchant, setMerchant] = useState<MerchantData | null>(null);

  useEffect(() => {
    if (data) {
      setMerchant(data);
    }
  }, [data]);

  const orders_summary = merchant!.orders_summary;
  const highlight_stats = merchant!.highlight_stats;

  console.log({ merchant });
  console.log({ state: navigation.state });
  console.log({ isLoading });
  console.log("\n\n");

  return (
    <Page
      title={`Welcome Back, ${merchant ? merchant.shop : ""}`}
      subtitle="Dashboard"
      primaryAction={{
        content: "Create Mockup",
        disabled: false,
        onAction: () => navigate("/app/catalog"),
      }}
    >
      {merchant == null ? null : (
        <Layout>
          <Layout.Section>
            <OrderSummary
              orders={false}
              awaiting={orders_summary.awaiting}
              fulfilled={orders_summary.fulfilled}
              failed={orders_summary.failed}
            />
          </Layout.Section>
          <Layout.Section>
            <HighlightStats
              sold={highlight_stats.sold}
              revenue={highlight_stats.revenue}
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
    </Page>
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
