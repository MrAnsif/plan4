'use client'

import React, { useState } from 'react'
import { User, Building, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Trash2 } from 'lucide-react'
import Loader from '@/src/components/StyledLoader'

const page = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
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
      typeOfRegistration: 'Regular',
      dateOfRegistration: '',
      filingStartDate: '',
      serviceOrSales: 'Service',
      totalTax: '',
      otherExpense: '',
      cgst: '',
      sgst: '',
      igst: '',
      cess: '',
      compositionRate: '',
    },
    businessDetails: {
      buildingStatus: 'Owned',
      rentAmount: '',
      additionalBranches: [], 
    }
  })

  const handleInputChange = (section, field, value) => {
    if (section) {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }))
    }
  }

  const handleBranchChange = (index, value) => {
    const updatedBranches = [...formData.businessDetails.additionalBranches]
    updatedBranches[index] = value
    setFormData(prev => ({
      ...prev,
      businessDetails: {
        ...prev.businessDetails,
        additionalBranches: updatedBranches
      }
    }))
  }

  const addBranch = () => {
    setFormData(prev => ({
      ...prev,
      businessDetails: {
        ...prev.businessDetails,
        additionalBranches: [...prev.businessDetails.additionalBranches, '']
      }
    }))
  }

  const removeBranch = (index) => {
    const updatedBranches = formData.businessDetails.additionalBranches.filter((_, i) => i !== index)
    setFormData(prev => ({
      ...prev,
      businessDetails: {
        ...prev.businessDetails,
        additionalBranches: updatedBranches
      }
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const cleanedData = {
        ...formData,
        gstDetails: {
          ...formData.gstDetails,
          totalTax: formData.gstDetails.totalTax ? parseFloat(formData.gstDetails.totalTax) : undefined,
          otherExpense: formData.gstDetails.otherExpense ? parseFloat(formData.gstDetails.otherExpense) : undefined,
          cgst: formData.gstDetails.cgst ? parseFloat(formData.gstDetails.cgst) : undefined,
          sgst: formData.gstDetails.sgst ? parseFloat(formData.gstDetails.sgst) : undefined,
          igst: formData.gstDetails.igst ? parseFloat(formData.gstDetails.igst) : undefined,
          cess: formData.gstDetails.cess ? parseFloat(formData.gstDetails.cess) : undefined,
          compositionRate: formData.gstDetails.compositionRate ? parseFloat(formData.gstDetails.compositionRate) : undefined,
        },
        businessDetails: {
          ...formData.businessDetails,
          rentAmount: formData.businessDetails.rentAmount ? parseFloat(formData.businessDetails.rentAmount) : undefined,
          additionalBranches: formData.businessDetails.additionalBranches.filter(branch => branch.trim() !== '')
        }
      }

      const response = await fetch('/api/add-customer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cleanedData),
      })

      const result = await response.json()

      if (response.ok) {
        alert('Customer added successfully!')
        router.push('/customers')
      } else {
        alert('Error adding customer: ' + (result.error || 'Unknown error'))
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error adding customer')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="place-content-center"><Loader /></div>
  }

  return (
    <div className='text-[#101E25] p-10 w-full'>
      <h1 className='text-3xl font-bold mb-6'>Add New Customer</h1>

      <form onSubmit={handleSubmit} className='flex flex-col gap-6'>

        {/* Company Details */}
        <div className='w-full rounded-4xl bg-[#F5F4F1] p-6'>
          <h2 className='text-2xl font-bold flex items-center gap-2 underline mb-4'>
            <Building />
            Company Details
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium mb-1'>Company Name *</label>
              <input
                type='text'
                required
                className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F3BEBA] focus:border-transparent'
                value={formData.companyName}
                onChange={(e) => handleInputChange(null, 'companyName', e.target.value)}
              />
            </div>
            <div>
              <label className='block text-sm font-medium mb-1'>Company Phone *</label>
              <input
                type='tel'
                required
                className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F3BEBA] focus:border-transparent'
                value={formData.companyPhone}
                onChange={(e) => handleInputChange(null, 'companyPhone', e.target.value)}
              />
            </div>
            <div className='md:col-span-2'>
              <label className='block text-sm font-medium mb-1'>Company Address *</label>
              <textarea
                required
                rows='3'
                className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F3BEBA] focus:border-transparent'
                value={formData.companyAddress}
                onChange={(e) => handleInputChange(null, 'companyAddress', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Owner Details */}
        <div className='w-full rounded-4xl bg-[#F5F4F1] p-6'>
          <h2 className='text-2xl font-bold flex items-center gap-2 underline mb-4'>
            <User />
            Owner Details
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium mb-1'>Owner Name *</label>
              <input
                type='text'
                required
                className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F3BEBA] focus:border-transparent'
                value={formData.registeredOwner.ownerName}
                onChange={(e) => handleInputChange('registeredOwner', 'ownerName', e.target.value)}
              />
            </div>
            <div>
              <label className='block text-sm font-medium mb-1'>Owner Phone *</label>
              <input
                type='tel'
                required
                className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F3BEBA] focus:border-transparent'
                value={formData.registeredOwner.ownerPhone}
                onChange={(e) => handleInputChange('registeredOwner', 'ownerPhone', e.target.value)}
              />
            </div>
            <div>
              <label className='block text-sm font-medium mb-1'>Owner Email *</label>
              <input
                type='email'
                required
                className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F3BEBA] focus:border-transparent'
                value={formData.registeredOwner.ownerEmail}
                onChange={(e) => handleInputChange('registeredOwner', 'ownerEmail', e.target.value)}
              />
            </div>
            <div>
              <label className='block text-sm font-medium mb-1'>Owner Address *</label>
              <textarea
                required
                rows='3'
                className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F3BEBA] focus:border-transparent'
                value={formData.registeredOwner.ownerAddress}
                onChange={(e) => handleInputChange('registeredOwner', 'ownerAddress', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* GST Details */}
        <div className='w-full rounded-4xl bg-[#F5F4F1] p-6'>
          <h2 className='text-2xl font-bold underline mb-4'>GST Details</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium mb-1'>GST Number *</label>
              <input
                type='text'
                required
                className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F3BEBA] focus:border-transparent'
                value={formData.gstDetails.gstNumber}
                onChange={(e) => handleInputChange('gstDetails', 'gstNumber', e.target.value)}
              />
            </div>
            <div>
              <label className='block text-sm font-medium mb-1'>Type of Registration *</label>
              <select
                required
                className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F3BEBA] focus:border-transparent'
                value={formData.gstDetails.typeOfRegistration}
                onChange={(e) => handleInputChange('gstDetails', 'typeOfRegistration', e.target.value)}
              >
                <option value='Regular'>Regular</option>
                <option value='Composition'>Composition</option>
              </select>
            </div>
            <div>
              <label className='block text-sm font-medium mb-1'>Date of Registration *</label>
              <input
                type='date'
                required
                className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F3BEBA] focus:border-transparent'
                value={formData.gstDetails.dateOfRegistration}
                onChange={(e) => handleInputChange('gstDetails', 'dateOfRegistration', e.target.value)}
              />
            </div>
            <div>
              <label className='block text-sm font-medium mb-1'>Filing Start Date *</label>
              <input
                type='date'
                required
                className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F3BEBA] focus:border-transparent'
                value={formData.gstDetails.filingStartDate}
                onChange={(e) => handleInputChange('gstDetails', 'filingStartDate', e.target.value)}
              />
            </div>
            <div>
              <label className='block text-sm font-medium mb-1'>Service or Sales *</label>
              <select
                required
                className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F3BEBA] focus:border-transparent'
                value={formData.gstDetails.serviceOrSales}
                onChange={(e) => handleInputChange('gstDetails', 'serviceOrSales', e.target.value)}
              >
                <option value='Service'>Service</option>
                <option value='Sales'>Sales</option>
              </select>
            </div>
            <div>
              <label className='block text-sm font-medium mb-1'>Total Tax</label>
              <input
                type='number'
                step='0.01'
                className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F3BEBA] focus:border-transparent'
                value={formData.gstDetails.totalTax}
                onChange={(e) => handleInputChange('gstDetails', 'totalTax', e.target.value)}
              />
            </div>
            <div>
              <label className='block text-sm font-medium mb-1'>Other Expense</label>
              <input
                type='number'
                step='0.01'
                className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F3BEBA] focus:border-transparent'
                value={formData.gstDetails.otherExpense}
                onChange={(e) => handleInputChange('gstDetails', 'otherExpense', e.target.value)}
              />
            </div>
          </div>

          {/* Regular Taxpayer Fields */}
          {formData.gstDetails.typeOfRegistration === 'Regular' && (
            <div className='mt-4'>
              <h3 className='text-lg font-semibold mb-3'>Tax Breakdown</h3>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                <div>
                  <label className='block text-sm font-medium mb-1'>CGST</label>
                  <input
                    type='number'
                    step='0.01'
                    className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F3BEBA] focus:border-transparent'
                    value={formData.gstDetails.cgst}
                    onChange={(e) => handleInputChange('gstDetails', 'cgst', e.target.value)}
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium mb-1'>SGST</label>
                  <input
                    type='number'
                    step='0.01'
                    className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F3BEBA] focus:border-transparent'
                    value={formData.gstDetails.sgst}
                    onChange={(e) => handleInputChange('gstDetails', 'sgst', e.target.value)}
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium mb-1'>IGST</label>
                  <input
                    type='number'
                    step='0.01'
                    className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F3BEBA] focus:border-transparent'
                    value={formData.gstDetails.igst}
                    onChange={(e) => handleInputChange('gstDetails', 'igst', e.target.value)}
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium mb-1'>Cess</label>
                  <input
                    type='number'
                    step='0.01'
                    className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F3BEBA] focus:border-transparent'
                    value={formData.gstDetails.cess}
                    onChange={(e) => handleInputChange('gstDetails', 'cess', e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Composition Taxpayer Fields */}
          {formData.gstDetails.typeOfRegistration === 'Composition' && (
            <div className='mt-4'>
              <h3 className='text-lg font-semibold mb-3'>Composition Details</h3>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium mb-1'>Composition Rate (%)</label>
                  <input
                    type='number'
                    step='0.01'
                    className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F3BEBA] focus:border-transparent'
                    value={formData.gstDetails.compositionRate}
                    onChange={(e) => handleInputChange('gstDetails', 'compositionRate', e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Business Details */}
        <div className='w-full rounded-4xl bg-[#F5F4F1] p-6'>
          <h2 className='text-2xl font-bold underline mb-4'>Business Details</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium mb-1'>Building Status *</label>
              <select
                required
                className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F3BEBA] focus:border-transparent'
                value={formData.businessDetails.buildingStatus}
                onChange={(e) => handleInputChange('businessDetails', 'buildingStatus', e.target.value)}
              >
                <option value='Owned'>Owned</option>
                <option value='Rented'>Rented</option>
              </select>
            </div>
            {formData.businessDetails.buildingStatus === 'Rented' && (
              <div>
                <label className='block text-sm font-medium mb-1'>Rent Amount</label>
                <input
                  type='number'
                  step='0.01'
                  className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F3BEBA] focus:border-transparent'
                  value={formData.businessDetails.rentAmount}
                  onChange={(e) => handleInputChange('businessDetails', 'rentAmount', e.target.value)}
                />
              </div>
            )}
          </div>

          <div className='mt-4'>
            <label className='block text-sm font-medium mb-2'>Additional Branches</label>
            {formData.businessDetails.additionalBranches.length === 0 ? (
              <p className='text-gray-500 mb-2 italic'>No additional branches added yet. Click "Add Branch" to add one.</p>
            ) : (
              formData.businessDetails.additionalBranches.map((branch, index) => (
                <div key={index} className='flex gap-2 mb-2'>
                  <input
                    type='text'
                    placeholder={`Branch ${index + 1} address`}
                    className='flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F3BEBA] focus:border-transparent'
                    value={branch}
                    onChange={(e) => handleBranchChange(index, e.target.value)}
                  />
                  <button
                    type='button'
                    onClick={() => removeBranch(index)}
                    className='p-3 bg-[#F6CCC9] rounded-lg hover:bg-[#f3beba] transition-colors text-red-600'
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))
            )}
            <button
              type='button'
              onClick={addBranch}
              className='flex items-center gap-2 p-2 border-2 border-[#F1765B] hover:border-[#F25CA0] font-semibold rounded-lg transition-colors'
            >
              <Plus size={16} />
              Add Branch
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <div className='flex justify-end gap-4'>
          <button
            type='button'
            onClick={() => router.back()}
            className='px-6 py-3 bg-[#0F1322] text-white rounded-lg hover:bg-gray-800 transition-colors'
          >
            Cancel
          </button>
          <button
            type='submit'
            disabled={loading}
            className='px-6 py-3 bg-gradient-to-tr from-[#F1765B] to-[#F25CA0] text-white font-semibold hover:from-[#F25CA0] hover:to-[#F1765B] rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {loading ? 'Adding Customer...' : 'Add Customer'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default page