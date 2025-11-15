import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAM83pjtbjpouchTlJhkZ61aKrZ5X2a8mE",
    authDomain: "monitoringapp-e8e76.firebaseapp.com",
    projectId: "monitoringapp-e8e76",
    storageBucket: "monitoringapp-e8e76.appspot.com",
    messagingSenderId: "151603457160",
    appId: "1:151603457160:web:4cc2a9b86b046eaddbc33d",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);