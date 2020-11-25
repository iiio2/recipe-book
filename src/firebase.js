import firebase from 'firebase/app';
import "firebase/firestore"; 
import "firebase/auth";


var firebaseConfig = {
    apiKey: "AIzaSyA2w30Gi5pc8fX8STSsabz5Tm8599gdVps",
    authDomain: "recipe-chart.firebaseapp.com",
    databaseURL: "https://recipe-chart.firebaseio.com",
    projectId: "recipe-chart",
    storageBucket: "recipe-chart.appspot.com",
    messagingSenderId: "546552274906",
    appId: "1:546552274906:web:f4b01999d8edbe71792ae3"
  };
  // Initialize Firebase
  var firebaseApp = firebase.initializeApp(firebaseConfig);

  export const db = firebaseApp.firestore(); 
  export const auth = firebaseApp.auth(); 