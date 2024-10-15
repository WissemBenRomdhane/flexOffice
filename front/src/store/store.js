import { configureStore } from '@reduxjs/toolkit';
import roomReducer from '../reducers/roomReducer';
import userReducer from '../slices/userSlice';

const store = configureStore({
    reducer: {
        user: userReducer,  // Associer le reducer utilisateur
        room: roomReducer,  // Associer le reducer des salles
    },
});

export default store;
