'use client'

import React, { useRouter } from 'next/navigation'
import { useState } from 'react'
import axios from 'axios'

const Login = () => {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = async e => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      })
      const token = response.data.token
      localStorage.setItem('token', token)
      router.push('/')
    } catch (err) {
      console.error('Login error:', err)
      alert('Invalid credentials')
    }
  }
  const navigateToRegister = () => {
    router.push('/register')
  }

  return (
    <div className='min-h-screen bg-blue-950 flex items-center justify-center'>
      <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
        <h1 className='text-2xl font-bold mb-6 text-center'>Login</h1>
        <form onSubmit={handleLogin}>
          <div className='mb-4'>
            <label className='block text-gray-700'>Email:</label>
            <input
              type='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700'>Password:</label>
            <input
              type='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500'
            />
          </div>
          <button
            type='submit'
            className='w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors'
          >
            Login
          </button>
          <div className='mt-4 text-center'>
            <button
              type='button'
              onClick={navigateToRegister}
              className='text-blue-600 hover:underline'
            >
              Don't have an account? Register
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
