'use client'

import Loader from '@/src/components/StyledLoader'
import Link from 'next/link'
import React, { useEffect, useMemo, useState } from 'react'

const page = () => {
  const [customersData, setCustomersData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)  
  const [filters, setFilters] = useState({
    search: '',
    type: 'all',
    sortBy: 'name',
  })

  useEffect(() => {
    const fetchCustomersData = async () => {
      try {
        const res = await fetch('/api/customer')

        if (!res.ok) {
          throw new Error(`Failed to fetch customers: ${res.status} ${res.statusText}`)
        }

        const data = await res.json()

        if (!Array.isArray(data)) {
          throw new Error('Invalid data format received')
        }

        setCustomersData(data)
        setError(null)  
      } catch (error) {
        console.error('Failed to load customers', error);
        setError(error.message || 'Failed to load customers')
        setCustomersData([]) 
      } finally {
        setLoading(false)
      }
    }

    fetchCustomersData()
  }, [])

  const filteredCustomers = useMemo(() => {
    if (!customersData) return []
    return customersData
      .filter(c => {
        const companyName = c?.companyName || ''
        const ownerName = c?.registeredOwner?.ownerName || ''
        const registrationType = c?.gstDetails?.typeOfRegistration || ''

        const matchesSearch =
          companyName.toLowerCase().includes(filters.search.toLowerCase()) ||
          ownerName.toLowerCase().includes(filters.search.toLowerCase())
        const matchesType = filters.type === 'all' || registrationType === filters.type
        return matchesSearch && matchesType
      })
      .sort((a, b) => {
        if (filters.sortBy === 'name') {
          const nameA = a?.companyName || ''
          const nameB = b?.companyName || ''
          return nameA.localeCompare(nameB)
        }
        if (filters.sortBy === 'createdAt') {
          const dateA = a?.createdAt ? new Date(a.createdAt).getTime() : 0
          const dateB = b?.createdAt ? new Date(b.createdAt).getTime() : 0
          return dateB - dateA
        }
        return 0
      })
  }, [customersData, filters])

  const formatDate = (dateString) => {
    if (!dateString) return 'Not available'
    try {
      return new Date(dateString).toLocaleDateString('en-IN')
    } catch {
      return 'Invalid date'
    }
  }

  if (loading) {
    return <div className="place-content-center"><Loader /></div>
  }

  if (error) {
    return (
      <div className='text-[#101E25] h-screen w-full flex flex-col p-10 gap-y-4'>
        <div className='flex flex-col items-center justify-center flex-1 gap-4'>
          <div className='text-red-500 text-xl font-semibold'>Error Loading Customers</div>
          <div className='text-gray-600'>{error}</div>
          <button
            onClick={() => window.location.reload()}
            className='px-4 py-2 bg-gradient-to-tr from-[#f25ca0] to-[#f1765b] text-white rounded-4xl hover:bg-gradient-to-bl hover:from-[#c1497f] hover:to-[#b35743]'
          >
            Try Again
          </button>
        </div>
      </div>
    )
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
                    key={customer?._id || Math.random()} 
                    className='bg-[#EEECE8] pl-4 py-4 rounded-lg grid grid-cols-6 items-center hover:bg-[#e8e4dd] transition'
                  >
                    <div className="font-semibold">{customer?.companyName || 'N/A'}</div>
                    <div>{customer?.registeredOwner?.ownerName || 'N/A'}</div>
                    <div>{customer?.gstDetails?.typeOfRegistration || 'N/A'}</div>
                    <div>{formatDate(customer?.gstDetails?.filingStartDate)}</div>
                    <div>{formatDate(customer?.createdAt)}</div>

                    <div>
                      {customer?._id ? (
                        <Link href={`/customers/${customer._id}`}>
                          <button className="text-blue-400 hover:underline">View</button>
                        </Link>
                      ) : (
                        <span className="text-gray-400">No ID</span>
                      )}
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