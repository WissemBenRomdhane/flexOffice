import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  currentUser: null,
  isLoggedIn: false,
  role: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsersSlice: (state, action) => {
      state.users = action.payload; // Mise à jour du tableau des utilisateurs
    },
    addUserSlice: (state, action) => {
      state.users.push(action.payload); // Ajouter le nouvel utilisateur au tableau
    },
    updateUserSlice: (state, action) => {
      const index = state.users.findIndex(
        (user) => user._id === action.payload._id
      );
      if (index !== -1) {
        state.users[index] = action.payload; // Mettre à jour l'utilisateur existant
      }
    },
    deleteUserSlice: (state, action) => {
      state.users = state.users.filter((user) => user._id !== action.payload); // Supprimer l'utilisateur dont l'ID correspond à action.payload
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
      state.isLoggedIn = true;
      state.role = action.payload.role;
      localStorage.setItem("currentUser", JSON.stringify(action.payload)); // Sauvegarder dans localStorage
    },

    logout: (state) => {
      state.currentUser = null;
      state.isLoggedIn = false;
      state.role = null;
      localStorage.removeItem("currentUser"); // Supprimer l'utilisateur de localStorage
    },
  },
});

export const {
  setUsersSlice,
  addUserSlice,
  updateUserSlice,
  deleteUserSlice,
  setCurrentUser,
  logout,
} = userSlice.actions;

export default userSlice.reducer;
