import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyAUvrJlhoCp51TqrOBBdadPWZb0fLuUkmQ",
	authDomain: "aidquest-8ac1c.firebaseapp.com",
	projectId: "aidquest-8ac1c",
	storageBucket: "aidquest-8ac1c.appspot.com",
	messagingSenderId: "86161950140",
	appId: "1:86161950140:web:7150d4b6d88863fb0e97b9",
	measurementId: "G-QR2XKWNEBB",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
