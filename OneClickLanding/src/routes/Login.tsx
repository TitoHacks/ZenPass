import { useEffect, useState } from 'react'
import { WavyBackground } from '../components/ui/wavy-background'
import CustomNavbar from '../components/ui/custom-navbar'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {Form,FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { storeDerivateKey } from '@/utils/utils'
import { MultiStepLoader as Loader } from "../components/ui/multi-step-loader";


const formSchema = z.object({
  email: z.string().min(7, {
    message: "Email must be at least 7 characters.",
  }),
  password: z.string().min(8,{
    message: "Password must be at least 8 characters.",
  }),
})

const loadingStates = [
  {
    text: "Hashing password",
  },
  {
    text: "Verifying credentials",
  },
  {
    text: "Generating master key",
  },
];


function Login() {
  //Funciones al cargar la pagina
  useEffect(()=>{
    if(sessionStorage.getItem("PassnovaUID") != null){
      window.location.href = "/dashboard";
    }
  })
  ////////////////////////////////////////////////////

  const [count, setCount] = useState(0)

  const loginForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:{
      email:"",
      password:"",
      
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    let userObj = {
      email:values.email,
      password:values.password
    }
    fetch("/api/login",{
      method:"POST",
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
      body:JSON.stringify(userObj)
    }).then( async response => {
      
      if(response.status == 200){
         let dataJson = await response.json();
         storeDerivateKey(userObj.password,'hola',100000);
         sessionStorage.setItem("PassnovaUID",dataJson["_id"]);
         toast("Welcome " + dataJson["username"]);
          setTimeout(function(){
            setLoading(false);
            window.location.href = "/dashboard";
          },3000)
         
      }else{
        toast(await response.text());
        console.log("Error al loguearse");
      }
    });
  }

  const [loading, setLoading] = useState(false);
  return (
    
    <>
        <CustomNavbar></CustomNavbar>
        <WavyBackground className="max-w-4xl mx-auto pb-40 flex flex-row" colors={["#1D226C","#00D7A1","#0D0522"]} waveOpacity={0.6} blur={20}>
            
              <div className='w-screen flex flex-row justify-evenly rounded-lg items-center'>
              <Loader loadingStates={loadingStates} loading={loading} duration={800} />
                <Form {...loginForm}>
                  
                  <form onSubmit={loginForm.handleSubmit(onSubmit)} className="space-y-8 p-8 backdrop-blur-lg bg-white rounded-lg w-6/12 ">
                  <FormField
                      control={loginForm.control}
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
                      control={loginForm.control}
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
                    <Button type="submit" onClick={()=>setLoading(true)}>Login</Button>
                  </form>
                </Form>
              </div>
              
        </WavyBackground>
      
      
    </>
  )
}

export default Login
