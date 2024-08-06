import { Image } from "./Image"

export type Product = {
  id              : number;
  product_id      : string; 
  name            : string; 
  description     : string; 
  summary         : string; 
  stock           : number; 
  current_price   : number; 
  old_price       : number;
  images          : Image[] | [];
  files           : File[]  | [];
  created_at     ?: Date;
}

export type Table = {
  id: number;
  product_id: string;
  stock: number;
  name: string;
}

export type Form = {
  id            ?: number;
  product_id     : string;
  name          ?: string;
  description   ?: string;
  summary       ?: string;
  stock         ?: number;
  current_price ?: number;
  old_price     ?: number;
  images        ?: Image[]
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