import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getMessaging, onMessage } from 'firebase/messaging';

export const firebaseConfig = {
  apiKey: "AIzaSyAebcPQw_XV1hJ4cvi7ooxGaVCk0Muu8zg",
  authDomain: "sparrow-web-eba0d.firebaseapp.com",
  projectId: "sparrow-web-eba0d",
  storageBucket: "sparrow-web-eba0d.appspot.com",
  messagingSenderId: "386516588027",
  appId: "1:386516588027:web:361addbec678a59c25675e",
  measurementId: "G-DGL9Y3DVZ0"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)

// notifiactions
// check for iPhone
let messaging;
// if (window.navigator.platform != 'iPhone'){
messaging = getMessaging(app);
// }

export const onMessageListener = () => new Promise((resolve) => {
  // check for iPhone
  // if (window.navigator.platform != 'iPhone') {
  onMessage(messaging, (payload) => {
    // console.log("payload", payload);
    resolve(payload);
  });
  // }
});