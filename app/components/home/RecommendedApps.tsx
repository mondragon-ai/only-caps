import { BlockStack, Card, InlineGrid, Link, Text } from "@shopify/polaris";
import styles from "./Home.module.css";

export const RecommendedApps = () => {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <Card roundedAbove="sm">
        <BlockStack gap="500">
          <Text as="h2" variant="headingSm">
            Featured Products
          </Text>
          <InlineGrid gap="400" columns={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 3 }}>
            <AppCard
              app="sherpa"
              info="Configure the customer agent to respond to customers inquires and automate tasks."
            />
            <AppCard
              app="pod"
              info="Create quality POD mockups that instantly convert. Proudly made and process in the USA"
            />
            <AppCard
              app="discount"
              info="Supercharge your subscription program by implementing member specific discounts."
            />
          </InlineGrid>
        </BlockStack>
      </Card>
    </div>
  );
};

export const AppCard = ({
  app,
  info,
}: {
  app: "sherpa" | "discount" | "pod";
  info: string;
}) => {
  const img =
    app == "sherpa"
      ? "https://cdn.shopify.com/app-store/listing_images/58928b5d71d8f97ebd905e289c151269/icon/CKqbxsDgrP8CEAE=.png"
      : app == "discount"
        ? "https://cdn.shopify.com/app-store/listing_images/d610566d43733aa1e25266d4953be8f2/icon/CN2ntdzF84ADEAE=.png"
        : "https://cdn.shopify.com/app-store/listing_images/14e68cb64a6de2412bbbbc0c95920a58/icon/CIXO-IGQ_v8CEAE=.png";
  return (
    <div className={styles.appCard}>
      <div className={styles.mediaContainer}>
        <img src={img} alt="" />
      </div>
      <div className={styles.textContainer}>
        <Text as="h4" variant="headingSm">
          {app == "sherpa"
            ? "Sherpa Chatbot"
            : app == "discount"
              ? "Bigly Discount"
              : " Bigly POD"}
        </Text>
        <Text as="p" variant="bodyMd" tone="subdued" alignment="center">
          {info}
        </Text>
      </div>
      <Link
        url={
          app == "sherpa"
            ? "https://apps.shopify.com/sherpa-chatbot-production?st_source=autocomplete"
            : app == "discount"
              ? "https://apps.shopify.com/bigly-discount?st_source=autocomplete"
              : "https://apps.shopify.com/bigly-pod?st_source=autocomplete"
        }
        target="_blank"
      >
        Learn More
      </Link>
    </div>
  );
};
