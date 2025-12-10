import { useState, useMemo, useCallback } from 'react'; // Added useCallback
import {
  Card,
  Group,
  TextInput,
  Button,
  Box,
  Text,
  Table,
  Select,
  Textarea,
  ActionIcon,
  Grid,
  Title,
  Stack,
  useMantineTheme,
  ScrollArea,
  rem,
  useMantineColorScheme,
  Drawer,
  // IconX is needed for the close button in the drawer, but not imported
} from '@mantine/core';
import {
  IconHistory,
  IconDeviceFloppy,
  IconSend,
  IconInfoCircle,
  IconCopy,
  IconTrash,
  IconPlus,
  IconArrowBack,
  IconX, // Imported IconX for the drawer close button
} from '@tabler/icons-react';
import { useNavigate } from 'react-router';

// --- 1. MOCK DATA AND STATE MANAGEMENT (Replace with your actual state logic) ---

// Define the shape of a row
interface TimesheetRow {
  id: number;
  client: string;
  department: string;
  service: string;
  period: string;
  description: string;
  hours: Record<number, number>; // Maps day index (0-6) to hours
  notes: Record<number, string>; // Maps day index (0-6) to notes/comments
}

// Initial/Mock Data
const initialRows: TimesheetRow[] = [
  {
    id: 1,
    client: 'Client A',
    department: 'Dev',
    service: 'Consulting',
    period: 'Full Day',
    description: 'Weekly scrum meeting and sprint planning.',
    hours: { 0: 0, 1: 2.0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 },
    notes: { 1: 'Had to discuss scope changes for Project X.', 3: '' },
  },
  {
    id: 2,
    client: 'Client B',
    department: 'Sales',
    service: 'Management',
    period: 'Half Day',
    description: 'Developed Q4 presentation deck for leadership.',
    hours: { 0: 0, 1: 0, 2: 4.0, 3: 4.0, 4: 0, 5: 0, 6: 0 },
    notes: { 2: '', 3: 'Met with VP of Marketing to finalize slides.' },
  },
  // Add more mock rows to test scrolling...
  ...Array.from({ length: 2 }, (_, i) => ({
    id: i + 3,
    client: `Client ${i % 3 === 0 ? 'A' : i % 3 === 1 ? 'B' : 'C'}`,
    department: i % 2 === 0 ? 'Dev' : 'Sales',
    service: 'Task',
    period: 'Hour',
    description: `Working on project task #${i + 1}`,
    hours: { 0: 0, 1: 8.0, 2: 8.0, 3: 8.0, 4: 8.0, 5: 0, 6: 0 },
    notes: {},
  })),
];

// Helper interface for the Drawer state
interface NotesDrawerState {
  open: boolean;
  rowId: number | null;
  day: number | null;
  client: string;
  service: string;
}

const days = [0, 1, 2, 3, 4, 5, 6]; // 0=Sun, 6=Sat
const dayLabels: Record<number, string> = { 0: 'Sunday', 1: 'Monday', 2: 'Tuesday', 3: 'Wednesday', 4: 'Thursday', 5: 'Friday', 6: 'Saturday' };

const CLIENT_OPTIONS = ['Client A', 'Client B', 'Client C'];
const DEPARTMENT_OPTIONS = ['Dev', 'Sales', 'HR'];
const SERVICE_OPTIONS = ['Consulting', 'Management', 'Training'];
const PERIOD_OPTIONS = ['Hour', 'Half Day', 'Full Day'];

let nextId = initialRows.length + 1;

// --- 2. TIMESHEET COMPONENT ---

export default function Timesheet() {
  const [rows, setRows] = useState<TimesheetRow[]>(initialRows);
  const [weekLabel, setWeekLabel] = useState('2025-W50');
  const [autosaveStatus, setAutosaveStatus] = useState<'saved' | 'saving'>('saved');
  const [notesDrawer, setNotesDrawer] = useState<NotesDrawerState>({
    open: false,
    rowId: null,
    day: null,
    client: '',
    service: '',
  });
  const [currentNote, setCurrentNote] = useState(''); // State for the note text being edited
  let navigate = useNavigate();

  // Utility Functions
  const scheduleSave = () => {
    setAutosaveStatus('saving');
    // In a real app, this is where you'd call an API to save data.
    setTimeout(() => setAutosaveStatus('saved'), 1500);
  };

  const updateRowField = (id: number, field: keyof TimesheetRow, value: string) => {
    setRows(currentRows =>
      currentRows.map(row => (row.id === id ? { ...row, [field]: value } : row))
    );
    scheduleSave();
  };

  const updateRowHours = (id: number, day: number, value: number) => {
    setRows(currentRows =>
      currentRows.map(row =>
        row.id === id ? { ...row, hours: { ...row.hours, [day]: value } } : row
      )
    );
    scheduleSave();
  };

  const addRow = () => {
    const newRow: TimesheetRow = {
      id: nextId++,
      client: '',
      department: '',
      service: '',
      period: '',
      description: '',
      hours: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 },
      notes: {},
    };
    setRows(currentRows => [...currentRows, newRow]);
    scheduleSave();
  };

  const removeRow = (id: number) => {
    setRows(currentRows => currentRows.filter(row => row.id !== id));
    scheduleSave();
  };

  const copyRow = (id: number) => {
    const rowToCopy = rows.find(row => row.id === id);
    if (rowToCopy) {
      const newRow: TimesheetRow = {
        ...rowToCopy,
        id: nextId++,
        description: `Copy of ${rowToCopy.description}`,
      };
      setRows(currentRows => {
        const index = currentRows.findIndex(row => row.id === id);
        return [...currentRows.slice(0, index + 1), newRow, ...currentRows.slice(index + 1)];
      });
      scheduleSave();
    }
  };

  // --- Notes Drawer Logic ---

  const openNotesDrawer = useCallback((rowId: number, day: number) => {
    const row = rows.find(r => r.id === rowId);
    if (row) {
      setCurrentNote(row.notes[day] || '');
      setNotesDrawer({
        open: true,
        rowId: rowId,
        day: day,
        client: row.client || 'N/A',
        service: row.service || 'N/A',
      });
    }
  }, [rows]); // Re-create if rows changes

  const closeNotesDrawer = () => {
    setNotesDrawer({
      open: false,
      rowId: null,
      day: null,
      client: '',
      service: '',
    });
    setCurrentNote('');
  };

  const saveNote = () => {
    if (notesDrawer.rowId !== null && notesDrawer.day !== null) {
      setRows(currentRows =>
        currentRows.map(row =>
          row.id === notesDrawer.rowId
            ? {
                ...row,
                notes: { ...row.notes, [notesDrawer.day!]: currentNote.trim() },
              }
            : row
        )
      );
      scheduleSave();
      closeNotesDrawer();
    }
  };

  // Calculations
  const calculateRowTotal = (row: TimesheetRow) =>
    Object.values(row.hours).reduce((sum, h) => sum + h, 0);

  const calculateDayTotal = (day: number) =>
    rows.reduce((sum, row) => sum + (row.hours[day] || 0), 0);

  const weekTotal = useMemo(() => rows.reduce((sum, row) => sum + calculateRowTotal(row), 0), [rows]);

  const totalBillable = 20.0; // Mock value
  const totalNonBillable = 30.0; // Mock value

  const theme = useMantineTheme();
  // 1. Get both primaryColor and colorScheme
  const { primaryColor } = theme;
  const { colorScheme } = useMantineColorScheme();

  const isDark = colorScheme === 'dark';

  // Use a slightly different color index for better contrast/visibility on table headers/footers
  const bgColorIndex = isDark ? '8' : '5'; // Used '8' for dark to make it slightly darker than default background
  const backgroundColorVar = `var(--mantine-color-${primaryColor}-${bgColorIndex})`;

  const textColorVar = isDark
    ? `var(--mantine-color-white)` // Use pure white for better contrast on dark background
    : `#fff`; // White text on color[5] background

  return (
    <Stack
      style={{ height: `calc(100vh - 140px)`, overflow: 'hidden' }}
      gap="md"
    >
      {/* 2. Header/Controls Card (Fixed Height: flex-shrink: 0 behavior) */}
      <Card
        withBorder
        radius="md"
        padding="md"
        shadow="sm"
        style={{ flexShrink: 0 }} // Prevents this section from shrinking
      >

        <Group justify="space-between" wrap="nowrap">
          {/* Left Group */}
          <Group gap="md" wrap="nowrap">
            <Button variant="default" radius="md" onClick={() => navigate(-1)}>
              <IconArrowBack />
            </Button>
            <TextInput
              type="week"
              value={weekLabel}
              onChange={(e) => setWeekLabel(e.target.value)}
              size="md"
              styles={{ input: { fontWeight: 700 } }}
            />
            <Button
              variant="subtle"
              leftSection={<IconHistory size={18} />}
              onClick={() => alert('Copy from last week initiated!')}
            >
              Copy From Last Week
            </Button>
          </Group>

          {/* Right Group */}
          <Group gap="md" wrap="nowrap">
            {/* Autosave Status Indicator */}
            <Group gap="xs">
              <Box
                w={rem(10)}
                h={rem(10)}
                style={{
                  borderRadius: '50%',
                  backgroundColor: autosaveStatus === 'saving' ? theme.colors.orange[6] : theme.colors.green[6]
                }}
              />
              <Text size="sm" c="dimmed" style={{ minWidth: rem(50) }}>
                {autosaveStatus === 'saving' ? 'Saving...' : 'Saved'}
              </Text>
            </Group>

            {/* Save and Submit Buttons */}
            <Button
              variant="outline"
              leftSection={<IconDeviceFloppy size={18} />}
              onClick={() => { alert('Timesheet saved as draft!'); scheduleSave(); }}
            >
              Save Draft
            </Button>

            <Button
              variant="filled"
              leftSection={<IconSend size={18} />}
              onClick={() => { alert('Timesheet submitted for approval!'); scheduleSave(); }}
            >
              Submit Timesheet
            </Button>
          </Group>
        </Group>
      </Card>

      {/* 3. Scrollable Table Area (Fills the middle space) */}
      <ScrollArea
        style={{ flexGrow: 1, borderRadius: 8 }}
        type="auto"
      >
        <Table
          highlightOnHover
          withTableBorder
          withColumnBorders
          withRowBorders
          stickyHeader // Makes the Thead fixed at the top of the ScrollArea viewport
          style={{ minWidth: '1400px' }} // Ensure horizontal scrolling is possible
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th style={{ minWidth: '180px', backgroundColor: backgroundColorVar, color: textColorVar }}>
                <Text fw={700}>Client</Text>
              </Table.Th>
              <Table.Th style={{ minWidth: '140px', backgroundColor: backgroundColorVar, color: textColorVar }}>
                <Text fw={700}>Department</Text>
              </Table.Th>
              <Table.Th style={{ minWidth: '140px', backgroundColor: backgroundColorVar, color: textColorVar }}>
                <Text fw={700}>Service</Text>
              </Table.Th>
              <Table.Th style={{ minWidth: '120px', backgroundColor: backgroundColorVar, color: textColorVar }}>
                <Text fw={700}>Period</Text>
              </Table.Th>
              <Table.Th style={{ minWidth: '250px', backgroundColor: backgroundColorVar, color: textColorVar }}>
                <Text fw={700}>Description</Text>
              </Table.Th>
              {days.map((day) => (
                <Table.Th key={day} style={{ minWidth: '90px', textAlign: 'center', backgroundColor: backgroundColorVar, color: textColorVar }}>
                  <Text fw={700}>{dayLabels[day].slice(0, 3)}</Text>
                </Table.Th>
              ))}
              <Table.Th style={{ minWidth: '100px', textAlign: 'center', backgroundColor: backgroundColorVar, color: textColorVar }}>
                <Text fw={700}>Total</Text>
              </Table.Th>
              <Table.Th style={{ minWidth: '150px', textAlign: 'center', backgroundColor: backgroundColorVar, color: textColorVar }}>
                <Text fw={700}>Action</Text>
              </Table.Th>
            </Table.Tr>
          </Table.Thead>

          <Table.Tbody bg={isDark ? 'black' : 'white'}>
            {rows.map((row) => (
              <Table.Tr key={row.id}>
                {/* Data Input Cells (Selects and Textarea) */}
                <Table.Td>
                  <Select
                    value={row.client}
                    onChange={(val) => updateRowField(row.id, 'client', val || '')}
                    data={CLIENT_OPTIONS}
                    placeholder="Choose client..."
                    size="xs"
                    searchable
                    clearable
                  />
                </Table.Td>

                <Table.Td>
                  <Select
                    value={row.department}
                    onChange={(val) => updateRowField(row.id, 'department', val || '')}
                    data={DEPARTMENT_OPTIONS}
                    placeholder="Choose dept..."
                    size="xs"
                    searchable
                    clearable
                  />
                </Table.Td>

                <Table.Td>
                  <Select
                    value={row.service}
                    onChange={(val) => updateRowField(row.id, 'service', val || '')}
                    data={SERVICE_OPTIONS}
                    placeholder="Choose service..."
                    size="xs"
                    searchable
                    clearable
                  />
                </Table.Td>

                <Table.Td>
                  <Select
                    value={row.period}
                    onChange={(val) => updateRowField(row.id, 'period', val || '')}
                    data={PERIOD_OPTIONS}
                    placeholder="Choose period..."
                    size="xs"
                    clearable
                  />
                </Table.Td>

                <Table.Td>
                  <Textarea
                    value={row.description}
                    onChange={(e) => updateRowField(row.id, 'description', e.target.value)}
                    placeholder="Task description"
                    minRows={1}
                    resize={'vertical'}
                    size="xs"
                  />
                </Table.Td>

                {/* Hours Input Cells */}
                {days.map(day => (
                  <Table.Td key={day}>
                    <Box style={{ position: 'relative' }}>
                      <TextInput
                        type="number"
                        step="0.5"
                        min="0"
                        max="24"
                        value={row.hours[day].toString()}
                        onChange={(e) => updateRowHours(row.id, day, parseFloat(e.target.value) || 0)}
                        styles={{
                          input: { textAlign: 'center', paddingRight: '28px', fontWeight: 600 }
                        }}
                        size="xs"
                      />
                      <ActionIcon
                        // Set the color based on whether a note exists for the day
                        color={row.notes[day] ? 'blue' : 'gray'}
                        onClick={() => openNotesDrawer(row.id, day)}
                        variant="subtle"
                        size="xs"
                        title={row.notes[day] ? `View/Edit Note: ${row.notes[day].substring(0, 30)}...` : "Add comment"}
                        style={{ position: 'absolute', right: 2, top: '50%', transform: 'translateY(-50%)' }}
                      >
                        <IconInfoCircle size={14} />
                      </ActionIcon>
                    </Box>
                  </Table.Td>
                ))}

                {/* Row Total */}
                <Table.Td style={{ textAlign: 'center' }}>
                  <Text fw={700} size="sm">
                    {calculateRowTotal(row).toFixed(1)}
                  </Text>
                </Table.Td>

                {/* Action Buttons */}
                <Table.Td>
                  <Group gap={6} wrap="nowrap" justify="center">
                    <ActionIcon
                      onClick={() => copyRow(row.id)}
                      variant="light"
                      title="Copy row"
                      size="sm"
                    >
                      <IconCopy size={16} />
                    </ActionIcon>
                    <ActionIcon
                      onClick={() => removeRow(row.id)}
                      variant="light"
                      color="red"
                      title="Delete row"
                      size="sm"
                    >
                      <IconTrash size={16} />
                    </ActionIcon>
                    <ActionIcon
                      onClick={addRow}
                      variant="light"
                      color="green"
                      title="Add new row"
                      size="sm"
                    >
                      <IconPlus size={16} />
                    </ActionIcon>
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>

          {/* Table Footer: Sticky to the bottom of the ScrollArea's viewport */}
          <Table.Tfoot
            style={{
              position: 'sticky',
              bottom: 0,
              backgroundColor: backgroundColorVar, // Match the header background
              color: textColorVar,
              zIndex: 100,
            }}
          >
            <Table.Tr>
              <Table.Td colSpan={5}>
                <Text fw={700} size="sm">Totals</Text>
              </Table.Td>

              {days.map(day => (
                <Table.Td key={day} style={{ textAlign: 'center' }}>
                  <Text fw={700} size="sm">{calculateDayTotal(day).toFixed(1)}</Text>
                </Table.Td>
              ))}

              <Table.Td style={{ textAlign: 'center' }}>
                <Text fw={700} size="sm">{weekTotal.toFixed(1)}</Text>
              </Table.Td>

              <Table.Td></Table.Td>
            </Table.Tr>
          </Table.Tfoot>

        </Table>
      </ScrollArea>

      {/* 4. Footer Summary Cards (Fixed Height: flex-shrink: 0 behavior) */}
      <Grid gutter="md" style={{ flexShrink: 0 }}>
        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <Card withBorder radius="md" padding="md" shadow="sm">
            <Text fw={700} size="xs">Total Weekly Hours</Text>
            <Title order={2} fw={800} mt={5}>{weekTotal.toFixed(1)}</Title>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <Card withBorder radius="md" padding="md" shadow="sm">
            <Text fw={700} size="xs">Billable Hours</Text>
            <Title order={2} fw={800} mt={5}>{totalBillable.toFixed(1)}</Title>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <Card withBorder radius="md" padding="md" shadow="sm">
            <Text fw={700} size="xs">Non-billable Hours</Text>
            <Title order={2} fw={800} mt={5}>{totalNonBillable.toFixed(1)}</Title>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <Card withBorder radius="md" padding="md" shadow="sm">
            <Text fw={700} size="xs">Variance vs Last Week</Text>
            <Title order={2} fw={800} mt={5}>+1.2</Title>
          </Card>
        </Grid.Col>
      </Grid>

      {/* Notes Drawer */}
      <Drawer
        opened={notesDrawer.open}
        onClose={closeNotesDrawer}
        position="right"
        title={<Title order={4}>Add Comment</Title>}
        size={420}
      >
        <Stack h="100%">
          {notesDrawer.client && notesDrawer.day !== null && (
            <Text c="dimmed" size="sm" fw={500}>
              <Text span fw={700} c="blue">{notesDrawer.client}</Text> / <Text span fw={700} c="blue">{notesDrawer.service}</Text> / {dayLabels[notesDrawer.day]}
            </Text>
          )}

          <Textarea
            value={currentNote}
            onChange={(e) => setCurrentNote(e.target.value)}
            placeholder="Enter comments for this day/task..."
            minRows={10}
            autosize
            style={{ flexGrow: 1 }}
          />

          <Group justify="flex-end" mt="auto">
            <Button
              variant="outline"
              color="gray"
              onClick={closeNotesDrawer}
              leftSection={<IconX size={16} />}
            >
              Cancel
            </Button>
            <Button
              onClick={saveNote}
              variant="filled"
              color="blue"
              leftSection={<IconDeviceFloppy size={16} />}
              disabled={currentNote.trim().length === 0}
            >
              Save Comment
            </Button>
          </Group>
        </Stack>
      </Drawer>
    </Stack>
  );
}

// export default Timesheet; // This is the default export