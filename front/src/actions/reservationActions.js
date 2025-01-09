import axios from "axios";

// Action types
export const SET_RESERVATIONS = "SET_RESERVATIONS";
export const ADD_RESERVATION = "ADD_RESERVATION";

// Action creators

// Ajouter une réservation
export const addReservation = (reservationData) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/reservations",
      reservationData
    );
    dispatch({
      type: ADD_RESERVATION,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la réservation :", error);
  }
};

// Récupérer les réservations filtrées par salle et date
export const fetchReservationsByDate = (roomId, date) => async (dispatch) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/reservations/${roomId}?date=${date}`
    );

    dispatch({
      type: SET_RESERVATIONS,
      payload: response.data, // Réservations récupérées
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des réservations :", error);
  }
};
