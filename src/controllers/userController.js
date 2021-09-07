import { User } from "../models/User"
import * as auth from 'firebase/auth';
import * as firestore from 'firebase/firestore';
import * as bcrypt from 'bcryptjs';


const saveIntialUserData = async (user = new User()) => {
    const userDoc = firestore.doc(firestore.getFirestore(), "users", user.id);
    return await firestore.setDoc(userDoc,
        {
            firstName: user.firstName,
            lastName: user.lastName,

        }).then((res) => {
            console.log("Initial data saved")
            return Promise.resolve(res)
        })
        .catch(error => {
            console.log(error.message)
            return Promise.reject(error)
        })
}

export {
    saveIntialUserData
}
