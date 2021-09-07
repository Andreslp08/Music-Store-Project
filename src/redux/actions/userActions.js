import ACTIONS from "./Actions"

const updateCurrentUser = ( user = {id: 0, name:"", avatarPath: "", isAuth: false })=>{
    return{
        type:ACTIONS.updateCurrentUser,
        currentUser:user
    }
}

export {
    updateCurrentUser
}
