import { initialState } from "../InitialState"


const addProductToCartReducer =(state = initialState.cart, action)=>{
    return [...state, action.product];
}

const removeProductFromCartReducer =(state = initialState.cart, action)=>{
    return [...state].filter( (product)=> product.id != action.productId);
}

const addProductToFavoriteReducer =(state = initialState.cart, action)=>{
    return [...state, action.product];
}

export {
    addProductToCartReducer,
    addProductToFavoriteReducer,
    removeProductFromCartReducer
}