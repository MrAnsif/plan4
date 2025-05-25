'use client'

import Loader from '@/src/components/StyledLoader'
import Link from 'next/link'
import React, { useEffect, useMemo, useState } from 'react'

const page = () => {
  const [customersData, setCustomersData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    search: '',
    type: 'all',
    sortBy: 'name',
  })

  useEffect(() => {
    const fetchCustomersData = async () => {
      try {
        const res = await fetch('/api/customer')
        const data = await res.json()
        setCustomersData(data)
      } catch (error) {
        console.error('Failed to load customers', error);
      } finally {
        setLoading(false)
      }
    }

    fetchCustomersData()
  }, [])

  const filteredCustomers = useMemo(() => {
    if (!customersData) return
    return customersData
      .filter(c => {
        const matchesSearch =
          c.companyName.toLowerCase().includes(filters.search.toLowerCase()) ||
          c.registeredOwner.ownerName.toLowerCase().includes(filters.search.toLowerCase())
        const matchesType = filters.type === 'all' || c.gstDetails.typeOfRegistration === filters.type
        return matchesSearch && matchesType
      })
      .sort((a, b) => {
        if (filters.sortBy === 'name') return a.companyName.localeCompare(b.companyName)
        if (filters.sortBy === 'createdAt')
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        return 0
      })
  }, [customersData, filters])

  if (loading) {
    return <div className="place-content-center"><Loader /></div>
  }

  return (
    <div className='text-[#101E25] h-screen w-full flex flex-col p-10 gap-y-4'>
      <div className='flex items-center justify-between flex-shrink-0'>
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


      </div>

      <div className='bg-[#F5F4F1] rounded-4xl flex-1 flex flex-col min-h-0'>
        <div className="text-base font-semibold p-4 pb-2 grid grid-cols-6 uppercase flex-shrink-0">
          <div>Company Name</div>
          <div>Owner Name</div>
          <div>Registration Type</div>
          <div>Filing Start Date</div>
          <div>Added at</div>
          <div>Action</div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-4">
          <div className="grid gap-2">
            {!filteredCustomers || filteredCustomers.length === 0 ? (
              <p className="text-sm text-gray-400 p-4">No customers found.</p>
            ) : (
              filteredCustomers.map(customer => {
                return (
                  <div
                    key={customer._id}
                    className='bg-[#EEECE8] pl-4 py-4 rounded-lg grid grid-cols-6 items-center hover:bg-[#e8e4dd] transition'
                  >
                    <div className="font-semibold ">{customer.companyName}</div>
                    <div>{customer.registeredOwner.ownerName}</div>
                    <div>{customer.gstDetails.typeOfRegistration}</div>
                    <div>{new Date(customer.gstDetails.filingStartDate).toLocaleDateString('en-IN')}</div>
                    <div>{new Date(customer.createdAt).toLocaleDateString('en-IN')}</div>

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
    </div>
  )
}

export default page