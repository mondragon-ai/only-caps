import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "./storage";
import { GeneratorStateProps, MockupProps } from "../types/mockups";

// Upload images to storage bucket
export const uploadToServer = async (
  image: File | null,
  setMockup: React.Dispatch<React.SetStateAction<GeneratorStateProps>>,
  mockup: MockupProps,
): Promise<string> => {
  if (!image) {
    alert("Please choose a file first!");
    throw new Error("File not present");
  } else {
    const name = `${mockup.name || ""}_${new Date().getTime()}`;

    // Call Firebase storage bucket
    const storageRef = ref(
      storage,
      `/${mockup.domain || "mockups"}/designs/${name}`,
    );

    const uploadTask = uploadBytesResumable(storageRef, image);

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
  // Split the URL by "/"
  const parts = url.split("/");
  console.log(parts);

  // Find the index of "store"
  const storeIndex = parts.indexOf("store");

  // Check if "store" exists in the URL and there is an element after it
  if (storeIndex !== -1 && storeIndex < parts.length - 1) {
    // Return the element after "store"
    return parts[storeIndex + 1];
  } else {
    // If "store" is not found or there is no element after it, return null or handle accordingly
    return null;
  }
}
