import type { LoaderFunctionArgs } from "@remix-run/node";
import { json, useLoaderData, useNavigate } from "@remix-run/react";
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

export async function loader({ request }: LoaderFunctionArgs) {
  const admin = await authenticate.admin(request);
  return json({
    shop: admin.session.shop,
  });
}

export default function Index() {
  const shop = useLoaderData<typeof loader>();
  // const shopify = useAppBridge();
  const navigate = useNavigate();

  console.log({ shop });

  return (
    <Page
      title={`Welcome Back, ${shop.shop}`}
      subtitle="Dashboard"
      primaryAction={{
        content: "Create Mockup",
        disabled: false,
        onAction: () => navigate("/app/catalog"),
      }}
    >
      <Layout>
        <Layout.Section>
          <OrderSummary orders={false} awaiting={0} fulfilled={0} faield={0} />
        </Layout.Section>
        <Layout.Section>
          <HighlightStats sold={2389} revenue={115640} analytics={false} />
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
