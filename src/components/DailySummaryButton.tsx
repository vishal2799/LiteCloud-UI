import { UnstyledButton, Group, Text, useMantineTheme, useMantineColorScheme } from '@mantine/core';
import React from 'react';

// Define the required props
interface DailySummaryButtonProps {
  day: string; // e.g., "Monday"
  value: string; // e.g., "8h" or "3 items"
  onClick: () => void;
}

export const DailySummaryButton: React.FC<DailySummaryButtonProps> = ({ day, value, onClick }) => {
  
  const theme = useMantineTheme();
  const { primaryColor } = theme;
        const { colorScheme } = useMantineColorScheme();
  
  const isDark = colorScheme === 'dark';

  // --- Dynamic Color Logic ---
  // In light mode, background is very light (index 0).
  // In dark mode, background is slightly darker (index 8).
  const bgColorIndex = isDark ? '8' : '0';
  const backgroundColorVar = `var(--mantine-color-${primaryColor}-${bgColorIndex})`;

  // In light mode, text should be dark (index 7).
  // In dark mode, text should be light (index 0).
  const textColorIndex = isDark ? '0' : '7';
  const textColorVar = `var(--mantine-color-${primaryColor}-${textColorIndex})`;
  
  // --- Style Objects ---
  
  const buttonStyle: React.CSSProperties = {
    display: 'block', 
    width: '100%', 
    padding: theme.spacing.sm, 
    background: backgroundColorVar, 
    borderRadius: theme.radius.md,
    // Add transition for smoother color changes between light/dark mode
    transition: 'background-color 150ms ease', 
  };
  
  const textStyle: React.CSSProperties = {
    color: textColorVar,
    // Add transition for smoother color changes
    transition: 'color 150ms ease',
  };

  return (
    <UnstyledButton 
        style={buttonStyle}
        onClick={onClick}
    >
        <Group justify="space-between">
            {/* Title (e.g., "Monday") */}
            <Text 
                size="sm" 
                fw={500} 
                style={textStyle}
            >
                {day}
            </Text>
            
            {/* Value (e.g., "8h") */}
            <Text 
                size="lg" 
                fw={700} 
                style={textStyle}
            >
                {value}
            </Text>
        </Group>
    </UnstyledButton>
  );
};

export default DailySummaryButton;