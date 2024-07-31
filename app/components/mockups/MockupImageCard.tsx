import { Card } from "@shopify/polaris";
import { MockupProps } from "~/lib/types/mockups";
import styles from "./Mockups.module.css";

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
