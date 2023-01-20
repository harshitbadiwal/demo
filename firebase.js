import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC3E60BVSlDbckxbB99Cwcz4JopMYaDNME",
  authDomain: "moviesrn-e601b.firebaseapp.com",
  projectId: "moviesrn-e601b",
  storageBucket: "moviesrn-e601b.appspot.com",
  messagingSenderId: "886732001144",
  appId: "1:886732001144:web:b64e4d1967df77bfb1c28d",
  measurementId: "G-BVRHFVKD3X"
};
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app