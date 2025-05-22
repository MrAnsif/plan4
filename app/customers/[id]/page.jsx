'use client'

import { User } from 'lucide-react'
import { Building } from 'lucide-react'
import { customers } from '@/src/data/customers'
import { gstFilings } from '@/src/data/gstFilings'
import StyledRadio from '@/src/components/StyledRadio'
import React, { useState } from 'react'
import { useParams } from 'next/navigation'


const page = () => {
  let params = useParams()
  const id = params.id

  const [activeTab, setActiveTab] = useState('overview')
  const customerDetails = customers.find(c => c._id === id)

  const filingData = gstFilings.filter(f => f.customerId === id)


  return (
    <div className='text-[#B0AEA5] p-10 w-full gap-y-4'>

      <StyledRadio setActiveTab={setActiveTab} />

      {activeTab === 'overview' &&
        (<div className=' flex flex-col gap-4'>
          <div className='w-full  rounded-lg border border-neutral-700 bg-[#1D282C] p-4 text-lg '>
            <h1 className='text-2xl font-bold flex items-center gap-2 underline'>
              <User />
              Owner Details</h1>
            <div className='my-2 pb-3 grid grid-cols-2'>
              <h1> <strong>Owner Name:</strong> {customerDetails.registeredOwner.name}</h1>
              <h1> <strong>Address:</strong> {customerDetails.registeredOwner.address}</h1>
              <h1> <strong>Phone:</strong> {customerDetails.registeredOwner.phone}</h1>
              <h1> <strong>Email:</strong> {customerDetails.registeredOwner.email}</h1>
            </div>
          </div>
          <div className='w-full rounded-lg border border-neutral-700 bg-[#1D282C] p-4 text-lg'>
            <h1 className='text-2xl font-bold flex items-center gap-2 underline'>
              <Building />
              Company Details</h1>
            <div className='my-2 pb-3 border-b border-neutral-700'>
              <h1><strong>Company Name:</strong> {customerDetails.companyName}</h1>
              <h1><strong>Address:</strong> {customerDetails.companyAddress}</h1>
              <h1><strong>Phone:</strong> {customerDetails.companyPhone}</h1>
            </div>

            <h1 className='text-2xl font-bold underline'>GST Details</h1>
            <div className='my-2 pb-3 border-b border-neutral-700'>
              <h1><strong>GST Number:</strong> {customerDetails.gstDetails.gstNumber}</h1>
              <h1><strong>Type of Registration:</strong> {customerDetails.gstDetails.typeOfRegistration}</h1>
              <h1><strong>Date of Registration:</strong> {new Date(customerDetails.gstDetails.dateOfRegistration).toLocaleDateString('en-IN')}</h1>
              <h1><strong>Filing Start Date:</strong> {new Date(customerDetails.gstDetails.filingStartDate).toLocaleDateString('en-IN')}</h1>
              <h1><strong>Service or Sales:</strong> {customerDetails.gstDetails.serviceOrSales}</h1>
            </div>

            <h1 className='text-2xl font-bold underline'>Business Details</h1>
            <div className='my-2 pb-3 border-b border-neutral-700'>
              <h1><strong>Building Status:</strong> {customerDetails.businessDetails.buildingStatus}</h1>
              <h1><strong>Rent Amount:</strong> {customerDetails.businessDetails.rentAmount}</h1>
              <h1><strong>Additional Branches:</strong> {customerDetails.businessDetails.additionalBranches}</h1>
            </div>

            <h1 className='text-2xl font-bold underline'>Filing Preferences</h1>
            <div className='my-2 pb-3'>
              <h1><strong>GSTR-1:</strong> {customerDetails.filingPreferences.gstr1 ? '✓ Yes' : '✗ No'}</h1>
              <h1><strong>GSTR-3B:</strong> {customerDetails.filingPreferences.gstr3b ? '✓ Yes' : '✗ No'}</h1>
              <h1><strong>Compounding:</strong> {customerDetails.filingPreferences.compounding ? '✓ Yes' : '✗ No'}</h1>
            </div>
          </div>
        </div>)
      }

      {activeTab === 'filingDetails' &&
        (
          <div className='my-4'>
            <h3 className="text-lg font-semibold mb-3 text-neutral-400">Filing History</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-neutral-700 rounded-lg">
                <thead className="bg-[#1d282c9d]">
                  <tr>
                    <th className="border border-neutral-700 px-4 py-3 text-left font-semibold text-neutral-300">Month</th>
                    <th className="border border-neutral-700 px-4 py-3 text-left font-semibold text-neutral-300">GSTR-1</th>
                    <th className="border border-neutral-700 px-4 py-3 text-left font-semibold text-neutral-300">GSTR-3B</th>
                    <th className="border border-neutral-700 px-4 py-3 text-left font-semibold text-neutral-300">Compounding</th>
                  </tr>
                </thead>
                <tbody>
                  {filingData.map((filing) => (
                    <tr key={filing._id} className="hover:bg-[#1D282C]">
                      <td className="border border-neutral-700 px-4 py-3 font-medium">
                        {new Date(filing.month + '-01').toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'long'
                        })}
                      </td>
                      <td className="border border-neutral-700 px-4 py-3">
                        <div className="space-y-1">
                          <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${filing.gstr1.status === 'Filed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                            }`}>
                            {filing.gstr1.status}
                          </span>
                          {filing.gstr1.dateFiled && (
                            <div className="text-xs text-neutral-400">
                              Filed: {new Date(filing.gstr1.dateFiled).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="border border-neutral-700 px-4 py-3">
                        <div className="space-y-1">
                          <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${filing.gstr3b.status === 'Filed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                            }`}>
                            {filing.gstr3b.status}
                          </span>
                          {filing.gstr3b.dateFiled && (
                            <div className="text-xs text-neutral-400">
                              Filed: {new Date(filing.gstr3b.dateFiled).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="border border-neutral-700 px-4 py-3">
                        <div className="space-y-1">
                          <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${filing.compounding.status === 'Filed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                            }`}>
                            {filing.compounding.status}
                          </span>
                          <div className="text-xs text-neutral-400">
                            Quarter: {filing.compounding.quarter}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default page