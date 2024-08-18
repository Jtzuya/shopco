import { server_origin } from "../../env";

export default class Endpoints {
  getProductByProductId(product_id: string):            URL { return new URL(`/api/product/${product_id}`, server_origin) }
  getProductByName(name: string):                       URL { return new URL(`/api/product-by-name/${name}`, server_origin) }
  getProducts():                                        URL { return new URL(`/api/products`, server_origin) }
  getProductList(page: number):                         URL { return new URL(`/api/product-list?page=${page}`, server_origin) }
  
  createNewProduct():                                   URL { return new URL(`/api/create-product/`, server_origin) }
  updateProductById(id: string):                        URL { return new URL(`/api/update-product/${id}`, server_origin) }
  deleteProductById(product_id: string):                URL { return new URL(`/api/delete-product/${product_id}`, server_origin) }
  
  createCollection():                                   URL { return new URL(`/api/create-collection`, server_origin) }
  updateCollectionById(id: number):                     URL { return new URL(`/api/update-collection/${id}`, server_origin) }

  getCollectionList(page: number):                      URL { return new URL(`/api/collection-list?page=${page}`, server_origin) }
  getCollectionById(collection_id: string):             URL { return new URL(`/api/admin-collection/${collection_id}`, server_origin) }
  getCollectionProductsById(collection_id: number):     URL { return new URL(`/api/collection-products/${collection_id}`, server_origin) }
  
  getProductCollections(page: number):                  URL { return new URL(`/api/product-collections?page=${page}`, server_origin) }

  // Public
  getCollectionProductsPublic(id: number):              URL { return new URL(`/api/pub/collection-products/${id}`, server_origin) }
}