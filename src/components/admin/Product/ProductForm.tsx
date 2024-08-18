import React, { useEffect, useState } from "react"
import shortUID from 'short-unique-id';
import { RenderProduct } from "../../../types/Product"
import { Image } from "../../../types/Image"
import NewInput from "./Fields/NewInput"
import NewTextarea from "./Fields/NewTextarea"
import MultiImageUpload from "./Fields/MultiImageUpload"
import { arrayCollectionEntryDataCheck, arrayImageDataCheck, inventoryProductCompile } from "../../../libs/helper/product";

import NewInputVariant from "./Fields/NewInputVariant";
import NewInputGroup, { Name as NameGroup } from "./Fields/NewInputGroup";
import butter from "../../../libs/helper/butter";
import Endpoints from "../../../libs/helper/endpoints";
import GetErrorMessage from "../../../helpers/GetErrorMessage";
import Notification from "../../Notification";
import bucket from "../../../libs/helper/bucket";
import { useNavigate, useParams } from "react-router-dom";
import { numberDataCheck, stringDataCheck } from "../../../libs/helper/checker";

const server = new Endpoints()

type Prop = {
  form_submission_type: string;
  product_id?: string;
}

// product record from db. the reason why it is placed outside is because
// whenever we try to update a variable inside jsx, it doesn't update
// if we try to do something like in lines 50 ~ 53. And as it needs to be a state

export default function ProductForm(props: Prop) {
  const { form_submission_type } = props
  const [record, setRecord]             = useState<RenderProduct>(temp())
  const [data, setData]                 = useState<RenderProduct>(record)
  const [loader, setLoader]             = useState(true)
  const [formBtnState, setFormBtnState] = useState(false)
  const [notification, setNotification] = useState<boolean>(false)
  const [notifMessage, setNotifMessage] = useState<string>('Something went wrong')
  const params                          = useParams()
  const navigate                        = useNavigate()

  async function onMountHandler() {
    try {
      console.log(params.product_id)
      if (params.product_id) {
        const productRequest  = await butter(server.getProductByProductId(params.product_id), 'get')
        const productResponse = await productRequest.json()

        if (!productRequest.ok) throw new Error(productResponse.message)

        setLoader(false)
        setRecord(prev => ({...prev, ...productResponse.data}))
        setData(prev => ({...prev, ...productResponse.data}))       
        return
      }

      const collectionsReq = await butter(server.getProductCollections(1), 'get')
      const collectionsRes = await collectionsReq.json()

      if (!collectionsReq.ok) throw new Error(collectionsRes.message)
      setData(prev => {return { ...prev, collections: collectionsRes.data }})
      setLoader(false)
    } catch (error) {
      setLoader(false)
      setNotification(true)
      setNotifMessage(GetErrorMessage(error))

      const popupTimer = setTimeout(() => {
        setNotification(false)
        clearTimeout(popupTimer)
      }, 1500)
    }
  }

  if (loader === true) {
    (async() => await onMountHandler())()
  }

  function inputHandler(keys: string, value: string | number) {
    const keySplit = keys.split('&')

    if (keySplit.length < 2) return 'something is wrong with your keys'
    const [parentTarget, innerTarget] = keySplit

    setData(prev => {
      if (!(parentTarget in prev)) return prev

      return {
        ...prev,
        [parentTarget]: {
          ...prev[parentTarget as keyof RenderProduct],
          [innerTarget]: value
        }
      }
    })
  }

  function textAreaHandler(keys: string, value: string) {
    const keySplit = keys.split('&')

    if (keySplit.length < 2) return 'something is wrong with your keys'
    const [parentTarget, innerTarget] = keySplit

    setData(prev => {
      if (!(parentTarget in prev)) return prev

      return {
        ...prev,
        [parentTarget]: {
          ...prev[parentTarget as keyof RenderProduct],
          [innerTarget]: value
        }
      }
    })
  }

  function uploadImageHandler(key: string, value: File, order: number) {
    if (!key) return

    const newImage = {
      name: value.name,
      sort_order_id: order,
      url: URL.createObjectURL(value),
      size: value.size,
      type: value.type,
    }

    setData(prev => {
      const files = prev.files ? [...prev.files, value] : [value]
  
      return {
        ...prev,
        [key]: [...prev.images, newImage],
        files
      }
    })
  }

  function deleteImageHandler(image: Image) {
    if (!image) return

    setData(prev => {
      const newImages = []
      // const newFiles = []
      const filterImages = data.images.filter(i => i.sort_order_id !== image.sort_order_id)

      for (let i = 0; i < filterImages.length; i++) {
        newImages.push({
          ...filterImages[i],
          sort_order_id: i  
        })
      }

      return {
        ...prev,
        images: newImages,
        // files: newFiles
      }
    })
  }

  function moveImageHandler(images: Image[] | [], files: File[] | []) {
    setData(prev => {
      return {
        ...prev,
        images,
        files
      }
    });
  }

  function inputVariantHandler(keys: string, value: string) {
    if (!keys) return

    const [parentTarget, innerTarget] = keys.split('&')

    setData(prev => {
      return {
        ...prev,
        [parentTarget]: {
          ...prev[parentTarget as keyof RenderProduct],
          [innerTarget]: value
        }
      };
    });
  }

  function groupInputVariantHandler(state: string, keys: string, value: NameGroup) {
    switch(state) {
      case 'add' : {
        setData(prev => {
          return {
            ...prev,
            [keys]: [
              ...prev.collection_entries, 
              {
                id: 0,
                collection_id: value.id,
                product_id: null
              }
            ]
          }
        })
        break
      }
      default: {
        setData(prev => {
          return {
            ...prev,
            collection_entries: prev.collection_entries.filter(collection => collection.collection_id !== value.id)
          }
        })
        break
      }
    }
  }

  useEffect(() => {
    if (!record || !data) return;

    const _name                   = stringDataCheck(record.product.name, data.product.name)
    const _description            = stringDataCheck(record.product.description, data.product.description)
    const _summary                = stringDataCheck(record.product.summary, data.product.summary)
    const _stock                  = numberDataCheck(record.product.stock, data.product.stock)
    const _current_price          = numberDataCheck(record.product.current_price, data.product.current_price)
    const _old_price              = numberDataCheck(record.product.old_price, data.product.old_price)
    const _images                 = arrayImageDataCheck(record.images, data.images)
    const _collection_entries     = arrayCollectionEntryDataCheck(record.collection_entries, data.collection_entries)
    const _sizes                  = stringDataCheck(record.sizes.names, data.sizes.names)
    const _colors                 = stringDataCheck(record.colors.names, data.colors.names)

    if (
      !_name || 
      !_description || 
      !_summary || 
      !_stock || 
      !_current_price || 
      !_old_price || 
      !_images ||
      !_collection_entries ||
      !_sizes ||
      !_colors
    ) return setFormBtnState(true)

    return setFormBtnState(false)
  }, [data, record])

  async function formHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try {
      const body = inventoryProductCompile(record, data, form_submission_type)
      const serverRequest   = form_submission_type === 'create' ? await butter(server.createNewProduct(), 'post', body) : await butter(server.updateProductById(record.product.product_id), 'post', body);
      const serverResponse  = await serverRequest.json()

      if (!serverRequest.ok) throw new Error(serverResponse.message)
      if (data.files) await bucket(data.files, serverResponse.data.signed_images) // store image to bucket via client side
    
      window.localStorage.removeItem("products");
      setLoader(true)
      navigate(`/admin/product/${record.product.product_id}`)
    } catch (error) {
      setNotification(true)
      setNotifMessage(GetErrorMessage(error))

      const popupTimer = setTimeout(() => {
        setNotification(false)
        clearTimeout(popupTimer)
      }, 1500)
    }
  }

  return (
    <>
      <div className="form">
        <form action="" onSubmit={formHandler}>
          <NewInput
            loader={loader}
            mainkeyTarget='product'
            uid="name" 
            initialValue={data.product.name} 
            callback={inputHandler} 
          />

          <NewInput
            loader={loader}
            mainkeyTarget='product'
            uid="summary" 
            initialValue={data.product.summary} 
            callback={inputHandler} 
          />

          <NewTextarea
            loader={loader}
            mainkeyTarget='product'
            uid="description" 
            initialValue={data.product.description} 
            callback={textAreaHandler} 
          />

          <MultiImageUpload
            loader={loader}
            mainkeyTarget='images'
            uid="media" 
            initialValue={data.images} 
            files={data.files}
            callbackUpload={uploadImageHandler}
            callbackDelete={deleteImageHandler}
            callbackMove={moveImageHandler}
          />

          <div className="form__group">
            <NewInput
              loader={loader}
              mainkeyTarget='product'
              uid="stock" 
              initialValue={data.product.stock} 
              callback={inputHandler} 
            />
            <NewInput
              loader={loader}
              mainkeyTarget='product'
              uid="current_price" 
              initialValue={data.product.current_price} 
              callback={inputHandler} 
            />
            <NewInput
              loader={loader}
              mainkeyTarget='product'
              uid="old_price" 
              initialValue={data.product.old_price} 
              callback={inputHandler} 
            />
          </div>

          <div className="form__group">
            <NewInputGroup 
              loader={loader}
              mainkeyTarget="collection_entries"
              uid="collection_entries"
              initialValue={data.collection_entries}
              existingValue={data.collections}
              callback={groupInputVariantHandler}
            />
            <NewInputVariant 
              loader={loader}
              mainkeyTarget='colors&names'
              uid="colors"
              initialValue={data.colors.names} 
              callback={inputVariantHandler}
            />
            <NewInputVariant 
              loader={loader}
              mainkeyTarget='sizes&names'
              uid="sizes"
              initialValue={data.sizes.names} 
              callback={inputVariantHandler}
            />
          </div>
          
          {
            formBtnState ? 
              <div className='form__field'>
                <div className="form__field-submit-wrapper">
                  <input className='form__field-submit' type="submit" value={form_submission_type} />
                </div>
              </div>
            :
            ''
          }
        </form>

        {
          form_submission_type !== 'create' ?
            <div className='form__field'>
              <div className="form__field-submit-wrapper">
                <input className='form__field-submit form__field-submit--danger' type="submit" value='delete' />
              </div>
            </div>
          : ''
        }
      </div>

      {notification ? <Notification message={notifMessage}/> : ''}
    </>
  )
}

function temp() {
  const uid = new shortUID({ length: 10 })
  const temp_id = uid.rnd();

  return {
    product: {
      id: 0,
      product_id: temp_id,
      name: '',
      description: '',
      summary: '',
      stock: 0,
      current_price: 0,
      old_price: 0,
    },
    collection_entries: [],
    collections: [],
    files: [],
    images: [],
    colors: {
      names: '',
      id: null
    },
    sizes: {
      names: '',
      id: null
    },
  }
}