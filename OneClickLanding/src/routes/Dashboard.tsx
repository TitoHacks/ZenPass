import { useEffect, useState } from 'react'
import SideNavbar from '@/components/ui/sideNavbar'
import DashboardCard from '@/components/ui/DashboardCard'
import DashboardTable from '@/components/ui/DashboardTable'
import ScorePanel from '@/components/ui/ScorePanel'
import {Dropdown, Link, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/react";
import { Button } from '@/components/ui/button'
import PasswordDialog from '@/components/ui/password-dialog'
import {Modal} from "@nextui-org/react";









function Dashboard() {
  //Funciones al cargar la pagina

  ////////////////////////////////////////////////////

  const [count, setCount] = useState(0)
  const [open,setOpen] = useState(false);



  
  return (
    <>
      <SideNavbar></SideNavbar>
      <div className='flex flex-row justify-between h-full bg-backgroundColor w-9/12 dark'>
        
        <ScorePanel></ScorePanel>
        <div className='ml-32 py-12 h-screen w-10/12 flex flex-col items-center'>
          <h1 className='text-gray-200 font-bold text-2xl ml-10 self-start'>Bienvenido {sessionStorage.getItem("username")}</h1>
          <DashboardCard />
          <DashboardTable/>
        </div>
        <div className='absolute bottom-4 right-4'>
          <Dropdown backdrop="blur">
            <DropdownTrigger>
              <Button variant="secondary" >
                +
              </Button>
            </DropdownTrigger>
            <DropdownMenu variant="faded" aria-label="Static Actions">

              <DropdownItem key="new" onClick={function(){setOpen(true)}}>Add password</DropdownItem>
              <DropdownItem key="copy">Import password from .csv</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <Modal isOpen={open} onOpenChange={setOpen} isDismissable={false} isKeyboardDismissDisabled={true}>
          <PasswordDialog></PasswordDialog>
        </Modal>

      </div>  
      
      
    </>
  )
}

export default Dashboard
