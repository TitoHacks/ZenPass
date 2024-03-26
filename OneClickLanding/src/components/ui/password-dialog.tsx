import { useState } from 'react'
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {Form,FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Checkbox } from "@/components/ui/checkbox"
import { storeEntry } from '@/utils/utils';
import { Input } from "@/components/ui/input"
import {ModalContent, ModalHeader, ModalBody,Button} from "@nextui-org/react";
import { toast } from 'sonner'
function PasswordDialog(){

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
              <ModalHeader className="flex flex-col gap-1">Nueva credencial</ModalHeader>
              <ModalBody>
              <Form {...passwordForm}>
                  
                  <form onSubmit={passwordForm.handleSubmit(values => onSubmit(values,onClose))} className="space-y-8 p-8 backdrop-blur-lg bg-white rounded-lg w-100 ">
                  <FormField
                      control={passwordForm.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Titulo</FormLabel>
                          <FormControl>
                            <Input placeholder="Cuenta de Facebook" type="text" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                        
                      )}
                    />
                    <FormField
                      control={passwordForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email / usuario</FormLabel>
                          <FormControl>
                            <Input placeholder="example@example.com" type="string" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                        
                      )}
                    />
                    <FormField
                      control={passwordForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contraseña</FormLabel>
                          <FormControl>
                            <Input placeholder="Contraseñasupersegura123" type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                        
                      )}
                    />
                    <FormField
                      control={passwordForm.control}
                      name="url"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>URL</FormLabel>
                          <FormControl>
                            <Input placeholder="https://www.facebook.com" type="string" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                        
                      )}
                    />
                     <FormField
                      control={passwordForm.control}
                      name="isWeb"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            
                            <Checkbox checked={field.value} onCheckedChange={field.onChange}></Checkbox>
                          </FormControl>
                          <FormLabel> Es una web?</FormLabel>
                          <FormMessage />
                        </FormItem>
                        
                      )}
                    />
                    <div className='flex flex-row justify-end'>
                        <Button color="danger" variant="light" onPress={onClose}>
                            Cancelar
                        </Button>
                        <Button color="primary" type="submit" isLoading={loading}>
                            Añadir
                        </Button>
                    </div>
                    
                  </form>
                </Form>
              </ModalBody>
            </>
          )}
        </ModalContent>
            

  )
}

export default PasswordDialog
