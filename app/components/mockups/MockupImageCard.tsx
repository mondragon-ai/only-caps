import { Card } from "@shopify/polaris";
import { MockupDocument } from "~/lib/types/mockups";
import styles from "./Mockups.module.css";

export const MockupImageCard = ({ mockup }: { mockup: MockupDocument }) => {
  return (
    <Card padding={"200"}>
      <img
        src={
          (mockup.mockup_urls &&
            mockup.mockup_urls[0] &&
            mockup.mockup_urls[0].url) ||
          ""
        }
        alt={mockup.title}
        className={styles.mainImg}
        height={500}
      />
    </Card>
  );
};
