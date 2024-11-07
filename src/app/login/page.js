import { Suspense } from "react"
import Navbar from "@/components/navbar"
import LoginForm from "../../components/login-form"
import Spinner from "@/components/spinner"
import Footer from "@/components/footer"

export default function LoginPage() {
  return (
    <div className="lg:mt-8 mt-6">
      <Navbar />
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen">
            <Spinner size="medium" color="primary" />
          </div>
        }
      >
        <LoginForm />
      </Suspense>
      <div className="hidden lg:block">
        <Footer />
      </div>
    </div>
  )
}
