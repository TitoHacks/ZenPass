import { getStatusCount } from '@/utils/utils';
import React from 'react'
import {CircularProgress} from "@nextui-org/react";



function DashboardCard(props:any) {

  let statusData = getStatusCount(props.passwordEntries);



  return (
    <div className=' my-12 rounded-2xl flex h-1/6 flex-row w-11/12 justify-evenly items-center bg-gradient-to-r from-backgroundSecondary to-accentColorOpacity p-4'>
      <div className='flex flex-row mx-4'>
      <CircularProgress aria-label='safePocent' classNames={{indicator: "stroke-accentColor",value: "font-semibold text-white"}}  className='text-accentColorText mr-4' size="lg" value={statusData.safePorcent} color="danger" showValueLabel={true}/>
        <div className=' flex flex-col align-start'>
        
          <h2 className='text-accentColorText text-sm'>Safe Passwords</h2>
          <p className='font-bold text-white text-xl' >{statusData.safeCount}</p>
        </div>
        <div>

        </div>
      </div>
      <div className='flex flex-row mx-4'>
      <CircularProgress aria-label='weakPocent' classNames={{indicator: "stroke-accentColor",value: "font-semibold text-white"}} className='text-accentColorText mr-4' size="lg" value={statusData.weakPorcent} color="danger" showValueLabel={true}/>
        <div className=' flex flex-col align-start'>
          <h2 className='text-accentColorText text-sm'>Weak Passwords</h2>
          <p className='font-bold text-white text-xl' >{statusData.weakCount}</p>
        </div>
        <div>
          
        </div>
      </div>
      <div className='flex flex-row mx-4'>
      <CircularProgress aria-label='reusedPocent' classNames={{indicator: "stroke-accentColor",value: "font-semibold text-white"}} className='text-accentColorText mr-4' size="lg" value={statusData.reusedPorcent} color="danger" showValueLabel={true}/>
        <div className=' flex flex-col align-start'>
          <h2 className='text-accentColorText text-sm'>Reused Passwords</h2>
          <p className='font-bold text-white text-xl' >{statusData.reusedCount}</p>
        </div>
        <div>
          
        </div>
      </div>
      <div className='flex flex-row mx-4'>
      <CircularProgress aria-label='leakedPocent' classNames={{indicator: "stroke-accentColor",value: "font-semibold text-white"}} className='text-accentColorText mr-4' size="lg" value={statusData.leakedPorcent} color="danger" showValueLabel={true}/>
        <div className=' flex flex-col align-start'>
          <h2 className='text-accentColorText text-sm'>Leaked Passwords</h2>
          <p className='font-bold text-white text-xl' >{statusData.leakedCount}</p>
        </div>
        <div>
          
        </div>
      </div>
    </div>
  )
}

export default DashboardCard
