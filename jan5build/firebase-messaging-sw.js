// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyAebcPQw_XV1hJ4cvi7ooxGaVCk0Muu8zg",
  authDomain: "sparrow-web-eba0d.firebaseapp.com",
  projectId: "sparrow-web-eba0d",
  storageBucket: "sparrow-web-eba0d.appspot.com",
  messagingSenderId: "386516588027",
  appId: "1:386516588027:web:361addbec678a59c25675e",
  measurementId: "G-DGL9Y3DVZ0"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  // console.log("Received background message ", payload);
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});