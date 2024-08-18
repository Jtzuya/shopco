import { useState } from "react"
import Collection from "../components/Collection"
import Footer from "../components/Footer"
import Hero from "../components/Hero"
import Marquee from "../components/Marquee"
import Masonry from "../components/Masonry"
import Nav from "../components/Nav"
import Review from "../components/Review"

import butter from "../libs/helper/butter"
import Endpoints from "../libs/helper/endpoints"

interface Product {
  // id: number;
  name: string;
  url: string;
  current_price: number;
  // colors: string[];
  // sizes: string[];
  // category: string[];
  // details: string;
  // product_summary: string;
  // stock: number;
  // reviews: Reviews[];
}

export default function Home() {
  const server = new Endpoints()
  const [onMountFetch, setOnMountFetch] = useState(true) 
  const [loader, setLoader] = useState(true) 
  const [newArrivalsProducts, setNewArrivalsProducts] = useState<Product[]>(Array.from({ length: 5 }, () => temporaryCollectionProducts()))
  const [topSellingProducts, setTopSellingProducts] = useState<Product[]>(Array.from({ length: 5 }, () => temporaryCollectionProducts()))
  const collectionChoice = [43, 44]

  async function onMountFetchHandler() {
    if (!onMountFetch) return
    setOnMountFetch(false)

    try {
      const newArrivalsProductsReq = await butter(server.getCollectionProductsById(collectionChoice[0]), 'get')
      const newArrivalsProductsRes = await newArrivalsProductsReq.json() 
      if(newArrivalsProductsReq.ok) setNewArrivalsProducts(newArrivalsProductsRes.data.products)

      const topSellingProductsReq = await butter(server.getCollectionProductsById(collectionChoice[1]), 'get')
      const topSellingProductsRes = await topSellingProductsReq.json() 
      if(topSellingProductsReq.ok) setTopSellingProducts(topSellingProductsRes.data.products)
  
      setLoader(false)
    } catch (error) {
      setLoader(false)
    }
  }

  if (onMountFetch) (async() => await onMountFetchHandler())()

  return (
    <>
      <Nav />
      <Hero />
      <Marquee />
      <Collection title="New Arrivals" loader={loader} data={newArrivalsProducts} underline={true} toCollection={true}/>
      <Collection title="Top Selling"  loader={loader} data={topSellingProducts} toCollection={true}/>
      <Masonry />
      <Review />
      <Footer />
    </>
  )
}

function temporaryCollectionProducts() {
  return {
    name: 'Lorem Ipsum Dolor Set',
    url: '',
    current_price: 999,
  }
}