import Navbar from "@/components/navbar"
import BannerCarousel from "@/components/banner-carousel"
import OfferSection from "@/components/offer-section"
import GetReadySection from "@/components/get-ready-section"
import Newsletter from "@/components/newsletter"
import BottomOfferSection from "@/components/bottom-offer-section"
import LatestArrivals from "@/components/latest-arrivals"
import Footer from "@/components/footer"
import { getAllProducts } from "@/lib/userService"

export default async function Home() {
  const data = await getAllProducts()
  return (
    <main className="mt-10 flex flex-col">
      <Navbar />
      <BannerCarousel />
      <OfferSection products={data} />
      <GetReadySection />
      <LatestArrivals products={data} />
      <Newsletter />
      <BottomOfferSection />
      <Footer />
    </main>
  )
}
