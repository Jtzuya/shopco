import { FileToBucket } from "../../types/Product"

type SignedImage = {
  name: string;
  size?: number;
  type?: string;
  url: string;
}

/**
 * 
 * @param files 
 * @param images 
 * @returns true if there are images successully pushed in bucket, else false
 */
export default async function bucket(files: File[] = [], images: SignedImage[] = []) {
  // These are images that aren't saved in the s3 bucket
  if (!files || !images) return false
  if (files && files.length < 1 || images && images.length < 1) return false

  const segregateFilesToBucket: FileToBucket[] = [];
  files.map((file: File) => {
    for (let i = 0; i < images.length; i++) {
      if (images[i].name === file.name) {
        segregateFilesToBucket.push({
          signed_url: images[i].url,
          file
        })
      }
    }
  })

  if (segregateFilesToBucket.length < 1) return false

  try {
    await Promise.all(segregateFilesToBucket.map(item => uploadFileToBucket(item.signed_url, item.file)))
    console.log('successful saved to bucket')
    return true
  } catch (error) {
    return false
  }
}

async function uploadFileToBucket(presignedUrl: string, file: File) {
  return fetch(presignedUrl, {
    method: "PUT",
    body: file,
    headers: { "Content-Type": file.type },
  });
}
