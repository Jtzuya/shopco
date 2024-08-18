import React, { useEffect, useState } from "react"
import NewInput from "./Fields/NewInput"
import ImageUpload from "./Fields/ImageUpload"
import { arrayImageDataCheck } from "../../../libs/helper/product";

import butter from "../../../libs/helper/butter";
import Endpoints from "../../../libs/helper/endpoints";
import GetErrorMessage from "../../../helpers/GetErrorMessage";
import Notification from "../../Notification";
import bucket from "../../../libs/helper/bucket";
import { useNavigate, useParams } from "react-router-dom";
import { RenderCollection } from "../../../types/Collection";
import { inventoryCollectionCompile } from "../../../libs/helper/collection";
import { stringDataCheck } from "../../../libs/helper/checker";
import CollectionProduct from "../CollectionProduct";

const server = new Endpoints()

type Prop = {
  form_submission_type: string;
}

export default function CollectionForm(props: Prop) {
  const { form_submission_type } = props
  const [record, setRecord]             = useState<RenderCollection>(temp())
  const [data, setData]                 = useState<RenderCollection>(record)
  const [loader, setLoader]             = useState(true)
  const [formBtnState, setFormBtnState] = useState(false)
  const [notification, setNotification] = useState<boolean>(false)
  const [notifMessage, setNotifMessage] = useState<string>('Something went wrong')
  const params                          = useParams()
  const navigate                        = useNavigate()

  async function onMountHandler() {
    try {
      if (params.collection_id) {
        const collectionRequest  = await butter(server.getCollectionById(params.collection_id), 'get')
        const collectionResponse = await collectionRequest.json()

        if (!collectionRequest.ok) throw new Error(collectionResponse.message)

        setLoader(false)
        setRecord(prev => ({...prev, ...collectionResponse.data}))
        setData(prev => ({...prev, ...collectionResponse.data}))       
        return
      }

      setLoader(false)
    } catch (error) {
      setLoader(false)
      setNotification(true)
      setNotifMessage(GetErrorMessage(error) + 'u')

      const popupTimer = setTimeout(() => {
        setNotification(false)
        clearTimeout(popupTimer)
      }, 1500)
    }
  }

  if (loader === true) (async() => await onMountHandler())()

  function inputHandler(keys: string, value: string | number) {
    const keySplit = keys.split('&')

    if (keySplit.length < 2) return 'something is wrong with your keys'
    const [parentTarget, innerTarget] = keySplit

    setData((prev: RenderCollection) => ({
      ...prev, 
      [parentTarget]: {
        ...prev.collection,
        [innerTarget]: value
      }
    }))
  }

  function uploadImageHandler(key: string, value: File) {
    if (!key) return

    const newImage = [{
      id: data.collection.id,
      product_id: data.collection.id,
      name: value.name,
      url: URL.createObjectURL(value),
      size: value.size,
      type: value.type,
      sort_order_id: 0
    }]

    setData(prev => ({
        ...prev,
        collection: {
          ...prev.collection,
          images: newImage
        },
        files: [value]
      }
    ))
  }

  function deleteImageHandler() {
    setData(prev => {
      return {
        ...prev,
        collection: {
          ...prev.collection,
          images: []
        },
        files: []
      }
    })
  }

  useEffect(() => {
    if (!record || !data) return;
    const _name                   = stringDataCheck(record.collection.name, data.collection.name)
    const _images                 = arrayImageDataCheck(record.collection.images, data.collection.images)

    if (!_name || !_images) return setFormBtnState(true)
    return setFormBtnState(false)
  }, [data, record])

  async function formHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try {
      const body = inventoryCollectionCompile(record, data, form_submission_type)
      const serverRequest   = form_submission_type === 'create' ? 
          await butter(server.createCollection(), 'post', body) : await butter(server.updateCollectionById(data.collection.id), 'post', body)
            
      const serverResponse  = await serverRequest.json()

      if (!serverRequest.ok) throw new Error(serverResponse.message)
      if (data.files) await bucket(data.files, serverResponse.data.signed_images) // store image to bucket via client side
    
      if (form_submission_type === 'create') {
        // clear cache 
        window.localStorage.removeItem("collections");
      }

      setLoader(true)
      navigate(`/admin/collection/${serverResponse.data.collection.id}`)
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
            mainkeyTarget='collection'
            uid="name" 
            initialValue={data.collection.name} 
            callback={inputHandler} 
          />

          <ImageUpload
            loader={loader}
            mainkeyTarget='image'
            uid="media" 
            initialValue={data.collection.images}
            files={data.files}
            callbackUpload={uploadImageHandler}
            callbackDelete={deleteImageHandler}
          />
          
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

      { data && data.products ? <CollectionProduct products={data.products} /> : '' }

      {notification ? <Notification message={notifMessage}/> : ''}
    </>
  )
}

function temp() {
  return {
    collection: {
      id: 0,
      name: '',
      images: []
    },
    products: [],
    files: []
  }
}