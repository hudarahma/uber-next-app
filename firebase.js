
import {initializeApp} from 'firebase/app';
import { GoogleAuthProvider, getAuth } from "firebase/auth";

// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyB2D-moKR9IUwVhW0pG0mtrmA6RZmQAG8c",
    authDomain: "uber-clone-fb935.firebaseapp.com",
    projectId: "uber-clone-fb935",
    storageBucket: "uber-clone-fb935.appspot.com",
    messagingSenderId: "35923608773",
    appId: "1:35923608773:web:457687aeefd4b846929cac"
};



const app = initializeApp(firebaseConfig)
const provider = new GoogleAuthProvider()
const auth = getAuth()

export { app, provider, auth }