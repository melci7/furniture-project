import Footer from "@/components/footer"
import Navbar from "@/components/navbar"

export default function StoreLayout({ children }) {
  return (
    <section className="mt-10">
      <Navbar />
      {children}
      <Footer />
    </section>
  )
}
