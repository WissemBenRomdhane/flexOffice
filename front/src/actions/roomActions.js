import axios from 'axios'

// Action types
export const ADD_ROOM = 'ADD_ROOM'
export const UPDATE_ROOM = 'UPDATE_ROOM'
export const DELETE_ROOM = 'DELETE_ROOM'
export const SET_ROOMS = 'SET_ROOMS'

// Action creators

// Ajouter une salle
export const addRoom = room => async dispatch => {
  try {
    const response = await axios.post('http://localhost:5000/api/rooms', room)
    dispatch({
      type: ADD_ROOM,
      payload: response.data
    })
  } catch (error) {
    console.error("Erreur lors de l'ajout de la salle:", error)
  }
}

// Mettre à jour une salle
export const updateRoom = room => async dispatch => {
  try {
    const response = await axios.put(
      `http://localhost:5000/api/rooms/${room._id}`,
      room
    )
    dispatch({
      type: UPDATE_ROOM,
      payload: response.data
    })
  } catch (error) {
    console.error('Erreur lors de la modification de la salle:', error)
  }
}

// Supprimer une salle
export const deleteRoom = roomId => async dispatch => {
  try {
    await axios.delete(`http://localhost:5000/api/rooms/${roomId}`)
    dispatch({
      type: DELETE_ROOM,
      payload: roomId
    })
  } catch (error) {
    console.error('Erreur lors de la suppression de la salle:', error)
  }
}

// Récupérer toutes les salles
export const fetchRooms = () => async dispatch => {
  try {
    const response = await axios.get('http://localhost:5000/api/rooms')
    dispatch({
      type: SET_ROOMS,
      payload: response.data
    })
  } catch (error) {
    console.error('Erreur lors de la récupération des salles:', error)
  }
}
