import { server_origin } from "../../env";

export default class Endpoints {
  getProductByProductId(product_id: string):      URL { return new URL(`/api/product/${product_id}`, server_origin) }
  getProductByName(name: string):                 URL { return new URL(`/api/products/${name}`, server_origin) }
  getProducts():                                  URL { return new URL(`/api/products`, server_origin) }
  getProductList(page: number):                   URL { return new URL(`/api/product-list?page=${page}`, server_origin) }
  
  createNewProduct():                             URL { return new URL(`/api/new-product/`, server_origin) }
  updateProductById(id: string):                  URL { return new URL(`/api/update-product/${id}`, server_origin) }
  deleteProductById(product_id: string):          URL { return new URL(`/api/delete-product/${product_id}`, server_origin) }
  
  createNewCollection():                          URL { return new URL(`/api/new-collection`, server_origin) }
}