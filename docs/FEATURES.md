# Features Architecture

This app follows a feature-based architecture where each screen's components are organized into their own feature folder.

## Structure

```
features/
├── home/                    # Home screen feature
│   ├── components/          # Home-specific components
│   │   ├── HomeHeader.tsx
│   │   ├── QuickStats.tsx
│   │   ├── RecentTransactions.tsx
│   │   └── QuickActions.tsx
│   └── index.ts            # Feature exports
├── statistics/              # Statistics screen feature
│   ├── components/          # Statistics-specific components
│   │   ├── StatisticsHeader.tsx
│   │   ├── MonthlyOverview.tsx
│   │   ├── SpendingByCategory.tsx
│   │   └── WeeklyTrend.tsx
│   └── index.ts            # Feature exports
├── profile/                 # Profile screen feature
│   ├── components/          # Profile-specific components
│   │   ├── ProfileHeader.tsx
│   │   ├── AccountStats.tsx
│   │   ├── SettingsSection.tsx
│   │   ├── LogoutSection.tsx
│   │   └── AppInfo.tsx
│   └── index.ts            # Feature exports
└── shared/                  # Shared components across features
    ├── components/          # Reusable components
    │   └── LanguageSwitcher.tsx
    └── index.ts            # Shared exports
```

## Benefits

1. **Better Organization** - Each feature is self-contained
2. **Easier Maintenance** - Find components quickly
3. **Reusability** - Shared components can be used across features
4. **Scalability** - Easy to add new features
5. **Team Collaboration** - Different developers can work on different features

## Usage

### Importing Feature Components

```tsx
// Import from a specific feature
import { HomeHeader, QuickStats } from '@/features/home';
import { StatisticsHeader, MonthlyOverview } from '@/features/statistics';
import { ProfileHeader, AccountStats } from '@/features/profile';

// Import shared components
import { LanguageSwitcher } from '@/features/shared';
```

### Adding New Features

1. Create a new folder in `features/`
2. Create a `components/` subfolder
3. Create an `index.ts` file to export components
4. Import and use in your screens

### Example Feature Structure

```tsx
// features/new-feature/components/NewComponent.tsx
export const NewComponent: React.FC = () => {
  return <View>...</View>;
};

// features/new-feature/index.ts
export { NewComponent } from './components/NewComponent';

// Usage in screen
import { NewComponent } from '@/features/new-feature';
```

## Component Guidelines

1. **Single Responsibility** - Each component should do one thing well
2. **Props Interface** - Always define props interface
3. **Translation Ready** - Use `useTranslation` hook
4. **Consistent Styling** - Follow the app's design system
5. **Export Everything** - Export all components through index.ts

## Migration Notes

- Old components in `components/` folder have been moved to appropriate feature folders
- `LanguageSwitcher` is now in `features/shared` since it's used across features
- Each screen now imports components from their respective feature folders
- **Home Screen**: Reduced from 196 lines to 27 lines
- **Statistics Screen**: Reduced from 259 lines to 35 lines  
- **Profile Screen**: Reduced from 295 lines to 35 lines

## Current Feature Status

### ✅ Home Feature
- **HomeHeader** - Welcome header with greeting
- **QuickStats** - Monthly spending statistics
- **RecentTransactions** - Recent transaction list
- **QuickActions** - Action buttons for common tasks

### ✅ Statistics Feature
- **StatisticsHeader** - Screen title and subtitle
- **MonthlyOverview** - Monthly spending overview
- **SpendingByCategory** - Category breakdown with progress bars
- **WeeklyTrend** - Weekly spending chart

### ✅ Profile Feature
- **ProfileHeader** - User avatar and information
- **AccountStats** - Account overview statistics
- **SettingsSection** - Settings list with language switcher
- **LogoutSection** - Sign out button
- **AppInfo** - App version and copyright

### ✅ Shared Feature
- **LanguageSwitcher** - Language switching component (compact and full size)
