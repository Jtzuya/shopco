import { FormCleanUpCollection, RenderCollection } from "../../types/Collection"
import { Image } from "../../types/Image";
import { stringDataCheck } from "./checker"


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

export function inventoryCollectionCompile(prev: RenderCollection, curr: RenderCollection, form_submission_type: string | undefined = 'create') {
  console.log(curr.collection.id)
  
  let form: FormCleanUpCollection = {
    collection  : {
      id     : prev.collection.id,
      name   : prev.collection.name,
      images : prev.collection.images,
    },
    products    : prev.products,
    files       : prev.files,
  }

  if (form_submission_type === 'update') {
    form = {
      collection: {
        id    : prev.collection.id,
      }
    }
  }

  if (form.collection && stringDataCheck(prev.collection.name, curr.collection.name) === false) {
    form.collection.name = curr.collection.name
  }        

  if (form.collection && arrayImageDataCheck(prev.collection.images, curr.collection.images) === false) {
    form.collection.images = curr.collection.images
  }

  return JSON.stringify(form)
}