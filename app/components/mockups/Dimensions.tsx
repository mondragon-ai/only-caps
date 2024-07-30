import { BlockStack, Box, Card, Text, TextField } from "@shopify/polaris";
import { MockupProps } from "~/lib/types/mockups";
import styles from "./Mockups.module.css";

export const Dimensions = ({ mockup }: { mockup: MockupProps }) => {
  return (
    <Card>
      <BlockStack gap={"400"}>
        <Text as={"h4"} variant="headingMd">
          Dimensions
        </Text>
        <div className={styles.sizeWrapper}>
          <Width width={mockup.size.width} />
          <Height height={mockup.size.height} />
        </div>
        <div className={styles.sizeWrapper}>
          <Top top={mockup.location.top} />
          <Left left={mockup.location.left} />
        </div>
      </BlockStack>
    </Card>
  );
};

export const Width = ({ width }: { width: number }) => {
  return (
    <div>
      <Text as="p" variant="bodyXs" tone="disabled">
        Width
      </Text>
      <div className={styles.txtField}>
        <Text as="p" variant="bodyXs" tone="disabled">
          {width}
        </Text>
        <div>
          {" "}
          <Text as="p" variant="bodyXs" tone="disabled">
            px
          </Text>
        </div>
      </div>
    </div>
  );
};

export const Height = ({ height }: { height: number }) => {
  return (
    <div>
      <Text as="p" variant="bodyXs" tone="disabled">
        Height
      </Text>
      <div className={styles.txtField}>
        <Text as="p" variant="bodyXs" tone="disabled">
          {height}
        </Text>
        <div>
          {" "}
          <Text as="p" variant="bodyXs" tone="disabled">
            px
          </Text>
        </div>
      </div>
    </div>
  );
};

export const Top = ({ top }: { top: number }) => {
  return (
    <div>
      <Text as="p" variant="bodyXs" tone="disabled">
        Top
      </Text>
      <div className={styles.txtField}>
        <Text as="p" variant="bodyXs" tone="disabled">
          {top}
        </Text>
        <div>
          {" "}
          <Text as="p" variant="bodyXs" tone="disabled">
            px
          </Text>
        </div>
      </div>
    </div>
  );
};

export const Left = ({ left }: { left: number }) => {
  return (
    <div>
      <Text as="p" variant="bodyXs" tone="disabled">
        Left
      </Text>
      <div className={styles.txtField}>
        <Text as="p" variant="bodyXs" tone="disabled">
          {left}
        </Text>
        <div>
          {" "}
          <Text as="p" variant="bodyXs" tone="disabled">
            px
          </Text>
        </div>
      </div>
    </div>
  );
};
