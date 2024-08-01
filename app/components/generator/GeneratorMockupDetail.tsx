import { BlockStack, Card, Text, TextField } from "@shopify/polaris";
import { MockupProps } from "~/lib/types/mockups";
import styles from "./Mockups.module.css";
import { useCallback } from "react";

export const GeneratorMockupDetail = ({
  mockup,
  setMockup,
}: {
  mockup: MockupProps;
  setMockup: React.Dispatch<React.SetStateAction<MockupProps>>;
}) => {
  const handleTitleChange = useCallback(
    (value: string) => {
      setMockup({ ...mockup, name: value });
    },
    [mockup],
  );
  return (
    <Card>
      <BlockStack gap="300">
        <div className={styles.info}>
          <Text as="h2" variant="headingMd">
            Mockup Detail
          </Text>
        </div>
        <div>
          <Text as="p" variant="bodyXs" tone="disabled">
            Title
          </Text>
          <TextField
            value={String(mockup.name)}
            onChange={handleTitleChange}
            label=""
            type="text"
            autoComplete="off"
          />
        </div>
      </BlockStack>
    </Card>
  );
};
