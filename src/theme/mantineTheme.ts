import { createTheme, MantineColorsTuple } from '@mantine/core';

// Define custom color tuples based on your Tailwind config
const primaryOrange: MantineColorsTuple = [
  '#FFF4F2', // 50
  '#FFE8E4', // 100
  '#FFD1C9', // 200
  '#FFB5A8', // 300
  '#FF8D7A', // 400
  '#FF6B4D', // 500 - Main brand color
  '#FF4D2B', // 600
  '#E63D1A', // 700
  '#C02F0F', // 800
  '#8A2109', // 900
];

const secondaryBlue: MantineColorsTuple = [
  '#F0F2F9', // 50
  '#E1E5F3', // 100
  '#C3CBE7', // 200
  '#9BA8D6', // 300
  '#6B7DBF', // 400
  '#4A5FA8', // 500
  '#2E4580', // 600
  '#1F2F5C', // 700
  '#141F42', // 800
  '#030F35', // 900 - Secondary brand color
];

export const mantineTheme = createTheme({
  /** Primary color scheme - using your blue brand color */
  primaryColor: 'brand-blue',
  
  /** Color palette */
  colors: {
    'brand-blue': secondaryBlue,
    'brand-orange': primaryOrange,
  },

  /** Typography - matching your Tailwind font configuration */
  fontFamily: 'DM Sans, sans-serif',
  fontFamilyMonospace: 'ui-monospace, SFMono-Regular, "SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  headings: {
    fontFamily: 'Plus Jakarta Sans, sans-serif',
    sizes: {
      h1: { fontSize: '2.25rem', lineHeight: '2.5rem', fontWeight: '700' }, // text-4xl
      h2: { fontSize: '1.875rem', lineHeight: '2.25rem', fontWeight: '700' }, // text-3xl
      h3: { fontSize: '1.5rem', lineHeight: '2rem', fontWeight: '600' }, // text-2xl
      h4: { fontSize: '1.25rem', lineHeight: '1.75rem', fontWeight: '600' }, // text-xl
      h5: { fontSize: '1.125rem', lineHeight: '1.75rem', fontWeight: '600' }, // text-lg
      h6: { fontSize: '1rem', lineHeight: '1.5rem', fontWeight: '600' }, // text-base
    },
  },

  /** Border radius - matching your component patterns */
  radius: {
    xs: '0.25rem', // 4px - rounded
    sm: '0.375rem', // 6px - rounded-md
    md: '0.5rem', // 8px - rounded-lg (most common)
    lg: '0.75rem', // 12px - rounded-xl
    xl: '1rem', // 16px - rounded-2xl
  },
  defaultRadius: 'md', // Default to rounded-lg (8px)

  /** Spacing scale */
  spacing: {
    xs: '0.5rem', // 8px
    sm: '0.75rem', // 12px
    md: '1rem', // 16px
    lg: '1.25rem', // 20px
    xl: '1.5rem', // 24px
  },

  /** Shadow system */
  shadows: {
    xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    sm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  },

  /** Component-specific overrides */
  components: {
    Button: {
      defaultProps: {
        radius: 'md',
      },
      styles: {
        root: {
          fontWeight: 600,
          fontSize: '0.875rem', // text-sm
        },
      },
    },

    Input: {
      defaultProps: {
        radius: 'md',
      },
      styles: {
        input: {
          fontSize: '0.875rem', // text-sm
          '&:focus': {
            borderColor: 'var(--mantine-color-brand-blue-5)',
            boxShadow: '0 0 0 1px var(--mantine-color-brand-blue-5)',
          },
        },
      },
    },

    TextInput: {
      defaultProps: {
        radius: 'md',
      },
    },

    Textarea: {
      defaultProps: {
        radius: 'md',
      },
    },

    Select: {
      defaultProps: {
        radius: 'md',
      },
    },

    Card: {
      defaultProps: {
        radius: 'lg',
        shadow: 'sm',
      },
    },

    Modal: {
      defaultProps: {
        radius: 'lg',
      },
    },

    Popover: {
      defaultProps: {
        radius: 'md',
        shadow: 'lg',
      },
    },

    Notification: {
      defaultProps: {
        radius: 'md',
      },
    },

    Badge: {
      defaultProps: {
        radius: 'xl',
      },
    },

    Paper: {
      defaultProps: {
        radius: 'md',
      },
    },
  },

  /** Other theme properties */
  other: {
    // Custom properties that can be accessed via theme.other
    brandColors: {
      navy: '#030F35', // Primary
      coral: '#FF6B4D', // Secondary/Accent
    },
  },
});