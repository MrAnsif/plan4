import { NextResponse } from 'next/server'
import { verifySession } from '@/lib/auth'

export async function GET() {
  const session = await verifySession()
  return NextResponse.json({ isLoggedIn: !!session })
}
