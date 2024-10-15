'use client'

import '../styles/globals.css'
import Navbar from '../components/Navbar'
import React, { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import logo from './../../public/images/logo-neosoft-white.svg'
import { Provider, useSelector } from 'react-redux'
import store from '@/store/store'

function LayoutComponent({ children }) {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoggedIn && pathname !== '/login' && pathname !== '/register') {
      router.push('/login');
    }
  }, [isLoggedIn, router, pathname]);

  return (
    <div className='bg-blue-950'>
      {isLoggedIn && (
        <>
          <div>
            <Image
              className='p-1 mt-1 h-fit'
              priority
              src={logo}
              alt='Neosoft'
            />
            <Navbar />
          </div>
        </>
      )}
      <div className='flex-1 h-full'>{children}</div>
    </div>
  );
}

export default function RootLayout({ children }) {
  return (
    <Provider store={store}>
      <html lang='en'>
        <head>
          <title>Réservation Flex Office</title>
          <meta
            name='description'
            content="Réserver des espaces de bureaux dans l'entreprise"
          />
        </head>
        <body>
          <LayoutComponent>
            {children}
          </LayoutComponent>
        </body>
      </html>
    </Provider>
  );
}
