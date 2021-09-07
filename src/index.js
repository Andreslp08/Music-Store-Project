import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import * as Auth from 'firebase/auth'
import * as Firestore from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCTYnoSdu1MbthmAuOx75JfwQ4Ocbe-brU",
  authDomain: "music-store-df00c.firebaseapp.com",
  projectId: "music-store-df00c",
  storageBucket: "music-store-df00c.appspot.com",
  messagingSenderId: "136992465196",
  appId: "1:136992465196:web:cb03bb7e9eccbd4d8b8c89",
  measurementId: "G-CV7JZ72VRB"
};

// Initialize Firebase


    const firebaseApp = initializeApp(firebaseConfig);
    const analytics = getAnalytics(firebaseApp);
    Auth.connectAuthEmulator(Auth.getAuth(), "http://localhost:9099");
    Firestore.connectFirestoreEmulator(Firestore.getFirestore(),"localhost", 8989);


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
