import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import "firebase/auth";

const apps = getApps();
let firebaseApp;

if (!apps.length) {
  firebaseApp = initializeApp({
    apiKey: "xx",
    authDomain: "xx",
    databaseURL: "xx",
    projectId: "xx",
    storageBucket: "xx",
    messagingSenderId: "xx",
    appId: "xx",
  });
}

const auth = getAuth(firebaseApp);

export default auth;
