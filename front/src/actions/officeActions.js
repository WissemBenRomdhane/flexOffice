import axios from "axios";

// Action types
export const ADD_OFFICE = "ADD_OFFICE";
export const UPDATE_OFFICE = "UPDATE_OFFICE";
export const DELETE_OFFICE = "DELETE_OFFICE";
export const SET_OFFICES = "SET_OFFICES";

// Action creators

// Ajouter un bureau
export const addOffice = (office) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/offices",
      office
    );
    dispatch({
      type: ADD_OFFICE,
      payload: response.data,
    });
  } catch (error) {
    console.error("Erreur lors de l'ajout d'un bureau:", error);
  }
};

// Mettre à jour un bureau
export const updateOffice = (office) => async (dispatch) => {
  try {
    const response = await axios.put(
      `http://localhost:5000/api/offices/${office._id}`,
      office
    );
    dispatch({
      type: UPDATE_OFFICE,
      payload: response.data,
    });
  } catch (error) {
    console.error("Erreur lors de la modification du bureau:", error);
  }
};

// Supprimer un bureau
export const deleteOffice = (officeId) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:5000/api/offices/${officeId}`);
    dispatch({
      type: DELETE_OFFICE,
      payload: officeId,
    });
  } catch (error) {
    console.error("Erreur lors de la suppression d'un bureau :", error);
  }
};

// Récupérer les bureaux d'une salle spécifique
export const fetchOffices = (roomId) => async (dispatch) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/offices/${roomId}`
    );
    dispatch({
      type: SET_OFFICES,
      payload: response.data,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des bureax:", error);
  }
};
