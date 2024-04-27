import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {thunk} from 'redux-thunk';
import { bookingReducer } from '../feature/booking/bookingSlice';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
    booking: bookingReducer,
    
  });
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store;