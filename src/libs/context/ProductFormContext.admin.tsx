import { createContext, FC, ReactNode, useEffect, useState } from "react";

type ImageType = {
  sort_order_id: number;
  name: string;
}

export type ProductType = {
  id?: number,
  product_id: string;

  name: string,
  description: string,
  summary: string,
  stock: number,
  current_price: number,
  old_price: number,

  images?: ImageType[]
}

type FormContextProps = {
  originalProductDataRecord: ProductType;
  // formProductState: ProductType | null;
  // setFormProductState: React.Dispatch<React.SetStateAction<ProductType | null>>;
  // reducer: (value: string, state: keyof ProductType) => void;
}

export const FormContext = createContext<FormContextProps | null>(null)

// This provider is meant to store the original
// product data from the database or the temporary data (if for creating a new product)
// Also, keeps track of the state of child components if there are reactions
export const FormProvider: FC<{ children: ReactNode, product: ProductType }> = ({ children, product }) => {
  const originalProductDataRecord = product;

  // const [formProductState, setFormProductState] = useState<ProductType | null>(null);
  // const reducer = (value: string, state: string) => {
  //   switch(state) {
  //     case 'name':
  //       product.name = value
  //       break
  //     case 'description':
  //       product.description = value
  //       break
  //     case 'summary':
  //       product.summary = value
  //       break
  //     // case 'images':
  //     //   product.images = value
  //     //   break
  //     case 'stock':
  //       product.stock = parseInt(value)
  //       break
  //     case 'current_price':
  //       product.current_price = parseInt(value)
  //       break
  //     case 'old_price':
  //       product.old_price = parseInt(value)
  //       break
  //   }
  // }

  // useEffect(() => {
  //   setFormProductState(product)
  // }, [formProductState, product])

  return (
    <FormContext.Provider value={{
      originalProductDataRecord
      // formProductState,
      // setFormProductState,
      // reducer
    }}>
      {children}
    </FormContext.Provider>
  )
};