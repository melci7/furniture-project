import Footer from "@/components/footer"
import Navbar from "@/components/navbar"

export default function SaleLayout({ children }) {
  return (
    <section className="lg:mt-8 mb-6 lg:mb-0 mt-6">
      <Navbar />
      {children}
      <div className="hidden lg:mt-14 lg:block">
        <Footer />
      </div>
    </section>
  )
}
