import { BlockStack, Card, Text, TextField } from "@shopify/polaris";
import { GeneratorStateProps, MockupDocument } from "~/lib/types/mockups";
import styles from "./Mockups.module.css";
import { useCallback } from "react";

export const GeneratorMockupDetail = ({
  mockup,
  setMockup,
}: {
  mockup: MockupDocument;
  setMockup: React.Dispatch<React.SetStateAction<GeneratorStateProps>>;
}) => {
  const handleTitleChange = useCallback(
    (value: string) => {
      setMockup((prevMockup) => ({ ...prevMockup, title: value }));
    },
    [setMockup],
  );

  return (
    <Card>
      <BlockStack gap="300">
        <div className={styles.info}>
          <Text as="h2" variant="headingMd">
            Mockup Detail
          </Text>
        </div>
        <TextFieldInput
          label="Title"
          value={mockup.title}
          onChange={handleTitleChange}
        />
      </BlockStack>
    </Card>
  );
};

const TextFieldInput = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) => (
  <div>
    <Text as="p" variant="bodyXs" tone="disabled">
      {label}
    </Text>
    <TextField
      value={value}
      onChange={onChange}
      label=""
      type="text"
      autoComplete="off"
    />
  </div>
);
