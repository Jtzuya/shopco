import Collection from "../components/Collection"
import Footer from "../components/Footer"
import Hero from "../components/Hero"
import Marquee from "../components/Marquee"
import Masonry from "../components/Masonry"
import Nav from "../components/Nav"
import Review from "../components/Review"

import casual from '../store/casual'
import formal from '../store/formal'

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Marquee />
      <Collection title="New Arrivals" data={casual} underline="true" toCollection="true"/>
      <Collection title="Top Selling" data={formal} toCollection="true"/>
      <Masonry />
      <Review />
      <Footer />
    </>
  )
}