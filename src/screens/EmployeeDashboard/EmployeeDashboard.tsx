import React, { useState } from 'react';
import {
    Box, Title, Text, Button,
    Group, Card, Grid, SimpleGrid, TextInput, Select, Stack,
    Progress, Table, Badge,
    useMantineTheme,
} from '@mantine/core';
import { BarChart as MantineBarChart } from '@mantine/charts'; 
import { IconArrowBack, IconChevronRight } from '@tabler/icons-react';

// Import data, types, and utilities
import {
    type TimeData, type HistoryEntry, type WeeklySummary,
    WEEKLY_DATA, MONTHLY_DATA, CLIENT_DATA, SERVICE_DATA, HISTORY_DATA, WEEKLY_SUMMARY_DATA,
    DAILY_DATA_RAW,
    exampleSplit
} from '../../data/timeTrackData'; 
import KPICard from '../../components/KPICard';
import DailySummaryButton from '../../components/DailySummaryButton';
import { useNavigate } from 'react-router';

// Import the dynamic theme context

// ===========================
// REUSABLE COMPONENTS
// ===========================


// --- Real Stacked Bar Chart (Daily/Weekly Breakdown) ---
const MantineStackedBarChart: React.FC<{
  data: TimeData[]; 
  title: string;
}> = ({ data, title }) => {
    
  const chartData = data.map(d => ({
    label: d.label,
    max: d.max,
    ...exampleSplit(d.value) 
  }));
    
  const maxY = Math.max(...chartData.map(d => d.max), 40); 
  const { primaryColor } = useMantineTheme();

  return (
    <Card withBorder radius="lg" p="md" h="100%">
      <Text fw={600} size="lg" mb="md">{title}</Text>

      <MantineBarChart
        h={240}
        data={chartData}
        dataKey="label"
        type="stacked"
        series={[
          { name: 'billable', color: primaryColor, label: 'Billable' }, // Dynamic primary color
          { name: 'nonBillable', color: 'gray.4', label: 'Non-Billable' }, // Static muted color
        ]}
        yAxisProps={{ domain: [0, maxY] }} 
        tooltipProps={{ 
            formatter: (value: number, name: string) => [`${value} hrs`, name.charAt(0).toUpperCase() + name.slice(1)],
        }}
      />
    </Card>
  );
};

// --- Real Simple Bar Chart (Monthly Totals) ---
const MantineSimpleBarChart: React.FC<{
  data: TimeData[]; 
  title: string;
}> = ({ data, title }) => {
    
  const chartData = data.map(d => ({
    label: d.label,
    value: d.value,
    max: d.max
  }));
    
  const maxY = Math.max(...chartData.map(d => d.max), 100); 
  const { primaryColor } = useMantineTheme();

  return (
    <Card withBorder radius="lg" p="md" h="100%">
      <Text fw={600} size="lg" mb="md">{title}</Text>

      <MantineBarChart
        h={240}
        data={chartData}
        dataKey="label"
        series={[
          { name: 'value', color: primaryColor, label: 'Hours' },
        ]}
        yAxisProps={{ domain: [0, maxY] }} 
        tooltipProps={{ 
            formatter: (value: number) => [`${value} hrs`, 'Total Hours'],
        }}
        referenceLines={[
            { y: data[0]?.max || 100, label: 'Max', color: 'red.6' }
        ]}
      />
    </Card>
  );
};


// --- Progress Bar List Component (Dynamic Color) ---
const ProgressBarList: React.FC<{ 
    data: TimeData[]; 
    title: string;
}> = ({ data, title }) => {
    const { primaryColor } = useMantineTheme();
    
    return (
        <Card withBorder radius="lg" p="md" h="100%">
            <Text fw={600} size="lg" mb="md">{title}</Text>
            <Stack gap="md" style={{ maxHeight: 220, overflowY: 'auto' }}>
                {data.map((item, index) => (
                    <Grid key={index} align="center" style={item.style}>
                        <Grid.Col span="auto">
                            <Text size="sm" fw={700}>{item.label}</Text>
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <Progress value={item.value} size="md" radius="sm" color={primaryColor} /> 
                        </Grid.Col>
                        <Grid.Col span="content">
                            <Text size="sm" fw={700} style={{ textAlign: 'right' }}>{item.value} hrs</Text>
                        </Grid.Col>
                    </Grid>
                ))}
            </Stack>
        </Card>
    );
};

// ===========================
// LAYOUT COMPONENTS (Dynamic Color)
// ===========================


// --- Reports Section Component ---
const ReportsSection: React.FC<any> = (props) => {
    const { primaryColor } = useMantineTheme();
        let navigate = useNavigate();

    // Static data for Select components (you'd replace this with API calls)
    const serviceData = [{ value: 'all', label: 'All Services' }, { value: 'cat_a', label: 'Category A' }];
    const clientData = [{ value: 'all', label: 'All Clients' }, { value: 'client_a', label: 'Client A' }];

    return (
        <Stack gap="xl" mb="xl">
            <Button variant="default" radius="md" w={60} onClick={() => navigate(-1)}>
                                      <IconArrowBack />
                                      </Button>
            <Title order={2} fw={700}>Reports</Title>
            
            <Card withBorder radius="lg" p="lg" shadow="sm">
                <Stack gap="xl">
                    <Grid gutter="md" align="flex-end">
                        <Grid.Col span={{ base: 12, sm: 6, lg: 3 }}><TextInput type="date" label="From" value={props.dateFrom} onChange={(e) => props.onDateFromChange(e.target.value)} radius="md" size="md"/></Grid.Col>
                        <Grid.Col span={{ base: 12, sm: 6, lg: 3 }}><TextInput type="date" label="To" value={props.dateTo} onChange={(e) => props.onDateToChange(e.target.value)} radius="md" size="md"/></Grid.Col>
                        <Grid.Col span={{ base: 12, sm: 6, lg: 2 }}><Select label="Service" data={serviceData} value={props.selectedService} onChange={props.onServiceChange} radius="md" size="md"/></Grid.Col>
                        <Grid.Col span={{ base: 12, sm: 6, lg: 2 }}><Select label="Client" data={clientData} value={props.selectedService} onChange={props.onServiceChange} radius="md" size="md"/></Grid.Col>
                        <Grid.Col span={{ base: 12, lg: 2 }}>
                            <Button onClick={props.onExport} variant="filled" color={primaryColor} radius="md" size="md" fullWidth>Export</Button>
                        </Grid.Col>
                    </Grid>
                    
                    {/* CHARTS (MANTINE CHARTS) */}
                    <Grid gutter="md">
                        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                            <MantineStackedBarChart data={DAILY_DATA_RAW} title="Hours per Day" />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                            <MantineSimpleBarChart data={WEEKLY_DATA} title="Hours per Week" />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, lg: 6 }}>
                            <MantineSimpleBarChart data={MONTHLY_DATA} title="Hours per Month (Year)" />
                        </Grid.Col>
                    </Grid>
                    
                    {/* PROGRESS BARS (Dynamic Color) */}
                    <SimpleGrid cols={{ base: 1, lg: 2 }} spacing="md">
                        <ProgressBarList data={CLIENT_DATA} title="Total hours by client" />
                        <ProgressBarList data={SERVICE_DATA} title="Hours per Service Category" />
                    </SimpleGrid>
                    
                    {/* KPI Cards */}
                    <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md">
                        <KPICard title="Total Hours (2025)" value="480.00" />
                        <KPICard title="Total Hours (June 2025)" value="40.00" />
                        <KPICard title="Average Hours per Week" value="40.00" />
                    </SimpleGrid>
                </Stack>
            </Card>
        </Stack>
    );
};

// --- Weekly Summary Section (Type fix and Dynamic Color) ---
interface WeeklySummarySectionProps {
    selectedWeek: string;
    onWeekChange: (value: string) => void;
    onAddHours: () => void;
    summary: WeeklySummary;
}

const WeeklySummarySection: React.FC<WeeklySummarySectionProps> = ({ 
    selectedWeek, onWeekChange, onAddHours, summary 
}) => {
    const { primaryColor } = useMantineTheme();
    return (
        <Grid.Col span={{ base: 12, lg: 4 }}>
            <Stack gap="md">
                <Title order={3} fw={700}>Weekly Summary</Title>
                <Card withBorder radius="lg" p="md">
                    <Stack gap="md">
                        <Group justify="space-between" style={{ width: '100%' }}>
                            <TextInput type="week" label="Week" value={selectedWeek} onChange={(e) => onWeekChange(e.target.value)} radius="md" size="md"/>
                            <Button onClick={onAddHours} variant="filled" color={primaryColor} radius="md" size="md" mt={25}>
                                Add Hours
                            </Button>
                        </Group>
                        
                        <Stack gap="xs">
                            {summary.days.map((day: string, index: number) => (
                                <DailySummaryButton 
    day={day} 
    value={summary.hours[index]} 
    onClick={() => console.log('View Monday details')} 
/>
                            ))}
                        </Stack>
                        
                        <Stack gap="xs" pt="md" style={{ borderTop: '1px solid var(--mantine-color-gray-2)' }}>
                            <Group justify="space-between" align="flex-end">
                                <div>
                                    <Text size="sm">Week Total</Text>
                                    <Title order={2} fw={700}>{summary.total}</Title>
                                </div>
                                <Stack gap={0} align="flex-end">
                                    <Text size="sm">Billable: <Text span fw={700}>{summary.billable}</Text></Text>
                                    <Text size="sm">Non-billable: <Text span fw={700}>{summary.nonBillable}</Text></Text>
                                </Stack>
                            </Group>
                        </Stack>
                    </Stack>
                </Card>
            </Stack>
        </Grid.Col>
    );
};

// --- Submission History Section (Dynamic Color) ---
const SubmissionHistorySection: React.FC<any> = ({ selectedMonth, onMonthChange, onDownload, history }) => {
    
    const handleViewDetails = (week: string) => { console.log(`Viewing details for: ${week}`); };
    const { primaryColor } = useMantineTheme();
    
    return (
        <Grid.Col span={{ base: 12, lg: 8 }}>
            <Stack gap="md">
                <Title order={3} fw={700}>Submission History</Title>
                <Card withBorder radius="lg" p="md">
                    <Stack gap="md">
                        <Group justify="space-between" align="flex-end">
                            <TextInput type="month" label="Select Month" value={selectedMonth} onChange={(e) => onMonthChange(e.target.value)} style={{ flexGrow: 1, minWidth: 200 }} radius="md" size="md"/>
                            <Button onClick={onDownload} variant="light" color="gray" radius="md" size="md" mt={25}>Download History</Button>
                        </Group>
                        
                        <Box style={{ overflowX: 'auto' }}>
                            <Table miw={600} highlightOnHover withTableBorder withColumnBorders style={{ verticalAlign: 'middle' }}>
                                <Table.Thead>
                                    <Table.Tr>
                                        {['Week', 'Submitted On', 'Total Hours', 'Status', 'Action'].map(header => (
                                            <Table.Th key={header}><Text size="sm" fw={600}>{header}</Text></Table.Th>
                                        ))}
                                    </Table.Tr>
                                </Table.Thead>
                                <Table.Tbody>
                                    {history.map((entry: HistoryEntry, index: number) => (
                                        <Table.Tr key={`${entry.week}-${index}`}>
                                            <Table.Td>{entry.week}</Table.Td>
                                            <Table.Td>{entry.submitted}</Table.Td>
                                            <Table.Td fw={600}>{entry.hours}</Table.Td>
                                            <Table.Td>
                                                <Badge size="lg" radius="xl" style={{ backgroundColor: entry.statusColor2, color: entry.statusColor }}>
                                                    {entry.status}
                                                </Badge>
                                            </Table.Td>
                                            <Table.Td>
                                                <Button variant="subtle" color={primaryColor} size="xs" rightSection={<IconChevronRight size={14} />} onClick={() => handleViewDetails(entry.week)}>
                                                    View Details
                                                </Button>
                                            </Table.Td>
                                        </Table.Tr>
                                    ))}
                                </Table.Tbody>
                            </Table>
                        </Box>
                    </Stack>
                </Card>
            </Stack>
        </Grid.Col>
    );
};

// ===========================
// MAIN DASHBOARD COMPONENT (Content)
// ===========================
const EmployeeDashboard: React.FC = () => {
    const [dateFrom, setDateFrom] = useState('2024-05-01');
    const [dateTo, setDateTo] = useState('2024-06-30');
    const [selectedService, setSelectedService] = useState('all');
    const [selectedWeek, setSelectedWeek] = useState('2025-W01');
    const [selectedMonth, setSelectedMonth] = useState('2024-06');

    // Dummy handlers
    const handleExport = () => { console.log('Exporting report...'); };
    const handleAddHours = () => { console.log('Adding hours...'); };
    const handleDownloadHistory = () => { console.log('Downloading history...'); };

    return (
        <>
        <ReportsSection
                    dateFrom={dateFrom} dateTo={dateTo} selectedService={selectedService}
                    onDateFromChange={setDateFrom} onDateToChange={setDateTo} onServiceChange={setSelectedService}
                    onExport={handleExport}
                />

                <Grid gutter="xl">
                    <WeeklySummarySection
                        selectedWeek={selectedWeek} onWeekChange={setSelectedWeek} onAddHours={handleAddHours}
                        summary={WEEKLY_SUMMARY_DATA}
                    />
                    <SubmissionHistorySection
                        selectedMonth={selectedMonth} onMonthChange={setSelectedMonth} onDownload={handleDownloadHistory}
                        history={HISTORY_DATA}
                    />
                </Grid>
        </>
    );
};


export default EmployeeDashboard;