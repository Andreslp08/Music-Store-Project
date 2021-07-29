import { initialState } from '../InitialState';
import ACTIONS from '../actions/Actions'
import { addProductToCartReducer, addProductToFavoriteReducer, removeProductFromCartReducer, removeProductFromFavoriteReducer, updateCartProductQuantityReducer } from './ProductReducer';


const mainReducer = (state = initialState, action) => {
    let newState = state;
    switch (action.type) {
        case ACTIONS.addToCart:
            newState = { ...state, cart: addProductToCartReducer(state.cart, action) };
            break;
        case ACTIONS.removeFromCart:
            newState = { ...state, cart: removeProductFromCartReducer(state.cart, action) };
            break;
        case ACTIONS.updateCartProductQuantity:
            newState = { ...state, cart: updateCartProductQuantityReducer(state.cart, action) };
            break;
        case ACTIONS.addToFavorites:
            newState = { ...state, favorites: addProductToFavoriteReducer(state.favorites, action) };
            break;
        case ACTIONS.removeFromFavorites:
            newState = { ...state, favorites: removeProductFromFavoriteReducer(state.favorites, action) };
            break;
        default:
            newState = state;
            break;
    }
    return newState;
}

export default mainReducer;