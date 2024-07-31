import { Card } from "@shopify/polaris";
import { MockupProps } from "~/lib/types/mockups";
import styles from "./Mockups.module.css";
import Draggable, {
  DraggableBounds,
  DraggableData,
  DraggableEvent,
} from "react-draggable";
import { useCallback, useEffect, useRef, useState } from "react";

export const MockupImageCard = ({ mockup }: { mockup: MockupProps }) => {
  return (
    <Card padding={"200"}>
      <img
        src={mockup.image}
        alt={mockup.name}
        className={styles.mainImg}
        height={500}
      />
    </Card>
  );
};

export const GenoratorMockupImageCard = ({
  mockup,
}: {
  mockup: MockupProps;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [bounds, setBounds] = useState<DraggableBounds | string>("parent");

  const onStart = useCallback((e: DraggableEvent, data: DraggableData) => {
    // console.log("Event: ", e);
    // console.log("Data: ", data);
  }, []);

  const onStop = useCallback((e: DraggableEvent, data: DraggableData) => {
    // console.log("Event: ", e);
    // console.log("Data: ", data);
  }, []);

  useEffect(() => {
    if (cardRef.current) {
      // const rect = cardRef.current.getBoundingClientRect();
      console.log("\n\n\n");
      console.log({ resize_w: mockup.resized_dimensions.width });
      console.log({ resize_h: mockup.resized_dimensions.height });
      setBounds({
        left: 0,
        top: 0,
        right: 400 - mockup.resized_dimensions.width,
        bottom: 200 - mockup.resized_dimensions.height,
      });
    }
  }, [cardRef]);

  return (
    <Card padding={"200"}>
      <div
        style={{
          height: "500px",
          width: "100%",
          padding: "10px",
          border: "1px solid blue",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={mockup.image}
          alt={mockup.name}
          className={styles.mainImg}
          height="500"
          width="500"
          style={{ position: "absolute" }}
        />
        <div
          style={{
            height: "200px",
            width: "400px",
            border: "1px dotted red",
            borderRadius: "10px",
          }}
          ref={cardRef}
        >
          <Draggable bounds={bounds} onStart={onStart} onStop={onStop}>
            <img src={mockup.resized_design} alt="" style={{ float: "left" }} />
          </Draggable>
        </div>
      </div>
    </Card>
  );
};
