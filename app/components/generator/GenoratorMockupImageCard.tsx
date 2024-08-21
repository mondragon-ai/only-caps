import { Card } from "@shopify/polaris";
import { GeneratorStateProps, MockupDocument } from "~/lib/types/mockups";
import styles from "./Mockups.module.css";
import { useCallback } from "react";
import { DraggableData, Position, ResizableDelta, Rnd } from "react-rnd";
import { HatData } from "~/lib/data/mockups";

export const GeneratorMockupImageCard = ({
  mockup,
  setMockup,
}: {
  mockup: MockupDocument;
  setMockup: React.Dispatch<React.SetStateAction<GeneratorStateProps>>;
}) => {
  return (
    <Card padding="200">
      <div className={styles.mockupContainer}>
        <img
          src={HatData[mockup.type].sample}
          alt={mockup.title}
          className={styles.mainImg}
          height="500"
          width="500"
          style={{ position: "absolute", top: 0 }}
        />
        <DraggableResizableImage mockup={mockup} setMockup={setMockup} />
      </div>
    </Card>
  );
};

const DraggableResizableImage = ({
  mockup,
  setMockup,
}: {
  mockup: MockupDocument;
  setMockup: React.Dispatch<React.SetStateAction<GeneratorStateProps>>;
}) => {
  const padding_top =
    mockup.type == "high_profile"
      ? "0px"
      : mockup.type == "flat_bill"
        ? "20px"
        : "-50px";
  const handleDragStop = useCallback(
    (e: any, d: DraggableData) => {
      setMockup((prevMockup) => ({
        ...prevMockup,
        position: {
          top: d.y,
          left: d.x,
        },
      }));
    },
    [setMockup],
  );

  const handleResize = useCallback(
    (
      e: MouseEvent | TouchEvent,
      direction: any,
      ref: HTMLElement,
      delta: ResizableDelta,
      position: Position,
    ) => {
      setMockup((prevMockup) => ({
        ...prevMockup,
        dimension: {
          ...prevMockup.dimension,
          resized_height: ref.offsetHeight,
          resized_width: ref.offsetWidth,
        },
        position: {
          top: position.y,
          left: position.x,
        },
      }));
    },
    [setMockup],
  );

  return (
    <div className={styles.mockupWrapper} style={{ top: padding_top }}>
      <Rnd
        bounds="parent"
        size={{
          width: mockup.dimension.resized_width,
          height: mockup.dimension.resized_height,
        }}
        position={{ x: mockup.position.left, y: mockup.position.top }}
        lockAspectRatio
        onDragStop={handleDragStop}
        maxWidth={400}
        maxHeight={200}
        onResize={handleResize}
      >
        <img
          src={mockup.resized_design}
          alt=""
          style={{
            width: mockup.dimension.resized_width,
            height: mockup.dimension.resized_height,
          }}
        />
      </Rnd>
    </div>
  );
};
