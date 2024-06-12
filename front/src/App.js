import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RoomSelectionPage from './pages/RoomSelectionPage';
import OfficeSelectionPage from './pages/OfficeSelectionPage';
import BookingPage from './pages/BookingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RoomSelectionPage />} />
        <Route path="/offices/:roomId" element={<OfficeSelectionPage />} />
        <Route path="/booking/:roomId/:officeId" element={<BookingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
