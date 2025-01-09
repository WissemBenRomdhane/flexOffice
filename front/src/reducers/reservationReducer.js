import { SET_RESERVATIONS, ADD_RESERVATION } from "../actions/reservationActions";

const initialState = {
  reservations: [],
};

const reservationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_RESERVATIONS:
      return {
        ...state,
        reservations: action.payload,
      };
      case ADD_RESERVATION:
      return {
        ...state,
        reservations: [...state.reservations, action.payload],
      };
    default:
      return state;
  }
};

export default reservationReducer;
