import {
  BlockStack,
  Button,
  Card,
  DropZone,
  InlineGrid,
  Text,
} from "@shopify/polaris";
import { MockupProps } from "~/lib/types/mockups";
import { DeleteIcon, WandIcon, UploadIcon } from "@shopify/polaris-icons";
import styles from "./Mockups.module.css";
import { useCallback, useState } from "react";

export const GeneratorMockupImage = ({
  mockup,
  setMockup,
}: {
  mockup: MockupProps;
  setMockup: React.Dispatch<React.SetStateAction<MockupProps>>;
}) => {
  const [toUpload, setToUpload] = useState(true);

  const handleDelete = () => {
    setMockup({
      ...mockup,
      design: "",
      design_dimensions: { width: 0, height: 0 },
      resized_design: "",
      resized_dimensions: { width: 0, height: 0 },
      location: { top: 0, left: 0 },
    });
  };

  return (
    <Card>
      <BlockStack gap="400">
        <InlineGrid gap="200" alignItems="start" columns="2">
          <Text as="h4" variant="headingMd">
            Add Your Design
          </Text>
          <Button
            icon={toUpload ? WandIcon : UploadIcon}
            size="micro"
            onClick={() => setToUpload(!toUpload)}
          >
            {toUpload ? "Generate Image" : "Upload Image"}
          </Button>
        </InlineGrid>

        {mockup.design ? (
          <>
            <img
              src={mockup.design}
              alt="Mockup design"
              className={styles.designImg}
            />
            <Button icon={DeleteIcon} onClick={handleDelete} />
          </>
        ) : (
          toUpload && <UploadImage setMockup={setMockup} mockup={mockup} />
        )}
      </BlockStack>
    </Card>
  );
};

const UploadImage = ({
  mockup,
  setMockup,
}: {
  mockup: MockupProps;
  setMockup: React.Dispatch<React.SetStateAction<MockupProps>>;
}) => {
  const handleDropZoneDrop = useCallback(
    (_dropFiles: File[], acceptedFiles: File[], _rejectedFiles: File[]) => {
      const selectedFile = acceptedFiles[0];

      if (selectedFile) {
        const img = new Image();
        const objectUrl = window.URL.createObjectURL(selectedFile);
        img.src = objectUrl;
        img.onload = () => {
          const MAX_WIDTH = 300;
          const MAX_HEIGHT = 120;
          let { width, height } = img;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height = Math.round((height * MAX_WIDTH) / width);
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width = Math.round((width * MAX_HEIGHT) / height);
              height = MAX_HEIGHT;
            }
          }

          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, width, height);

          const resizedDataUrl = canvas.toDataURL(selectedFile.type);

          setMockup((prevMockup) => ({
            ...prevMockup,
            design: objectUrl,
            resized_design: resizedDataUrl,
            design_dimensions: { width: img.width, height: img.height },
            resized_dimensions: { width, height },
          }));
        };
      }
    },
    [setMockup],
  );

  const validImageTypes = ["image/gif", "image/jpeg", "image/png"];

  return (
    <BlockStack gap="150">
      <DropZone
        allowMultiple={false}
        onDrop={handleDropZoneDrop}
        accept={validImageTypes.join(",")}
        type="image"
      >
        <DropZone.FileUpload actionHint="Accepts .gif, .jpg, and .png" />
      </DropZone>
    </BlockStack>
  );
};
