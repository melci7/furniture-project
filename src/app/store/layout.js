import Footer from "@/components/footer"
import Navbar from "@/components/navbar"

export default function StoreLayout({ children }) {
  return (
    <section className="lg:mt-10 mt-8">
      <Navbar />
      {children}
      <div className="hidden lg:block">
        <Footer />
      </div>
    </section>
  )
}
