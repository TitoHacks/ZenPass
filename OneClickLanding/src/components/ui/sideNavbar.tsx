import React from 'react'




const SideNavbar = () => {
  return (
    <nav className='absolute top-0 left-0 bg-backgroundColorDark h-full px-6'>
      <ul className='flex flex-col justify-evenly items-start h-full'>
        <li><a href=""><img src=""></img></a></li>
        <li><a href="" className='text-white'>Home</a></li>
        <li><a href="" className='text-white'>Passwords</a></li>
        <li><a href="" className='text-white'>Secure Vault</a></li>
        <li><a href="" className='text-white'>Account</a></li>
      </ul>
    </nav>
  )
}

export default SideNavbar
