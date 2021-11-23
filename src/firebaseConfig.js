import firebase from 'firebase/compat/app'; // ultima actualizacion,gracias StackOverflow
import 'firebase/compat/firestore';         // ultima actualizacion,gracias StackOverflow,
                                            //v9 compat packages are API compatible with v8 code

const firebaseConfig = {
  apiKey: "AIzaSyB3c0WdjcXIUEMBx-PANSeQ_K17hQVHwf0",
  authDomain: "app-firebase-d0df0.firebaseapp.com",
  projectId: "app-firebase-d0df0",
  storageBucket: "app-firebase-d0df0.appspot.com",
  messagingSenderId: "683935854765",
  appId: "1:683935854765:web:ca82adddfad4aa6da99624",
  measurementId: "G-7E30R21LHF"
  };
  // Initialize Firebase
  const fire = firebase.initializeApp(firebaseConfig); // inicializacion del firebase con la configuracion
  //firebase.analytics();
  const store = fire.firestore(); // dentro de store todo el objeto o todo el servicio de firestore
  export {store}

  /*  otra forma de stackoverflow
          import firebase from "firebase/app";
        import "firebase/auth";

        const app = firebase.initializeApp({
          apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
          authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
          projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
          storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
          messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
          appId: process.env.REACT_APP_FIREBASE_APP_ID,
        });

        export const auth = app.auth();
        export default app;
        ///////////////////////////
        import React, { useContext, useState, useEffect } from "react";
        import { auth } from "../firebase";

        const AuthContext = React.createContext();

        export function useAuth() {
          return useContext(AuthContext);
        }

        const AuthProvider = ({ children }) => {
          const [currentUser, setCurrentUser] = useState();

          function signup(email, password) {
            return auth.createUserWithEmailAndPassword(email, password);
          }

          useEffect(() => {
            const unsubscribe = auth.onAuthStateChanged((user) => {
              setCurrentUser(user);
            });

            return unsubscribe;
          }, []);

          const value = {
            currentUser,
            signup,
          };
          return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
        };

        export default AuthProvider;
  */