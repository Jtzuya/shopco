import { Product } from "../../types/Product";

export function filter(props: Product) {
  for (const key of Object.keys(props)) {
    if (key === 'name' && !props[key]) props[key] = ''
    if (key === 'description' && !props[key]) props[key] = ''
    if (key === 'summary' && !props[key]) props[key] = ''
    
    if (key === 'id' && !props[key]) props[key] = 0
    if (key === 'stock' && !props[key]) props[key] = 0
    if (key === 'current_price' && !props[key]) props[key] = 0
    if (key === 'old_price' && !props[key]) props[key] = 0
    
    if (key === 'files' && !props[key]) props[key] = []
    if (key === 'images' && !props[key]) props[key] = []
  }

  return props
}