import { User } from "../models/User";
import * as auth from 'firebase/auth';
import * as firestore from 'firebase/firestore';
import { getUserById, saveIntialUserData } from "./userController";
import store from "../redux/store/Store";
import { updateCurrentUser } from "../redux/actions/userActions";

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

const defaultSignIn = async (email, password) => {
    return await auth.signInWithEmailAndPassword(
        auth.getAuth(),
        email,
        password
    ).then(userCredential => {
          console.log("Successful authentication");
           return getUserById(userCredential.user.uid).then(userData=>{
            store.dispatch(updateCurrentUser({
                id:userCredential.user.uid,
                name:`${userData.firstName} ${userData.lastName}`,
                avatarPath: User.defaultAvatarPath,
                isAuth:true
            }))
            return Promise.resolve(userCredential)
        }).catch(error=>{
            console.log(error.message)
            return Promise.resolve(userCredential)
        })
        
        })
        .catch(error => {
            console.log(error.message)
            return Promise.reject(error.message)
        })
}

const googleSignIn = async () => {
    const googleProvider = new auth.GoogleAuthProvider();
    googleProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');
     await auth.signInWithPopup(auth.getAuth(), googleProvider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = auth.GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            console.log("Google Authentication successful");
            const user = new User(
                result.user.uid,
                result.user.email,
                result.user.displayName,
                "",
                "",
                result.user.photoURL
            );
            return saveIntialUserData(user).
            then(result=>{
                store.dispatch(updateCurrentUser({
                    id:user.id,
                    name:`${user.firstName} ${user.lastName}`,
                    avatarPath:user.avatarPath || User.defaultAvatarPath,
                    isAuth:true
                }))
                return Promise.resolve(result)
            }).
            catch(error => {
                return Promise.reject(error)
            })
        }).catch((error) => {
            console.log(error.message)
            return Promise.reject(error.message)
        });

}



export {
    PROVIDERS,
    createAuthWith,
    createDefaultAuth,
    defaultSignIn,
    googleSignIn
}