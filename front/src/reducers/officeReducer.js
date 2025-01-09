import {
  ADD_OFFICE,
  UPDATE_OFFICE,
  DELETE_OFFICE,
  SET_OFFICES,
} from "@/actions/officeActions";

const initialState = {
  offices: [],
};

const officeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_OFFICES:
      return {
        ...state,
        offices: action.payload,
      };
    case ADD_OFFICE:
      return {
        ...state,
        offices: [...state.offices, action.payload],
      };
    case UPDATE_OFFICE:
      return {
        ...state,
        offices: state.offices.map((office) =>
            office._id === action.payload._id ? action.payload : office
        ),
      };
    case DELETE_OFFICE:
      return {
        ...state,
        offices: state.offices.filter((office) => office._id !== action.payload),
      };
    default:
      return state;
  }
};

export default officeReducer;
