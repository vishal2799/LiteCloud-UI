import { AppShell, Avatar, Box, Burger, Button, Group, Title, UnstyledButton } from "@mantine/core";
import { IconBell, IconUserCircle } from "@tabler/icons-react";
import ThemeSettingsModalTrigger from "./ThemeSettingsModal";
import Logo from "./Logo";

// const Navbar: React.FC = () => (
//     <Box component="header" style={{ padding: 'var(--mantine-spacing-md)', borderBottom: '1px solid var(--mantine-color-gray-2)', display: 'flex', alignItems: 'center' }}>
//         <Group justify="space-between" style={{ height: '100%', width: '100%' }}>
//             <Group gap="md">
//                 <Logo />
//                 <Title order={3} fw={700}>TimeTrack Pro</Title>
//             </Group>
//             <Group gap="md">
//                 <ThemeSettingsModalTrigger />
//                 <Button 
//                     variant="light" 
//                     leftSection={<IconBell size={18} />}
//                     radius="md"
//                 >
//                     Notifications
//                 </Button>
//                 <Avatar 
//                     radius="xl" 
//                     variant='light' 
//                 >
//                     <IconUserCircle size={24} />
//                 </Avatar>
//             </Group>
//         </Group>
//     </Box>
// );

// export default Navbar;

import { useDisclosure } from '@mantine/hooks';

export default function Navbar() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group justify="space-between" style={{ flex: 1 }}>
            Header
            <Group ml="xl" gap={0} visibleFrom="sm">
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
        Navbar is only visible on mobile, links that are rendered in the header on desktop are
        hidden on mobile in header and rendered in navbar instead.
      </AppShell.Main>
    </AppShell>
  );
}