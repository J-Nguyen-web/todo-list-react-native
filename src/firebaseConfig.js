// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJdWjYzAJnXuP98qVIMUZtqz6t14LPb9M",
  authDomain: "todo-list-native-j-nguyen.firebaseapp.com",
  projectId: "todo-list-native-j-nguyen",
  storageBucket: "todo-list-native-j-nguyen.firebasestorage.app",
  messagingSenderId: "147387982311",
  appId: "1:147387982311:web:e82fcad6e4cda75dfe9d42"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);