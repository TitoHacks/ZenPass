import React from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


const ScorePanel = () => {
  return (
    
    <div className=' absolute top-0 right-0 h-full flex flex-col w-3/12 justify-start items-start bg-backgroundColor p-4'>
        <h2 className='text-white font-bold text-2xl p-4'>Overall Score</h2>
        <div className='bg-backgroundSecondary rounded-2xl p-4 self-center w-10/12 h-2/5 flex flex-col justify-center items-center'>
            <div className=' h-full w-full rounded-full flex flex-row justify-center items-center'>
                <CircularProgressbar value={67} text='67' strokeWidth={7} styles={buildStyles({textSize:"16",textColor:"rgb(156,163,175) ",pathColor:"#f9769d", trailColor:"#171821"})}></CircularProgressbar>
            </div>
            
        </div>
        <h2 className='text-gray-400 font-medium text-2xl p-4'>Latest Passwords</h2>
    </div>
  )
}

export default ScorePanel
