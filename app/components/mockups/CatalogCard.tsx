import {
  BlockStack,
  Button,
  Card,
  InlineGrid,
  Text,
  Badge,
} from "@shopify/polaris";
import styles from "./Mockups.module.css";
import { HatData } from "~/lib/data/mockups";
import { MockupTypes } from "~/lib/types/mockups";
import { useNavigate } from "@remix-run/react";

export const CatalogCard = ({
  type = "foam_trucker",
}: {
  type: MockupTypes;
}) => {
  const navigate = useNavigate();
  return (
    <Card padding={"0"}>
      <div
        className={styles.catalogCardWrapper}
        onClick={() => navigate(`/app/generator/${type}`)}
      >
        <img
          src={HatData[type as MockupTypes].image}
          alt=""
          height={200}
          width={200}
        />
        <div
          style={{
            height: "100%",
            minHeight: "200px",
            paddingBottom: "1rem",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
          }}
        >
          <InlineGrid
            gap="400"
            columns={{ xs: 2, sm: 2, md: 5, lg: 5, xl: 5 }}
            alignItems="start"
          >
            <div style={{ padding: "1rem 0" }}>
              <BlockStack gap={"400"}>
                <Text as="h6" variant="headingXs" tone="subdued">
                  Price
                </Text>
                <Text as="p" variant="bodyMd" tone="base">
                  $30.00 - $35.00
                </Text>
              </BlockStack>
            </div>
            <div style={{ padding: "1rem 0" }}>
              <BlockStack gap={"400"}>
                <Text as="h6" variant="headingXs" tone="subdued">
                  Shipping
                </Text>
                <Text as="p" variant="bodyMd" tone="base">
                  From $3.99
                  <Text as="p" variant="bodyXs" tone="magic-subdued">
                    Depends on the shipping address price may vary
                  </Text>
                </Text>
              </BlockStack>
            </div>
            <div style={{ padding: "1rem 0" }}>
              <BlockStack gap={"400"}>
                <Text as="h6" variant="headingXs" tone="subdued">
                  Avg. Production Time
                </Text>
                <Text as="p" variant="bodyMd" tone="base">
                  🇺🇸 7 - 10 days
                  <Text as="p" variant="bodyMd" tone="base">
                    🌎 10 - 18 days
                  </Text>
                </Text>
              </BlockStack>
            </div>
            <div style={{ padding: "1rem 0" }}>
              <BlockStack gap={"400"}>
                <Text as="h6" variant="headingXs" tone="subdued">
                  Sizes
                </Text>
                <Text as="p" variant="bodyMd" tone="base">
                  One Size
                </Text>
              </BlockStack>
            </div>
            <div style={{ padding: "1rem 0" }}>
              <BlockStack gap={"400"}>
                <Text as="h6" variant="headingXs" tone="subdued">
                  Colors - 10
                </Text>
                <div className={styles.colorGrid}>
                  {HatData[type].colors &&
                    HatData[type].colors.map((c) => {
                      if (c.includes("/")) {
                        return (
                          <div
                            className={styles.color}
                            style={{
                              height: "20px",
                              width: "20px",
                              borderRadius: "10px",
                            }}
                          >
                            <div
                              style={{
                                background: c.split("/")[0],
                                height: "17px",
                                width: "50%",
                                borderRadius: 0,
                                borderTopLeftRadius: "8.5px",
                                borderBottomLeftRadius: "8.5px",
                              }}
                            ></div>
                            <div
                              style={{
                                background: c.split("/")[1],
                                height: "17px",
                                width: "50%",
                                borderRadius: 0,
                                borderTopRightRadius: "8.5px",
                                borderBottomRightRadius: "8.5px",
                              }}
                            ></div>
                          </div>
                        );
                      }
                      return (
                        <div
                          className={styles.color}
                          style={{
                            height: "20px",
                            width: "20px",
                            borderRadius: "10px",
                          }}
                        >
                          <div
                            style={{
                              background: c,
                              height: "17px",
                              width: "17px",
                              borderRadius: "8.5px",
                            }}
                          ></div>
                        </div>
                      );
                    })}
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
            {HatData[type as MockupTypes].name}
          </Text>
        </div>
      </div>
    </Card>
  );
};
