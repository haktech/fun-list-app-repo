import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBS-Xa4svlwKjYSGxLSrz70nxcztR928Mk",
  authDomain: "funlistapp.firebaseapp.com",
  projectId: "funlistapp",
  storageBucket: "funlistapp.appspot.com",
  messagingSenderId: "911858763716",
  appId: "1:911858763716:web:9c3d3799391f9e6a1e8691",
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export default storage;
