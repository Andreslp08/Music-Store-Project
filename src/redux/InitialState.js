import { User } from "../models/User";

export const initialState= {
    cart:[],
    favorites:[],
    user:{
        id:0,
        name:'User',
        avatarImg:User.defaultAvatarPath,
        isAuth:false
    }
}