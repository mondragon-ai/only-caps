import {
  BlockStack,
  Button,
  Card,
  DropZone,
  InlineGrid,
  Text,
} from "@shopify/polaris";
import { GeneratorStateProps, MockupDocument } from "~/lib/types/mockups";
import { DeleteIcon, WandIcon, UploadIcon } from "@shopify/polaris-icons";
import styles from "./Mockups.module.css";
import { useCallback, useState } from "react";

export const GeneratorMockupImage = ({
  mockup,
  setMockup,
}: {
  mockup: GeneratorStateProps;
  setMockup: React.Dispatch<React.SetStateAction<GeneratorStateProps>>;
}) => {
  const [toUpload, setToUpload] = useState(true);

  const handleDelete = () => {
    setMockup({
      ...mockup,
      design_url: "",
      dimension: {
        original_width: 0,
        original_height: 0,
        resized_height: 0,
        resized_width: 0,
        blank_width: 0,
        blank_height: 0,
      },
      resized_design: "",
      position: { top: 0, left: 0 },
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

        {mockup.design_url ? (
          <>
            <img
              src={mockup.design_url}
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
  mockup: MockupDocument;
  setMockup: React.Dispatch<React.SetStateAction<GeneratorStateProps>>;
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
          if (height > MAX_HEIGHT) {
            width = Math.round((width * MAX_HEIGHT) / height);
            height = MAX_HEIGHT;
          }

          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, width, height);

          const resizedDataUrl = canvas.toDataURL(selectedFile.type);

          setMockup((prevMockup) => ({
            ...prevMockup,
            design_url: objectUrl,
            dimension: {
              original_width: img.width,
              original_height: img.height,
              resized_height: height,
              resized_width: width,
              blank_width: 1200,
              blank_height: 1200,
            },
            resized_design: resizedDataUrl,
            original_file: selectedFile,
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
