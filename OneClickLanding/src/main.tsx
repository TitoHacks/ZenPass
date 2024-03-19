import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './routes/App.tsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Register from './routes/Register.tsx';
import Login from './routes/Login.tsx';
import { Toaster } from "@/components/ui/sonner"
import Dashboard from './routes/Dashboard.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {path:"/login",
    element: <Login/>,
  },
  {path:"/Register",
    element: <Register/>,
  },
  {path:"/Dashboard",
    element: <Dashboard/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster />
  </React.StrictMode>,
)
