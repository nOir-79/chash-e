import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from './App.jsx'
import './index.css'
import Message from './message.jsx'
import Room from './room.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element:<App/>
  },
  {
    path:'/room',
    element:<Room/>
  },
  {
    path:'/message',
    element:<Message/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router = {router}/>
  </StrictMode>,
)
