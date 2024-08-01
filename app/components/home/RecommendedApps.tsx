import { BlockStack, Card, InlineGrid, Link, Text } from "@shopify/polaris";
import styles from "./Home.module.css";

const appDetails = {
  sherpa: {
    img: "https://cdn.shopify.com/app-store/listing_images/58928b5d71d8f97ebd905e289c151269/icon/CKqbxsDgrP8CEAE=.png",
    name: "Sherpa Chatbot",
    url: "https://apps.shopify.com/sherpa-chatbot-production?st_source=autocomplete",
    app: "sherpa",
    info: "Configure the customer agent to respond to customer inquiries and automate tasks.",
  },
  discount: {
    img: "https://cdn.shopify.com/app-store/listing_images/d610566d43733aa1e25266d4953be8f2/icon/CN2ntdzF84ADEAE=.png",
    name: "Bigly Discount",
    url: "https://apps.shopify.com/bigly-discount?st_source=autocomplete",
    app: "discount",
    info: "Supercharge your subscription program by implementing member-specific discounts.",
  },
  pod: {
    img: "https://cdn.shopify.com/app-store/listing_images/14e68cb64a6de2412bbbbc0c95920a58/icon/CIXO-IGQ_v8CEAE=.png",
    name: "Bigly POD",
    url: "https://apps.shopify.com/bigly-pod?st_source=autocomplete",
    app: "pod",
    info: "Create quality POD mockups that instantly convert. Proudly made and processed in the USA.",
  },
};

export const RecommendedApps = () => {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <Card roundedAbove="sm">
        <BlockStack gap="500">
          <Text as="h2" variant="headingSm">
            Suggested Apps
          </Text>
          <InlineGrid gap="400" columns={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 3 }}>
            {Object.keys(appDetails).map((key, i) => (
              <AppCard
                key={key}
                app={key as "sherpa" | "discount" | "pod"}
                info={appDetails[key as "sherpa" | "discount" | "pod"].info}
              />
            ))}
          </InlineGrid>
        </BlockStack>
      </Card>
    </div>
  );
};

interface AppCardProps {
  app: "sherpa" | "discount" | "pod";
  info: string;
}

export const AppCard = ({ app, info }: AppCardProps) => {
  const { img, name, url } = appDetails[app];

  return (
    <div className={styles.appCard}>
      <div className={styles.mediaContainer}>
        <img src={img} alt={name} height={75} width={75} />
      </div>
      <div className={styles.textContainer}>
        <Text as="h4" variant="headingSm">
          {name}
        </Text>
        <Text as="p" variant="bodyMd" tone="subdued" alignment="center">
          {info}
        </Text>
      </div>
      <Link url={url} target="_blank">
        Learn More
      </Link>
    </div>
  );
};
