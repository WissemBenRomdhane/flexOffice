import {
  ADD_ROOM,
  UPDATE_ROOM,
  DELETE_ROOM,
  SET_ROOMS,
} from "@/actions/roomActions";

const initialState = {
  rooms: [],
};

const roomReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ROOMS:
      return {
        ...state,
        rooms: action.payload,
      };
    case ADD_ROOM:
      return {
        ...state,
        rooms: [...state.rooms, action.payload],
      };
    case UPDATE_ROOM:
      return {
        ...state,
        rooms: state.rooms.map((room) =>
          room._id === action.payload._id ? action.payload : room
        ),
      };
    case DELETE_ROOM:
      return {
        ...state,
        rooms: state.rooms.filter((room) => room._id !== action.payload),
      };
    default:
      return state;
  }
};

export default roomReducer;
