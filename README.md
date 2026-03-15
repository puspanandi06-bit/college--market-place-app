## CampusMarket (React Native + Expo)

Campus-focused marketplace app built with **React Native (Expo)** and **Firebase**.

- **Auth**: Firebase Authentication (email/password)
- **Database**: Firestore collections `users` and `listings`
- **Storage**: Firebase Storage for listing images
- **Navigation**: React Navigation (stack + bottom tabs)

### Main Features

- Login / Signup screens with Firebase Auth
- Marketplace feed with **category filters** and **featured listings**
- Create item listing with **image upload** and **category selection**
- Seller profile screen with **membership badge** and **own listings**
- Simple membership concept: `free` vs `premium` (premium gets featured styling)

### Getting Started

1. Install dependencies:

```bash
npm install
```

2. Install Expo CLI if you don’t have it:

```bash
npm install -g expo-cli
```

3. Configure Firebase in `src/services/firebase.js`:

```js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};
```

4. Run the app:

```bash
npm start
```

Then open it in the Expo Go app or an emulator/simulator.

