import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
const firebaseConfig = {
    apiKey: "AIzaSyBvPuhVUk6PnjJkui3KFO5mOJ37rPDJJ6I",
    authDomain: "login-7fed7.firebaseapp.com",
    databaseURL: "https://login-7fed7.firebaseio.com",
    projectId: "login-7fed7",
    storageBucket: "login-7fed7.appspot.com",
    messagingSenderId: "289991498185",
    appId: "1:289991498185:web:31d5488a234efae9e13018",
};
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firebaseDB = firebase.database().ref();
