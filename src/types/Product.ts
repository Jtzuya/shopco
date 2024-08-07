import { Image } from "./Image"

export type T = {
  id          : number;
  name        : string;
  product_id  : string;
}

export type Product = T & {
  description     : string; 
  summary         : string; 
  stock           : number; 
  current_price   : number; 
  old_price       : number;
  images          : Image[] | [];
  files           : File[]  | [];

  collection      : T[] | [];
  colors          : T[] | [];
  sizes           : T[] | [];
}

export type Table = T & { stock: number }

export type Form = {
  id            ?: number;
  product_id     : string;
  name          ?: string;
  description   ?: string;
  summary       ?: string;
  stock         ?: number;
  current_price ?: number;
  old_price     ?: number;
  images        ?: Image[];

  collection    ?: T[] | [];
  colors        ?: T[] | [];
  sizes         ?: T[] | [];
}

export type Deform = {
  id             : number;
  product_id     : string;
  name          ?: string   | null;
  description   ?: string   | null;
  summary       ?: string   | null;
  stock         ?: number   | null;
  current_price ?: number   | null;
  old_price     ?: number   | null;
  images        ?: Image[]  | null;
}

export type FormHandler = {
  form_callback: (e: React.FormEvent<HTMLFormElement>) => void;
}

export type FileToBucket = {
  signed_url: string;
  file: File;
}