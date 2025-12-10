import { useMantineTheme } from "@mantine/core";

const Logo: React.FC = () => {
    // Uses the primary color via CSS variable, set by the MantineProvider
    const { primaryColor } = useMantineTheme();
    return (
        <svg 
            width="36" 
            height="36" 
            viewBox="0 0 48 48" 
            fill="currentColor" 
            style={{ color: `var(--mantine-color-${primaryColor}-6)` }}
        >
            <path d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z"/>
        </svg>
    );
};

export default Logo;