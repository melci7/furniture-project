import Footer from "@/components/footer"
import Navbar from "@/components/navbar"

export default function CartLayout({ children }) {
  return (
    <section className="lg:mt-10 mt-8 flex flex-col lg:min-h-screen">
      <Navbar />
      {children}
      <div className="hidden lg:block">
        <Footer />
      </div>
    </section>
  )
}
