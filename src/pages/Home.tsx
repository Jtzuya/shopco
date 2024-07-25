import Collection from "../components/Collection"
import Footer from "../components/Footer"
import Hero from "../components/Hero"
import Marquee from "../components/Marquee"
import Masonry from "../components/Masonry"
import Nav from "../components/Nav"
import Review from "../components/Review"

import casual from '../store/casual'
import formal from '../store/formal'

interface Reviews {
  name: string;
  message: string;
  date: string;
  verified: boolean;
  rating_count: number;
}

interface Product {
  id: number;
  title: string;
  colors: string[];
  sizes: string[];
  category: string[];
  details: string;
  product_summary: string;
  images: string[];
  current_price: number;
  stock: number;
  reviews: Reviews[];
}

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Marquee />
      <Collection title="New Arrivals" data={casual as Product[]} underline={true} toCollection={true}/>
      <Collection title="Top Selling" data={formal as Product[]} toCollection={true}/>
      <Masonry />
      <Review />
      <Footer />
    </>
  )
}