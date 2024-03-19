import { useState } from 'react'
import { WavyBackground } from '../components/ui/wavy-background'
import CustomNavbar from '../components/ui/custom-navbar'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {Form,FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import {hashPassword} from '../utils/utils'
import { toast } from "sonner"


const formSchema = z.object({
  email: z.string().min(7, {
    message: "Email must be at least 7 characters.",
  }),
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(8,{
    message: "Password must be at least 8 characters.",
  }),
})


function Register() {
  const [count, setCount] = useState(0)

  const registerForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:{
      email:"",
      username:"",
      password:"",
      
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    let userObj = {
      email:values.email,
      username:values.username,
      password: hashPassword(values.password)
    }
    fetch("/api/newUser",{
      method:"POST",
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
      body:JSON.stringify(userObj)
    }).then(async function(response){
        let text = await response.text();
        toast(text);
        if(response.status == 200){ 
          setTimeout(function(){
            window.location.href = "/login";
          },3000)
        }
    })
  }

  
  return (
    <>
        <CustomNavbar></CustomNavbar>
        <WavyBackground className="max-w-4xl mx-auto pb-40 flex flex-row" colors={["#1D226C","#00D7A1","#0D0522"]} waveOpacity={0.6} blur={20}>
            
              <div className='w-screen flex flex-row justify-evenly rounded-lg items-center'>
                <Form {...registerForm}>
                  
                  <form onSubmit={registerForm.handleSubmit(onSubmit)} className="space-y-8 p-8 backdrop-blur-lg bg-white rounded-lg w-6/12 ">
                  <FormField
                      control={registerForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Email" type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                        
                      )}
                    />
                    <FormField
                      control={registerForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input placeholder="Username" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                        
                      )}
                    />
                    <FormField
                      control={registerForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input placeholder="Password" type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                        
                      )}
                    />
                    <Button type="submit">Register</Button>
                  </form>
                </Form>
              </div>
              
        </WavyBackground>
      
      
    </>
  )
}

export default Register
