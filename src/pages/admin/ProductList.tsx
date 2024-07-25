import { Link } from "react-router-dom";
import Nav from "../../components/admin/Nav";
import Sidebar from "../../components/admin/Sidebar";
import Table from "../../components/admin/Table";
import { useEffect, useState } from "react";

export default function ProductList() {
  const [productsArr, setProductsArr] = useState(null)

  useEffect(() => {
    // Pull data from db
    const products = window.localStorage.getItem('products_arr')
    
    async function getProducts() {
      const endpoint = new URL('/get-products', 'http://localhost:3001')
      
      try {
        const request = await fetch(endpoint, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })

        if (!request.ok) throw new Error('failed to grab data')

        const { data } = await request.json()

        localStorage.setItem('products_arr', JSON.stringify(data))
        setProductsArr(data)
      } catch (error) {
        return error
      }
    }

    if (!products) {
      console.log('we get products from db')
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
          <Link to="/product/new" className="products__create">Add product</Link>
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