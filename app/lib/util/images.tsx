import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { GeneratorStateProps, MockupDocument } from "../types/mockups";
import { storage } from "./storage";

// Upload images to storage bucket
export const uploadToServer = async (
  image: File | null,
  setMockup: React.Dispatch<React.SetStateAction<GeneratorStateProps>>,
  mockup: MockupDocument,
): Promise<string> => {
  if (!image) {
    alert("Please choose a file first!");
    throw new Error("File not present");
  } else {
    const name = `${""}_${new Date().getTime()}`;

    // Define metadata
    const metadata = {
      contentType: image.type,
      customMetadata: {
        uploadedBy: "bigly-pod",
        domain: mockup.domain || "unknown",
      },
    };

    // Call Firebase storage bucket
    const storageRef = ref(
      storage,
      `/${mockup.domain || "mockups"}/designs/${name}`,
    );

    const uploadTask = uploadBytesResumable(storageRef, image, metadata);

    const url = await new Promise<string>((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
          );
          // Update progress
          setMockup((prev) => ({
            ...prev,
            percent: progress,
          }));
        },
        (err) => {
          console.error(err);
          reject(err);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            setMockup((prev) => ({
              ...prev,
              design: downloadURL,
              percent: 0,
            }));
            resolve(downloadURL);
          } catch (err) {
            console.error(err);
            reject(err);
          }
        },
      );
    });

    return url;
  }
};

export function getElementAfterStore(url: string) {
  const parts = url.split("/");
  const storeIndex = parts.indexOf("store");

  if (storeIndex !== -1 && storeIndex < parts.length - 1) {
    return parts[storeIndex + 1];
  } else {
    return null;
  }
}
