import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignInPage from './auth/sign-in/index.jsx'
import HomePage from './app/Home/index.jsx'
import DashboardPage from './app/Dashboard/index.jsx'
import { ClerkProvider } from '@clerk/clerk-react'
import { ChakraProvider } from '@chakra-ui/react'
import EditPage from './app/Dashboard/resume/[resumeId]/edit/index.jsx'


const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

const router = createBrowserRouter([

  {


    element: <App />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardPage />
      },
      {
        path: '/dashboard/resume/:resumeId/edit',
        element: <EditPage />

      }
    ],

  },

  {
    path: "/",
    element: <HomePage />
  },
  {
    path: "/auth/sign-in",
    element: <SignInPage />
  },


])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>

      <ChakraProvider>
        <RouterProvider router={router} />

      </ChakraProvider>

    </ClerkProvider>
  </React.StrictMode>,
)
