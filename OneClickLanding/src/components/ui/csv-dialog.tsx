import { useState } from 'react'
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {Form,FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Checkbox } from "@/components/ui/checkbox"
import { importPasswords, storeEntry } from '@/utils/utils';
import { Input } from "@/components/ui/input"
import {ModalContent, ModalHeader, ModalBody,Button} from "@nextui-org/react";
import { toast } from 'sonner'
import CSVReader from 'react-csv-reader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileArrowUp } from '@fortawesome/free-solid-svg-icons'
function CsvDialog(){

  const [loading,setLoading] = useState(false);

    const formSchema = z.object({
        title: z.string().min(3, {
            message: "Title must be at least 3 characters.",
          }),
        username: z.string().min(1, {
          message: "Username must be at least 1 characters.",
        }),
        password: z.string().min(3,{
          message: "Password must be at least 3 characters.",
        }),
        url: z.string().min(3,{
            message: "Url must be at least 3 characters.",
        }),
        isWeb: z.boolean(),
      })

      const passwordForm = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
          title:"",
          username:"",
          password:"",
          url:"",
          isWeb:true,
          
        }
      })

      const parserOptions = {
        header:true,
        skipEmptyLines:true,
      }

      async function onSubmit(values: z.infer<typeof formSchema>, onClose: ()=>void) {
        setLoading(true);
        let passwordObj = {
          title:values.title,
          username:values.username,
          password:values.password,
          url:values.url,
          isWeb: values.isWeb,
        }
        let entryMsg = await (await storeEntry(passwordObj)).text();
        toast.success(entryMsg);
        setLoading(false);
        onClose();
    
      }
    
      

  return (
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Importar contraseñas (.csv)</ModalHeader>
              <ModalBody className='p-4'>
              <CSVReader parserOptions={parserOptions} accept='.csv' onFileLoaded={function(data,fileInfo,originalFile){importPasswords(data, fileInfo, originalFile)}} />

              </ModalBody>
            </>
          )}
        </ModalContent>
            

  )
}

export default CsvDialog
