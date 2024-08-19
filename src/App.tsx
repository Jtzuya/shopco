import { BrowserRouter, Routes, Route } from 'react-router-dom'

/** pages */
import Home from './pages/Home'
import OnSale from './pages/collections/Sale'
import NewArrivals from './pages/collections/NewArrivals'
import Brands from './pages/collections/Brands'
import Cart from './pages/Cart'
import User from './pages/User'
import Product from './pages/Product'

import Admin from './pages/admin/Overview'
import AdminProductList from './pages/admin/ProductList'
import AdminCreateProduct from './pages/admin/CreateProduct'
import AdminEditProduct from './pages/admin/EditProduct'
import AdminCreateCollection from './pages/admin/CreateCollection'
import AdminCollectionList from './pages/admin/CollectionList'
import AdminEditCollection from './pages/admin/EditCollection'
import AdminTransactionList from './pages/admin/TransactionList'
import AdminTransaction from './pages/admin/Transaction'

/** styles */
import './styles/App.scss'

function App() {
  return (
    <BrowserRouter>
      {/* 
        Route simply is the assignment of pages 
        While Link has a connection to Route in
        which page it will render.
      */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/on-sale' element={<OnSale />} />
        <Route path='/new-arrivals' element={<NewArrivals />} />
        <Route path='/brands' element={<Brands />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/user' element={<User />} />
        <Route path='/product/:name' element={<Product />} />
        
        {/* Protected Routes */}
        <Route path='/admin' element={<Admin />} /> {/** Overview */}
        <Route path='/admin/product-list' element={<AdminProductList />} />
        <Route path='/admin/product/create' element={<AdminCreateProduct />} />
        <Route path='/admin/product/:product_id' element={<AdminEditProduct />} />
          
        <Route path='/admin/collection-list' element={<AdminCollectionList />} />
        {/* <Route path='/admin/collection/new' element={<AdminCollection />} /> */}
        <Route path='/admin/collection/create' element={<AdminCreateCollection />} />
        <Route path='/admin/collection/:collection_id' element={<AdminEditCollection />} />
        <Route path='/admin/transaction-list' element={<AdminTransactionList />} />
        <Route path='/admin/transaction' element={<AdminTransaction />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
