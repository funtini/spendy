# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Spendy is a React Native expense tracking app built with Expo (managed workflow), TypeScript, and expo-router for file-based navigation. Supports iOS, Android, and Web. Uses the New Architecture (`newArchEnabled: true`).

## Commands

- `npm start` — Start Expo dev server
- `npm run ios` — Run on iOS simulator
- `npm run android` — Run on Android emulator
- `npm run web` — Run on web
- `expo lint` — Run ESLint

No test runner is configured.

## Architecture

### Routing (expo-router, file-based)

`app/` defines routes. `app/(tabs)/` is the bottom tab navigator (Home, Statistics, Wallet, Settings). Top-level screens (`transactions.tsx`, `profile.tsx`) are stack screens. Typed routes are enabled (`typedRoutes: true` in app.json).

### Feature Modules

`features/` organizes code by domain. Each feature has a `components/` folder and an `index.ts` barrel export. Current features: `add-expense`, `home`, `statistics`, `profile`, `shared`.

### Global State

React Context in `contexts/` — `ThemeContext` (light/dark/system with AsyncStorage persistence) and `LanguageContext`. No external state library. Provider hierarchy in `app/_layout.tsx`: `ThemeProvider` > `LanguageProvider` > `NavigationThemeProvider` > `SafeAreaProvider`.

### Theming

Colors defined in `constants/Colors.ts` with `light` and `dark` variants. Design tokens (Spacing, Typography, BorderRadius) in `constants/Styles.ts`. Access theme colors via the `useThemeColors()` hook. Check dark mode with `useTheme().isDark`.

### Internationalization

i18next with `react-i18next`. Supported languages: English (`en`) and Portuguese (`pt`). Translation files in `locales/`. Language detection uses device locale via `expo-localization` with AsyncStorage fallback. Use `useTranslation()` hook and `t()` function for all user-facing strings.

### Path Aliases

`@/*` maps to the project root (configured in tsconfig.json). Use `@/features/...`, `@/hooks/...`, `@/contexts/...`, etc.

## Conventions

- Functional components only, arrow functions preferred over `function` keyword
- TypeScript interfaces preferred over types; leverage type inference
- Named exports for components (barrel exported from feature `index.ts`)
- `StyleSheet.create()` for all styling — no inline style objects
- Lowercase with dashes for directory names (e.g., `add-expense`)
- Ionicons from `@expo/vector-icons` for icons
- `@gorhom/bottom-sheet` for bottom sheets, `react-native-reanimated` for animations
- SafeAreaView from `react-native-safe-area-context` for safe area handling — no hardcoded padding for notches/status bars
