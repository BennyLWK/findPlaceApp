import {combineReducers} from 'redux';
import placeReducer from './place/placeReducer';

const rootReducer = combineReducers({
  places: placeReducer,
});

export default rootReducer;
