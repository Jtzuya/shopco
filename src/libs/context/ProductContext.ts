import { createContext, useContext } from "react";
import { Product as PT } from "../../types/Product";

type ProductStates = {
  product: PT;
  setProduct: React.Dispatch<React.SetStateAction<PT | null>>;
  productRecord: PT;
}

export const ProductContext = createContext<ProductStates | null>(null)

export function useProductContext() {
  const states = useContext(ProductContext);

  if (!states) {
    throw new Error('useProductContext must be connected alongside ProductContext')
  }

  const { product, productRecord, setProduct } = states 

  return {
    product,
    productRecord,
    setProduct
  }
}
