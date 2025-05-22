'use client'

import { LayoutDashboard } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { User } from "lucide-react"
import { File } from "lucide-react"


const items = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutDashboard
  },
  {
    title: 'Customers',
    url: '/customers',
    icon: User
  },
  {
    title: 'Filings',
    url: '/filing',
    icon: File
  }
]

const AppSidebar = () => {
  const pathname = usePathname()

  return (
    <div className="h-screen sticky top-0 left-0 shadow-neutral-700 shadow-xl">
      <div className="text-white text-xl my-4 place-items-center ">
        <h1 className="text-neutral-400 font-bold text-2xl uppercase">Plan 4</h1>
      </div>

      <div className="">
        {
          items.map((item, index) => {
            return (
              <div key={index} className="text-[#B0AEA5]">
                <Link href={item.url} className={`flex items-center justify-start gap-3 text-xl rounded-r-lg h-16 px-4 font-semibold
                  ${pathname === item.url &&'bg-[#B0AEA5] text-[#171F22]' }
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