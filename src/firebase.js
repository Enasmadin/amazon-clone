import{initializeApp}from"firebase/app";
import{getAuth}from"firebase/auth";
import{getFirestore}from"firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBac9gedqGIhTyHY3InTOwOY7EPSiEN_7g",
  authDomain: "colone-efc39.firebaseapp.com",
  projectId: "colone-efc39",
  storageBucket:"colone-efc39.appspot.com",
  messagingSenderId: "136503872611",
  appId:"1:136503872611:web:511f75c0f6d9bdc5b27c56",
 
};

const app =initializeApp(firebaseConfig);
const Auth= getAuth(app);
const db = getFirestore(app);
 export{Auth,db};

