import { Button } from '@nextui-org/react';
import React from 'react'


const tremendaFuncion = function(){
  if(sessionStorage.getItem("PassnovaUID") != null){
    window.location.href = "/dashboard";
  }else{
    window.location.href = "/login";
  }
  
}


const HeaderContent = () => {
  return (
    <div className="relative isolate px-6 pt-14 lg:px-8">
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div ></div>
      </div>
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">ZenPass</h1>
          <p className="mt-6 text-lg leading-8 text-gray-300">Tu gestor de contraseñas</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
  
      
          <button className="p-[3px] relative" onClick={tremendaFuncion}>
            <div className="absolute inset-0 bg-gradient-to-r from-secondaryColor to-accentColor rounded-xl" />
            <div className="px-8 py-2  bg-black rounded-[10px]  relative group transition duration-200 text-white hover:bg-transparent">
              Dashboard
            </div>
          </button>

        
            <a href="/Register" className="text-sm font-semibold leading-6 text-white">Registro <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
        <div ></div>
    </div>
  </div>
  )
}

export default HeaderContent
