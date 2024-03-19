import { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import SideNavbar from '@/components/ui/sideNavbar'
import DashboardCard from '@/components/ui/DashboardCard'
import DashboardTable from '@/components/ui/DashboardTable'
import ScorePanel from '@/components/ui/ScorePanel'
import { Button } from '@/components/ui/button'





function Dashboard() {
  //Funciones al cargar la pagina

  ////////////////////////////////////////////////////

  const [count, setCount] = useState(0)




  
  return (
    <>

      <div className='flex flex-row justify-between h-full bg-backgroundColor w-9/12'>
        <SideNavbar></SideNavbar>
        <ScorePanel></ScorePanel>
        <div className='ml-32 py-12 h-screen w-10/12 flex flex-col items-center'>
          
          <h1 className='text-gray-200 font-bold text-2xl ml-10 self-start'>Dashboard</h1>
          <DashboardCard />
          <DashboardTable/>
        </div>
      </div>  
      
      
    </>
  )
}

export default Dashboard
