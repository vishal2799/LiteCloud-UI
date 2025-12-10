import { Card, Stack, Text, Title, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import React from 'react'; // Ensure React is imported

const KPICard: React.FC<{ title: string; value: string }> = ({ title, value }) => {
    const theme = useMantineTheme();
    // 1. Get both primaryColor and colorScheme
    const { primaryColor } = theme;
      const { colorScheme } = useMantineColorScheme();

    // 2. Determine the background color variable based on the color scheme
    const isDark = colorScheme === 'dark';
    
    // In light mode, use a very light shade (index 0 or 1).
    // In dark mode, use a deeper shade for contrast (index 8 or 9 is common).
    const bgColorIndex = isDark ? '8' : '0';
    
    // Construct the CSS variable for the background color
    const backgroundColorVar = `var(--mantine-color-${primaryColor}-${bgColorIndex})`;

    // 3. Construct the CSS variable for the text color
    // This ensures the text is legible against the chosen background.
    const textColorVar = isDark 
        ? `var(--mantine-color-${primaryColor}-0)` // Light text on dark background
        : `var(--mantine-color-${primaryColor}-7)`; // Dark text on light background


    return (
        <Card withBorder radius="lg" p="md">
            <Stack 
                p={'xl'} 
                style={{ 
                    // Use the dynamically selected background color
                    backgroundColor: backgroundColorVar,
                    borderRadius: theme.radius.lg, // Use theme radius variable
                    // Set the text color for contrast
                    color: isDark ? theme.colors.dark[0] : theme.colors.dark[7] // Or use textColorVar
                }}
            >
                <Text size="md" fw={500} style={{ color: textColorVar }}>
                    {title}
                </Text>
                <Title order={2} fw={700} style={{ color: textColorVar }}>
                    {value}
                </Title>
            </Stack>
        </Card>
    );
}

export default KPICard;