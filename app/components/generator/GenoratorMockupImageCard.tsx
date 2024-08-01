import { Card } from "@shopify/polaris";
import { MockupProps } from "~/lib/types/mockups";
import styles from "./Mockups.module.css";
import { useCallback, useRef } from "react";
import { DraggableData, Position, ResizableDelta, Rnd } from "react-rnd";
import { HatData } from "~/lib/data/mockups";

export const GenoratorMockupImageCard = ({
  mockup,
  setMockup,
}: {
  mockup: MockupProps;
  setMockup: React.Dispatch<React.SetStateAction<MockupProps>>;
}) => {
  return (
    <Card padding="200">
      <div className={styles.mockupContainer}>
        <img
          src={HatData[mockup.type].sample}
          alt={mockup.name}
          className={styles.mainImg}
          height="500"
          width="500"
          style={{ position: "absolute", top: "50px" }}
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
  mockup: MockupProps;
  setMockup: React.Dispatch<React.SetStateAction<MockupProps>>;
}) => {
  const handleDragStop = useCallback(
    (e: any, d: DraggableData) => {
      setMockup((prevMockup) => ({
        ...prevMockup,
        location: {
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
        resized_dimensions: {
          height: ref.offsetHeight,
          width: ref.offsetWidth,
        },
        location: {
          top: position.y,
          left: position.x,
        },
      }));
    },
    [setMockup],
  );

  return (
    <div className={styles.mockupWrapper}>
      <Rnd
        bounds="parent"
        size={{
          width: mockup.resized_dimensions.width,
          height: mockup.resized_dimensions.height,
        }}
        position={{ x: mockup.location.left, y: mockup.location.top }}
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
            width: mockup.resized_dimensions.width,
            height: mockup.resized_dimensions.height,
          }}
        />
      </Rnd>
    </div>
  );
};
