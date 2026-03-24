import { useMantineTheme } from '@mantine/core';

/**
 * Hook to access theme colors in a type-safe way
 */
export const useThemeColors = () => {
  const theme = useMantineTheme();
  
  return {
    // Brand colors
    primary: theme.colors['brand-blue'][9], // #030F35 (Navy Blue - Primary)
    primaryLight: theme.colors['brand-blue'][5], // #4A5FA8
    primaryDark: theme.colors['brand-blue'][8], // #141F42
    
    secondary: theme.colors['brand-orange'][5], // #FF6B4D (Orange - Secondary/Accent)
    secondaryLight: theme.colors['brand-orange'][4], // #FF8D7A
    secondaryDark: theme.colors['brand-orange'][6], // #FF4D2B
    
    // Semantic colors
    success: theme.colors.green[6],
    warning: theme.colors.yellow[6],
    error: theme.colors.red[6],
    info: theme.colors.blue[6],
    
    // Neutral colors
    gray: theme.colors.gray,
    
    // Custom brand colors from theme.other
    navy: theme.other.brandColors.navy, // Primary
    coral: theme.other.brandColors.coral, // Secondary/Accent
  };
};

/**
 * Get theme color by name and shade
 */
export const getThemeColor = (theme: any, colorName: string, shade: number = 5) => {
  return theme.colors[colorName]?.[shade] || theme.colors.gray[shade];
};

/**
 * Common color combinations used in your platform
 */
export const colorCombinations = {
  // Primary button (Blue)
  primaryButton: {
    background: 'var(--mantine-color-brand-blue-9)',
    hover: 'var(--mantine-color-brand-blue-8)',
    text: 'white',
  },
  
  // Secondary button (Orange)
  secondaryButton: {
    background: 'var(--mantine-color-brand-orange-5)',
    hover: 'var(--mantine-color-brand-orange-6)',
    text: 'white',
  },
  
  // Navbar
  navbar: {
    background: 'var(--mantine-color-brand-blue-9)', // #030F35 (Primary)
    text: 'white',
    accent: 'var(--mantine-color-brand-orange-5)', // #FF6B4D (Secondary/Accent)
  },
  
  // Cards
  card: {
    background: 'white',
    border: 'var(--mantine-color-gray-2)',
    shadow: 'var(--mantine-shadow-sm)',
  },
};

/**
 * CSS custom properties for use in Tailwind or regular CSS
 */
export const cssVariables = {
  '--brand-blue': '#030F35', // Primary
  '--brand-blue-light': '#4A5FA8',
  '--brand-blue-dark': '#141F42',
  '--brand-orange': '#FF6B4D', // Secondary/Accent
  '--brand-orange-light': '#FF8D7A',
  '--brand-orange-dark': '#FF4D2B',
};