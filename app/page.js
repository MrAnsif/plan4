import { verifySession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {

  const session = await verifySession()
  console.log('session from /:', session)

  if (session) {
    redirect('/dashboard')
  } else {
    redirect('/auth/login')
  }
}
