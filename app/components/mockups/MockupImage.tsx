import {
  BlockStack,
  Button,
  Card,
  DropZone,
  InlineGrid,
  Text,
} from "@shopify/polaris";
import { MockupProps } from "~/lib/types/mockups";
import { DeleteIcon } from "@shopify/polaris-icons";
import styles from "./Mockups.module.css";
import { useCallback, useState } from "react";

export const MockupImage = ({ mockup }: { mockup: MockupProps }) => {
  return (
    <Card>
      <BlockStack gap={"400"}>
        <Text as={"h4"} variant="headingMd">
          Your Design
        </Text>
        <img src={mockup.design} alt="" className={styles.designImg} />
      </BlockStack>
    </Card>
  );
};

export const GeneratorMockupImage = ({ mockup }: { mockup: MockupProps }) => {
  const [toUpload, setToUpload] = useState(true);
  return (
    <Card>
      <BlockStack gap={"400"}>
        <InlineGrid gap={"200"} alignItems="start" columns={"2"}>
          <Text as={"h4"} variant="headingMd">
            Add Your Design
          </Text>
          <Button size="micro" onClick={() => setToUpload(!toUpload)}>
            {toUpload ? "Generate Image" : "Upload Image"}
          </Button>
        </InlineGrid>

        {mockup.design !== "" ? (
          <img src={mockup.design} alt="" className={styles.designImg} />
        ) : (
          <div>{toUpload ? <UploadImage /> : null}</div>
        )}
      </BlockStack>
    </Card>
  );
};

const UploadImage = () => {
  const [file, setFile] = useState<File>();

  const handleDropZoneDrop = useCallback(
    (_dropFiles: File[], acceptedFiles: File[], _rejectedFiles: File[]) =>
      setFile(acceptedFiles[0]),
    [],
  );

  const validImageTypes = ["image/gif", "image/jpeg", "image/png"];

  const fileUpload = !file && <DropZone.FileUpload />;
  const uploadedFile = file && (
    <img
      src={
        validImageTypes.includes(file.type)
          ? window.URL.createObjectURL(file)
          : ""
      }
      alt={file.name}
      style={{ border: "none" }}
      height={200}
      className={styles.designImg}
    />
  );

  return (
    <BlockStack gap={"150"}>
      <DropZone allowMultiple={false} onDrop={handleDropZoneDrop}>
        {uploadedFile}
        {fileUpload}
      </DropZone>

      {file !== undefined && (
        <Button icon={DeleteIcon} onClick={() => setFile(undefined)} />
      )}
    </BlockStack>
  );
};
