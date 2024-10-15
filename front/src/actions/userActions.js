import axios from 'axios';

// Action Types
export const SET_USERS = 'SET_USERS';
export const UPDATE_USER = 'UPDATE_USER';
export const DELETE_USER = 'DELETE_USER';

// Action Creator: Récupérer tous les utilisateurs
export const fetchUsers = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:5000/api/users');
    dispatch({
      type: SET_USERS,
      payload: response.data
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error);
  }
};

// Action Creator: Mettre à jour un utilisateur
export const updateUser = (user) => async (dispatch) => {
  try {
    const response = await axios.put(`http://localhost:5000/api/users/${user._id}`, user);
    dispatch({
      type: UPDATE_USER,
      payload: response.data
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
  }
};

// Action Creator: Supprimer un utilisateur
export const deleteUser = (userId) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:5000/api/users/${userId}`);
    dispatch({
      type: DELETE_USER,
      payload: userId
    });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'utilisateur:', error);
  }
};
