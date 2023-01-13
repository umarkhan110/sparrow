import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getMessaging, getToken } from "firebase/messaging";
import { storeToken } from "../services/notifications/StoreToken";
import { firebaseConfig, db } from "./FireBase";

let messaging;
// if (window.navigator.platform != 'iPhone'){
  messaging = getMessaging();
// }

export const requestForToken = () => {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    return getToken(messaging, {
        vapidKey:
            "BHlJkwvxHzXHNBcHBIUFT8yxaxrr2SQw6u9ta5ZF1e4lKP61w7r520PQfwrLFCWFJeBBIPfSm6K6qQ-d9ICAFIg",
    }).then(async (currentToken) => {
        if (currentToken) {
            // debugger
            // sending token in backend db
            let data = {
                token: currentToken
            }
            // storing token for backend
            const respForToken = await storeToken(data)
            if (respForToken.status === 200) {
                // console.log(respForToken.data.message + currentToken)
            }

            // Perform any other neccessary action with the token
        } else {
            // Show permission request UI
            // console.log( "No registration token available. Request permission to generate one." );
        }
    })
        .catch((err) => {
            // console.log("An error occurred while retrieving token. ", err);
        });
};