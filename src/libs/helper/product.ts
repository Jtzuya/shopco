import { Image } from "../../types/Image";
import { CollectionEntry, FormCleanUpProduct, RenderProduct } from "../../types/Product";
import { numberDataCheck, stringDataCheck } from "./checker";

type ArrayCollectionEntry = CollectionEntry

type ArraySizeDataCheck = {
  name: string;
  sort_order_id: number;
}

type ArrayColorDataCheck = {
  name: string;
  sort_order_id: number;
}

export function arrayImageDataCheck(prev: Image[], curr: Image[]): boolean {
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

export function arrayCollectionEntryDataCheck(prev: ArrayCollectionEntry[] | [], curr: ArrayCollectionEntry[] | []): boolean {
  const sameLength = prev.length === curr.length ? true : false;
  
  // Possibly re-arranged
  if (sameLength == true) {
    let status = sameLength;
    for(let i = 0; i < curr.length; i++) {
      if (curr[i].product_id !== prev[i].product_id) {
        status = false;
        break
      }
    }

    return status;
  }

  return sameLength
}

export function arraySizeDataCheck(prev: ArraySizeDataCheck[], curr: ArraySizeDataCheck[]): boolean {
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

export function arrayColorDataCheck(prev: ArrayColorDataCheck[], curr: ArrayColorDataCheck[]): boolean {
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
export function inventoryProductCompile(prev: RenderProduct, curr: RenderProduct, form_submission_type: string | undefined = 'create') {
  // console.log('prev', prev, '\n')
  // console.log('curr', curr, '\n')

  let form: FormCleanUpProduct = {
    product: {
      id                : prev.product.id,
      product_id        : prev.product.product_id,
      name              : prev.product.name,
      description       : prev.product.description,
      summary           : prev.product.summary,
      stock             : prev.product.stock,
      current_price     : prev.product.current_price,
      old_price         : prev.product.old_price,
    },
    collection_entries  : prev.collection_entries,
    collections         : prev.collections,
    files               : prev.files,
    images              : prev.images,
    colors              : prev.colors,
    sizes               : prev.sizes,
  }

  if (form_submission_type === 'update') {
    form = {
      product: {
        id          : curr.product.id,
        product_id  : curr.product.product_id
      }
    }
  }

  if (stringDataCheck(prev.product.name, curr.product.name) === false) {
    form.product.name = curr.product.name
  }        

  if (stringDataCheck(prev.product.description, curr.product.description) === false) {
    form.product.description = curr.product.description
  }

  if (stringDataCheck(prev.product.summary, curr.product.summary) === false){
    form.product.summary = curr.product.summary
  }

  if (numberDataCheck(prev.product.stock, curr.product.stock) === false) {
    form.product.stock = curr.product.stock
  }
  
  if (numberDataCheck(prev.product.current_price, curr.product.current_price) === false) {
    form.product.current_price = curr.product.current_price
  }

  if (numberDataCheck(prev.product.old_price, curr.product.old_price) === false) {
    form.product.old_price = curr.product.old_price
  }

  if (arrayImageDataCheck(prev.images, curr.images) === false) {
    form.images = curr.images
  }

  if (arrayCollectionEntryDataCheck(prev.collection_entries, curr.collection_entries) === false) {
    form.collection_entries = curr.collection_entries
  }

  if (stringDataCheck(prev.colors.names, curr.colors.names) === false) {
    form.colors = curr.colors
  }

  if (stringDataCheck(prev.sizes.names, curr.sizes.names) === false) {
    form.sizes = curr.sizes
  }

  return JSON.stringify(form)
}