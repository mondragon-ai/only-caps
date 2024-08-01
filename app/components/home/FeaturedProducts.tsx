import { Badge, BlockStack, Card, InlineGrid, Text } from "@shopify/polaris";
import styles from "./Home.module.css";
import { HatData } from "~/lib/data/mockups";
import { MockupTypes } from "~/lib/types/mockups";
import { useNavigate } from "@remix-run/react";

export const FeaturedProducts = () => {
  return (
    <Card roundedAbove="sm">
      <BlockStack gap="500">
        <Text as="h2" variant="headingSm">
          Featured Products
        </Text>
        <InlineGrid gap="400" columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 4 }}>
          <ProductCard type="foam_trucker" bestSeller />
          <ProductCard type="mid_profile" />
          <ProductCard type="flat_bill" />
          <ProductCard type="snapback" bestSeller />
        </InlineGrid>
      </BlockStack>
    </Card>
  );
};

interface ProductCardProps {
  type: MockupTypes;
  bestSeller?: boolean;
}

export const ProductCard = ({ type, bestSeller }: ProductCardProps) => {
  const navigate = useNavigate();
  const { image, title, delivery, price } = HatData[type];

  return (
    <div
      onClick={() => navigate(`/app/genorator/${type}`)}
      className={styles.productCard}
    >
      <div className={styles.mediaContainer}>
        <img src={image} alt={title} height={200} width={200} />
      </div>
      <div className={styles.textContainer}>
        <BlockStack gap={"200"}>
          <Text as="h4" variant="headingSm">
            {title}
          </Text>
          <Text as="p" variant="bodyXs" tone="success">
            {delivery}
          </Text>
          <Text as="p" variant="bodySm" tone="subdued">
            {price}
          </Text>
        </BlockStack>
      </div>
      {bestSeller && (
        <div className={styles.badgeContainer}>
          <Badge tone="success">Best Seller</Badge>
        </div>
      )}
    </div>
  );
};
