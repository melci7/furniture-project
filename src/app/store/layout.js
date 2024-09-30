import Footer from "@/components/footer"
import Navbar from "@/components/navbar"

export default function StoreLayout({ children }) {
  return (
    <section className="lg:mt-10 mt-8">
      <Navbar />
      {children}
      <Footer />
    </section>
  )
}
