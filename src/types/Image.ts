export type Image = {
  id              : number;
  product_id      : number;
  sort_order_id   : number;
  name            : string;
  url?            : string; // can be the get_signed_url from server
  size?           : number;
  type?           : string;
  put_signed_url? : string;
}

export interface FileExtended extends File {
  File: File | null;
}