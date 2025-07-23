import { LoginForm } from "@/components/login-form"
import { getCurrentUserFromCookies } from "@/features/auth/helpers/auth.server"
import { redirect } from "next/navigation"

export default async function LoginPage() {
  const user = await getCurrentUserFromCookies()

  if (user) {
    if (user.role === "ADMIN") {
      redirect("/admin")
    } else {
      redirect("/subscriptions")
    }
  }


  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm />
      </div>
    </div>
  )
}
