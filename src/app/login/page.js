import { Suspense } from "react"
import Navbar from "@/components/navbar"
import LoginForm from "../../components/login-form"
import Spinner from "@/components/spinner"

export default function LoginPage() {
  return (
    <>
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen">
            <Spinner size="medium" color="primary" />
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </>
  )
}
