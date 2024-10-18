const initialState = {
  places: [],
  location: null,
  selectedPlace: [],
  error: null,
};

export default function placeReducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_PLACES_SUCCESS':
      return {...state, places: action.payload, error: null};
    case 'FETCH_PLACES_ERROR':
      return {...state, places: [], error: action.payload};
    case 'GET_DETAILS_SUCCESS':
      return {...state, location: action.payload, error: null};
    case 'GET_DETAILS_ERROR':
      return {...state, location: null, error: action.payload};
    case 'SAVE_SELECTED_PLACE':
      return {
        ...state,
        selectedPlace: [...(state.selectedPlace || []), action.payload],
      };
    case 'SELECT_PLACE':
      return {...state, selectedPlace: action.payload}; // Update selectedPlace
    default:
      return state;
  }
}
