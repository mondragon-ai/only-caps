import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "./storage";
import { MockupProps } from "../types/mockups";

// Upload images to storage bucket
export const uploadToServer = async (
  image: any,
  setMockup: React.Dispatch<React.SetStateAction<MockupProps>>,
  mockup: MockupProps,
) => {
  const body = new FormData();

  if (image === undefined) {
    alert("Please choose a file first!");
    throw new Error("File not present");
  } else {
    const name = "" + (mockup.domain || "") + "_" + new Date().getTime();
    console.log(name);

    // Call Firebase storage bucket
    const storageRef = ref(storage, "/mockups/designs/" + name);

    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        );
        // Update progress
        setMockup((pre) => ({
          ...pre,
          percent: 0,
        }));
      },
      (err) => console.log(err),
      () => {
        // Get download URL
        getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
          console.log(url);
          setMockup((pre) => ({
            ...pre,
            design: "",
            percent: 0,
          }));
        });
      },
    );
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
