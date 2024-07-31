import { useEffect } from "react";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { useFetcher, useNavigate } from "@remix-run/react";
import { Page, Layout } from "@shopify/polaris";
import { useAppBridge } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";
import { OrderSummary } from "~/components/home/OrderSummary";
import { HighlightStats } from "~/components/home/HighlightStats";
import { VideoCard } from "~/components/home/VideoCard";
import { FeaturedProducts } from "~/components/home/FeaturedProducts";
import { HowTo } from "~/components/home/HowTo";
import { ProFroma } from "~/components/home/ProFroma";
import { RecommendedApps } from "~/components/home/RecommendedApps";
import { Footer } from "~/components/layout/Footer";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticate.admin(request);

  return null;
};

export default function Index() {
  const createProductFetcher = useFetcher<any>();
  const navigate = useNavigate();

  const productId = createProductFetcher.data?.product?.id.replace(
    "gid://shopify/Product/",
    "",
  );

  const shopify = useAppBridge();
  const isLoading = createProductFetcher.state === "loading";

  useEffect(() => {
    if (createProductFetcher.data?.product) {
      shopify.toast.show("Product created");
    }
  }, [createProductFetcher.data, shopify]);

  const generateProduct = () => {
    createProductFetcher.submit({}, { method: "post", action: "/product" });
  };

  return (
    <Page
      title="Welcome Back, Hodge Twins"
      subtitle="Dashboard"
      primaryAction={{
        content: "Create Mockup",
        disabled: false,
        onAction: () => navigate("/app/catalog"),
      }}
    >
      <Layout>
        <Layout.Section>
          <OrderSummary orders={false} />
        </Layout.Section>
        <Layout.Section>
          <HighlightStats />
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
    </Page>
  );
}
