import { Box, Button, Card, MediaCard, VideoThumbnail } from "@shopify/polaris";
import { useState } from "react";
import styles from "./Home.module.css";

export const VideoCard = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  return (
    <>
      {isVideoPlaying ? (
        <div style={{ marginBottom: "1rem" }}>
          <VideoPlayer
            onClose={() => setIsVideoPlaying(false)}
            videoId="GL_6eXIEQx4?si=YXAxIbFAivmqXiXi"
          />
        </div>
      ) : (
        <MediaCard
          title="Quick Tutorial"
          primaryAction={{
            content: "Watch Now",
            onAction: () => setIsVideoPlaying(true),
          }}
          description="Welcome to Only Caps, the ultimate POD mockup generator for hats. Easily create and sell custom hats through your Shopify store. Simply download the app, choose a hat style, upload your design, and publish your product. Orders flow seamlessly from your store to us for printing and shipping, with tracking information automatically updated."
        >
          <VideoThumbnail
            videoLength={80}
            thumbnailUrl="https://cdn.shopify.com/s/files/1/0783/4802/6165/files/Screenshot_2024-07-27_at_11.21.58_AM.png?v=1722090175"
            onClick={() => setIsVideoPlaying(true)}
          />
        </MediaCard>
      )}
    </>
  );
};

export const VideoPlayer = ({
  videoId,
  onClose,
}: {
  videoId: string;
  onClose: () => void;
}) => {
  return (
    <Card>
      <Box paddingBlock="400" width="100%">
        <Button onClick={onClose}>Close</Button>
        <Box paddingBlock="400" width="100%">
          <div className={styles.iFrameCard}>
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              className={styles.iframe}
              allowFullScreen
            ></iframe>
          </div>
        </Box>
      </Box>
    </Card>
  );
};
