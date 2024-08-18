import { Image } from "./Image";

type Collection = {
  id: number;
  name: string;
  images: Image[] | []; // collection banner image
}

type Product = {
  id          : number;
  product_id  : string;
  name        : string;
  url        ?: string; // string of image url
}

export type RenderCollection = {
  collection: Collection;
  products: Product[] | [];
  files: File[] | [];
}

type FormCollection = {
  id      : number | null;
  name   ?: string;
  images ?: Image[] | []; // collection banner image
}

export type FormCleanUpCollection = {
  collection  ?: FormCollection;
  products    ?: Product[] | [];
  files       ?: File[] | [];
}