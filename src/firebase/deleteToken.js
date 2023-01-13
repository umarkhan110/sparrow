import { initializeApp } from "firebase/app";
import { deleteToken, getMessaging } from "firebase/messaging";
import { firebaseConfig } from "./FireBase";

const messaging = getMessaging();

export const deleteTokenFunc = () => {
    const app = initializeApp(firebaseConfig);
    return deleteToken(messaging)


};