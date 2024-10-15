import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  currentUser: JSON.parse(localStorage.getItem("currentUser")) || null, // Charger l'utilisateur connecté
  isLoggedIn: !!localStorage.getItem("currentUser"), // Vérifier si l'utilisateur est connecté
  role: localStorage.getItem("currentUser") ? JSON.parse(localStorage.getItem("currentUser")).role : null, // Charger le rôle si présent
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // addUser: (state, action) => {
    //   state.users.push(action.payload);
    // },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
      state.isLoggedIn = true;
      state.role = action.payload.role;
      localStorage.setItem("currentUser", JSON.stringify(action.payload)); // Sauvegarder dans localStorage
    },
    // removeUser: (state, action) => {
    //   state.users = state.users.filter((user) => user.id !== action.payload.id);
    // },
    // updateUser: (state, action) => {
    //   const index = state.users.findIndex(
    //     (user) => user.id === action.payload.id
    //   );
    //   if (index !== -1) {
    //     state.users[index] = action.payload;
    //   }
    // },
    logout: (state) => {
      state.currentUser = null;
      state.isLoggedIn = false;
      state.role = null;
      localStorage.removeItem("currentUser"); // Supprimer l'utilisateur de localStorage
    },
  },
});

export const { addUser, updateUser, removeUser, setCurrentUser, logout } =
  userSlice.actions;

export default userSlice.reducer;
