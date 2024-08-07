import Footer from "@/components/footer"
import Navbar from "@/components/navbar"

export default function CartLayout({ children }) {
  return (
    <section className="mt-10 flex flex-col min-h-screen">
      <Navbar />
      {children}
      <Footer />
    </section>
  )
}
