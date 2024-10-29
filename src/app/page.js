import Navbar from "@/components/navbar"
import BannerCarousel from "@/components/banner-carousel"
import OfferSection from "@/components/offer-section"
import GetReadySection from "@/components/get-ready-section"
import Newsletter from "@/components/newsletter"
import BottomOfferSection from "@/components/bottom-offer-section"
import LatestArrivals from "@/components/latest-arrivals"
import Footer from "@/components/footer"
import { getAllProducts, getProductByCategory } from "@/lib/userService"

export default async function Home() {
  const { data } = await getAllProducts()
  const { data: product } = await getProductByCategory("Sofa")
  const { data: armchair } = await getProductByCategory("Armchair")

  return (
    <main className="lg:mt-10 mt-8 flex flex-col">
      <Navbar />
      <BannerCarousel product={product} />
      <OfferSection products={armchair} />
      <GetReadySection />
      <LatestArrivals products={data} />
      <Newsletter />
      <BottomOfferSection />
      <Footer />
    </main>
  )
}
