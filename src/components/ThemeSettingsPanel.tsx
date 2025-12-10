import {
  Box,
  ColorInput,
  Divider,
  Group,
  Stack,
  Text,
  Title,
  useMantineColorScheme,
  ActionIcon,
} from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';
import { useLocalStorage } from '@mantine/hooks';
import { THEME_COLORS } from '../constants/constants';

const DarkModeToggle = () => {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <ActionIcon
      variant="outline"
      color={isDark ? 'yellow' : 'blue'}
      onClick={() => setColorScheme(isDark ? 'light' : 'dark')}
      title="Toggle color scheme"
    >
      {isDark ? <IconSun size={18} /> : <IconMoon size={18} />}
    </ActionIcon>
  );
};

const ThemeSettingsPanel = () => {
  const [userColor, setUserColor] = useLocalStorage<string>({
    key: 'user-theme-color',
    defaultValue: '#1D4ED8',
  });

  return (
    <Box p="md">
      <Stack>
        <Title order={4}>Appearance</Title>

        <Group>
          <Text size="sm" fw={500}>
            Dark Mode
          </Text>
          <DarkModeToggle />
        </Group>

        <Divider />

        <ColorInput
          label="Primary Theme Color"
          swatches={THEME_COLORS}
          swatchesPerRow={6}
          withPicker={false}
          withEyeDropper={false}
          value={userColor}
          onChange={setUserColor}
          styles={{ input: { cursor: 'pointer' } }}
        />
      </Stack>
    </Box>
  );
};

export default ThemeSettingsPanel;