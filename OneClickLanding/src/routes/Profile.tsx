import { useEffect, useState } from 'react'
import SideNavbar from '@/components/ui/sideNavbar'
import DashboardCard from '@/components/ui/DashboardCard'
import DashboardTable from '@/components/ui/DashboardTable'
import ScorePanel from '@/components/ui/ScorePanel'
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, Divider, Input, Button, ModalContent, ModalHeader, ModalBody, ModalFooter} from "@nextui-org/react";
import PasswordDialog from '@/components/ui/password-dialog'
import {Modal} from "@nextui-org/react";
import { deleteAllData, exportCSV, getEntries } from '@/utils/utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile, faFileArrowDown, faGear, faKey, faPlus, faTrash, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import {Accordion, AccordionItem} from "@nextui-org/react";



async function handleDelete(onClose:any,setLoading:any){
  setLoading(true);
  await deleteAllData();
  setLoading(false);
  onClose();
}


function Profile() {
  //Funciones al cargar la pagina

  ////////////////////////////////////////////////////
  const [open,setOpen] = useState(false);
  const [loadingExport, setLoadingExport] = useState(false);
  const [loading, setLoading] = useState(false);



  
  return (
    <>
      <SideNavbar></SideNavbar>
      <div className='ml-6 flex flex-row justify-between h-full bg-backgroundColor w-12/12 dark'>
        
        <div className='ml-32 py-12 h-screen w-10/12 flex flex-col items-center'>
          <h1 className='text-gray-200 font-bold text-2xl ml-10 self-start'>Configuracion</h1>
          <div className='self-start ml-10 w-full'>
            <Divider className="my-1 bg-accentColorText " />
            <Accordion className='py-4'>
              <AccordionItem className='text-white text-lg' key="1" title="Generador de contraseñas" indicator={<FontAwesomeIcon icon={faKey} />}>
                <div className='py-4 flex flex-row justify-between '>
                    <label className='text-gray-300'>Cantidad de caracteres</label>
                    <Input type='number' className='w-2/4'></Input>
                  </div>
                  <div className='py-4 flex flex-row justify-between '>
                    <label className='text-gray-300'>Caracteristicas</label>
                    <Input type='number' className='w-2/4'></Input>
                  </div>
              </AccordionItem>
              <AccordionItem className='text-white text-lg' key="2" title="Otros ajustes" indicator={<FontAwesomeIcon icon={faGear} />} >
                  <div className='py-4 flex flex-row justify-between '>
                    <label className='text-gray-300'>Exportar datos</label>
                    <Button variant='flat' color='primary' isLoading={loadingExport} startContent={<FontAwesomeIcon icon={faFileArrowDown} />} onClick={function(){exportCSV(setLoadingExport)}}>Exportar datos</Button>
                  </div>
              </AccordionItem>
              <AccordionItem className='text-white text-lg' key="3" title="Ajustes peligrosos" subtitle="No tocar si carece de los conocimientos necesarios." indicator={<FontAwesomeIcon icon={faTriangleExclamation} />} disableIndicatorAnimation={true}>
                <div className='py-4 flex flex-row justify-between '>
                    <label className='text-gray-300'>Cantidad de caracteres</label>
                    <Input type='number' className='w-2/4'></Input>
                  </div>
                  <div className='py-4 flex flex-row justify-between '>
                    <label className='text-gray-300'>Borrar datos</label>
                    <Button variant='flat' color='danger' onClick={function(){setOpen(true)}} startContent={<FontAwesomeIcon icon={faTrash} />}>Eliminar datos</Button>
                  </div>
              </AccordionItem>
            </Accordion>
            <div className='w-full flex flex-row justify-end'>
              <Button variant='flat' color='success' className='mr-2' >Guardar cambios</Button>
            </div>
            
          </div>
          
        </div>
        <Modal isOpen={open} onOpenChange={setOpen} isDismissable={false} isKeyboardDismissDisabled={true}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">¿Quieres eliminar tus datos?</ModalHeader>
              <ModalBody>
                <p>Si decides eliminarlos, todas las credenciales almacenadas se eliminaran y no se podran recuperar.</p>
              </ModalBody>
              <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                  Cancelar
                </Button>
                <Button color="primary" startContent={<FontAwesomeIcon icon={faTriangleExclamation} />} isLoading={loading} onClick={function(){handleDelete(onClose,setLoading)}}>
                  Eliminar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
        </Modal>

      </div>  
      
      
    </>
  )
}

export default Profile
