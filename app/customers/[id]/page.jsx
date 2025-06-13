'use client'

import { User } from 'lucide-react'
import { Building } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Loader from '@/src/components/StyledLoader'
import { UserMinus } from 'lucide-react'
import { UserPen } from 'lucide-react'
import { Book } from 'lucide-react'

const page = () => {
  const params = useParams();
  const id = params.id
  const router = useRouter()


  const [error, setError] = useState(null)

  const [customerDetails, setCustomerDetails] = useState({
    companyName: '',
    companyAddress: '',
    companyPhone: '',
    registeredOwner: {
      ownerName: '',
      ownerAddress: '',
      ownerPhone: '',
      ownerEmail: '',
    },
    gstDetails: {
      gstNumber: '',
      typeOfRegistration: '',
      dateOfRegistration: '',
      filingStartDate: '',
      serviceOrSales: '',
      totalTax: 0,
      otherExpense: 0,
      cgst: 0,
      sgst: 0,
      igst: 0,
      cess: 0,
    },
    businessDetails: {
      buildingStatus: '',
      rentAmount: 0,
      additionalBranches: [],
    }
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return;

    const fetchDetails = async () => {
      try {
        const res = await fetch(`/api/customer/${id}`, {
          cache: "no-store"
        })

        if (!res.ok) {
          throw new Error(`Failed to fetch customer: ${res.status} ${res.statusText}`)
        }

        const data = await res.json()

        if (!data) {
          throw new Error('No customer data received')
        }

        const safeData = {
          companyName: data.companyName || '',
          companyAddress: data.companyAddress || '',
          companyPhone: data.companyPhone || '',
          registeredOwner: {
            ownerName: data.registeredOwner?.ownerName || '',
            ownerAddress: data.registeredOwner?.ownerAddress || '',
            ownerPhone: data.registeredOwner?.ownerPhone || '',
            ownerEmail: data.registeredOwner?.ownerEmail || '',
          },
          gstDetails: {
            gstNumber: data.gstDetails?.gstNumber || '',
            typeOfRegistration: data.gstDetails?.typeOfRegistration || '',
            dateOfRegistration: data.gstDetails?.dateOfRegistration || '',
            filingStartDate: data.gstDetails?.filingStartDate || '',
            serviceOrSales: data.gstDetails?.serviceOrSales || '',
            totalTax: data.gstDetails?.totalTax || 0,
            otherExpense: data.gstDetails?.otherExpense || 0,
            cgst: data.gstDetails?.cgst || 0,
            sgst: data.gstDetails?.sgst || 0,
            igst: data.gstDetails?.igst || 0,
            cess: data.gstDetails?.cess || 0,
            compositionRate: data.gstDetails?.compositionRate || 0,
          },
          businessDetails: {
            buildingStatus: data.businessDetails?.buildingStatus || '',
            rentAmount: data.businessDetails?.rentAmount || 0,
            additionalBranches: data.businessDetails?.additionalBranches || [],
          }
        }

        setCustomerDetails(safeData)
        setError(null)

      } catch (error) {
        console.error('Failed to load customer:', error);
        setError(error.message || 'Failed to load customer data')
      } finally {
        setLoading(false)
      }
    }

    fetchDetails()
  }, [id])

  const handleDelete = async () => {
    const confirmed = confirm("Are you sure you want to delete this Customer?")
    if (confirmed) {
      try {
        const res = await fetch(`/api/customer/${id}`, { method: "DELETE" })

        if (!res.ok) {
          throw new Error('Failed to delete customer')
        }

        const result = await res.json()
        router.push('/customers')

      } catch (error) {
        console.error('Failed to delete customer', error);
        alert('Failed to delete customer. Please try again.')
      }
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Not provided'
    try {
      return new Date(dateString).toLocaleDateString('en-IN')
    } catch {
      return 'Invalid date'
    }
  }

  const formatCurrency = (amount) => {
    if (amount === null || amount === undefined || isNaN(amount)) return '₹0'
    return `₹${Number(amount).toLocaleString('en-IN')}`
  }

  if (loading) {
    return <div className="place-content-center"><Loader /></div>
  }

  if (error) {
    return (
      <div className='text-[#101E25] p-10 w-full'>
        <div className='flex flex-col items-center justify-center min-h-[400px] gap-4'>
          <div className='text-red-300 text-xl font-semibold'>Error Loading Customer</div>
          <div className='text-gray-400'>{error}</div>
          <div className='flex gap-4'>
            <button
              onClick={() => window.location.reload()}
              className='px-4 py-2 bg-gradient-to-tr from-[#f25ca0] to-[#f1765b] text-white rounded-4xl hover:bg-gradient-to-bl hover:from-[#c1497f] hover:to-[#b35743]'
            >
              Try Again
            </button>
            <button
              onClick={() => router.push('/customers')}
              className='px-4 py-2 bg-[#0f1322b7] text-white rounded-4xl hover:bg-[#0f1322cb]'
            >
              Back to Customers
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='text-[#101E25] p-10 w-full gap-y-4'>
      <div className='flex items-center justify-between mb-7 px-5'>
        <h1 className='text-3xl font-bold hidden md:block'>Customer Details</h1>
        <div className="flex gap-10 ">
          <button className='flex gap-1 font-semibold text-[#0F1322] px-4 py-2 rounded-full bg-gradient-to-tr from-[#F1765B]/20 to-[#F25CA0]/20 hover:underline' onClick={() => { router.push(`/customers/${id}/filing`) }} ><Book width={20} height={24} />Filing</button>
          <button className='flex gap-1 font-semibold text-[#0F1322] px-4 py-2 rounded-full bg-gradient-to-tr from-[#F1765B]/20 to-[#F25CA0]/20  hover:underline' onClick={() => { router.push(`/customers/${id}/edit`) }} ><UserPen width={20} height={24} />Edit Details</button>
          <button className='flex gap-1 font-semibold text-red-500 px-4 py-2 rounded-full bg-gradient-to-tr from-[#F1765B]/20 to-[#F25CA0]/20  hover:underline' onClick={handleDelete}><UserMinus width={20} height={24} />Delete Customer</button>
        </div>
      </div>

      <div className=' flex flex-col gap-4 break-words'>
        <div className='w-full  rounded-4xl bg-[#F5F4F1] p-4 text-lg '>
          <h1 className='text-2xl font-bold flex items-center gap-2 underline'>
            <User />
            Owner Details</h1>
          <div className='my-2 pb-3 grid md:grid-cols-2 gap-y-2'>
            <h1> <strong>Owner Name:</strong> {customerDetails.registeredOwner?.ownerName || 'Not provided'}</h1>
            <h1> <strong>Address:</strong> {customerDetails.registeredOwner?.ownerAddress || 'Not provided'}</h1>
            <h1> <strong>Phone:</strong> {customerDetails.registeredOwner?.ownerPhone || 'Not provided'}</h1>
            <h1> <strong>Email:</strong> {customerDetails.registeredOwner?.ownerEmail || 'Not provided'}</h1>
          </div>
        </div>

        <div className='w-full rounded-4xl  bg-[#F5F4F1] p-4 text-lg'>
          <h1 className='text-2xl font-bold flex items-center gap-2 underline'>
            <Building />
            Company Details</h1>
          <div className='my-2 pb-3 border-b border-b-gray-300 gap-y-2'>
            <h1><strong>Company Name:</strong> {customerDetails.companyName || 'Not provided'}</h1>
            <h1><strong>Address:</strong> {customerDetails.companyAddress || 'Not provided'}</h1>
            <h1><strong>Phone:</strong> {customerDetails.companyPhone || 'Not provided'}</h1>
          </div>

          <h1 className='text-2xl font-bold underline'>GST Details</h1>
          <div className='my-2 pb-3 border-b border-b-gray-300 grid md:grid-cols-2 gap-y-2'>
            <span>
              <h1><strong>GST Number:</strong> {customerDetails.gstDetails?.gstNumber || 'Not provided'}</h1>
              <h1><strong>Type of Registration:</strong> {customerDetails.gstDetails?.typeOfRegistration || 'Not provided'}</h1>
              <h1><strong>Date of Registration:</strong> {formatDate(customerDetails.gstDetails?.dateOfRegistration)}</h1>
              <h1><strong>Filing Start Date:</strong> {formatDate(customerDetails.gstDetails?.filingStartDate)}</h1>
              <h1><strong>Service or Sales:</strong> {customerDetails.gstDetails?.serviceOrSales || 'Not provided'}</h1>
              {/* <h1><strong>Payable Tax:</strong> {formatCurrency(customerDetails.gstDetails?.totalTax)}</h1> */}
              {/* <h1><strong>Other Expense:</strong> {formatCurrency(customerDetails.gstDetails?.otherExpense)}</h1> */}
            </span>
            {/* <span>
              {
                customerDetails.gstDetails?.typeOfRegistration === 'Regular' ? (
                  <>
                    <h1><strong>CGST:</strong> {formatCurrency(customerDetails.gstDetails?.cgst)}</h1>
                    <h1><strong>SGST:</strong> {formatCurrency(customerDetails.gstDetails?.sgst)}</h1>
                    <h1><strong>IGST:</strong> {formatCurrency(customerDetails.gstDetails?.igst)}</h1>
                    <h1><strong>Cess:</strong> {formatCurrency(customerDetails.gstDetails?.cess)}</h1>
                  </>
                ) : (
                  <>
                    <h1><strong>Composition :</strong> {customerDetails.gstDetails?.compositionRate || 0}</h1>
                    <h1><strong>Cess:</strong> {formatCurrency(customerDetails.gstDetails?.cess)}</h1>
                  </>
                )
              }
            </span> */}
          </div>

          <h1 className='text-2xl font-bold underline'>Business Details</h1>
          <div className='my-2 pb-3'>
            <h1><strong>Building Status:</strong> {customerDetails.businessDetails?.buildingStatus || 'Not provided'}</h1>
            <h1><strong>Rent Amount:</strong> {formatCurrency(customerDetails.businessDetails?.rentAmount)}</h1>
            <h1><strong>Additional Branches:</strong></h1>
            <ul className='ml-4 mt-2'>
              {customerDetails.businessDetails?.additionalBranches?.length > 0 ? (
                customerDetails.businessDetails.additionalBranches.map((branch, index) => (
                  <li key={index} className='list-disc'>{branch}</li>
                ))
              ) : (
                <li className='list-none text-gray-500'>No additional branches</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page