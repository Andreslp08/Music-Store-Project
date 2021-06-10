import ACTIONS from "./Actions"


const addProductToCart = ({id, quantity})=>{
    return {
        type:ACTIONS.addToCart,
        product:{id, quantity}
    }
}

const updateCartProductQuantity = ({id, quantity})=>{
    return {
        type:ACTIONS.addToCart,
        product:{id, quantity}
    }
}

const removeProductFromCart = (id)=>{
    return {
        type:ACTIONS.removeFromCart,
        productId:id
    }
}

const addProductToFavorite = ({id, quantity})=>{
    return {
        type:ACTIONS.addToCart,
        product:{id, quantity}
    }
}

const removeProductFromFavorites = (id)=>{
    return {
        type:ACTIONS.removeFromFavorites,
        productId:id
    }
}

export {
    addProductToCart,
    addProductToFavorite,
    removeProductFromCart,
    removeProductFromFavorites
}