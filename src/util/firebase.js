import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
    apiKey: 'AIzaSyDMBuc7Hr7BazU4Futo8cXaTOwUyxmc1Ek',
    authDomain: 'neutrino-workbench.firebaseapp.com',
    databaseURL: 'https://neutrino-workbench.firebaseio.com',
    projectId: 'neutrino-workbench',
    storageBucket: 'neutrino-workbench.appspot.com',
    messagingSenderId: '481760364598',
};

firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
firebase.auth().useDeviceLanguage();
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);

export const auth = firebase.auth();
export const db = firebase.firestore();
