import { Card } from "@shopify/polaris";
import { MockupProps } from "~/lib/types/mockups";
import styles from "./Mockups.module.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { Rnd } from "react-rnd";

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
  setMockup,
}: {
  mockup: MockupProps;
  setMockup: React.Dispatch<React.SetStateAction<MockupProps>>;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState({
    x: 0,
    y: 0,
    width: mockup.resized_dimensions.width,
    height: mockup.resized_dimensions.height,
  });

  useEffect(() => {
    setState({
      ...state,
      width: mockup.resized_dimensions.width,
      height: mockup.resized_dimensions.height,
    });
  }, [mockup]);

  console.log("\n\n\n");
  console.log("state", state);
  console.log("resized_dimensions", mockup.resized_dimensions);
  console.log("location", mockup.location);

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
            position: "relative",
            height: "200px",
            width: "400px",
            border: "1px dotted red",
            borderRadius: "10px",
          }}
          ref={cardRef}
        >
          <Rnd
            bounds="parent"
            size={{
              width: state.width,
              height: state.height,
            }}
            position={{ x: state.x, y: state.y }}
            lockAspectRatio
            onDragStop={(e, d) => {
              setState({ ...state, x: d.x, y: d.y });

              setMockup((prevMockup) => ({
                ...prevMockup,
                location: {
                  top: d.y,
                  left: d.x,
                },
              }));
            }}
            onResize={(e, direction, ref, delta, position) => {
              setState({
                ...state,
                width: ref.offsetWidth,
                height: ref.offsetHeight,
                ...position,
              });

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
            }}
          >
            <img
              src={mockup.resized_design}
              alt=""
              style={{ width: state.width, height: state.height }}
            />
          </Rnd>
        </div>
      </div>
    </Card>
  );
};
