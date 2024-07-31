import { Card } from "@shopify/polaris";
import { MockupProps } from "~/lib/types/mockups";
import styles from "./Mockups.module.css";
import { useRef } from "react";
import { Rnd } from "react-rnd";
import { HatData } from "~/lib/data/mockups";

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

  return (
    <Card padding={"200"}>
      <div
        style={{
          height: "600px",
          width: "100%",
          padding: "10px",
          border: "1px solid transparent",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={HatData[mockup.type].sample}
          alt={mockup.name}
          className={styles.mainImg}
          height="500"
          width="500"
          style={{ position: "absolute", top: "50px" }}
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
              width: mockup.resized_dimensions.width,
              height: mockup.resized_dimensions.height,
            }}
            position={{ x: mockup.location.left, y: mockup.location.top }}
            lockAspectRatio
            onDragStop={(e, d) => {
              setMockup((prevMockup) => ({
                ...prevMockup,
                location: {
                  top: d.y,
                  left: d.x,
                },
              }));
            }}
            maxWidth={400}
            maxHeight={200}
            onResize={(e, direction, ref, delta, position) => {
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
              style={{
                width: mockup.resized_dimensions.width,
                height: mockup.resized_dimensions.height,
              }}
            />
          </Rnd>
        </div>
      </div>
    </Card>
  );
};
