import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import firebaseConfig from "./config/FirebaseConfig";

const firebaseApp = initializeApp(firebaseConfig)

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);
const libraries = ["places"];


export{ auth, db, storage, libraries};