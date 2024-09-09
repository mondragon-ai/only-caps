import { Box, Button, Card, MediaCard, VideoThumbnail } from "@shopify/polaris";
import { useState } from "react";
import styles from "./Home.module.css";

export const VideoCard = ({ url }: { url: string }) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <>
      {isVideoPlaying ? (
        <div className={styles.videoWrapper}>
          <VideoPlayer onClose={() => setIsVideoPlaying(false)} url={url} />
        </div>
      ) : (
        <MediaCard
          title="Quick Tutorial"
          primaryAction={{
            content: "Watch Now",
            onAction: () => setIsVideoPlaying(true),
          }}
          description="Welcome to Bigly POD, the ultimate POD mockup generator for shirts & hoodies. Easily create and sell custom apparel through your Shopify store. Simply download the app, choose a apparel style, upload your design, and publish your product. Orders flow seamlessly from your store to us for printing and shipping, with tracking information automatically updated."
        >
          <VideoThumbnail
            videoLength={146}
            thumbnailUrl="https://cdn.shopify.com/s/files/1/0783/4802/6165/files/Screenshot_2024-09-07_at_11.42.19_PM.png?v=1725763369"
            onClick={() => setIsVideoPlaying(true)}
          />
        </MediaCard>
      )}
    </>
  );
};

interface VideoPlayerProps {
  url: string;
  onClose: () => void;
}

export const VideoPlayer = ({ url, onClose }: VideoPlayerProps) => {
  return (
    <Card>
      <Box paddingBlock="400" width="100%">
        <Button onClick={onClose}>Close</Button>
        <Box paddingBlock="400" width="100%">
          <div className={styles.iFrameCard}>
            <iframe
              src={url}
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                border: "none",
              }}
              className={styles.iframe}
              allowFullScreen
              title="Initial Video - How To"
            ></iframe>
          </div>
        </Box>
      </Box>
    </Card>
  );
};
