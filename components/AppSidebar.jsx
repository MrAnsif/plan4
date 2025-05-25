'use client'

import { LayoutDashboard } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { UserPlus } from "lucide-react"
import { Users } from "lucide-react"


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

  return (
    <div className="h-screen w-1/5 sticky top-0 left-0 bg-[#0F1322] ">
      <div className="text-white text-xl my-4 place-items-center ">
        <h1 className="text-neutral-300 font-bold text-2xl uppercase">Plan 4</h1>
      </div>

      <div className="">
        {
          items.map((item, index) => {
            return (
              <div key={index} className="text-[#B0AEA5]">
                <Link href={item.url} className={`flex items-center justify-start gap-3 text-xl h-16 px-4 font-semibold
                  ${pathname === item.url && 'bg-[#EEECE8] text-[#171F22] '}
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
  )
}

export default AppSidebar