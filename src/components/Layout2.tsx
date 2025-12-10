import { AppShell, Avatar, Burger, Button, Card, Grid, Group, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import type { ReactNode } from 'react';
import Logo from './Logo';
import ThemeSettingsModalTrigger from './ThemeSettingsModal';
import { IconBell, IconUserCircle } from '@tabler/icons-react';

export default function Layout2({children}: {children: ReactNode}) {
const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      footer={{ height: 60 }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group justify="space-between" style={{ flex: 1 }}>
            <Group gap="md">
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
      <AppShell.Main>
        {children}
      </AppShell.Main>
      <AppShell.Footer p="md" h={120}>
         <Grid gutter="md">
          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <Card withBorder radius="md" padding="md" shadow="sm">
              <Text fw={700} size="xs">Total Weekly Hours</Text>
              <Title order={2} fw={800} mt={5}>10</Title>
            </Card>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <Card withBorder radius="md" padding="md" shadow="sm">
              <Text fw={700} size="xs">Billable Hours</Text>
              <Title order={2} fw={800} mt={5}>20</Title>
            </Card>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <Card withBorder radius="md" padding="md" shadow="sm">
              <Text fw={700} size="xs">Non-billable Hours</Text>
              <Title order={2} fw={800} mt={5}>30</Title>
            </Card>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <Card withBorder radius="md" padding="md" shadow="sm">
              <Text fw={700} size="xs">Variance vs Last Week</Text>
              <Title order={2} fw={800} mt={5}>+1.2</Title>
            </Card>
          </Grid.Col>
        </Grid>
      </AppShell.Footer>
    </AppShell>
  );
}



