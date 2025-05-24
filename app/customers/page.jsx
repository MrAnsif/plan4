'use client'

import { customers as mockData } from '@/src/data/customers'
import { gstFilings } from '@/src/data/gstFilings'
import Link from 'next/link'
import React, { useMemo, useState } from 'react'

const Page = () => {
  const [filters, setFilters] = useState({
    search: '',
    type: 'all',
    sortBy: 'name',
  })

  // Match customer with their latest gst filing
  const getFilingStatus = (customerId) => {
    const filings = gstFilings.filter(f => f.customerId === customerId)
    if (filings.length === 0) return null
    return filings.sort((a, b) => new Date(b.month).getTime() - new Date(a.month).getTime())[0]
  }

  const filteredCustomers = useMemo(() => {
    return mockData
      .filter(c => {
        const matchesSearch =
          c.companyName.toLowerCase().includes(filters.search.toLowerCase()) ||
          c.registeredOwner.name.toLowerCase().includes(filters.search.toLowerCase())
        const matchesType = filters.type === 'all' || c.gstDetails.typeOfRegistration === filters.type
        return matchesSearch && matchesType
      })
      .sort((a, b) => {
        if (filters.sortBy === 'name') return a.companyName.localeCompare(b.companyName)
        if (filters.sortBy === 'createdAt')
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        return 0
      })
  }, [filters])

  return (
    <div className='text-[#101E25] grid grid-rows-[1fr_5fr] p-10 w-full gap-y-4'>
      {/* Top Bar: Search & Filters */}
      <div className='flex items-center justify-between '>
        <div className="flex gap-4 items-center">
          <input
            className='bg-[#F5F4F1] p-2 rounded-lg'
            type="text"
            placeholder='Search...'
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />

          <select
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            className='bg-[#F5F4F1] p-2 rounded-lg'
          >
            <option value="all">All Types</option>
            <option value="Regular">Regular</option>
            <option value="Composition">Composition</option>
          </select>

          <select
            value={filters.sortBy}
            onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
            className='bg-[#F5F4F1] p-2 rounded-lg'
          >
            <option value="name">Sort by Name</option>
            <option value="createdAt">Sort by Created Date</option>
          </select>
        </div>

        <div>
          <Link href='/customers/add-customer'>
            <button className='bg-green-600 p-2 rounded-lg text-white' type="button">
              Add new Customer
            </button>
          </Link>
        </div>
      </div>

      {/* Table Section */}
      <div className='bg-[#F5F4F1] rounded-4xl p-4'>
        <div className="text-base font-semibold mb-4 grid grid-cols-6 uppercase ">
          <div>Company Name</div>
          <div>Owner Name</div>
          <div>GSTR-1</div>
          <div>GSTR-3B</div>
          <div>Compounding</div>
          <div>Action</div>
        </div>

        <div className="grid gap-4">
          {filteredCustomers.length === 0 ? (
            <p className="text-sm text-gray-400">No customers found.</p>
          ) : (
            filteredCustomers.map(customer => {
              const filing = getFilingStatus(customer._id)

              return (
                <div
                  key={customer._id}
                  className='bg-[#EEECE8] p-4 rounded-lg grid grid-cols-6 items-center text-sm hover:bg-[#c4c2be] transition'
                >
                  <div className="font-semibold ">{customer.companyName}</div>
                  <div>{customer.registeredOwner.name}</div>

                  <div className={filing?.gstr1?.status === 'Filed' ? 'text-green-500' : 'text-red-400'}>
                    {filing?.gstr1?.status || 'N/A'}
                  </div>

                  <div className={filing?.gstr3b?.status === 'Filed' ? 'text-green-500' : 'text-red-400'}>
                    {filing?.gstr3b?.status || 'N/A'}
                  </div>

                  <div className={filing?.compounding?.status === 'Filed' ? 'text-green-500' : 'text-red-400'}>
                    {filing?.compounding?.status || 'N/A'}
                  </div>

                  <div>
                    <Link href={`/customers/${customer._id}`}>
                      <button className="text-blue-400 hover:underline">View</button>
                    </Link>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}

export default Page
