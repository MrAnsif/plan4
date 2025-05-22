import SpotlightCard from '@/src/components/SpotlightCard/SpotlightCard'
import { Users, CalendarClock, AlertTriangle, ShieldAlert, BellRing, ClipboardList } from 'lucide-react'
import React from 'react'

const page = () => {
  return (
    <div className="grid grid-rows-[1fr_2fr] p-10 w-full gap-y-4">
      <div className="grid grid-cols-4 gap-x-3 px-6 py-2 text-[#B0AEA5]">


        <SpotlightCard className="custom-spotlight-card" spotlightColor="#526667">
          <div className="flex items-center gap-2 text-2xl font-semibold ">
            <Users className="w-6 h-6" />
            <span>Total Customers</span>
          </div>
          <h1 className=''>pass value</h1>
        </SpotlightCard>

        <SpotlightCard className="custom-spotlight-card" spotlightColor="#526667">
          <div className="flex items-center gap-2 text-2xl font-semibold ">
            <CalendarClock className="w-6 h-6" />
            <span>Filing Due</span>
          </div>
          <h1 className=''>pass value</h1>
        </SpotlightCard>

        <SpotlightCard className="custom-spotlight-card" spotlightColor="#526667">
          <div className="flex items-center gap-2 text-2xl font-semibold ">
            <AlertTriangle className="w-6 h-6" />
            <span>Late Filers</span>
          </div>
          <h1 className=''>pass value</h1>
        </SpotlightCard>

        <SpotlightCard className="custom-spotlight-card" spotlightColor="#526667">
          <div className="flex items-center gap-2 text-2xl font-semibold ">
            <ShieldAlert className="w-6 h-6" />
            <span>Compounding</span>
          </div>
          <h1 className=''>pass value</h1>
        </SpotlightCard>
      </div>

      <div className="grid grid-cols-2 gap-x-3 px-6 py-2 text-[#B0AEA5]">
        <SpotlightCard className="custom-spotlight-card" spotlightColor="#1d282c">
          <div className="flex items-center gap-2 text-xl font-semibold">
            <BellRing className="w-5 h-5" />
            <span>Upcoming Filer Alert</span>
          </div>
          <div>pass data</div>
        </SpotlightCard>

        <SpotlightCard className="custom-spotlight-card" spotlightColor="#1d282c">
          <div className="flex items-center gap-2 text-xl font-semibold">
            <ClipboardList className="w-5 h-5" />
            <span>Due Filers</span>
          </div>
          <div>pass data</div>
        </SpotlightCard>
      </div>
    </div>
  )
}

export default page