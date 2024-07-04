import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import CalendarBooking from './components/CalendarBooking'

const rooms = [
  {
    id: 1,
    name: 'Flex Office Noven 1',
    description: 'Grande salle de 12 places.'
  },
  {
    id: 2,
    name: 'Flex Office Noven 2',
    description: 'Petite salle de 8 places.'
  }
  // Ajoutez plus de salles si nécessaire
]
const offices = [
  {
    id: 1,
    name: 'Bureau 1',
    description: 'Bureau spacieux avec vue.',
    image: '/images/office1.jpg',
    roomId: 1
  },
  {
    id: 2,
    name: 'Bureau 2',
    description: 'Bureau avec équipement moderne.',
    image: '/images/office2.jpg',
    roomId: 2
  }
  // Ajoutez plus de bureaux si nécessaire
]

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={<CalendarBooking rooms={rooms} offices={offices} />}
        />
      </Routes>
    </Router>
  )
}

export default App
