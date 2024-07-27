import { useParams, Link } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";
import { useEffect, useRef, useState, ChangeEvent } from "react";
import SubmitBtn from "../../components/admin/Product/Submit";

interface ProductState {
  id: number,
  name: string,
  description: string,
  summary: string,
  stock: number,
  current_price: number,
  old_price: number,
  created_at: Date,
}

export default function Product() {
  const media = useRef(null)
  const params = useParams<{id: string}>();
  const param: number | null = params.id ? parseInt(params.id) : null;

  const [prevProduct,setPrevProduct] = useState<ProductState | null>(null)

  const [productName, setProductName] = useState('')
  const [productDescription, setProductDescription] = useState('')
  const [productSummary, setProductSummary] = useState('')
  const [productStock, setProductStock] = useState(0)
  const [productOldPrice, setProductOldPrice] = useState(0)
  const [productCurrentPrice, setProductCurrentPrice] = useState(0)
  
  const [images,setImages] = useState('') // should be an array

  useEffect(() => {
    async function getProduct(id: number) {
      const endpoint = new URL(`/get-product/${id}`, 'http://localhost:3001')
      
      try {
        const request = await fetch(endpoint, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })

        if (!request.ok) throw new Error('failed to grab data')

        const { data } = await request.json()


        // caching mechanism
        const previousProductsHash = window.localStorage.getItem('products_hash')
        if (previousProductsHash != null) {
          const parsedPreviousProductsHash = JSON.parse(previousProductsHash)

          // Enforce check product inside prev product hash due to react's behavior
          if (!parsedPreviousProductsHash[id]) {
            const freshProductsHash = { ...parsedPreviousProductsHash, [id]: data[0]}
            localStorage.setItem('products_hash', JSON.stringify(freshProductsHash))
          }
        } else {
          localStorage.setItem('products_hash', JSON.stringify({
            [id]: data[0]  
          }))
        }

        setPrevProduct(data[0])
        setProductName(data[0].name)
        setProductDescription(data[0].description)
        setProductSummary(data[0].summary)
        setProductStock(data[0].stock)
        setProductOldPrice(data[0].old_price)
        setProductCurrentPrice(data[0].current_price)
      } catch (error) {
        return error
      }
    }

    if (param != null) {
      const productHash = window.localStorage.getItem('products_hash')
      if (productHash) {
        const _product = JSON.parse(productHash)
        if (_product[param]) {
          console.log('cache')
          setPrevProduct(_product[param])
          setProductName(_product[param].name)
          setProductDescription(_product[param].description)
          setProductSummary(_product[param].summary)
          setProductStock(_product[param].stock)
          setProductOldPrice(_product[param].old_price)
          setProductCurrentPrice(_product[param].current_price)
        } else {
          console.log('db')
          getProduct(param)
        }
      } else {
        console.log('db')
        getProduct(param)
      }
    }
  }, [param])

  // useEffect(() => {
  //   const handleKeyDown = (event) => {
  //     if (event.ctrlKey && event.key === 'r') {
  //       event.preventDefault(); // Prevent the default refresh action
  //       // Use prompt to display a confirmation message
  //       const userResponse = window.confirm('Data will be removed. Are you sure?');
        
  //       if (userResponse) {
  //         // User clicked "OK"
  //         console.log('User confirmed');
  //         window.location.reload()
  //       } else {
  //         // User clicked "Cancel"
  //         console.log('User canceled');
  //       }
  //     }
  //   };

  //   // Add the event listener for keydown
  //   window.addEventListener('keydown', handleKeyDown);

  //   // Cleanup the event listener when the component is unmounted
  //   return () => {
  //     window.removeEventListener('keydown', handleKeyDown);
  //   };
  // }, []);

  // debugger
  // TODO: if param is null. It is to create a new product
  // TODO: if param has value. get grab id and it only updates the data of that product

  function nameHandler(value: string) {
    setProductName(value)
  }

  function descritionHandler(value: string) {
    setProductDescription(value)
  }

  function summaryHandler(value: string) {
    setProductSummary(value)
  }

  function fileHandler(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault()
    imageHandler(e.target.files);
  }

  async function imageHandler(files: FileList | null) {
    if (!files) return console.log('file is empty')
    
    // console.log(value)
    // console.log(value.files)
    // const { name, size, type } = value.files[0]

    // We'll store the files in this data transfer object
    // const dataTransfer = new DataTransfer();

    // const compressedImage = await compressImage(value.files[0], {
    //   // 0: is maximum compression
    //   // 1: is no compression
    //   quality: 0.5,

    //   // We want a JPEG file
    //   type: 'image/jpeg',
    // })

    // dataTransfer.items.add(compressedImage);
    // console.log(compressedImage)
    // console.log(dataTransfer.files)
    // console.log(compressedImage)
    // console.log(value.files[0])
    // setImages(compressedImage)
    setImages(URL.createObjectURL(files[0]))
  }

  // const compressImage = async (file: any, { quality = 1, type = file.type }) => {
  //   // Get as image data
  //   const imageBitmap = await createImageBitmap(file);

  //   // Draw to canvas
  //   const canvas = document.createElement('canvas');
  //   canvas.width = imageBitmap.width;
  //   canvas.height = imageBitmap.height;
  //   const ctx = canvas.getContext('2d');
  //   ctx.drawImage(imageBitmap, 0, 0);

  //   // Turn into Blob
  //   const blob = await new Promise((resolve) =>
  //     canvas.toBlob(resolve, type, quality)
  //   );

  //   // Turn Blob into File
  //   // return new File([blob], file.name, {
  //   //   type: blob.type,
  //   // });

  //   const newImageSize = new File([blob], file.name, {
  //     type: blob.type,
  //   });

  //   return URL.createObjectURL(newImageSize)
  // };

  function stockHandler(value: string) {
    setProductStock(parseInt(value))
  }

  function currentPriceHandler(value: string) {
    setProductCurrentPrice(parseInt(value))
  }

  function OldPriceHandler(value: string) {
    setProductOldPrice(parseInt(value))
  }

  function renderSubmitBtn() {
    return (
      param !== null ?
      ( 
        prevProduct &&
        prevProduct.name === productName && 
        prevProduct.description === productDescription &&
        prevProduct.summary === productSummary && 
        prevProduct.stock === productStock && 
        prevProduct.current_price === productCurrentPrice && 
        prevProduct.old_price === productOldPrice ? '' : <SubmitBtn value="update" />
      ) 
      : 
      ( 
        productName === '' && 
        productDescription === '' &&
        productSummary === '' && 
        productStock === 0 && 
        productCurrentPrice === 0 && 
        productOldPrice === 0 ? '' : <SubmitBtn value="create" />
      )
    )
  }

  // async function formHandler(event: { preventDefault: () => void; }) {
  //   event.preventDefault()
  //   if(prevProduct === null) return;

  //   let changes = 0

  //   if (prevProduct.name !== productName) changes++
  //   if (prevProduct.description !== productDescription) changes++
  //   if (prevProduct.summary !== productSummary) changes++
  //   if (prevProduct.stock !== productStock) changes++
  //   if (prevProduct.old_price !== productOldPrice) changes++
  //   if (prevProduct.current_price !== productCurrentPrice) changes++

  //   if (changes === 0) return
  //   alert('there are changes!')
  // }

  return (
    <div className="admin">
      <Sidebar currentPage="product" />
      <main className="product">
        <Link className="product__backlink" to={`${window.origin}/admin/product-list`}>
          <span className="product__backlink-icon">
            <svg width="33" height="16" viewBox="0 0 33 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.292893 7.29289C-0.0976311 7.68342 -0.0976311 8.31658 0.292893 8.70711L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928932C7.68054 0.538408 7.04738 0.538408 6.65685 0.928932L0.292893 7.29289ZM33 7L1 7V9L33 9V7Z" fill="currentColor"/>
            </svg>
          </span>
          <span>Go back</span>
        </Link>

        <div className="form">
          <div className="form__field">
            <span>Name</span>
            <label>
              <input type="text" name="name" id="name" value={ productName } onChange={e => nameHandler(e.target.value)} placeholder="Lorem ipsum dolor sit amet"/>
            </label>
          </div>

          <div className="form__field">
            <span>Details</span>
            <label>
              <textarea name="description" id="description" value={ productDescription ? productDescription : ''} onChange={e => descritionHandler(e.target.value)} placeholder="Lorem ipsum dolor sit amet.">``</textarea>
            </label>
          </div>

          <div className="form__field">
            <span>Summary</span>
            <label>
              <input type="text" name="summary" id="summary" value={ productSummary } onChange={e => summaryHandler(e.target.value)} placeholder="Lorem ipsum dolor sit amet."></input>
            </label>
          </div>

          <div className="form__field">
            <span>Media</span>
            <div className="form__field-media" ref={media}>
              <label>
                <input onChange={fileHandler} type="file" name="image" id="image" multiple accept="image/png, image/jpeg, image/webp, image/avif"></input>
              </label>
              {/* <div className="form__field-img">&nbsp;</div>
              <div className="form__field-img">&nbsp;</div>
              <div className="form__field-img">&nbsp;</div>
              <div className="form__field-img">&nbsp;</div>
              <div className="form__field-img">&nbsp;</div>
              <div className="form__field-img">&nbsp;</div>
              <div className="form__field-img">&nbsp;</div>
              <div className="form__field-img">&nbsp;</div>
              <div className="form__field-img">&nbsp;</div>
              <div className="form__field-img">&nbsp;</div>
              <div className="form__field-img">&nbsp;</div>
              <div className="form__field-img">&nbsp;</div> */}
            </div>
          </div>

          <div className="form__group">
            <div className="form__field">
              <span>Stock</span>
              <label>
                <input type="number" maxLength={999999} value={productStock ? productStock : 0} onChange={e => stockHandler(e.target.value)} name="stock" id="stock" placeholder="10"></input>
              </label>
            </div>

            <div className="form__field">
              <span>Current Price</span>
              <label>
                <input type="number" maxLength={999999} value={productCurrentPrice ? productCurrentPrice : 0} onChange={e => currentPriceHandler(e.target.value)} name="current_price" id="current_price" placeholder="$2.99"></input>
              </label>
            </div>

            <div className="form__field">
              <span>Old Price</span>
              <label>
                <input type="number" maxLength={999999} value={productOldPrice ? productOldPrice : 0} onChange={e => OldPriceHandler(e.target.value)} name="old_price" id="old_price" placeholder="$2.99"></input>
              </label>
            </div>
          </div>


          { renderSubmitBtn() }

          {
            images != '' ? 
            <img src={images} />
            : ''
          }
        </div>
      </main>
    </div>
  )
}
