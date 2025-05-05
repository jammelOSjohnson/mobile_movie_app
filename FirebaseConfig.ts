// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  query,
  onSnapshot,
  where,
  limit,
  orderBy,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_api_key,
  authDomain: process.env.EXPO_PUBLIC_auth_domain,
  projectId: process.env.EXPO_PUBLIC_project_id,
  storageBucket: process.env.EXPO_PUBLIC_storage_bucket,
  messagingSenderId: process.env.EXPO_PUBLIC_messaging_sender_id,
  appId: process.env.EXPO_PUBLIC_app_id,
  measurementId: process.env.EXPO_PUBLIC_measurement_id,
};

const analyticsMock = {
  logEvent: () => {},
  setCurrentScreen: () => {},
  setUserId: () => {},
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//let ana = !isSupported ? analyticsMock : getAnalytics(app);
export const db = getFirestore(app);
export const Collection = collection;
export const GetDocs = getDocs;
export const GetDoc = getDoc;
export const SetDoc = setDoc;
export const AddDoc = addDoc;
export const UpdateDoc = updateDoc;
export const Doc = doc;
export const Query = query;
export const Where = where;
export const OnSnapshot = onSnapshot;
export const Limit = limit;
export const OrderBy = orderBy;
