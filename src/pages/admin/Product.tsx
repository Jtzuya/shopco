import { useParams, Link, useNavigate } from "react-router-dom";
import { Suspense, useEffect, useState } from "react";
import shortUID from 'short-unique-id';

import { ProductContext } from "../../libs/context/ProductContext";
import butter from "../../libs/helper/butter";

// Components
import Form from "../../components/admin/Product/Form";
import Sidebar from "../../components/admin/Sidebar";
import GetErrorMessage from "../../helpers/GetErrorMessage";
import { uploadFileToBucket } from "../../libs/helper/imageUpload";
import cache from "../../libs/helper/cache";
import { FileToBucket, Product as PT } from "../../types/Product";
import Endpoints from "../../libs/helper/endpoints";
import { filter } from "../../libs/helper/filter";
import { inventoryCompile } from "../../libs/helper/product";

// TODO: Instead of using localstorage, change it indexedDB by default
// and use localstorage for fallbacks

const Server = new Endpoints()

export default function Product() {
  const navigate = useNavigate();
  const params = useParams<{product_id: string}>();
  const [product, setProduct] = useState<PT | null>(null)
  const [productRecord, setProductRecord] = useState<PT | null>(null)
  const [onMountFetch, setOnMountFetch] = useState(true)
  
  async function onMountFetchHandler() {
    // console.log('run')
    setOnMountFetch(false)

    // Set temporary product if params.product_id is null 
    if (!params.product_id) {
      console.log('atempt for creating a new product.')
      const tempProduct = temporaryProduct();
      
      setProduct(tempProduct)
      setProductRecord(tempProduct)
      return
    }

    // Check cache
    const inCache = cache({key: 'product', target_key: params.product_id, method: 'get'})
    if (inCache) {
      console.log('cache')
      setProduct(inCache)
      setProductRecord(inCache)
      return
    }

    // Retrieve product data based on params id
    console.log('trying to retrive data from db')
    try {
      const productRequest    = await butter(Server.getProductByProductId(params.product_id), 'get')
      const { message, data } = await productRequest.json() 
      if (!productRequest.ok) throw new Error(message)

        // console.log('stock type', typeof data.stock)
      const product = filter(data)

      // caching mechanism
      cache({key: 'product', target_key: params.product_id, method: 'save', datas: product})
      setProduct(product)
      setProductRecord(product)
    } catch (error) {
      alert(GetErrorMessage(error))
    }
  }

  // useEffect(() => {
  //   const handleKeyDown = (event: KeyboardEvent) => {
  //     if (event.ctrlKey && event.key === 'r') {
  //       event.preventDefault(); // Prevent the default refresh action
  //       // Use prompt to display a confirmation message
  //       const userResponse = window.confirm('Data will be removed. Are you sure?');
        
  //       if (userResponse) {
  //         // User clicked "OK"
  //         window.location.reload()
  //       } else {
  //         // User clicked "Cancel"
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

  async function formHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!product) throw new Error(`Product is not set`)
    if (!productRecord) throw new Error(`Original Product Record is not set`)

    try {
      const body = inventoryCompile(productRecord, product, params.product_id ? 'update' : undefined)
      // console.log(body)

      // return
      const productSaveRequest = params.product_id ? 
        await butter(Server.updateProductById(params.product_id), 'post', body) :
        await butter(Server.createNewProduct(), 'post', body);

      const { data } = await productSaveRequest.json()

      if (!productSaveRequest.ok) throw new Error(`failed to save the product changes`)      
      const { images, errors } = data

      // These are images that aren't saved in the s3 bucket
      if (product.files && product.files.length > 0) {
        // const filesToServer: FileToServer[] = []
        const segregateFilesToBucket: FileToBucket[] = []

        if (images && images.length > 0) {
          product.files.map((file: File) => {
            for (let i = 0; i < images.length; i++) {
              if (images[i].name === file.name) {
                segregateFilesToBucket.push({
                  signed_url: images[i].signed_url,
                  file
                })
              }
            }
          })
        }

        if (segregateFilesToBucket.length > 0) {
          await Promise.all(
            segregateFilesToBucket.map(item => uploadFileToBucket(item.signed_url, item.file))
          )

          const reloadTimeout = setTimeout(() => {
            window.location.href = `/admin/product/${product.product_id}`
            clearTimeout(reloadTimeout)
          }, 500)    
        }
      }

      window.localStorage.removeItem("product");
      navigate(`/admin/product/${product.product_id}`) // refresh page
    } catch (error) {
      console.log(GetErrorMessage(error))
      return
    }
  }

  return (
    <div className="admin">
      <Sidebar currentPage="product" />
      <main className="product">
        <Link className="product__backlink" to={`/admin/product-list`}>
          <span className="product__backlink-icon">
            <svg width="33" height="16" viewBox="0 0 33 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.292893 7.29289C-0.0976311 7.68342 -0.0976311 8.31658 0.292893 8.70711L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928932C7.68054 0.538408 7.04738 0.538408 6.65685 0.928932L0.292893 7.29289ZM33 7L1 7V9L33 9V7Z" fill="currentColor"/>
            </svg>
          </span>
          <span>Go back</span>
        </Link>
        <>{ onMountFetch === true ? onMountFetchHandler() : '' }</>

        <Suspense fallback={<h1>loading...</h1>}>
          {
            product && productRecord ? 
              <ProductContext.Provider value={{
                product,
                setProduct,
                productRecord
              }}>
                <Form form_callback={formHandler} />
              </ProductContext.Provider>
            :
              <strong>loading...</strong>
          }
        </Suspense>
      </main>
    </div>
  )
}

function temporaryProduct() {
  const uid = new shortUID({ length: 10 })
  const temp_id = uid.rnd();

  return {
    id: 0,
    product_id: temp_id,
    name: '',
    description: '',
    summary: '',
    stock: 0,
    current_price: 0,
    old_price: 0,
    images: [],
    files: []
  }
}