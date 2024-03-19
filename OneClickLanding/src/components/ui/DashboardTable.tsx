import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Button } from './button'

  
  



const DashboardTable = () => {
  return (
    <div className=' my-12 rounded-2xl flex  flex-row w-11/12 justify-evenly items-center bg-backgroundSecondary p-4'>
      <Table>
        <TableCaption>A list of your recent passwords.</TableCaption>
        <TableHeader>
            <TableRow>
            <TableHead className="w-[100px] text-secondaryColor">Invoice</TableHead>
            <TableHead className='text-secondaryColor'>Status</TableHead>
            <TableHead className='text-secondaryColor'>Method</TableHead>
            <TableHead className="text-right text-secondaryColor">Amount</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow>
            <TableCell className="font-medium text-white">INV001</TableCell>
            <TableCell className='text-white'>Paid</TableCell>
            <TableCell className='text-white'>Credit Card</TableCell>
            <TableCell className="text-right text-white">$250.00</TableCell>
            </TableRow>
        </TableBody>
    </Table>
    </div>
    
  )
}

export default DashboardTable
