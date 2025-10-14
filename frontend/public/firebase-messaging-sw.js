// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
// Replace 10.13.2 with latest version of the Firebase JS SDK.
importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js"
);

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyBf4SfpMexd5BGK9V6Tfb8vn4S6xv2zsPg",
  authDomain: "keep-pushnotifications.firebaseapp.com",
  projectId: "keep-pushnotifications",
  storageBucket: "keep-pushnotifications.firebasestorage.app",
  messagingSenderId: "65990803343",
  appId: "1:65990803343:web:c0f8303d91bf6707aad5fa",
  measurementId: "G-M50105MRCG"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/firebase-logo.png", // optional icon path
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});