import Navbar from "@/components/navbar"

export default function Layout({ children }) {
  return (
    <section className="lg:my-8 my-6 flex flex-col min-h-screen">
      <Navbar />
      {children}
    </section>
  )
}
