import { Image } from "../../types/Image";
import { Product } from "../../types/Product";

type Filter = {
  product: Product;
  files: File[] | [];
  images: Image[] | [];
}

export function filter(props: Filter) {
  const updatedProduct = { ...props.product };

  for (const key in updatedProduct) {
    if (key === 'name' && !updatedProduct[key]) updatedProduct[key] = '';
    if (key === 'description' && !updatedProduct[key]) updatedProduct[key] = '';
    if (key === 'summary' && !updatedProduct[key]) updatedProduct[key] = '';

    if (key === 'id' && !updatedProduct[key]) updatedProduct[key] = 0;
    if (key === 'stock' && !updatedProduct[key]) updatedProduct[key] = 0;
    if (key === 'current_price' && !updatedProduct[key]) updatedProduct[key] = 0;
    if (key === 'old_price' && !updatedProduct[key]) updatedProduct[key] = 0;
  }

  const updatedProps: Filter = {
    product: updatedProduct,
    files: props.files.length > 0 ? props.files : [],
    images: props.images.length > 0 ? props.images : [],
  };

  return updatedProps;
}