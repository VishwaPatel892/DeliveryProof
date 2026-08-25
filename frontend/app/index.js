// app/index.js
//
// ROOT INDEX — This is the default route when the app opens (path: "/").
//
// HOW THIS WORKS:
// - When Expo Router starts, it loads the root path "/".
// - `app/index.js` handles the "/" route.
// - We use `<Redirect>` to immediately send the user to the Home tab.
//
// WHY REDIRECT?
// - We don't want to show a blank screen at "/".
// - We want the app to always open on the Home tab inside (tabs).
// - `(tabs)/home` means: go to the `home.js` file inside the `(tabs)` folder.
//   The parentheses (tabs) do NOT appear in the path — it becomes just "/home".

import { Redirect } from 'expo-router';

export default function Index() {
  // Redirect the root "/" path to the Home tab
  return <Redirect href="/(tabs)/home" />;
}
