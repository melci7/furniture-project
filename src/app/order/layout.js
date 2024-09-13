import Navbar from "@/components/navbar"

export default function Layout({ children }) {
  return (
    <section className="my-10 flex flex-col min-h-screen">
      <Navbar />
      {children}
    </section>
  )
}
