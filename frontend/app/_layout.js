// app/_layout.js
//
// ROOT LAYOUT — This is the first file Expo Router reads.
//
// HOW EXPO ROUTER WORKS:
// - Expo Router uses the files inside the `app/` folder as routes.
// - This file (_layout.js) defines HOW the routes are displayed (as a Stack).
// - Every `_layout.js` file wraps the screens at its level.
//
// STACK NAVIGATOR:
// - A Stack navigator shows screens stacked on top of each other.
// - The first screen is at the bottom, each new screen slides on top.
// - You can go back by tapping the back arrow.
//
// ROUTE GROUP (tabs):
// - The `(tabs)` folder is a "Route Group". The parentheses mean it is
//   just a grouping — it does NOT appear in the URL/route path.
// - Inside (tabs) we have our bottom tab navigation.

import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    // Stack.Screen for "(tabs)" tells the Stack that the entire
    // tab group should have no header (tabs have their own headers).
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
