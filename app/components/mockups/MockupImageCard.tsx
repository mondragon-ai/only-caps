import { Card } from "@shopify/polaris";
import { MockupDocument } from "~/lib/types/mockups";
import styles from "./Mockups.module.css";

export const MockupImageCard = ({
  mockup,
  image,
}: {
  mockup: MockupDocument;
  image: string;
}) => {
  const palceholder =
    (mockup.mockup_urls &&
      mockup.mockup_urls[0] &&
      mockup.mockup_urls[0].url) ||
    "";

  const mockup_img = mockup.mockup_urls.filter((i) => {
    return i.alt.toLocaleUpperCase() == image.toLocaleUpperCase();
  })[0];

  return (
    <Card padding={"200"}>
      <img
        src={mockup_img ? mockup_img.url : palceholder}
        alt={mockup.title}
        className={styles.mainImg}
        height={500}
      />
    </Card>
  );
};
