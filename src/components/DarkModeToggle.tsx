import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';

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

export default DarkModeToggle