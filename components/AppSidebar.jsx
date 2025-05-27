'use client'

import { LayoutDashboard } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { UserPlus } from "lucide-react"
import { Users } from "lucide-react"
import { useEffect, useState } from "react"


const items = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutDashboard
  },
  {
    title: 'Customers',
    url: '/customers',
    icon: Users
  },
  {
    title: 'Add Customer',
    url: '/customers/add-customer',
    icon: UserPlus
  }
]

const AppSidebar = () => {
  const pathname = usePathname()
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)



  const handleLogout = async () => {

    const confirmed = confirm('Are you sure you want to Logout?')

    if (confirmed) {
      try {
        await fetch('/api/auth/logout', { method: 'POST' })
        setIsLoggedIn(false)
        router.push('/auth/login')
      } catch (error) {
        console.error('Failed to Logout', error);
        alert('Failed to Logout. Please try again.')
      }
    }


  }

  useEffect(() => {
    const sessionStatus = async () => {
      const res = await fetch('/api/auth/session', { method: 'GET' })
      const data = await res.json()
      console.log(data.isLoggedIn)
      setIsLoggedIn(data.isLoggedIn)
    }
    sessionStatus()
  }, [pathname])

  if (!isLoggedIn) return null

  return (
    <div className="h-screen w-1/5 sticky top-0 left-0 bg-[#0F1322] flex flex-col justify-between">
      <div>
        <div className="text-white text-xl my-4 place-items-center ">
          <h1 className="text-neutral-300 font-bold text-2xl uppercase">Plan 4</h1>
        </div>

        <div className="pr-2">
          {
            items.map((item, index) => {
              return (
                <div key={index} className="text-[#B0AEA5]">
                  <Link href={item.url} className={`flex items-center justify-start gap-3 text-xl h-16 px-4 font-semibold transition-all duration-300
                  ${pathname === item.url && 'bg-[#EEECE8] text-[#171F22] rounded-r-full'}
                  `}>
                    <item.icon />
                    <span className="">{item.title}</span>
                  </Link>
                </div>
              )
            })
          }
        </div>
      </div>
      <button onClick={handleLogout} className="text-red-400 text-left w-fit border border-gray-700 hover:bg-[#0b0c13] rounded-4xl m-4 px-4 py-1">Logout</button>
    </div>
  )
}

export default AppSidebar