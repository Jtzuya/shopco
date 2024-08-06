import { Image } from "../../types/Image";
import { Form, Product } from "../../types/Product";

/**
 * @param prev 
 * @param curr 
 * @returns false is there are changes, true if it is unchanged
 */
export function stringDataCheck(prev: string, curr: string): boolean {
  if (prev === curr) return true
  return false
}
/**
 * @param prev 
 * @param curr 
 * @returns false is there are changes, true if it is unchanged
 */
export function numberDataCheck(prev: number, curr: number): boolean {
  if (prev === curr) return true
  return false
}
/**
 * @param prev 
 * @param curr 
 * @returns false is there are changes, true if it is unchanged
 */
export function arrayDataCheck(prev: Image[], curr: Image[]): boolean {
  const sameLength = prev.length === curr.length ? true : false;
  
  // Possibly re-arranged
  if (sameLength == true) {
    let status = sameLength;
    for(let i = 0; i < curr.length; i++) {
      if (curr[i].name !== prev[i].name) {
        status = false;
        break
      }
    }

    return status;
  }

  return sameLength
}

/**
 * 
 * @param prev original product state
 * @param curr updated product state
 * @returns returns a new stringified product state
 */
export function inventoryCompile(prev: Product, curr: Product, type: string | undefined = 'create') {
  // console.log(type)
  let form: Form = {
    id: prev.id,
    product_id: prev.product_id,
    name: prev.name,
    description: prev.description,
    summary: prev.summary,
    stock: prev.stock,
    current_price: prev.current_price,
    old_price: prev.old_price,
    images: prev.images
  }

  if (type === 'update') {
    form = {
      id: prev.id,
      product_id: prev.product_id
    }
  }

  if (stringDataCheck(prev.name, curr.name) === false)                   form.name          = curr.name
  if (stringDataCheck(prev.description, curr.description) === false)     form.description   = curr.description
  if (stringDataCheck(prev.summary, curr.summary) === false)             form.summary       = curr.summary
  if (numberDataCheck(prev.stock, curr.stock) === false)                 form.stock         = curr.stock
  if (numberDataCheck(prev.current_price, curr.current_price) === false) form.current_price = curr.current_price
  if (numberDataCheck(prev.old_price, curr.old_price) === false)         form.old_price     = curr.old_price
  if (arrayDataCheck(prev.images, curr.images) === false)                form.images        = curr.images

  return JSON.stringify(form)
  // return form
}