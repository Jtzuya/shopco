import { server_origin } from "../../env";
import GetErrorMessage from "../../helpers/GetErrorMessage";

type FileToServer = {
  name: string;
}

// Will be called inside Promise.all
export async function uploadFileToBucket(presignedUrl: string, file: File) {
  return fetch(presignedUrl, {
    method: "PUT",
    body: file,
    headers: { "Content-Type": file.type },
  });
}

export async function getImageUrls(filesToServer: FileToServer[], productId: string) {
  const endpoint = new URL(`/get-images/${productId}`, server_origin);
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify({ files: filesToServer }),
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error("Error getting image URLs from S3");
    }
    return response      
  } catch (error) {
    return { message: GetErrorMessage(error) }
  }
}