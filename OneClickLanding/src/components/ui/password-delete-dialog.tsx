import React, { useState } from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { deleteEntry } from '@/utils/utils';
import { toast } from 'sonner';



async function handleDelete(passwordId:string){
  let message = await deleteEntry(passwordId);
  toast(message);

  
}


function PasswordDeleteDialog(props){






  return (
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">¿Quieres eliminar esta credencial?</ModalHeader>
              <ModalBody>
                <p>Si decides eliminar esta credencial, no se podrá recuperar y sera eliminada para siempre.</p>
              </ModalBody>
              <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                  Cancelar
                </Button>
                <Button color="primary" onClick={function(){onClose;handleDelete(props.passwordId);}} onPress={onClose}>
                  Eliminar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
            

  )
}

export default PasswordDeleteDialog
