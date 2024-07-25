import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import { useState } from 'react'

/** pages */
import Home from './pages/Home'
import OnSale from './pages/collections/Sale'
import NewArrivals from './pages/collections/NewArrivals'
import Brands from './pages/collections/Brands'
import Cart from './pages/Cart'
import User from './pages/User'

import Admin from './pages/admin/Overview'
import AdminProductList from './pages/admin/ProductList'
import AdminProduct from './pages/admin/Product'
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
        <Route exact={true} path='/' element={<Home />} />
        <Route path='/on-sale' element={<OnSale />} />
        <Route path='/new-arrivals' element={<NewArrivals />} />
        <Route path='/brands' element={<Brands />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/user' element={<User />} />

        {/* Protected Routes */}
        <Route path='/admin' element={<Admin />} /> {/** Overview */}
        <Route path='/admin/product-list' element={<AdminProductList />} />
        <Route path='/admin/product' element={<AdminProduct />} />
        <Route path='/admin/transaction-list' element={<AdminTransactionList />} />
        <Route path='/admin/transaction' element={<AdminTransaction />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
