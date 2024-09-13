import { Suspense } from "react"
import Navbar from "@/components/navbar"
import LoginForm from "../../components/login-form"

export default function LoginPage() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <LoginForm />
      </Suspense>
    </>
  )
}
