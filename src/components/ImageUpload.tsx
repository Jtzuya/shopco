import { useRef, ChangeEvent } from "react";
// import { createRoot } from 'react-dom/client';
// import ProductImage from "./admin/ProductImage";
import GetErrorMessage from "../helpers/GetErrorMessage";
import { v4 as uuidv4 } from 'uuid';

type FileToServer = {
  name: string;
  type: string;
  size: number;
  uuid: string;
}

let serverOrigin = import.meta.env.REACT_APP_SERVER_DEVELOPMENT;

if (import.meta.env.REACT_APP_NODE_ENV === 'production') {
  serverOrigin = import.meta.env.REACT_APP_SERVER_PRODUCTION 
} 

export default function ImageUpload() {
  // const [images, setImages] = useState<string[]>([]) // should be an array
  const media = useRef<HTMLDivElement>(null)

  async function fileHandler(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault()
    const inputFiles = e.target.files
    if (!inputFiles) return 'no data to be saved' 
    
    const errorArr = []
    const filesToServer: FileToServer[] = []
    const newFilesArr = []

    for (const _ of inputFiles) {
      // compress file size
      try {
        const fileSize = _.size / 1024 / 1024

        if (fileSize > 5) throw new Error(`${_.name} size exceeds 5 MiB`)

        const imageObject = await compressor(_, { quality: 0.5, type: 'image/webp' })

        filesToServer.push({
          name: (_.name).split('.')[0],
          type: imageObject.type,
          size: imageObject.size,
          uuid: uuidv4()
        })

        newFilesArr.push(new File([imageObject.blob], (_.name).split('.')[0], { type: imageObject.type }))

      } catch (error) {
        errorArr.push(GetErrorMessage(error))
      }
    }

    try {
      const endpoint = new URL('/request-image-sign', serverOrigin)
      const getImageSigns = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({files: filesToServer})
      })

      const result = await getImageSigns.json()
      
      if (!getImageSigns.ok) {throw new Error(result.message)}

      const { presigned_url } = result
      // debugger
      // now save the image to bucket directly
      await fetch(presigned_url, {
        method: 'PUT',
        headers: {
          'Content-Type': newFilesArr[0].type,
        },
        body: newFilesArr[0]
      })

      // const brr = await gottaCatchEmAll.json()
      // console.log('wo', brr)

    } catch (error) {
      return alert(GetErrorMessage(error))
    }
  }

  // async function imageHandler(files: FileList | null) {
  //   if (!files) {
  //     return 'file is empty'
  //     console.log(images) // just to ignore the images state atm
  //   }
    
  //   // const { name, size, type } = value.files[0]

  //   // We'll store the files in this data transfer object
  //   // const dataTransfer = new DataTransfer();

  //   // dataTransfer.items.add(compressedImage);
  //   // setImages(compressedImage)
  //   let size = 0

  //   const newImageArr: string[] = []
  //   for (const file of files) {
  //     size += file.size
  //     try {
  //       const compressedImageData = await compressImage(file, {
  //         quality: 0.5, // compression 0 ~ 1. 1 is no compression
  //         type: 'image/webp', // image type to be converted
  //       })
        
  //       if (compressedImageData) {
  //         // throw new Error('failed')
  //         const { blob, name, type } = compressedImageData
  
  //         const _ = new File([blob], name, { type: type })
  //         const _image = URL.createObjectURL(_)
  //         newImageArr.push(_image)          
  //       }
  //     } catch (error) {
  //       console.log('image failed to compress')
  //       continue 
  //     }
  //   }

  //   setImages(prev => [...prev, ...newImageArr])
  //   // console.log(newImageArr)
  //   console.log(size)

  //   if (!media.current) return;

  //   newImageArr.forEach(_image => {
  //     console.log(_image)
  //     const temp = document.createElement('div');
  //     document.body.appendChild(temp)
  //     const root = createRoot(temp)
  
  //     root.render(<ProductImage src={_image} />)
  
  //     // Wait for the component to render
  //     setTimeout(() => {
  //       if (media.current) {
  //         while (temp.firstChild) {
  //           media.current.appendChild(temp.firstChild);
  //         }
  //       }
  //       // Clean up the temporary container
  //       document.body.removeChild(temp);
  //     }, 500);
  //   })

  // }

  async function compressor(file: File, options:{ quality: number, type: string }) {
    const { quality = 1, type = file.type } = options;

    // Get as image data
    const imageBitmap = await createImageBitmap(file);

    // Draw to canvas
    const canvas = document.createElement('canvas');
    canvas.width = imageBitmap.width;
    canvas.height = imageBitmap.height;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      ctx.drawImage(imageBitmap, 0, 0);
    }

    // Turn into Blob
    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, type, quality)
    );

    if (!blob) {
      throw new Error(`${file.name.split('.')[0]} is not a blob`)
    }

    // Turn Blob into File
    return {
      blob,
      type: blob.type,
      size: blob.size
    } 
  }

  return (
    <div className="form__field">
      <span>Media</span>
      <div className="form__field-media" ref={media}>
        <label>
          <input onChange={fileHandler} type="file" name="image" id="image" multiple accept="image/png, image/jpeg, image/webp, image/avif"></input>
        </label>
      </div>
    </div>
  )
}