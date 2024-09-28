import Navbar from "@/components/navbar"

export default function Layout({ children }) {
  return (
    <section className="lg:my-10 my-8 flex flex-col min-h-screen">
      <Navbar />
      {children}
    </section>
  )
}
