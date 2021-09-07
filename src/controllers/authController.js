import { User } from "../models/User";
import * as auth from 'firebase/auth';
import * as firestore from 'firebase/firestore';
import { saveIntialUserData } from "./userController";

const PROVIDERS = {
    default: "default",
    google: "google"
}

const createAuthWith = async (provider = PROVIDERS.default, user = new User()) => {
    switch (provider) {
        case PROVIDERS.default:
            return createDefaultAuth(user);
        case PROVIDERS.google:
            return createDefaultAuth(user);
        default:
            return createDefaultAuth(user);

    }
}


const createDefaultAuth = async (user = new User()) => {
    let authCreated = false;
    await auth.createUserWithEmailAndPassword(auth.getAuth(), user.email, user.password)
        .then((userCredential) => {
            authCreated = true;
            user.id = userCredential.user.uid;
            console.log("Auth created");
        }).catch(error => {
            console.log(error.message)
            return Promise.reject(error.message)
        })

    if (authCreated) {
         await saveIntialUserData(user).catch(error => {
             auth.getAuth().currentUser.delete();
            return Promise.reject(error.message)
        });
    }
}

// const authWith = async (provider = PROVIDERS.default, user = new User()) => {
//     switch (provider) {
//         case PROVIDERS.default:
//             return createDefaultAuth(user);
//         case PROVIDERS.google:
//             return createDefaultAuth(user);
//         default:
//             return createDefaultAuth(user);

//     }
// }

const defaultSignIn = async (email, password) => {
    let ok = false;
    await auth.signInWithEmailAndPassword(
        auth.getAuth(),
        email,
        password
    ).then((userCredential) => {
        ok = true;
    }).catch(error => {
        ok = false;
        console.log(error.message);
    })
    if (ok) {
        return await Promise.resolve("hola")
    } else {
        return await Promise.reject("adios")
    }
}



export {
    PROVIDERS,
    createAuthWith,
    createDefaultAuth,
    defaultSignIn
}