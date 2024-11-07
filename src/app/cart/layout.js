import Footer from "@/components/footer"
import Navbar from "@/components/navbar"

export default function CartLayout({ children }) {
  return (
    <section className="lg:mt-8 mt-6 flex flex-col lg:min-h-screen">
      <Navbar />
      {children}
      <div className="hidden lg:block">
        <Footer />
      </div>
    </section>
  )
}
