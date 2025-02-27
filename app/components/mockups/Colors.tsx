import { BlockStack, Card, Icon, Text } from "@shopify/polaris";
import styles from "./Mockups.module.css";
import { MockupDocument } from "~/lib/types/mockups";
import { HatData } from "~/lib/data/mockups";

interface ColorsProps {
  mockup: MockupDocument;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  image: string;
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

export const Colors = ({ mockup, setImage, image }: ColorsProps) => {
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
            mockup.colors.map((color) => {
              if (!HatData[mockup.type].quarter_turns[color]) {
                return null;
              }
              return (
                <div
                  style={{
                    border: image == color ? "1.5px solid black" : "",
                    boxShadow: image.includes(color)
                      ? "0px 0px 3px 1px #b0b0b0"
                      : "",
                  }}
                  className={styles.color}
                  key={color}
                  onClick={() => setImage(color)}
                >
                  <img
                    style={{ height: "25px", width: "25px" }}
                    src={HatData[mockup.type].quarter_turns[color]}
                    alt={color}
                  />
                </div>
              );
            })}
          {/* {mockup.colors &&
            mockup.colors.map((color) =>
              color.includes("/")
                ? renderDualColorSwatch(color)
                : renderSingleColorSwatch(color),
            )} */}
        </div>
      </BlockStack>
    </Card>
  );
};
