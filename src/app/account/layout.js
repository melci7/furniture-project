import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import Sidebar from "./sidebar"

export default function AccountLayout({ children }) {
  return (
    <section className="lg:mt-10 mt-8 flex flex-col lg:min-h-screen">
      <Navbar />
      <div className="lg:my-20 my-8 flex flex-col lg:flex-row items-start gap-10 w-full">
        <Sidebar />
        {children}
      </div>
      <div className="hidden lg:block">
        <Footer />
      </div>
    </section>
  )
}
