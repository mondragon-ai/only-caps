import { BlockStack, Card, Icon, Text } from "@shopify/polaris";
import styles from "./Mockups.module.css";
import { MockupProps } from "~/lib/types/mockups";
import { CheckIcon } from "@shopify/polaris-icons";
import { HatData } from "~/lib/data/mockups";
import { useCallback } from "react";

export const Colors = ({ mockup }: { mockup: MockupProps }) => {
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
            mockup.colors.map((c) => {
              return (
                <div className={styles.color}>
                  <div style={{ background: c }}>
                    <Icon source={CheckIcon} tone="subdued" />
                  </div>
                </div>
              );
            })}
        </div>
      </BlockStack>
    </Card>
  );
};

export const GeneratorColors = ({
  mockup,
  setMockup,
}: {
  mockup: MockupProps;
  setMockup: React.Dispatch<React.SetStateAction<MockupProps>>;
}) => {
  const handleColorChange = useCallback(
    (color: string) => {
      if (mockup.colors.includes(color)) {
        setMockup({
          ...mockup,
          colors: mockup.colors.filter((c) => c !== color),
        });
      } else {
        setMockup({ ...mockup, colors: [...mockup.colors, color] });
      }
    },
    [mockup, setMockup],
  );

  return (
    <Card>
      <BlockStack gap="500">
        <div className={styles.info}>
          <Text as="h2" variant="headingMd">
            Select Colors
          </Text>
        </div>

        <div className={styles.colorGrid}>
          {HatData[mockup.type].colors &&
            HatData[mockup.type].colors.map((c) => {
              if (c.includes("/")) {
                return (
                  <div
                    onClick={() => handleColorChange(c)}
                    className={styles.color}
                    style={{
                      height: "40px",
                      width: "40px",
                      borderRadius: "20px",
                    }}
                  >
                    <div style={{ position: "absolute", zIndex: 10 }}>
                      {mockup.colors.includes(c) ? (
                        <Icon source={CheckIcon} tone="subdued" />
                      ) : null}
                    </div>
                    <div
                      style={{
                        background: c.split("/")[0],
                        height: "36px",
                        width: "50%",
                        borderRadius: 0,
                        borderTopLeftRadius: "18px",
                        borderBottomLeftRadius: "18px",
                      }}
                    ></div>
                    <div
                      style={{
                        background: c.split("/")[1],
                        height: "36px",
                        width: "50%",
                        borderRadius: 0,
                        borderTopRightRadius: "18px",
                        borderBottomRightRadius: "18px",
                      }}
                    ></div>
                  </div>
                );
              }
              return (
                <div
                  className={styles.color}
                  onClick={() => handleColorChange(c)}
                >
                  <div style={{ background: c }}>
                    {mockup.colors.includes(c) ? (
                      <Icon source={CheckIcon} tone="subdued" />
                    ) : null}
                  </div>
                </div>
              );
            })}
        </div>
      </BlockStack>
    </Card>
  );
};
