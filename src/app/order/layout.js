import Navbar from "@/components/navbar"

export default function Layout({ children }) {
  return (
    <section className="mt-10 flex flex-col min-h-screen">
      <Navbar />
      {children}
    </section>
  )
}
