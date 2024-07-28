import { Link } from "react-router-dom";
import Nav from "../../components/admin/Nav";
import Sidebar from "../../components/admin/Sidebar";
import Table from "../../components/admin/Table";
import { useEffect, useState } from "react";


export default function ProductList() {
  let serverOrigin = import.meta.env.REACT_APP_SERVER_DEVELOPMENT;
  
  if (import.meta.env.REACT_APP_NODE_ENV === 'production') {
    serverOrigin = import.meta.env.REACT_APP_SERVER_PRODUCTION 
  }
  
  const [productsArr, setProductsArr] = useState(null)

  useEffect(() => {
    // Pull data from db
    const products = window.localStorage.getItem('products_arr')
    
    async function getProducts() {
      const endpoint = new URL('/get-products', serverOrigin)
      
      try {
        const request = await fetch(endpoint, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })

        if (!request.ok) throw new Error('failed to grab data')

        const { data } = await request.json()

        console.log('we get products from db')
        localStorage.setItem('products_arr', JSON.stringify(data))
        setProductsArr(data)
      } catch (error) {
        return error
      }
    }

    if (!products) {
      getProducts()
    } else {
      console.log('we got the products from localstorage')
      setProductsArr(JSON.parse(products))
    }
  }, [])

  return (
    <div className="admin">
      <Sidebar currentPage="product-list" />
      <main className="products">
        <Nav name='Products Dashboard' />
        <div className="products__links">
          <Link to={`/admin/product/new`} className="products__create">Add product</Link>
        </div>

        {
          productsArr ?
              <div className="products__table">
                <Table products={productsArr}/>
              </div>
            : ''
        }
      </main>
    </div>
  )
}