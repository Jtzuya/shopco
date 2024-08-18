export type Global = {
  collection_list: boolean; 
  modal: boolean;
}

type Product = {
  product_id     : string;
  name           : string;
  description    : string;
  summary        : string;
  stock          : number;
  current_price  : number;
  old_price      : number;
}

type Image = {
  name: string;
  type: string;
  size: number;
}

type SignedImage = Image & {
  url: string;
}

type Collection = {
  collection_id: number;
}

type CollectionEntry = {
  product_id: number;
  collection_id: number;
}

type Name = {
  name: string;
  sort_order_id: number;
}

type Size = {
  name: Name[];
  product_id: string;
}

type Color = {
  name: Name[];
  product_id: string;
}

type CreateProductTypes = {
  products: Product;
  collection_entries: Collection[];
  images: Image[];
  sizes: Size;
  colors: Color;
}