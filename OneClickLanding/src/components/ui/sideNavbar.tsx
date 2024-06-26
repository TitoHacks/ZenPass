import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar} from "@nextui-org/react";
import { logout } from '@/utils/utils';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightFromBracket, faGear, faHouse, faLock} from "@fortawesome/free-solid-svg-icons";
import {Divider} from "@nextui-org/react";


let username = sessionStorage.getItem("username");


const SideNavbar = () => {

let avatarUrl = "https://api.dicebear.com/8.x/bottts-neutral/jpg?seed=" + username + "&scale=50&backgroundColor=F21667,96a7ff,3CA467,E9B45C";

  return (
    <nav className='fixed top-0 left-0 bg-backgroundColorDark h-screen px-6 w-1/8'>

      <ul className='flex flex-col justify-evenly items-start h-full'>
      
        <li className='w-full'><a href="/Dashboard"><img src="zenpass-favicon-color.png" className='w-min'></img></a></li>
        <Divider className="my-1 bg-accentColorText " />
        <li className='group w-full hover:cursor-pointer'><a href="/Dashboard" className='transition-all font-semibold ease-in-out duration-150 delay-100 text-white group-hover:text-accentColor'><FontAwesomeIcon icon={faHouse} /> Home</a></li>
        <li className='group w-full hover:cursor-pointer'><a href="/Passwords" className='transition-all font-semibold ease-in-out duration-150 delay-100 text-white group-hover:text-accentColor'><FontAwesomeIcon icon={faLock} /> Passwords</a></li>
        <Divider className="my-1 bg-accentColorText " />
        <p className='text-sm text-gray-400 font-semibold'>Account</p>
        <li>
          <Dropdown placement="right" backdrop='opaque' >
            <DropdownTrigger>
              <div className='w-full flex flex-row justify-evenly items-center hover:cursor-pointer'>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                src={avatarUrl}
              />
              <p className=' ml-4 text-sm text-gray-400 font-bold '>{username}</p>
              </div>
              
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{username}</p>
              </DropdownItem>
              <DropdownItem key="settings" onClick={function(){window.location.href = "/Profile"}} color="danger" startContent={<FontAwesomeIcon icon={faGear} />}>
                My Settings
              </DropdownItem>
              <DropdownItem key="logout" onClick={logout} color="danger" startContent={<FontAwesomeIcon icon={faArrowRightFromBracket} />}>
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
