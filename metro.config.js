// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// @clerk/clerk-expo unconditionally re-exports useSSO, useOAuth, and useSignInWithApple,
// which statically/dynamically import optional peer deps we don't use.
// Their nested expo-crypto calls requireNativeModule('ExpoCryptoAES') at load time,
// crashing the app. Stub them all out so those hooks load but are never usable.
const emptyStub = path.resolve(__dirname, 'stubs/empty.js');
const CLERK_OPTIONAL_PEERS = [
  'expo-auth-session',
  'expo-web-browser',
  'expo-apple-authentication',
  'expo-crypto',
];

config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (CLERK_OPTIONAL_PEERS.some((pkg) => moduleName === pkg || moduleName.startsWith(pkg + '/'))) {
    return { filePath: emptyStub, type: 'sourceFile' };
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
