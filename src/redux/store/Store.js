import { createStore, compose } from 'redux';
import { addProductToCart } from '../actions/ProductActions';
import { initialState } from '../InitialState';
import mainReducer from '../reducers/mainReducer'


const store = createStore(mainReducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export default store;