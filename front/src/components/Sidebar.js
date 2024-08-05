import React from 'react'
import { useRouter } from 'next/navigation'

export default function Sidebar({ isOpen, toggleSidebar }) {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('token')
    router.push('/login')
  }

  return (
    <div className={`fixed top-0 left-0 h-full ${isOpen ? 'w-64' : 'w-16'} bg-blue-600 transition-all duration-300`}>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4">
          <h1 className={`text-white text-lg font-bold ${isOpen ? 'block' : 'hidden'}`}>Sidebar</h1>
          <button
            className="text-white focus:outline-none"
            onClick={toggleSidebar}
          >
            {isOpen ? 'Close' : 'Open'}
          </button>
        </div>
        <nav className="flex-grow mt-4">
          <ul className="space-y-2">
            <li>
              <a href="/" className="block text-white py-2 px-4 hover:bg-blue-700 rounded">Réservation</a>
            </li>
            <li>
              <a href="/add-room" className="block text-white py-2 px-4 hover:bg-blue-700 rounded">Ajouter Salle</a>
            </li>
            <li>
              <a href="/add-office" className="block text-white py-2 px-4 hover:bg-blue-700 rounded">Ajouter Bureau</a>
            </li>
          </ul>
        </nav>
        <button
          onClick={handleLogout}
          className="m-4 p-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  )
}
