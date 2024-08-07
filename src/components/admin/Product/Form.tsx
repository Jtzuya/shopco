import React, { useEffect, useState } from 'react';
import ImageUpload  from "../../ImageUpload";
import SubmitBtn    from "./Submit";
import { useProductContext } from '../../../libs/context/ProductContext';
import { arrayDataCheck, numberDataCheck, stringDataCheck } from '../../../libs/helper/product';
import { FormHandler } from '../../../types/Product';
import Endpoints from '../../../libs/helper/endpoints';
import butter from '../../../libs/helper/butter';
import Input from './Fields/Input';
import Textarea from './Fields/Textarea';
import { useNavigate } from 'react-router-dom';
import GetErrorMessage from '../../../helpers/GetErrorMessage';
import GroupedInput from './Fields/GroupedInput';
import VariantInput from './Fields/VariantInput';

export default function Form(props: FormHandler) {
  const navigate = useNavigate();
  const { form_callback } = props
  const { product, productRecord } = useProductContext()
  const [ formBtnState, setFormBtnState ] = useState(false)

  // Checks if there are changes in each form fields
  useEffect(() => {
    if (!product || !productRecord) return;

    const _name           = stringDataCheck(productRecord.name, product.name)
    const _description    = stringDataCheck(productRecord.description, product.description)
    const _summary        = stringDataCheck(productRecord.summary, product.summary)
    const _stock          = numberDataCheck(productRecord.stock, product.stock)
    const _current_price  = numberDataCheck(productRecord.current_price, product.current_price)
    const _old_price      = numberDataCheck(productRecord.old_price, product.old_price)
    const _images         = arrayDataCheck(productRecord.images, product.images)

    if (
      !_name || 
      !_description || 
      !_summary || 
      !_stock || 
      !_current_price || 
      !_old_price || 
      !_images
    ) return setFormBtnState(true)

    return setFormBtnState(false)
  }, [product, productRecord])

  async function deleteProductHandler(e: React.FormEvent<HTMLFormElement>, product_id: string) {
    e.preventDefault()
    try {
      const endpoint = new Endpoints().deleteProductById(product_id)
      const deleteProductResponse = await butter(endpoint, 'post', JSON.stringify(productRecord))
      const deleteProductResponseData = await deleteProductResponse.json()
      if(!deleteProductResponse.ok) throw new Error(deleteProductResponseData.message)
      navigate('/admin/product-list')
    } catch (error) {
      alert(GetErrorMessage(error))
    }
  }

  return(
    <div className="form">
      <form onSubmit={e => form_callback(e)}>
        <Input
          label='Name'
          type='text'
          name='name'
          id='name'
          placeholder='Lorem ipsum dolor sit amet'
          pkey='name'
          dynamic={product.id ? true : false}
        />
        <Textarea 
          label='Details'
          name='description'
          id='description'
          placeholder='Lorem ipsum dolor'
          pkey='description'
          dynamic={product.id ? true : false}
        />
        <Input
          label='Summary'
          type='text'
          name='product_summary'
          id='product_summary'
          placeholder='Lorem ipsum dolor'
          pkey='summary'
          dynamic={product.id ? true : false}
        />
        <ImageUpload label="Media" dynamic={product.id ? true : false}/>
        <div className="form__group">
          <Input
            label='Stock'
            type='text'
            name='stock'
            id='stock'
            placeholder='999'
            pkey='stock'
            dynamic={product.id ? true : false}
          />
          <Input
            label='Current Price'
            type='text'
            name='current_price'
            id='current_price'
            placeholder='$29.99'
            pkey='current_price'
            dynamic={product.id ? true : false}
          />
          <Input
            label='Old Price'
            type='text'
            name='old_price'
            id='old_price'
            placeholder='$29.99'
            pkey='old_price'
            dynamic={product.id ? true : false}
          />
        </div>

        <div className="form__group">
          <GroupedInput 
            label='Collections'
            type='text'
            name='collections'
            id='collections'
            placeholder=''
            pkey='collection'
            dynamic={product.id ? true : false}  
          />
          <VariantInput 
            label='Colors'
            type='text'
            name='colors'
            id='colors'
            placeholder='coral, vanta black, khaki, etc...'
            pkey='colors'
            dynamic={product.id ? true : false}  
          />
          <VariantInput 
            label='Sizes'
            type='text'
            name='sizes'
            id='sizes'
            placeholder='small, medium, large etc...'
            pkey='sizes'
            dynamic={product.id ? true : false}  
          />
        </div>

        <>{renderFormSubmitBtn(!product.id, formBtnState)}</>
      </form>

      {/* Delete product */}
      {
        product && product.id ?
        <form onSubmit={e => deleteProductHandler(e, product.product_id)}>
          <SubmitBtn dynamic={product.id ? true : false} value='delete' modifier='danger' />
        </form>
        : ''
      }
    </div>
  )  
}

/**
 * 
 * @param isProduct - if true, button text value is 'update' else 'create' 
 * @param isChanged - if true, show else hide button
 * @returns 
 */
function renderFormSubmitBtn(isProduct: boolean, isChanged: boolean,) {
  return (
    !isProduct ? 
    (
      // If the state is false, then there are no changes in comparison with the 
      // product state in our database and show nothing, else we show the update btn
      isChanged ? <SubmitBtn dynamic={true} value="update" /> : ''
    ) 
    : 
    (
      // If the state is false, then there are no changes in comparison with the 
      // product state in our database and show nothing, else we show the create btn
      isChanged ? <SubmitBtn dynamic={false} value="create" /> : ''
    )
  )
}