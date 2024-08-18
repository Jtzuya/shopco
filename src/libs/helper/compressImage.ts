import short from 'short-unique-id'
import Compressor from "compressorjs";

export default async function compressImage(file: File): Promise<File> {
  return new Promise((resolve, reject) => {
    new Compressor(file, {
      quality: 0.5,
      convertSize: 5000000,
      success(result) {
        const imageNewName = (new short({ length: 10 })).rnd();
        resolve(new File([result], imageNewName, { type: "image/webp" }));
      },
      error(err) {
        reject(err);
      },
    })
  })
}