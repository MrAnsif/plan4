'use client'

import { LayoutDashboard, Menu, X } from "lucide-react"
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
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

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  if (!isLoggedIn) return null

  return (
    <>
      <button
        onClick={toggleMobileMenu}
        className={`md:hidden fixed top-2 left-2 z-50 p-1 bg-[#EDEBE7] text-[#0F1322] rounded-md shadow-lg hover:bg-[#1a2332] transition-colors ${isMobileMenuOpen && '!bg-[#1a2332] text-[#EDEBE7]'} `}
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 bg-opacity-50 z-20"
          onClick={closeMobileMenu}
        />
      )}

      <div className={`
        h-screen bg-[#0F1322] flex flex-col justify-between z-30
        md:w-1/5 md:sticky md:top-0 md:translate-x-0
        fixed top-0 left-0 w-64 transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div>
          <div className="text-white text-xl my-4 place-items-center px-4">
            <h1 className="text-neutral-300 font-bold text-2xl uppercase">Plan 4</h1>
          </div>

          <div className="pr-2">
            {items.map((item, index) => (
              <div key={index} className="text-[#B0AEA5]">
                <Link
                  href={item.url}
                  className={`flex items-center justify-start gap-3 text-xl h-16 px-4 font-semibold transition-all duration-300 rounded-r-full
                    ${pathname === item.url && 'bg-[#EEECE8] text-[#171F22] '}

                  `}
                  onClick={closeMobileMenu}
                >
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="text-red-400 text-left w-fit border border-gray-700 hover:bg-[#0b0c13] rounded-4xl m-4 px-4 py-1 transition-colors"
        >
          Logout
        </button>
      </div>
    </>
  )
}

export default AppSidebar