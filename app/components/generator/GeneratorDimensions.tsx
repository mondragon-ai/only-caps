import {
  BlockStack,
  Button,
  ButtonGroup,
  Card,
  Text,
  TextField,
} from "@shopify/polaris";
import { MockupProps } from "~/lib/types/mockups";
import styles from "./Mockups.module.css";
import { useCallback } from "react";
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  ArrowLeftIcon,
} from "@shopify/polaris-icons";

export const GeneratorDimensions = ({
  mockup,
  setMockup,
}: {
  mockup: MockupProps;
  setMockup: React.Dispatch<React.SetStateAction<MockupProps>>;
}) => {
  const handleWidthChange = useCallback(
    (value: string) => {
      setMockup({
        ...mockup,
        resized_dimensions: {
          ...mockup.resized_dimensions,
          width: Number(value),
        },
      });
    },
    [mockup],
  );

  const handleHeightChange = useCallback(
    (value: string) => {
      setMockup({
        ...mockup,
        resized_dimensions: {
          ...mockup.resized_dimensions,
          height: Number(value),
        },
      });
    },
    [mockup],
  );

  const handleTopChange = useCallback(
    (value: string) => {
      setMockup({
        ...mockup,
        location: { ...mockup.location, top: Number(value) },
      });
    },
    [mockup],
  );

  const handleLeftChange = useCallback(
    (value: string) => {
      setMockup({
        ...mockup,
        location: { ...mockup.location, left: Number(value) },
      });
    },
    [mockup],
  );

  const alignLeft = useCallback(() => {
    setMockup({
      ...mockup,
      location: { ...mockup.location, left: Number(0) },
    });
  }, [mockup]);

  const alignTop = useCallback(() => {
    setMockup({
      ...mockup,
      location: { ...mockup.location, top: Number(0) },
    });
  }, [mockup]);

  const alignBottom = useCallback(() => {
    setMockup({
      ...mockup,
      location: {
        ...mockup.location,
        top: 200 - Number(mockup.resized_dimensions.height),
      },
    });
  }, [mockup]);

  const alignRight = useCallback(() => {
    setMockup({
      ...mockup,
      location: {
        ...mockup.location,
        left: 400 - mockup.resized_dimensions.width,
      },
    });
  }, [mockup]);

  const alignMiddleHorizontal = useCallback(() => {
    setMockup({
      ...mockup,
      location: {
        ...mockup.location,
        left: Math.round((400 - mockup.resized_dimensions.width) / 2),
      },
    });
  }, [mockup]);

  const alignMiddleVertical = useCallback(() => {
    setMockup({
      ...mockup,
      location: {
        ...mockup.location,
        top: Math.round((200 - mockup.resized_dimensions.height) / 2),
      },
    });
  }, [mockup]);

  return (
    <Card>
      <BlockStack gap={"400"}>
        <Text as={"h4"} variant="headingMd">
          Dimensions
        </Text>
        <div className={styles.sizeWrapper}>
          <div>
            <Text as="p" variant="bodyXs" tone="disabled">
              Width
            </Text>
            <TextField
              value={String(mockup.resized_dimensions.width)}
              onChange={handleWidthChange}
              label=""
              type="number"
              suffix="px"
              autoComplete="off"
            />
          </div>
          <div>
            <Text as="p" variant="bodyXs" tone="disabled">
              Height
            </Text>
            <TextField
              value={String(mockup.resized_dimensions.height)}
              onChange={handleHeightChange}
              label=""
              type="number"
              suffix="px"
              autoComplete="off"
            />
          </div>
        </div>

        <div className={styles.sizeWrapper}>
          <div>
            <Text as="p" variant="bodyXs" tone="disabled">
              Top
            </Text>
            <TextField
              value={String(mockup.location.top)}
              onChange={handleTopChange}
              label=""
              type="number"
              suffix="px"
              autoComplete="off"
            />
          </div>
          <div>
            <Text as="p" variant="bodyXs" tone="disabled">
              Left
            </Text>
            <TextField
              value={String(mockup.location.left)}
              onChange={handleLeftChange}
              label=""
              type="number"
              suffix="px"
              autoComplete="off"
            />
          </div>
        </div>

        <div className={styles.sizeWrapper}>
          <div>
            <ButtonGroup variant="segmented" fullWidth>
              <Button icon={ArrowUpIcon} onClick={alignTop}></Button>
              <Button
                onClick={alignMiddleVertical}
                icon={
                  <svg
                    fill="#000000"
                    width="15px"
                    height="15px"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path d="M10 12l-3 3h2v4h2v-4h2l-3-3zm3-7h-2V1H9v4H7l3 3 3-3zm5 5c0-.553-.048-1-.6-1H2.6c-.552 0-.6.447-.6 1 0 .551.048 1 .6 1h14.8c.552 0 .6-.449.6-1z"></path>
                    </g>
                  </svg>
                }
              ></Button>
              <Button icon={ArrowDownIcon} onClick={alignBottom}></Button>
            </ButtonGroup>
          </div>
          <div>
            <ButtonGroup variant="segmented" fullWidth>
              <Button icon={ArrowLeftIcon} onClick={alignLeft}></Button>
              <Button
                onClick={alignMiddleHorizontal}
                icon={
                  <svg
                    fill="#000000"
                    width="15px"
                    height="15px"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    transform="rotate(90)"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path d="M10 12l-3 3h2v4h2v-4h2l-3-3zm3-7h-2V1H9v4H7l3 3 3-3zm5 5c0-.553-.048-1-.6-1H2.6c-.552 0-.6.447-.6 1 0 .551.048 1 .6 1h14.8c.552 0 .6-.449.6-1z"></path>
                    </g>
                  </svg>
                }
              ></Button>
              <Button icon={ArrowRightIcon} onClick={alignRight}></Button>
            </ButtonGroup>
          </div>
        </div>
      </BlockStack>
    </Card>
  );
};
