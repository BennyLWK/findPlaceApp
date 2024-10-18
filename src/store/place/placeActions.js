import axios from 'axios';

// Fetch places from Google Places API
export const fetchPlaces = query => async dispatch => {
  try {
    const response = await axios.get(
      'https://maps.googleapis.com/maps/api/place/autocomplete/json',
      {
        params: {
          input: query,
          key: 'AIzaSyAlkNK8rN7hiHFdR-pnGMos5HonUz3x2Yg',
        },
      },
    );
    dispatch({
      type: 'FETCH_PLACES_SUCCESS',
      payload: response.data.predictions,
    });
  } catch (error) {
    dispatch({
      type: 'FETCH_PLACES_ERROR',
      payload: error.message,
    });
  }
};

export const getPlacDetails = placeId => async dispatch => {
  try {
    const response = await axios.get(
      'https://maps.googleapis.com/maps/api/place/details/json',
      {
        params: {
          place_id: placeId,
          key: 'AIzaSyAlkNK8rN7hiHFdR-pnGMos5HonUz3x2Yg',
        },
      },
    );
    const location = {
      lat: response.data.result.geometry.location.lat,
      lng: response.data.result.geometry.location.lng,
      description: response.data.result.formatted_address,
    };
    dispatch({
      type: 'GET_DETAILS_SUCCESS',
      payload: location,
    });
  } catch (error) {
    dispatch({
      type: 'GET_DETAILS_ERROR',
      payload: error.message,
    });
  }
};

// Action to handle selecting a place
export const selectPlace = place => {
  return {
    type: 'SELECT_PLACE',
    payload: place,
  };
};

// Save the selected place details
export const saveSelectedPlace = place => {
  return {
    type: 'SAVE_SELECTED_PLACE',
    payload: place,
  };
};
