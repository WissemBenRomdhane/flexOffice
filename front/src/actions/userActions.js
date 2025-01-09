import {
  setUsersSlice,
  addUserSlice,
  updateUserSlice,
  deleteUserSlice,
} from "@/slices/userSlice";
import axios from "axios";

// Action Creator: Récupérer tous les utilisateurs
export const fetchUsers = () => async (dispatch) => {
  try {
    // Récupérer le token de l'utilisateur connecté depuis le localStorage
    const token = JSON.parse(localStorage.getItem("currentUser")).token;

    const response = await axios.get("http://localhost:5000/api/users", {
      headers: {
        Authorization: `Bearer ${token}`, // Ajouter le token au header
      },
    });

    dispatch(setUsersSlice(response.data));
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error);
  }
};

// Action Creator:Ajouter un utilisateur
export const addUser = (newUser) => async (dispatch) => {
  try {
    // Récupérer le token de l'utilisateur connecté depuis le localStorage
    const token = JSON.parse(localStorage.getItem("currentUser")).token;

    const response = await axios.post(
      "http://localhost:5000/api/users",
      newUser,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Ajouter le token au header
        },
      }
    );

    dispatch(addUserSlice(response.data));
  } catch (error) {
    console.error("Erreur lors de l'ajout d'un utilisateur: ", error);
  }
};

// Action Creator: Mettre à jour un utilisateur
export const updateUser = (user) => async (dispatch) => {
  try {
    // Récupérer le token de l'utilisateur connecté
    const token = JSON.parse(localStorage.getItem("currentUser")).token;

    const response = await axios.put(
      `http://localhost:5000/api/users/${user._id}`,
      user,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Ajouter le token au header
        },
      }
    );

    dispatch(updateUserSlice(response.data));
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
  }
};

// Action Creator: Supprimer un utilisateur
export const deleteUser = (userId) => async (dispatch) => {
  try {
    // Récupérer le token de l'utilisateur connecté
    const token = JSON.parse(localStorage.getItem("currentUser")).token;

    await axios.delete(`http://localhost:5000/api/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Ajouter le token au header
      },
    });
    dispatch(deleteUserSlice(userId));
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur:", error);
  }
};
