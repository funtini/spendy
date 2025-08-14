# Translation System

This app uses **react-i18next** with **expo-localization** to provide a robust internationalization solution.

## Features

- 🌍 **Automatic language detection** - Uses device locale
- 💾 **Persistent language selection** - Saves user preference
- 🔄 **Real-time language switching** - Change language without app restart
- 📱 **Expo-native** - Built specifically for Expo projects
- 🎯 **TypeScript support** - Full type safety

## Supported Languages

- 🇺🇸 **English (en)** - Default language
- 🇵🇹 **Portuguese (pt)** - Portuguese

## How to Use

### 1. Basic Translation

```tsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <Text>{t('common.loading')}</Text>
  );
}
```

### 2. Translation with Interpolation

```tsx
// Translation file
{
  "profile": {
    "memberSince": "Member since {{date}}"
  }
}

// Usage
<Text>{t('profile.memberSince', { date: 'January 2024' })}</Text>
```

### 3. Language Switching

```tsx
import { useLanguage } from '@/contexts/LanguageContext';

function LanguageSwitcher() {
  const { currentLanguage, changeLanguage, availableLanguages } = useLanguage();
  
  const handleLanguageChange = async (languageCode: string) => {
    await changeLanguage(languageCode);
  };
  
  return (
    <View>
      {availableLanguages.map((lang) => (
        <TouchableOpacity
          key={lang.code}
          onPress={() => handleLanguageChange(lang.code)}
        >
          <Text>{lang.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
```

### 4. Using the LanguageSwitcher Component

```tsx
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

// Full size
<LanguageSwitcher />

// Compact size
<LanguageSwitcher compact />
```

## File Structure

```
locales/
├── en.json          # English translations
├── pt.json          # Portuguese translations
lib/
├── i18n.ts          # i18n configuration
contexts/
├── LanguageContext.tsx  # Language management context
components/
├── LanguageSwitcher.tsx # Reusable language switcher
```

## Adding New Languages

1. **Create translation file** in `locales/` directory
2. **Add to resources** in `lib/i18n.ts`
3. **Add to availableLanguages** in `contexts/LanguageContext.tsx`

Example for Spanish:

```tsx
// locales/es.json
{
  "common": {
    "loading": "Cargando..."
  }
}

// lib/i18n.ts
import es from '../locales/es.json';

const resources = {
  en: { translation: en },
  pt: { translation: pt },
  es: { translation: es }, // Add this
};

// contexts/LanguageContext.tsx
const availableLanguages = [
  { code: 'en', name: 'English' },
  { code: 'pt', name: 'Português' },
  { code: 'es', name: 'Español' }, // Add this
];
```

## Translation Keys

### Common
- `common.loading` - Loading text
- `common.error` - Error text
- `common.save` - Save button
- `common.cancel` - Cancel button

### Navigation
- `navigation.home` - Home tab
- `navigation.statistics` - Statistics tab
- `navigation.profile` - Profile tab

### Home Screen
- `home.greeting` - Welcome greeting
- `home.welcome` - Welcome subtitle
- `home.quickStats.thisMonth` - This month label
- `home.quickStats.remaining` - Remaining label

### Statistics Screen
- `statistics.title` - Screen title
- `statistics.subtitle` - Screen subtitle
- `statistics.monthlyOverview` - Monthly overview section
- `statistics.categories.foodDining` - Food & dining category

### Profile Screen
- `profile.memberSince` - Member since text
- `profile.accountOverview` - Account overview section
- `profile.settings` - Settings section
- `profile.language` - Language setting

## Best Practices

1. **Use descriptive keys** - Make keys self-explanatory
2. **Group related translations** - Use nested structure (e.g., `home.quickStats`)
3. **Keep translations simple** - Avoid complex sentences
4. **Test both languages** - Ensure UI works with different text lengths
5. **Use interpolation sparingly** - Only for dynamic values

## Troubleshooting

### Language not changing
- Check if `changeLanguage` is being called
- Verify AsyncStorage permissions
- Check console for errors

### Translations not loading
- Ensure i18n is imported in `_layout.tsx`
- Check translation file syntax
- Verify file paths are correct

### TypeScript errors
- Ensure `@/*` path alias is configured
- Check import statements
- Verify component props
