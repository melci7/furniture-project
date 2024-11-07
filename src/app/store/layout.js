import Footer from "@/components/footer"
import Navbar from "@/components/navbar"

export default function StoreLayout({ children }) {
  return (
    <section className="mb-6 lg:mb-0 lg:mt-8 mt-6">
      <Navbar />
      {children}
      <div className="hidden lg:mt-14 lg:block">
        <Footer />
      </div>
    </section>
  )
}
