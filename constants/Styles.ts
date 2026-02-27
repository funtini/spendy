export const Spacing = {
  xs: 4,
  sm: 8,
  md: 15,
  lg: 20,
  xl: 30,
  xxl: 40,
};

export const Typography = {
  h1: {
    fontSize: 24,
    fontWeight: '700' as const,
  },
  h2: {
    fontSize: 18,
    fontWeight: '600' as const,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
  },
  caption: {
    fontSize: 14,
    fontWeight: '400' as const,
  },
};

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
};

/** Dark theme fonts — DM Sans body, Space Grotesk headings, JetBrains Mono numbers */
export const FontFamily = {
  body: 'DMSans_400Regular',
  bodyMedium: 'DMSans_500Medium',
  bodyBold: 'DMSans_700Bold',
  heading: 'SpaceGrotesk_600SemiBold',
  headingBold: 'SpaceGrotesk_700Bold',
  mono: 'JetBrainsMono_400Regular',
  monoBold: 'JetBrainsMono_600SemiBold',
};

/** Light theme fonts — Plus Jakarta Sans body, Fraunces headings, JetBrains Mono numbers */
export const FontFamilyLight = {
  body: 'PlusJakartaSans_400Regular',
  bodyMedium: 'PlusJakartaSans_500Medium',
  bodyBold: 'PlusJakartaSans_700Bold',
  heading: 'Fraunces_600SemiBold',
  headingBold: 'Fraunces_700Bold',
  mono: 'JetBrainsMono_400Regular',
  monoBold: 'JetBrainsMono_600SemiBold',
};
