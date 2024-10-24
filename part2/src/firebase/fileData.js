import { getStorage } from "firebase/storage";
import { firebaseApp } from "./app.js";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

// export Initialize Storage
export const firebaseStorage = getStorage(firebaseApp);

/**
 * Upload File To Firebase Storage
 */

export const uploadFile = async (file) => {
  // code for image upload

  const filEData = await uploadBytesResumable(
    ref(firebaseStorage, file.name),
    file
  );

  const fileLink = await getDownloadURL(filEData.ref);

  // return file link
  return fileLink;
};
