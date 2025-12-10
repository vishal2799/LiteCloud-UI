import { Container, Title, SimpleGrid, Card, Text, Group, Button, Center } from '@mantine/core';
import { NavLink } from 'react-router';

// Configuration for the navigation items
const navItems = [
  // { title: 'Home', description: 'Return to the main application landing page.', path: '/' },
  { title: 'Employee Dashboard', description: 'View current schedules, performance metrics, and general employee data.', path: '/employee-dashboard' },
  { title: 'Add Hours', description: 'Submit or modify your recorded working hours and time-off requests.', path: '/add-hours' },
];

export default function App() {

  return (
    <Center style={{ minHeight: '100vh' }}>
      <Container size="lg" py="xl">
        {/* Main Title */}
        <Title order={2} ta="center" mb="xl">
          Application Navigation
        </Title>

        {/* Grid of Navigation Cards */}
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 2 }} spacing="xl">
          {navItems.map((item) => (
            <Card
              key={item.path}
              padding="lg"
              radius="md"
              withBorder
              shadow="sm"
            >
              <Group justify="space-between" mb="xs">
                <Text fw={500} size="xl">{item.title}</Text>
              </Group>

              <Text size="sm" c="dimmed">
                {item.description}
              </Text>

              <Button
                component={NavLink}
                to={item.path}
                variant="light"
                fullWidth
                mt="md"
              >
                Go to {item.title}
              </Button>
            </Card>
          ))}
        </SimpleGrid>
      </Container>
    </Center>
  );
}