// Firebase configuration
  var firebaseConfig = {
    apiKey: "----",
    authDomain: "----",
    databaseURL: "----",
    projectId: "----",
    storageBucket: "----",
    messagingSenderId: "----",
    appId: "----"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Auth
var provider = new firebase.auth.GoogleAuthProvider();

// Firebase storage
var storageRefPets;
var uploadTask;
