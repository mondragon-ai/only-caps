import {
  Badge,
  BlockStack,
  Card,
  InlineGrid,
  Link,
  Text,
} from "@shopify/polaris";
import styles from "./Home.module.css";

export const FeaturedProducts = () => {
  return (
    <Card roundedAbove="sm">
      <BlockStack gap="500">
        <Text as="h2" variant="headingSm">
          Featured Products
        </Text>
        <InlineGrid gap="400" columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 4 }}>
          <Link url="#" removeUnderline={true} monochrome={true}>
            <ProductCard type="dad" bestSeller />
          </Link>
          <Link url="#" removeUnderline={true} monochrome={true}>
            <ProductCard type="trucker" />
          </Link>
          <Link url="#" removeUnderline={true} monochrome={true}>
            <ProductCard type="5pannel" />
          </Link>
          <Link url="#" removeUnderline={true} monochrome={true}>
            <ProductCard type="snapback" bestSeller />
          </Link>
        </InlineGrid>
      </BlockStack>
    </Card>
  );
};

export const ProductCard = ({
  type,
  bestSeller,
}: {
  type: "trucker" | "dad" | "5pannel" | "snapback";
  bestSeller?: boolean;
}) => {
  const img =
    type == "dad"
      ? "https://cdn.shopify.com/s/files/1/0783/4802/6165/files/MidStructuredPolyesterCap.webp?v=1722090003"
      : type == "trucker"
        ? "https://cdn.shopify.com/s/files/1/0783/4802/6165/files/RetroTruckerCap.webp?v=1722090003"
        : type == "5pannel"
          ? "https://cdn.shopify.com/s/files/1/0783/4802/6165/files/5PanelFlatBillHatSnapback.webp?v=1722090003"
          : "https://cdn.shopify.com/s/files/1/0783/4802/6165/files/5PanelFlatBillHatSnapback.webp?v=1722090003";
  return (
    <div className={styles.productCard}>
      <div className={styles.mediaContainer}>
        <img src={img} alt="" />
      </div>
      <div className={styles.textContainer}>
        <Text as="h4" variant="headingSm">
          Dad Hat
        </Text>
        <Text as="p" variant="bodyXs" tone="success">
          🇺🇸 Estimated Delivery 7 - 10 days
        </Text>
        <Text as="p" variant="bodySm" tone="subdued">
          $30.00 - $35.00
        </Text>
      </div>
      {bestSeller && (
        <div className={styles.badgeContainer}>
          <Badge tone="success">Best Seller</Badge>
        </div>
      )}
    </div>
  );
};
