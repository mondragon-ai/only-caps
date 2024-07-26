import { useEffect } from "react";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import {
  Page,
  Layout,
  Text,
  Card,
  Button,
  BlockStack,
  Box,
  List,
  Link,
  InlineStack,
  InlineGrid,
  ButtonGroup,
  MediaCard,
} from "@shopify/polaris";
import { TitleBar, useAppBridge } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";
import { OrderSummary } from "~/components/home/OrderSummary";
import { HighlightStats } from "~/components/home/HighlightStats";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticate.admin(request);

  return null;
};

// export const action = async ({ request }: ActionFunctionArgs) => {
//   const { admin } = await authenticate.admin(request);
//   const color = ["Red", "Orange", "Yellow", "Green"][
//     Math.floor(Math.random() * 4)
//   ];
//   const response = await admin.graphql(
//     `#graphql
//       mutation populateProduct($input: ProductInput!) {
//         productCreate(input: $input) {
//           product {
//             id
//             title
//             handle
//             status
//             variants(first: 10) {
//               edges {
//                 node {
//                   id
//                   price
//                   barcode
//                   createdAt
//                 }
//               }
//             }
//           }
//         }
//       }`,
//     {
//       variables: {
//         input: {
//           title: `${color} Snowboard`,
//         },
//       },
//     },
//   );
//   const responseJson = await response.json();

//   const variantId =
//     responseJson.data!.productCreate!.product!.variants.edges[0]!.node!.id!;
//   const variantResponse = await admin.graphql(
//     `#graphql
//       mutation shopifyRemixTemplateUpdateVariant($input: ProductVariantInput!) {
//         productVariantUpdate(input: $input) {
//           productVariant {
//             id
//             price
//             barcode
//             createdAt
//           }
//         }
//       }`,
//     {
//       variables: {
//         input: {
//           id: variantId,
//           price: Math.random() * 100,
//         },
//       },
//     },
//   );

//   const variantResponseJson = await variantResponse.json();

//   return json({
//     product: responseJson!.data!.productCreate!.product,
//     variant: variantResponseJson!.data!.productVariantUpdate!.productVariant,
//   });
// };

export default function Index() {
  // const fetcher = useFetcher();
  const createProductFetcher = useFetcher<any>();
  // const fetchProductsFetcher = useFetcher();

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
  // );

  // useEffect(() => {
  //   if (productId) {
  //     shopify.toast.show("Product created");
  //   }
  // }, [productId, shopify]);
  // const generateProduct = () =>
  //   fetcher.submit({}, { method: "post", action: "./home/product" });
  // const generateProduct = () => fetcher.submit({}, { method: "POST" });

  return (
    <Page
      title="Add payment method"
      subtitle="Test"
      primaryAction={{ content: "Create Mockup", disabled: false }}
    >
      <Layout>
        <Layout.Section>
          <OrderSummary />
        </Layout.Section>
        <Layout.Section>
          <HighlightStats />
        </Layout.Section>
        <Layout.Section>
          <MediaCard
            title="Getting Started"
            primaryAction={{
              content: "Learn about getting started",
              onAction: () => {},
            }}
            description="Discover how Shopify can power up your entrepreneurial journey."
            popoverActions={[{ content: "Dismiss", onAction: () => {} }]}
          >
            <img
              alt=""
              width="100%"
              height="100%"
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
              src="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850"
            />
          </MediaCard>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
