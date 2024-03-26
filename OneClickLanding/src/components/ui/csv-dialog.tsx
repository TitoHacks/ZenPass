import { useState } from 'react'
import { importPasswords, storeEntry } from '@/utils/utils';
import {ModalContent, ModalHeader, ModalBody,Button} from "@nextui-org/react";
import { toast } from 'sonner'
import CSVReader from 'react-csv-reader'
import {Progress} from "@nextui-org/react";
function CsvDialog(){

  const [loadValue,setLoadValue] = useState(0); 
  const [visible, setVisible] = useState(false);


      const parserOptions = {
        header:true,
        skipEmptyLines:true,
      }
    
  return (
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Importar contraseñas (.csv)</ModalHeader>
              <ModalBody className='p-4'>
              <CSVReader parserOptions={parserOptions} accept='.csv' onFileLoaded={function(data,fileInfo,originalFile){setVisible(true);importPasswords(data, fileInfo, originalFile,setLoadValue, onClose)}} />
              <div hidden={!visible}>
                <Progress isIndeterminate={true}   size="sm" aria-label="Loading..." value={loadValue} label="Importando..." />
              </div>
              
              </ModalBody>
            </>
          )}
        </ModalContent>
            

  )
}

export default CsvDialog
