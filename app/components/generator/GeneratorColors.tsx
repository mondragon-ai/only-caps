import { BlockStack, Card, Icon, Text } from "@shopify/polaris";
import styles from "./Mockups.module.css";
import { GeneratorStateProps, MockupProps } from "~/lib/types/mockups";
import { CheckIcon } from "@shopify/polaris-icons";
import { HatData } from "~/lib/data/mockups";
import { useCallback } from "react";

interface ColorsProps {
  mockup: MockupProps;
  setMockup: React.Dispatch<React.SetStateAction<GeneratorStateProps>>;
}

export const GeneratorColors = ({ mockup, setMockup }: ColorsProps) => {
  const handleColorChange = useCallback(
    (color: string) => {
      setMockup((prevMockup) => ({
        ...prevMockup,
        colors: prevMockup.colors.includes(color)
          ? prevMockup.colors.filter((c) => c !== color)
          : [...prevMockup.colors, color],
      }));
    },
    [setMockup],
  );

  return (
    <Card>
      <BlockStack gap="500">
        <div className={styles.info}>
          <Text as="h2" variant="headingMd">
            Colors
          </Text>
        </div>
        <div className={styles.colorGrid}>
          {HatData[mockup.type].colors &&
            HatData[mockup.type].colors.map((color) =>
              color.includes("/")
                ? renderDualColorSwatch(mockup, color, handleColorChange)
                : renderSingleColorSwatch(mockup, color, handleColorChange),
            )}
        </div>
      </BlockStack>
    </Card>
  );
};

export const renderSingleColorSwatch = (
  mockup: MockupProps,
  color: string,
  handleColorChange: (color: string) => void,
) => (
  <div
    className={styles.color}
    key={color}
    onClick={() => handleColorChange(color)}
  >
    <div style={{ background: color }} className={styles.singleColorSwatch}>
      {mockup.colors.includes(color) ? (
        <Icon source={CheckIcon} tone="subdued" />
      ) : null}
    </div>
  </div>
);

export const renderDualColorSwatch = (
  mockup: MockupProps,
  color: string,
  handleColorChange: (color: string) => void,
) => {
  const [color1, color2] = color.split("/");
  return (
    <div
      className={styles.color}
      key={color}
      onClick={() => handleColorChange(color)}
    >
      <div className={styles.dualColorSwatch}>
        <div style={{ position: "absolute", zIndex: 10 }}>
          {mockup.colors.includes(color) ? (
            <Icon source={CheckIcon} tone="subdued" />
          ) : null}
        </div>
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
