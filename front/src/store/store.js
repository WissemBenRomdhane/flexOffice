import { configureStore } from '@reduxjs/toolkit';
import roomReducer from '../reducers/roomReducer';
import userReducer from '../slices/userSlice';
import officeReducer from '@/reducers/officeReducer';
import reservationReducer from '@/reducers/reservationReducer';

const store = configureStore({
    reducer: {
        user: userReducer,  // Associer le reducer utilisateur
        room: roomReducer,  // Associer le reducer des salles
        office: officeReducer,  // Associer le reducer des bureaux
        reservation: reservationReducer, // Associer le reducer des réservations
    },
});

export default store;
