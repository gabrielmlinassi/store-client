import { type NextRequest } from "next/server"
import { fetchSession } from "./services/user"

const protectedRoutes = ["/checkout", "/account"]

export async function middleware(request: NextRequest) {
  const session = await fetchSession({
    cache: "no-store",
    headers: { Cookie: request.cookies.toString() },
  })

  const path = request.nextUrl.pathname
  const isLoggedIn = session.isLoggedIn

  const isProtectedRoute = protectedRoutes.includes(path)

  if (isProtectedRoute && !isLoggedIn) {
    return Response.redirect(new URL(`/login?redirect-to=${path}`, request.url))
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
}
