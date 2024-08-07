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
import CollectionTable from "../../components/admin/CollectionTable";

const Server = new Endpoints()

export default function CollectionList() {
  const [productsArr, setProductsArr] = useState<PTT[] | []>([])
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

  async function paginationCallback(page: number) {
    await getProducts(page)
  }

  return (
    <div className="admin">
      <Sidebar currentPage="collection-list" />

      <main className="products">
        <Nav name='Collections Dashboard' />
        <div className="products__links">
          <Link to={`/admin/collection/new`} className="products__create">Create new collection</Link>
        </div>
        
        {/* <>{ onMountFetch === true ? onMountFetchHandler() : '' }</> */}


        {
          productsArr ?
              <div className="products__table">
                <CollectionTable products={productsArr}/>
              </div>
            : ''
        }

        <div className="products__pagination">
          { 
            totalProductsInDb ?
              totalProductsInDb > 5 ? 
                  <Pagination length={totalProductsInDb} callback={paginationCallback}/>
                : 
                  'no' 
            : 
              '' 
          }
        </div>
      </main>
    </div>
  )
}