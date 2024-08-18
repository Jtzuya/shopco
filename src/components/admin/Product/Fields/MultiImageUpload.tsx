import { useRef, ChangeEvent, useState } from "react";
import { Image } from "../../../../types/Image";
import GetErrorMessage from "../../../../helpers/GetErrorMessage";
import compressImage from "../../../../libs/helper/compressImage";

type Prop = {
  loader          ?: boolean;
  /** Should be a key that exists in the type you are referencing when rendering this input. */
  mainkeyTarget    : string;
  /** Should be a key that exists in the type you are referencing when rendering this input. */
  uid              : string;

  /** Input's value */
  initialValue     : Image[] | [];
  
  callbackUpload: (keys: string, value: File, order: number) => void;
  callbackDelete: (image: Image) => void;
  callbackMove?: (images: Image[] | [], files: File[] | []) => void;
  files: File[] | [];
}

export default function MultiImageUpload(props: Prop) {
  const { 
    loader,
    mainkeyTarget, 
    initialValue, 
    uid,
    callbackUpload,
    callbackDelete,
    callbackMove,
    files
  } = props

  const [draggedItem, setDraggedItem]         = useState<number | null>(null);
  const [draggedOverItem, setDraggedOverItem] = useState<number | null>(null);
  const upload                                = useRef<HTMLInputElement>(null);
  const media                                 = useRef<HTMLDivElement>(null);

  async function fileHandler(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const keys = e.target.getAttribute('name');
    const inputFiles = e.target.files;

    if (!inputFiles) { return 'no data to be saved'; } 
    if (!keys) { return 'missing keys'; }

    const errorArr = []

    for (let i = 0; i < inputFiles.length; i++) {
      const file = inputFiles[i]

      try {
        const fileSize = file.size / 1024 / 1024;
        if (fileSize > 5) throw new Error(`${file.name} size exceeds 5 MiB`);
  
        const compressedFile = await compressImage(file);
        const order = initialValue.length + i
        callbackUpload(keys, compressedFile, order)
      } catch (error) {
        errorArr.push(GetErrorMessage(error));
      }
    }
  }

  function deleteImage(image: Image) {
    callbackDelete(image)

    if (initialValue.length - 1 === 0 && upload && upload.current) {
      upload.current.value = ''
    }
  }

  function handleDragStart (e: React.DragEvent<HTMLDivElement>, id: number) {
    if (!e.dataTransfer) return
    e.dataTransfer.setData("id", String(id));
    setDraggedItem(id);
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>, id: number) {
    e.preventDefault();
    setDraggedOverItem(id)
  }

  function handleDragDrop (e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();

    // if (!draggedItem || !draggedOverItem) return; index 0 will be skipped because !0 is truthy
    if (draggedItem === null || draggedOverItem === null) return;

    // skip similar index/image
    if (draggedItem === draggedOverItem) return;

    const newImages: Image[] = []
    const newImagesFileArrangement: File[] = []

    for (let i = 0; i < initialValue.length; i++) {
      const imageIdx = i === draggedOverItem ? draggedItem : i === draggedItem ? draggedOverItem : i;
      const idx = i === draggedOverItem ? draggedOverItem : i === draggedItem ? draggedItem : i;

      newImages[idx] = {
        ...initialValue[imageIdx],
        sort_order_id: idx
      }

      if(files && files.length > 0) {
        if (files[i]) {
          newImagesFileArrangement.push(files[i])
        }
      }
    }
    
    callbackMove(newImages, newImagesFileArrangement)
  }
  
  function handleDragEnd() {
    console.log(initialValue)
    setDraggedItem(null);
  }

  return (
    <div className={`form__field ${loader ? 'form__field--skeleton' : ''}`}>
      <p>{uid.split('_').join(' ')}</p>
      <div className="form__field-media" ref={media}>
        {
          initialValue.length > 0 ? 
            initialValue.map((image, imageIdx) => {
              return (
                <div 
                  key={imageIdx} 
                  className="form__field-img"
                  draggable
                  onDragStart={e => handleDragStart(e, image.sort_order_id)}
                  onDragOver={e => handleDragOver(e, image.sort_order_id)}
                  onDrop={e => handleDragDrop(e)}
                  onDragEnd={handleDragEnd}
                >
                  <span className="form__field-img-delete" onClick={() => deleteImage(image)}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16.875 3.75H13.75V3.125C13.75 2.62772 13.5525 2.15081 13.2008 1.79917C12.8492 1.44754 12.3723 1.25 11.875 1.25H8.125C7.62772 1.25 7.15081 1.44754 6.79917 1.79917C6.44754 2.15081 6.25 2.62772 6.25 3.125V3.75H3.125C2.95924 3.75 2.80027 3.81585 2.68306 3.93306C2.56585 4.05027 2.5 4.20924 2.5 4.375C2.5 4.54076 2.56585 4.69973 2.68306 4.81694C2.80027 4.93415 2.95924 5 3.125 5H3.75V16.25C3.75 16.5815 3.8817 16.8995 4.11612 17.1339C4.35054 17.3683 4.66848 17.5 5 17.5H15C15.3315 17.5 15.6495 17.3683 15.8839 17.1339C16.1183 16.8995 16.25 16.5815 16.25 16.25V5H16.875C17.0408 5 17.1997 4.93415 17.3169 4.81694C17.4342 4.69973 17.5 4.54076 17.5 4.375C17.5 4.20924 17.4342 4.05027 17.3169 3.93306C17.1997 3.81585 17.0408 3.75 16.875 3.75ZM8.75 13.125C8.75 13.2908 8.68415 13.4497 8.56694 13.5669C8.44973 13.6842 8.29076 13.75 8.125 13.75C7.95924 13.75 7.80027 13.6842 7.68306 13.5669C7.56585 13.4497 7.5 13.2908 7.5 13.125V8.125C7.5 7.95924 7.56585 7.80027 7.68306 7.68306C7.80027 7.56585 7.95924 7.5 8.125 7.5C8.29076 7.5 8.44973 7.56585 8.56694 7.68306C8.68415 7.80027 8.75 7.95924 8.75 8.125V13.125ZM12.5 13.125C12.5 13.2908 12.4342 13.4497 12.3169 13.5669C12.1997 13.6842 12.0408 13.75 11.875 13.75C11.7092 13.75 11.5503 13.6842 11.4331 13.5669C11.3158 13.4497 11.25 13.2908 11.25 13.125V8.125C11.25 7.95924 11.3158 7.80027 11.4331 7.68306C11.5503 7.56585 11.7092 7.5 11.875 7.5C12.0408 7.5 12.1997 7.56585 12.3169 7.68306C12.4342 7.80027 12.5 7.95924 12.5 8.125V13.125ZM12.5 3.75H7.5V3.125C7.5 2.95924 7.56585 2.80027 7.68306 2.68306C7.80027 2.56585 7.95924 2.5 8.125 2.5H11.875C12.0408 2.5 12.1997 2.56585 12.3169 2.68306C12.4342 2.80027 12.5 2.95924 12.5 3.125V3.75Z" fill="#FF3333"/>
                    </svg>
                  </span>
                  <img src={image.url} alt={image.name} />
                </div>
              )
            }) 
          : ''
        }

        <div className={initialValue.length > 0 ? 'form__field-img' : ''}>
          <label>
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.75 8.5C14.75 8.69891 14.671 8.88968 14.5303 9.03033C14.3897 9.17098 14.1989 9.25 14 9.25H9.25V14C9.25 14.1989 9.17098 14.3897 9.03033 14.5303C8.88968 14.671 8.69891 14.75 8.5 14.75C8.30109 14.75 8.11032 14.671 7.96967 14.5303C7.82902 14.3897 7.75 14.1989 7.75 14V9.25H3C2.80109 9.25 2.61032 9.17098 2.46967 9.03033C2.32902 8.88968 2.25 8.69891 2.25 8.5C2.25 8.30109 2.32902 8.11032 2.46967 7.96967C2.61032 7.82902 2.80109 7.75 3 7.75H7.75V3C7.75 2.80109 7.82902 2.61032 7.96967 2.46967C8.11032 2.32902 8.30109 2.25 8.5 2.25C8.69891 2.25 8.88968 2.32902 9.03033 2.46967C9.17098 2.61032 9.25 2.80109 9.25 3V7.75H14C14.1989 7.75 14.3897 7.82902 14.5303 7.96967C14.671 8.11032 14.75 8.30109 14.75 8.5Z" fill="white"/>
            </svg>
            <input
              ref={upload}
              onChange={fileHandler} 
              type="file"
              name={mainkeyTarget} 
              id={uid}
              multiple accept="image/png, image/jpeg, image/webp, image/avif"></input>
          </label>
        </div>
      </div>
    </div>
  )
}