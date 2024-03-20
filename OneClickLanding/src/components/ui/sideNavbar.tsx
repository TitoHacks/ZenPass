import React from 'react'
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, User} from "@nextui-org/react";
import { logout } from '@/utils/utils';



let username = sessionStorage.getItem("username");

const SideNavbar = () => {
  return (
    <nav className='absolute top-0 left-0 bg-backgroundColorDark h-full px-6'>

        



      <ul className='flex flex-col justify-evenly items-start h-full'>
      
        <li><a href=""><img src=""></img></a></li>
        <li><a href="" className='text-white'>Home</a></li>
        <li><a href="" className='text-white'>Passwords</a></li>
        <li><a href="" className='text-white'>Secure Vault</a></li>
        <li>
          <Dropdown placement="bottom-start">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{username}</p>
              </DropdownItem>
              <DropdownItem key="settings">
                My Settings
              </DropdownItem>
              <DropdownItem key="logout" onClick={logout} color="danger">
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </li>
      </ul>
    </nav>
  )
}

export default SideNavbar
