import { useDisclosure } from '@mantine/hooks';
import { AppShell, Avatar, Burger, Button, Group, Title, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { type ReactNode } from 'react';
import ThemeSettingsModalTrigger from './ThemeSettingsModal';
import { IconBell, IconUserCircle } from '@tabler/icons-react';
import Logo from './Logo';
import { useNavigate } from 'react-router';

export default function Layout({children}: {children: ReactNode}) {
    let navigate = useNavigate();

  const [opened, { toggle }] = useDisclosure();
  const theme = useMantineTheme();
      const { primaryColor } = theme;
      const { colorScheme } = useMantineColorScheme();

    const isDark = colorScheme === 'dark';

    const bgColorVar = isDark 
        ? theme.colors.dark[8] 
        : `var(--mantine-color-${primaryColor}-0)`;

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
      padding="xl"
      bg={bgColorVar}
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group justify="space-between" style={{ flex: 1 }}>
            <Group gap="md" onClick={() => navigate("/")} style={{cursor: 'pointer'}}>
                 <Logo />
                 <Title order={3} fw={700}>TimeTrack Pro</Title>
             </Group>
            <Group ml="xl" gap={'md'} visibleFrom="sm">
              <ThemeSettingsModalTrigger />
                <Button
                    variant="light" 
                    leftSection={<IconBell size={18} />}
                    radius="md"
                >
                    Notifications
                </Button>
                <Avatar
                    radius="xl" 
                    variant='light' 
                >
                    <IconUserCircle size={24} />
                </Avatar>
            </Group>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar py="md" px={4}>
        <ThemeSettingsModalTrigger />
                        <Button 
                            variant="light" 
                            leftSection={<IconBell size={18} />}
                            radius="md"
                        >
                            Notifications
                        </Button>
                        <Avatar 
                            radius="xl" 
                            variant='light' 
                        >
                            <IconUserCircle size={24} />
                        </Avatar>
      </AppShell.Navbar>

      <AppShell.Main>
        {children}
      </AppShell.Main>
    </AppShell>
  );
}