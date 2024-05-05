import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {thunk} from 'redux-thunk';
import { bookingReducer } from '../feature/booking/bookingSlice';
import { adminReducer } from '../feature/admin/adminSlice';
import { authReducer } from '../feature/auth/authSlice';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
    booking: bookingReducer,
    admin: adminReducer,
    auth: authReducer
  });
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store;