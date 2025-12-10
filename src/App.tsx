import { Container, Title, SimpleGrid, Card, Text, Group, Button, Center, Stack } from '@mantine/core';
import { NavLink } from 'react-router';

// Configuration for the navigation items
const navItems = [
  // { title: 'Home', description: 'Return to the main application landing page.', path: '/' }, // Kept commented out as per your previous input
  { title: 'Employee Dashboard', description: 'View current schedules, performance metrics, and general employee data.', path: '/employee-dashboard' },
  { title: 'Add Hours', description: 'Submit or modify your recorded working hours and time-off requests.', path: '/add-hours' },
];

export default function App() {

  return (
    <Center style={{ minHeight: '100vh' }}>
      <Container size="lg" py="xl">
        
        {/* --- ADDED APPLICATION DESCRIPTION BLOCK --- */}
        <Stack ta="center" mb="xl">
          <Title order={1} size={54} fw={900}>
            LiteCloud
          </Title>
          <Text size="xl" fw={500} c="dimmed" mb="md">
            The modern practice management tool.
          </Text>
          <Text size="md" c="gray.7" maw={600} mx="auto">
            Welcome to the LiteCloud Prototype Portal. This is the central hub for viewing and accessing the current UI designs and core features of the application.
          </Text>
        </Stack>
        
        {/* Main Title for the Navigation Section */}
        <Title order={3} ta="center" mb="xl">
          Prototype Navigation
        </Title>

        {/* Grid of Navigation Cards */}
        {/* Note: cols is set to 2 since you currently have 2 items */}
        <SimpleGrid cols={{ base: 1, sm: 1, lg: 2 }} spacing="xl" maw={800} mx="auto">
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