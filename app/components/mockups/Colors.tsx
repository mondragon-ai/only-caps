import { BlockStack, Card, Icon, Text } from "@shopify/polaris";
import styles from "./Mockups.module.css";
import { MockupProps } from "~/lib/types/mockups";

interface ColorsProps {
  mockup: MockupProps;
}

export const renderSingleColorSwatch = (color: string) => (
  <div className={styles.color} key={color}>
    <div
      style={{ background: color }}
      className={styles.singleColorSwatch}
    ></div>
  </div>
);

export const renderDualColorSwatch = (color: string) => {
  const [color1, color2] = color.split("/");
  return (
    <div className={styles.color} key={color}>
      <div className={styles.dualColorSwatch}>
        <div
          style={{ background: color1 }}
          className={styles.dualColorHalf}
        ></div>
        <div
          style={{ background: color2 }}
          className={styles.dualColorHalf}
        ></div>
      </div>
    </div>
  );
};

export const Colors = ({ mockup }: ColorsProps) => {
  return (
    <Card>
      <BlockStack gap="500">
        <div className={styles.info}>
          <Text as="h2" variant="headingMd">
            Colors
          </Text>
        </div>
        <div className={styles.colorGrid}>
          {mockup.colors &&
            mockup.colors.map((color) =>
              color.includes("/")
                ? renderDualColorSwatch(color)
                : renderSingleColorSwatch(color),
            )}
        </div>
      </BlockStack>
    </Card>
  );
};
