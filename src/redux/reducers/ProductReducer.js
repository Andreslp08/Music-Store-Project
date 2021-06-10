import { initialState } from "../InitialState"


const addProductToCartReducer = (state = initialState.cart, action) => {
    const cartLength = state.length;
    if (cartLength > 0) {
        const existsProduct = state.find((product)=> product.id == action.product.id);
        if (existsProduct == undefined) {
            return [...state, action.product];
        }
    }
    else{
        return [...state, action.product]; 
    }
    return state;
}

const updateCartProductQuantityReducer = (state = initialState.cart, action) => {
    const updated = state.map((value, index, array) => {
        const product = action.product;
        if (value.id == product.id) {
            value.quantity = product.quantity;
        }
        return value;
    })
    return updated;
}

const removeProductFromCartReducer = (state = initialState.cart, action) => {
    return [...state].filter((product) => product.id != action.productId);
}

const addProductToFavoriteReducer = (state = initialState.cart, action) => {
    return [...state, action.product];
}

export {
    addProductToCartReducer,
    updateCartProductQuantityReducer,
    removeProductFromCartReducer,
    addProductToFavoriteReducer,
}