'use client'

import Loader from '@/src/components/StyledLoader'
import { Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'

const page = () => {
  const params = useParams();
  const customerId = params.id

  const [filingsData, setFilingsData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({
    search: '',
    financialYear: 'all',
    sortBy: 'filingDate',
  })
  const [isMobile, setIsMobile] = useState(false);
  const [isAddFiling, setIsAddFiling] = useState(false)
  const [addFilingData, setAddFilingData] = useState({
    customerId: customerId,
    filingDate: '',
    income: '',
    totalTaxPayable: {
      totalTax: '',
      cgst: '',
      sgst: '',
      igst: '',
      cess: '',
      compositionTax: '',
    },
    typeOfRegistration: 'Regular'
  })

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    const fetchFilingsData = async () => {
      try {
        const res = await fetch(`/api/filing/${customerId}`)

        if (!res.ok) {
          throw new Error(`Failed to fetch filings: ${res.status} ${res.statusText}`)
        }

        const data = await res.json()

        if (!data.success || !Array.isArray(data.filings)) {
          throw new Error('Invalid data format received')
        }

        setFilingsData(data.filings)
        setError(null)
      } catch (error) {
        console.error('Failed to load filings', error);
        setError(error.message || 'Failed to load filings')
        setFilingsData([])
      } finally {
        setLoading(false)
      }
    }

    if (customerId) {
      fetchFilingsData()
    }
  }, [customerId])

  // Generate financial year options
  const getFinancialYears = () => {
    const years = []
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    const currentMonth = currentDate.getMonth() + 1

    const currentFY = currentMonth >= 4 ? currentYear : currentYear - 1

    for (let i = 0; i < 5; i++) {
      const fyStart = currentFY - i
      const fyEnd = fyStart + 1
      years.push({
        value: `${fyStart}-${fyEnd}`,
        label: `FY ${fyStart}-${fyEnd.toString().slice(-2)}`
      })
    }
    return years
  }

  const getFinancialYear = (date) => {
    const d = new Date(date)
    const year = d.getFullYear()
    const month = d.getMonth() + 1
    return month >= 4 ? `${year}-${year + 1}` : `${year - 1}-${year}`
  }

  const filteredFilings = useMemo(() => {
    if (!filingsData) return []
    return filingsData
      .filter(filing => {
        const income = filing.income || 0
        const totalTax = filing.totalTaxPayable?.totalTax || 0

        // Financial year filter
        const matchesFinancialYear = filters.financialYear === 'all' ||
          getFinancialYear(filing.filingDate) === filters.financialYear

        // Search filter (searches in income and tax amounts)
        const matchesSearch = !filters.search ||
          income.toString().includes(filters.search) ||
          totalTax.toString().includes(filters.search) ||
          filing.typeOfRegistration.toLowerCase().includes(filters.search.toLowerCase())

        return matchesFinancialYear && matchesSearch
      })
      .sort((a, b) => {
        if (filters.sortBy === 'filingDate') {
          return new Date(b.filingDate).getTime() - new Date(a.filingDate).getTime()
        }
        if (filters.sortBy === 'income') {
          return (b.income || 0) - (a.income || 0)
        }
        if (filters.sortBy === 'totalTax') {
          return (b.totalTaxPayable?.totalTax || 0) - (a.totalTaxPayable?.totalTax || 0)
        }
        if (filters.sortBy === 'createdAt') {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        }
        return 0
      })
  }, [filingsData, filters])

  const formatDate = (dateString) => {
    if (!dateString) return 'Not available'
    try {
      return new Date(dateString).toLocaleDateString('en-IN')
    } catch {
      return 'Invalid date'
    }
  }

  const formatCurrency = (amount) => {
    if (!amount && amount !== 0) return '₹0'
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const handleInputChange = (section, field, value) => {
    if (section) {
      setAddFilingData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }))
    } else {
      setAddFilingData(prev => ({
        ...prev,
        [field]: value
      }))
    }

    if (section === 'totalTaxPayable' && field === 'totalTax' && addFilingData.typeOfRegistration === 'Regular') {
      const totalTax = parseFloat(value) || 0
      setAddFilingData(prev => ({
        ...prev,
        totalTaxPayable: {
          ...prev.totalTaxPayable,
          cgst: (totalTax / 2).toFixed(2),
          sgst: (totalTax / 2).toFixed(2),
          igst: '0',
          cess: '0'
        }
      }))
    }
  }

  if (loading) {
    return <div className="place-content-center"><Loader /></div>
  }

  if (error) {
    return (
      <div className='text-[#101E25] h-screen w-full flex flex-col p-10 gap-y-4'>
        <div className='flex flex-col items-center justify-center flex-1 gap-4'>
          <div className='text-red-500 text-xl font-semibold'>Error Loading Filings</div>
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

  const handleAddFiling = async (e) => {
    e.preventDefault()

    try {

      const response = await fetch('/api/filing/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(addFilingData)
      })

      const result = await response.json()

      if (response.ok) {
        alert('New filing added successfully')

        const res = await fetch(`/api/filing/${customerId}`)
        const data = await res.json()
        setFilingsData(data.filings)
        setIsAddFiling(false)

        setAddFilingData({
          customerId: customerId,
          filingDate: '',
          income: '',
          totalTaxPayable: {
            totalTax: '',
            cgst: '',
            sgst: '',
            igst: '',
            cess: '',
            compositionTax: '',
          },
          typeOfRegistration: 'Regular'
        })
      } else {
        console.error('Failed to add new filing data', result.error)
        alert(`Failed to add filing: ${result.error || 'Unknown error'}`)
      }

    } catch (error) {
      console.error('Error:', error)
      alert('An error occurred while adding the filing')
    }
  }

  if (isAddFiling) {
    return (
      <div className="h-screen w-screen fixed top-0 left-0 flex items-center justify-center bg-[#000]/50 backdrop-blur-lg z-50">
        <form onSubmit={handleAddFiling} className="bg-white px-6 py-3 rounded-lg shadow-lg max-w-lg w-full max-h-11/12 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Add New Filing</h2>

          <div className="mb-4">
            <label className='block text-sm font-medium mb-1'>Type of Registration *</label>
            <select
              required
              className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F3BEBA] focus:border-transparent'
              value={addFilingData.typeOfRegistration}
              onChange={(e) => handleInputChange(null, 'typeOfRegistration', e.target.value)}
            >
              <option value="Regular">Regular</option>
              <option value="Composition">Composition</option>
            </select>
          </div>

          <div className="mb-4">
            <label className='block text-sm font-medium mb-1'>Filing Date *</label>
            <input
              type='date'
              required
              className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F3BEBA] focus:border-transparent'
              value={addFilingData.filingDate}
              onChange={(e) => handleInputChange(null, 'filingDate', e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className='block text-sm font-medium mb-1'>Income *</label>
            <input
              type='number'
              required
              min="0"
              step="0.01"
              className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F3BEBA] focus:border-transparent'
              value={addFilingData.income}
              onChange={(e) => handleInputChange(null, 'income', e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className='block text-sm font-medium mb-1'>Total Tax Payable *</label>
            <input
              type='number'
              required
              min="0"
              step="0.01"
              className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F3BEBA] focus:border-transparent'
              value={addFilingData.totalTaxPayable.totalTax}
              onChange={(e) => handleInputChange('totalTaxPayable', 'totalTax', e.target.value)}
            />
          </div>

          {addFilingData.typeOfRegistration === 'Regular' && (
            <>
              <div className='mb-4'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-medium mb-1'>CGST</label>
                    <input
                      type='number'
                      min="0"
                      step='0.01'
                      className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F3BEBA] focus:border-transparent'
                      value={addFilingData.totalTaxPayable.cgst}
                      onChange={(e) => handleInputChange('totalTaxPayable', 'cgst', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium mb-1'>SGST</label>
                    <input
                      type='number'
                      min="0"
                      step='0.01'
                      className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F3BEBA] focus:border-transparent'
                      value={addFilingData.totalTaxPayable.sgst}
                      onChange={(e) => handleInputChange('totalTaxPayable', 'sgst', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium mb-1'>IGST</label>
                    <input
                      type='number'
                      min="0"
                      step='0.01'
                      className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F3BEBA] focus:border-transparent'
                      value={addFilingData.totalTaxPayable.igst}
                      onChange={(e) => handleInputChange('totalTaxPayable', 'igst', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium mb-1'>Cess</label>
                    <input
                      type='number'
                      min="0"
                      step='0.01'
                      className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F3BEBA] focus:border-transparent'
                      value={addFilingData.totalTaxPayable.cess}
                      onChange={(e) => handleInputChange('totalTaxPayable', 'cess', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </>
          )}


          <div className="flex justify-end gap-4 mt-6 ">
            <button
              type="button"
              onClick={() => setIsAddFiling(false)}
              className='px-4 py-2 bg-gray-300 text-gray-800 rounded-4xl hover:bg-gray-400'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='px-6 py-2 bg-gradient-to-tr from-[#F1765B] to-[#F25CA0] text-white font-semibold hover:from-[#F25CA0] hover:to-[#F1765B] rounded-4xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
            >
              Add Filing
            </button>
          </div>
        </form>
      </div>
    )
  }

  const handleDelete = async (id) => {
    const confirmed = confirm('Are you sure to delete this filing?')

    if (confirmed) {
      try {

        const response = await fetch(`/api/filing/${id}`, { method: "DELETE" })

        if (!response.ok) {
          throw new Error('Failed to delete record')
        }
        const result = await response.json()
        console.log(result)

        const res = await fetch(`/api/filing/${customerId}`)
        const data = await res.json()
        setFilingsData(data.filings)
        setIsAddFiling(false)

      } catch (error) {
        console.error('Failed to delete this record.')
        alert('Failed to delete record. Please try again.')
      }
    }
  }

  const renderMobileView = () => (
    <>
      <div className="text-sm font-semibold px-4 py-4 pb-2 grid grid-cols-[1fr_1fr_0.5fr_0.2fr] uppercase flex-shrink-0">
        <div>Filing Date</div>
        <div>Income</div>
        <div>Total Tax</div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <div className="grid gap-2">
          {!filteredFilings || filteredFilings.length === 0 ? (
            <p className="text-sm text-gray-400 p-4">No filings found.</p>
          ) : (
            filteredFilings.map(filing => (
              <div
                key={filing?._id || Math.random()}
                className='bg-[#EEECE8] px-2 py-4 rounded-lg grid grid-cols-[1fr_1fr_0.5fr_0.2fr] items-center justify-between hover:bg-[#e8e4dd] transition'
              >
                <div className="font-semibold">{formatDate(filing?.filingDate)}</div>
                <div>{formatCurrency(filing?.income)}</div>
                <div>{formatCurrency(filing?.totalTaxPayable?.totalTax)}</div>
                <button onClick={() => { handleDelete(filing._id) }} className='text-red-400'><Trash2 /> </button>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );

  const renderDesktopView = () => (
    <>
      <div className="text-base font-semibold p-4 pb-2 grid grid-cols-8 uppercase flex-shrink-0">
        <div>Filing Date</div>
        <div>Income</div>
        <div>Total Tax</div>
        <div>CGST</div>
        <div>SGST</div>
        <div>IGST</div>
        <div>CESS</div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <div className="grid gap-2">
          {!filteredFilings || filteredFilings.length === 0 ? (
            <p className="text-sm text-gray-400 p-4">No filings found.</p>
          ) : (
            filteredFilings.map(filing => (
              <div
                key={filing?._id || Math.random()}
                className='bg-[#EEECE8] pl-4 py-4 rounded-lg grid grid-cols-8 items-center hover:bg-[#e8e4dd] transition'
              >
                <div className="font-semibold">{formatDate(filing?.filingDate)}</div>
                <div className="font-medium text-green-700">{formatCurrency(filing?.income)}</div>
                <div className="font-medium text-red-600">{formatCurrency(filing?.totalTaxPayable?.totalTax)}</div>
                <div>{formatCurrency(filing?.totalTaxPayable?.cgst)}</div>
                <div>{formatCurrency(filing?.totalTaxPayable?.sgst)}</div>
                <div>{formatCurrency(filing?.totalTaxPayable?.igst)}</div>
                <div>{formatCurrency(filing?.totalTaxPayable?.cess)}</div>
                <button onClick={() => { handleDelete(filing._id) }} className='text-red-400'><Trash2 /></button>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );

  return (
    <div className='text-[#101E25] h-screen w-full flex flex-col md:p-10 px-2 py-10 gap-y-4'>
      <div className='flex items-center justify-between flex-shrink-0'>
        <div className="flex justify-between w-full px-2 ">
          <div className='flex gap-4 items-end flex-col md:flex-row'>
            <input
              className='bg-[#F5F4F1] p-2 rounded-lg'
              type="text"
              placeholder='Search by income, tax...'
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            />

            <div className=''>
              <select
                value={filters.financialYear}
                onChange={(e) => setFilters({ ...filters, financialYear: e.target.value })}
                className='bg-[#F5F4F1] p-2 mr-2 rounded-lg'
              >
                <option value="all">All Financial Years</option>
                {getFinancialYears().map(fy => (
                  <option key={fy.value} value={fy.value}>{fy.label}</option>
                ))}
              </select>

              <select
                value={filters.sortBy}
                onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                className='bg-[#F5F4F1] p-2 rounded-lg'
              >
                <option value="filingDate">Sort by Filing Date</option>
                <option value="income">Sort by Income</option>
                <option value="totalTax">Sort by Total Tax</option>
                <option value="createdAt">Sort by Created Date</option>
              </select>
            </div>
            <button
              className='px-4 py-2 bg-gradient-to-tr from-[#f25ca0] to-[#f1765b] text-white rounded-4xl hover:bg-gradient-to-bl hover:from-[#c1497f] hover:to-[#b35743]'
              onClick={() => setIsAddFiling(true)}
            >
              Add filing
            </button>
          </div>
        </div>
      </div>

      <div className='bg-[#F5F4F1] rounded-2xl md:rounded-4xl flex-1 flex flex-col min-h-0'>
        {isMobile ? renderMobileView() : renderDesktopView()}
      </div>

      {/* Summary Section */}
      {filteredFilings && filteredFilings.length > 0 && (
        <div className='bg-[#F5F4F1] rounded-2xl md:rounded-4xl p-4 flex-shrink-0'>
          <div className='text-sm font-semibold mb-2'>Summary</div>
          <div className='grid grid-cols-2 md:grid-cols-3 gap-4 text-sm'>
            <div>
              <span className='text-gray-600'>Total Filings: </span>
              <span className='font-semibold'>{filteredFilings.length}</span>
            </div>
            <div>
              <span className='text-gray-600'>Total Income: </span>
              <span className='font-semibold text-green-700'>
                {formatCurrency(filteredFilings.reduce((sum, f) => sum + (f.income || 0), 0))}
              </span>
            </div>
            <div>
              <span className='text-gray-600'>Total Tax: </span>
              <span className='font-semibold text-red-600'>
                {formatCurrency(filteredFilings.reduce((sum, f) => sum + (f.totalTaxPayable?.totalTax || 0), 0))}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default page