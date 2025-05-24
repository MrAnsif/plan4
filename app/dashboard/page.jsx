'use client'

import { PieComponent } from '@/src/components/PieChart'
import SpotlightCard from '@/src/components/SpotlightCard/SpotlightCard'
import { File } from 'lucide-react'
import { Users, AlertTriangle, ShieldAlert, BellRing } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const page = () => {

  const [stats, setStats] = useState({
    totalCustomers: 0,
    upcomingFilers: [],
    recentRegistrations: [],
    typeOfRegistrationBreakdown: []
  })

  useEffect(() => {
    const fetchStats = async () => {
      const res = await fetch('/api/dashboard')
      const data = await res.json()
      setStats(data)
    }

    fetchStats()
  }, [])

  const regularCount = stats.typeOfRegistrationBreakdown.find(item => item._id === 'Regular')?.count || 0;
  const compositionCount = stats.typeOfRegistrationBreakdown.find(item => item._id === 'Composition')?.count || 0;

  console.log(stats)

  return (
    <div className="grid grid-cols-[1fr_2fr] text-[#101E25] px-10 py-5 w-full">

      <div className="grid py-2">
        <SpotlightCard className="custom-spotlight-card m-4" spotlightColor="#526667">
          <div className="flex items-center gap-2 text-2xl font-semibold ">
            <Users className="w-6 h-6" />
            <span>Total Customers</span>
          </div>
          <h1 className='text-6xl font-bold'>{stats.totalCustomers}</h1>
        </SpotlightCard>

        <div className='m-4'>
          <PieComponent regular={regularCount} composition={compositionCount} />
        </div>
      </div>


      <div className="grid grid-rows-2 gap-x-3 px-6 py-2">
        <SpotlightCard className="custom-spotlight-card m-4" spotlightColor="#1d282c">
          <div className=" text-2xl font-semibold">
            <div className='flex items-center gap-2 mb-2'>
              <BellRing className="w-5 h-5" />
              <span>Upcoming Filers</span>
            </div>
            <div className='grid grid-cols-3 text-sm text-neutral-700/80 my-1'>
              <h1>Company Name</h1>
              <h1>Registration Type</h1>
              <h1>Filing Start Date</h1>
            </div>
          </div>
          {
            stats.upcomingFilers.map((e, index) => {

              return (
                <div className='grid grid-cols-3 text-xl h-auto bg-[#EEECE8] pl-2 py-3 mb-2 rounded-lg' key={index}>
                  <h1 className='font-semibold'>{e.companyName}</h1>
                  <h1>{e.gstDetails.typeOfRegistration}</h1>
                  <h1>{new Date(e.gstDetails.filingStartDate).toLocaleDateString('en-IN')}</h1>
                </div>
              )
            })
          }
        </SpotlightCard>

        <SpotlightCard className="custom-spotlight-card m-4" spotlightColor="#526667">
          <div className="text-2xl font-semibold ">
            <div className='flex items-center gap-2 mb-2'>
              <File className="w-6 h-6" />
              <span>Recent registrations</span>
            </div>
            <div className='grid grid-cols-3 text-sm text-neutral-700/80 my-1'>
              <h1>Company Name</h1>
              <h1>Phone</h1>
              <h1>Added Date</h1>
            </div>
          </div>

          {
            stats.recentRegistrations.map((e, index) => {
              return (
                <div className='grid grid-cols-3 text-xl h-auto bg-[#EEECE8] pl-2 py-3 mb-2 rounded-lg' key={index}>
                  <h1 className='font-semibold'>{e.companyName}</h1>
                  <h1 className=''>{e.companyPhone}</h1>
                  <h1 className=''>{new Date(e.createdAt).toLocaleDateString('en-IN')}</h1>
                </div>
              )
            })
          }
        </SpotlightCard>

      </div>

    </div>
  )
}

export default page