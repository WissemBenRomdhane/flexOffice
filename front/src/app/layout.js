'use client'

import '../styles/globals.css'
import Sidebar from '../components/Sidebar'
import React, { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

export default function RootLayout ({ children }) {
  const [isOpen, setIsOpen] = useState(true) // Menu ouvert par défaut
  const [isAuthenticated, setAuthenticated] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token && pathname !== '/login' && pathname !== '/register') {
      router.push('/login')
    } else if (token) {
      setAuthenticated(true)
    }
  }, [router, pathname])

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <html lang='en'>
      <head>
        <title>Réservation Flex Office</title>
        <meta
          name='description'
          content="Réserver des espaces de bureaux dans l'entreprise"
        />
      </head>
      <body>
        <div className='flex'>
          {isAuthenticated ||
          pathname === '/login' ||
          pathname === '/register' ? (
            <>
              {pathname !== '/login' && pathname !== '/register' && (
                <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
              )}
              <div className={`flex-1 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-16'}`}>
                {children}
              </div>
            </>
          ) : null}
        </div>
      </body>
    </html>
  )
}
