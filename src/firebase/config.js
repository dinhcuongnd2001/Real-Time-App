import firebase from 'firebase/compat/app'

import 'firebase/analytics';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDy-OiHY6iegHXPObcEcFnJEDCO4oQq4fg",
    authDomain: "chat-app-1e639.firebaseapp.com",
    projectId: "chat-app-1e639",
    storageBucket: "chat-app-1e639.appspot.com",
    messagingSenderId: "84101436840",
    appId: "1:84101436840:web:2f4a0f223a91ca0138399d",
    measurementId: "G-K14MNHTT58"
};


// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
// firebase.analytics();
// const analytics = firebase.getAnalytics(app);

const auth = firebase.auth();
const db = firebase.firestore();

export {db, auth}
export default firebase;
