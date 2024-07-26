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
  const origin = window.origin;

  return (
    <BrowserRouter>
      {/* 
        Route simply is the assignment of pages 
        While Link has a connection to Route in
        which page it will render.
      */}
      <Routes>
        <Route path={`${origin}/`} element={<Home />} />
        <Route path={`${origin}/on-sale`} element={<OnSale />} />
        <Route path={`${origin}/new-arrivals`} element={<NewArrivals />} />
        <Route path={`${origin}/brands`} element={<Brands />} />
        <Route path={`${origin}/cart`} element={<Cart />} />
        <Route path={`${origin}/user`} element={<User />} />

        {/* Protected Routes */}
        <Route path={`${origin}/admin`} element={<Admin />} /> {/** Overview */}
        <Route path={`${origin}/admin/product-list`} element={<AdminProductList />} />
        <Route path={`${origin}/admin/product`} element={<AdminProduct />} />
        <Route path={`${origin}/admin/product/new`} element={<AdminProduct />} />
        <Route path={`${origin}/admin/product/:id`} element={<AdminProduct />} />
        <Route path={`${origin}/admin/transaction-list`} element={<AdminTransactionList />} />
        <Route path={`${origin}/admin/transaction`} element={<AdminTransaction />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
