import { Image } from "./Image"

export type T = {
  id          : number;
  name        : string;
  product_id  : string;
}

export type Collections = {
  id: number;
  name: string;
}

export type CollectionEntries = {
  name: string;
  collection_id: number;
  id?: number;
  product_id?: number;
}

export type Name = {
  name: string;
  sort_order_id: number
}

export type Size = {
  names: string;
  id: number | null;
}

export type Color = {
  names: string;
  id: number | null;
}

export type Product = {
  id              : number;
  name            : string;
  product_id      : string;
  description     : string; 
  summary         : string; 
  stock           : number; 
  current_price   : number; 
  old_price       : number;
}

export type FormProduct = {
  id              : number;
  product_id      : string;
  name           ?: string;
  description    ?: string; 
  summary        ?: string; 
  stock          ?: number; 
  current_price  ?: number; 
  old_price      ?: number;
}

export type CollectionEntry = {
  id              : number;
  product_id      : number;
  collection_id   : number;
}

export type Collection = {
  id: number;
  name: string;
}

export type Image = {
  id: number;
  name: string;
  sort_order_id: number; 
  product_id: string;
}

export type RenderProduct = {
  product: Product;
  collection_entries: CollectionEntry[] | [];
  collections: Collection[] | [];
  files: File[] | [];
  images: Image[] | [];
  colors: Color;
  sizes: Size;
}

export type FormCleanUpProduct = {
  product               : FormProduct;
  collection_entries   ?: CollectionEntry[] | [];
  collections          ?: Collection[] | [];
  files                ?: File[] | [];
  images               ?: Image[] | [];
  colors               ?: Color;
  sizes                ?: Size;
}

export type Table = T & { stock: number }

export type FormHandler = {
  form_callback: (e: React.FormEvent<HTMLFormElement>) => void;
}

export type FileToBucket = {
  signed_url: string;
  file: File;
}