export interface DayHours {
  mon: number;
  tue: number;
  wed: number;
  thu: number;
  fri: number;
  sat: number;
  sun: number;
}

export interface TimesheetRow {
  id: string;
  client: string;
  department: string;
  service: string;
  period: string;
  description: string;
  hours: DayHours;
}

export interface NotesDrawerState {
  open: boolean;
  row?: string;
  day?: keyof DayHours;
  client?: string;
  service?: string;
}

export const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const;
export const dayLabels: Record<keyof DayHours, string> = { 
  mon: 'Monday', 
  tue: 'Tuesday', 
  wed: 'Wednesday', 
  thu: 'Thursday', 
  fri: 'Friday', 
  sat: 'Saturday', 
  sun: 'Sunday' 
};

// Mock data for Select components
export const CLIENT_OPTIONS = [
    { value: 'Acme Corp', label: 'Acme Corp' },
    { value: 'Beta LLP', label: 'Beta LLP' },
    { value: 'Gamma Pvt Ltd', label: 'Gamma Pvt Ltd' },
];

export const DEPARTMENT_OPTIONS = [
    { value: 'Sales', label: 'Sales' },
    { value: 'Development', label: 'Development' },
    { value: 'Marketing', label: 'Marketing' },
];

export const SERVICE_OPTIONS = [
    { value: 'GST Filing', label: 'GST Filing' },
    { value: 'Audit Work', label: 'Audit Work' },
    { value: 'Consulting', label: 'Consulting' },
    { value: 'Tax Audit', label: 'Tax Audit' },
    { value: 'ITR Preparation', label: 'ITR Preparation' },
];

export const PERIOD_OPTIONS = [
    { value: 'Weekly', label: 'Weekly' },
    { value: 'Monthly', label: 'Monthly' },
    { value: 'Quarterly', label: 'Quarterly' },
];