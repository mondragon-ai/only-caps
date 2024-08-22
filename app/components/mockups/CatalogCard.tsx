import { Badge, BlockStack, Card, InlineGrid, Text } from "@shopify/polaris";
import styles from "./Mockups.module.css";
import { HatData } from "~/lib/data/mockups";
import { MockupTypes } from "~/lib/types/mockups";
import { useNavigate } from "@remix-run/react";
import { capitalizeEachWord } from "~/lib/formatters/text";

export const CatalogCard = ({
  type = "foam_trucker",
}: {
  type: MockupTypes;
}) => {
  const navigate = useNavigate();
  const hat = HatData[type as MockupTypes];

  const renderColorSwatch = (color: string) => {
    if (color.includes("/")) {
      const [color1, color2] = color.split("/");
      return (
        <div className={styles.colorCatalog} key={color}>
          <div className={styles.dualColorSwatchCatalog}>
            <div
              style={{ background: color1 }}
              className={styles.dualColorHalfCatalog}
            ></div>
            <div
              style={{ background: color2 }}
              className={styles.dualColorHalfCatalog}
            ></div>
          </div>
        </div>
      );
    }
    console.log({ type, color });
    return (
      <div className={styles.colorCatalog} key={color}>
        <div
          className={styles.singleColorSwatchCatalog}
          style={{ background: color == "Royal" ? "#3F66D9" : color }}
        ></div>
      </div>
    );
  };

  return (
    <Card padding="0">
      <div
        className={styles.catalogCardWrapper}
        onClick={() => navigate(`/app/generator/${type}`)}
      >
        <div style={{ position: "absolute", top: 10, left: 10, zIndex: 100 }}>
          <Badge tone="success">{capitalizeEachWord(hat.type)}</Badge>
        </div>
        <img src={hat.image} alt={hat.name} height={200} width={200} />
        <div className={styles.cardContent}>
          <InlineGrid
            gap="400"
            columns={{ xs: 2, sm: 2, md: 5, lg: 5, xl: 5 }}
            alignItems="start"
          >
            <CatalogInfo title="Price" content={hat.price} />
            <CatalogInfo
              title="Shipping"
              content="From $3.99"
              subContent="Depends on the shipping address price may vary"
              magic
            />
            <CatalogInfo
              title="Avg. Production Time"
              content="🇺🇸 7 - 10 days"
              subContent="🌎 10 - 18 days"
            />
            <CatalogInfo title="Sizes" content="One Size" />
            <div
              className={styles.catalogInfo}
              style={{ paddingRight: "1rem" }}
            >
              <BlockStack gap="400">
                <Text as="h6" variant="headingXs" tone="subdued">
                  Colors - {hat.colors.length}
                </Text>
                <div className={styles.colorGridCatalog}>
                  {hat.colors.map(renderColorSwatch)}
                </div>
              </BlockStack>
            </div>
          </InlineGrid>
          <Text
            as="h4"
            variant="headingXs"
            fontWeight="regular"
            tone="magic-subdued"
          >
            {hat.name}
          </Text>
        </div>
      </div>
    </Card>
  );
};

const CatalogInfo = ({
  title,
  content,
  subContent,
  magic,
}: {
  title: string;
  content: string;
  subContent?: string;
  magic?: boolean;
}) => (
  <div className={styles.catalogInfo}>
    <BlockStack gap="400">
      <Text as="h6" variant="headingXs" tone="subdued">
        {title}
      </Text>
      <Text as="p" variant="bodyMd" tone="base">
        {content}
        {subContent && (
          <Text
            as="p"
            variant={magic ? "bodyXs" : "bodyMd"}
            tone={magic ? "magic-subdued" : "base"}
          >
            {subContent}
          </Text>
        )}
      </Text>
    </BlockStack>
  </div>
);
