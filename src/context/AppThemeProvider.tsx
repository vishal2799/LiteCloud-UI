import { MantineProvider, ColorSchemeScript, type MantineThemeOverride } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { generateColors } from '@mantine/colors-generator';
import { useMemo } from 'react';

interface AppThemeProviderProps {
  children: React.ReactNode;
}

export const AppThemeProvider = ({ children }: AppThemeProviderProps) => {

  const [colorScheme] = useLocalStorage<'light' | 'dark'>({
    key: 'color-scheme',
    defaultValue: 'light',
  });

  const [userColor] = useLocalStorage<string>({
    key: 'user-theme-color',
    defaultValue: '',
  });

  const primaryColor = userColor || '#1D4ED8';

  const theme: MantineThemeOverride = useMemo(() => {
    return {
      primaryColor: 'tenant',
      colors: {
        tenant: generateColors(primaryColor),
      },
      colorScheme,
    };
  }, [primaryColor, colorScheme]);

  return (
    <>
      <ColorSchemeScript defaultColorScheme="light" />
      <MantineProvider theme={theme} defaultColorScheme={colorScheme} withCssVariables>
        {children}
      </MantineProvider>
    </>
  );
};
