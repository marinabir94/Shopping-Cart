//Redux
import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import thunk from 'redux-thunk';
import { cartReducers } from './reducers/cartReducers';
import { productReducers } from './reducers/productReducers'

const initialState = {};
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    combineReducers({
        products: productReducers,
        cart: cartReducers
    }), 
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);
export default store;