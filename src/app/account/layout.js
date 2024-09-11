import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import Sidebar from "./sidebar"

export default function AccountLayout({ children }) {
  return (
    <section className="mt-10 flex flex-col min-h-screen">
      <Navbar />
      <div className="my-20 flex items-start gap-10 w-full">
        <Sidebar />
        {children}
      </div>

      <Footer />
    </section>
  )
}
