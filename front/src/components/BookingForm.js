import React, { useState } from 'react'

const BookingForm = ({ onBook }) => {
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [timeSlot, setTimeSlot] = useState('fullDay')

  const handleSubmit = e => {
    e.preventDefault()
    onBook({ name, date, timeSlot })
  }

  return (
    <form onSubmit={handleSubmit} className='p-4 border rounded shadow-md mb-4'>
      <div className='mb-4'>
        <label className='block text-sm font-bold mb-2'>Nom</label>
        <input
          type='text'
          value={name}
          onChange={e => setName(e.target.value)}
          className='w-full p-2 border rounded'
          required
        />
      </div>
      <div className='mb-4'>
        <label className='block text-sm font-bold mb-2'>Date</label>
        <input
          type='date'
          value={date}
          onChange={e => setDate(e.target.value)}
          className='w-full p-2 border rounded'
          required
        />
      </div>
      <div className='mb-4'>
        <label className='block text-sm font-bold mb-2'>Créneau horaire</label>
        <select
          value={timeSlot}
          onChange={e => setTimeSlot(e.target.value)}
          className='w-full p-2 border rounded'
        >
          <option value='fullDay'>Journée complète</option>
          <option value='morning'>Matin</option>
          <option value='afternoon'>Après-midi</option>
        </select>
      </div>
      <button type='submit' className='bg-blue-500 text-white p-2 rounded'>
        Réserver
      </button>
    </form>
  )
}

export default BookingForm
