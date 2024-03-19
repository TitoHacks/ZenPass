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
            
          <button onClick={tremendaFuncion} className="inline-flex h-12 animate-shimmer items-center justify-center rounded-lg border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
              Dashboard
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
