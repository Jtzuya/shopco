import { Link } from "react-router-dom";
import Nav from "../../components/admin/Nav";
import Sidebar from "../../components/admin/Sidebar";
import Table from "../../components/admin/Table";
import { useState } from "react";
import Endpoints from "../../libs/helper/endpoints";
import butter from "../../libs/helper/butter";
import cache from "../../libs/helper/cache";
import { Product as PT, Table as PTT } from "../../types/Product";
import GetErrorMessage from "../../helpers/GetErrorMessage";
import Pagination from "../../components/admin/Pagination";
import Input from "../../components/admin/Product/Fields/Input";

const Server = new Endpoints()

type Collection = {
  name?: string;
  file?: File;
  image?: string;
}

export default function Collection() {
  const [collection, setCollection] = useState<Collection | null>(null)
  const [onMountFetch, setOnMountFetch] = useState(true)
  const [totalProductsInDb, setTotalProductsInDb] = useState<number | null>(null)

  async function onMountFetchHandler(page: number = 1) {
    // console.log(params)
    // console.log(window.location.search)
    setOnMountFetch(false)

    // return
    const productsInCache = cache({key: 'products', method: 'getAll'})
    // console.log(productsInCache.length)

    if (productsInCache) {
      console.log('get list products from cache')
      for (const key of Object.keys(productsInCache)) {
        const product = productsInCache[key]
        
        setProductsArr(prev => {
          if (!prev) return []
          return [...prev, {
            id: product.id, 
            product_id: product.product_id, 
            name: product.name,
            stock: product.stock
          }]
        })
      }

      // TODO: flaw of count
      const count = cache({key: 'products_count', method: 'singleGet' })
      setTotalProductsInDb(Number(count))
      // console.log(count)
      return
    }
    
    await getProducts(page)
  }

  async function getProducts(page: number = 1) {
    try {
      console.log('atempting to get list of products from db')
      const request   = await butter(Server.getProductList(page), 'get')
      if (!request.ok) throw new Error('failed to grab data')

      const { data, count } = await request.json()

      if (page < 2) {
        data.map((product: PT) => { cache({key: 'products', target_key: String(product.product_id), method: 'save', datas: product}) })
        cache({key: 'products_count', method: 'singleSave', data: count })
      }

      setTotalProductsInDb(count)
      setProductsArr(data)
    } catch (error) {
      alert(GetErrorMessage(error))
    }
  }

  return (
    <div className="admin">
      <Sidebar currentPage="collections" />

      <main className="products">
        <Link className="product__backlink" to={`/admin/collection-list`}>
          <span className="product__backlink-icon">
            <svg width="33" height="16" viewBox="0 0 33 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.292893 7.29289C-0.0976311 7.68342 -0.0976311 8.31658 0.292893 8.70711L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928932C7.68054 0.538408 7.04738 0.538408 6.65685 0.928932L0.292893 7.29289ZM33 7L1 7V9L33 9V7Z" fill="currentColor"/>
            </svg>
          </span>
          <span>Go back</span>
        </Link>

        <div className="form">
          <div className={`form__field`}>
            <p>Name</p>
            <label>
              <input 
                type='text'
                name='collection'
                id='collection'
                placeholder='New Arrival'
              />
            </label>
          </div>  
        </div>
      </main>
    </div>
  )
}