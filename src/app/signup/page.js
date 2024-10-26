import Navbar from "@/components/navbar"
import RegisterForm from "../../components/register-form"
import { Suspense } from "react"
import Spinner from "@/components/spinner"
import Footer from "@/components/footer"

export default function RegisterPage() {
  return (
    <div className="lg:mt-10 mt-8">
      <Navbar />
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen">
            <Spinner size="medium" color="primary" />
          </div>
        }
      >
        <RegisterForm />
      </Suspense>
      <div className="hidden lg:block">
        <Footer />
      </div>
    </div>
  )
}
