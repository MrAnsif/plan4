import { NextResponse } from 'next/server'
import { verifySession } from '@/lib/auth'

const protectedRoutes = ['/dashboard', '/customers', '/api/add-customer', '/api/customer', 'api/dashboard']
const authRoutes = ['/auth/login']

export async function middleware(request) {
  const session = await verifySession()
  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  )
  const isAuthRoute = authRoutes.includes(request.nextUrl.pathname)

  console.log('Middleware executed for path:', request.nextUrl.pathname)
  console.log('Session exists:', !!session)
  console.log('Is protected route:', isProtectedRoute)
  console.log('Is auth route:', isAuthRoute)

  if (isAuthRoute && session) {
    console.log('Redirecting from auth route to dashboard (user already logged in)')
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  if (isProtectedRoute && !session) {
    console.log('Redirecting from protected route to login (user not logged in)')
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  console.log('Allowing request to proceed normally')
  return NextResponse.next()
}
