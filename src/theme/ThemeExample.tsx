import { Button, Card, Text, Title, Badge, Input, Group, Stack } from '@mantine/core';
import { useThemeColors } from './themeUtils';

/**
 * Example component showing how to use the custom Mantine theme
 * This demonstrates the theme colors, typography, and component styling
 */
export function ThemeExample() {
  const colors = useThemeColors();

  return (
    <div className="p-6 space-y-6">
      <Title order={1}>Mantine Theme Example</Title>
      
      {/* Color Showcase */}
      <Card>
        <Title order={3} mb="md">Brand Colors</Title>
        <Group>
          <div 
            className="w-16 h-16 rounded-lg flex items-center justify-center text-white text-xs font-semibold"
            style={{ backgroundColor: colors.primary }}
          >
            Primary
          </div>
          <div 
            className="w-16 h-16 rounded-lg flex items-center justify-center text-white text-xs font-semibold"
            style={{ backgroundColor: colors.secondary }}
          >
            Secondary
          </div>
          <div 
            className="w-16 h-16 rounded-lg flex items-center justify-center text-white text-xs font-semibold"
            style={{ backgroundColor: colors.navy }}
          >
            Navy
          </div>
          <div 
            className="w-16 h-16 rounded-lg flex items-center justify-center text-white text-xs font-semibold"
            style={{ backgroundColor: colors.coral }}
          >
            Coral
          </div>
        </Group>
      </Card>

      {/* Typography */}
      <Card>
        <Title order={3} mb="md">Typography</Title>
        <Stack>
          <Title order={1}>Heading 1 - Plus Jakarta Sans</Title>
          <Title order={2}>Heading 2 - Plus Jakarta Sans</Title>
          <Title order={3}>Heading 3 - Plus Jakarta Sans</Title>
          <Text>Body text using DM Sans font family. This is the default font for all body content.</Text>
          <Text size="sm">Small text using DM Sans</Text>
        </Stack>
      </Card>

      {/* Buttons */}
      <Card>
        <Title order={3} mb="md">Buttons</Title>
        <Group>
          <Button color="brand-blue">Primary Button</Button>
          <Button color="brand-orange">Secondary Button</Button>
          <Button variant="outline" color="brand-blue">Outline Button</Button>
          <Button variant="light" color="brand-blue">Light Button</Button>
        </Group>
      </Card>

      {/* Form Elements */}
      <Card>
        <Title order={3} mb="md">Form Elements</Title>
        <Stack>
          <Input placeholder="Input with custom styling" />
          <Input.Wrapper label="Labeled Input">
            <Input placeholder="Enter your text here" />
          </Input.Wrapper>
        </Stack>
      </Card>

      {/* Badges */}
      <Card>
        <Title order={3} mb="md">Badges</Title>
        <Group>
          <Badge color="brand-blue">Blue Badge</Badge>
          <Badge color="brand-orange">Orange Badge</Badge>
          <Badge variant="outline" color="brand-blue">Outline Badge</Badge>
          <Badge variant="light" color="brand-blue">Light Badge</Badge>
        </Group>
      </Card>

      {/* Usage Instructions */}
      <Card>
        <Title order={3} mb="md">Usage Instructions</Title>
        <Text size="sm" c="dimmed">
          This theme is configured to match your platform's design system:
        </Text>
        <ul className="text-sm text-gray-600 mt-2 space-y-1">
          <li>• Primary color: Navy Blue (#030F35) - use for main CTAs and primary actions</li>
          <li>• Secondary color: Orange (#FF6B4D) - use for accents and secondary actions</li>
          <li>• Typography: DM Sans for body text, Plus Jakarta Sans for headings</li>
          <li>• Border radius: Default to 8px (rounded-lg), with options for 12px and 16px</li>
          <li>• All Mantine components will automatically use these styles</li>
        </ul>
      </Card>
    </div>
  );
}