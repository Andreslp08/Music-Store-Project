import ACTIONS from "../actions/Actions";
import { initialState } from "../InitialState";


const updateUserReducer = (state = initialState.user, action )=>{
    if( action.type == ACTIONS.updateCurrentUser){
        return action.currentUser;
    }
    else{
        return state;
    }
}

export {
    updateUserReducer
}