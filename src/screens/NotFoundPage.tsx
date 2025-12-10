import { Center, Container, Title, Text, Button, Space } from '@mantine/core';
import { Link } from 'react-router';

const NotFoundPage = () => {
  return (
    // 1. Center the content vertically (using minHeight: '100vh') and horizontally
    <Center style={{ minHeight: '80vh' }}>
      <Container size="xs" ta="center">
        
        {/* Large Error Code */}
        <Title order={1} size={92} fw={900} mb="xs" c="red.6">
          404
        </Title>

        {/* Main Heading */}
        <Title order={2} mb="md">
          Page Not Found
        </Title>
        
        {/* Descriptive Text */}
        <Text size="lg" mb="xl" c="dimmed">
          The page you are looking for does not exist or has been moved.
          Please check the URL or use the button below to navigate back to the main site.
        </Text>

        <Space h="md" />

        {/* Link converted to a primary Button */}
        <Button
          component={Link} // Uses the react-router Link component
          to="/"
          variant="filled"
          size="lg"
        >
          Go to Home Page
        </Button>

      </Container>
    </Center>
  );
}

export default NotFoundPage;