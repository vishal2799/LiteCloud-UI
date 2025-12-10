import React from 'react';

// ===========================
// TYPES & INTERFACES
// ===========================
export interface TimeData {
    label: string;
    value: number;
    max: number;
    unit: 'hrs' | 'day';
    style?: React.CSSProperties;
}

/** New shape for stacked data (useful for internal calculations or charts) */
export type StackedTimeData = {
  label: string;
  billable: number;
  nonBillable: number;
  max: number;
  unit?: string;
};

export interface HistoryEntry {
    week: string;
    submitted: string;
    hours: string;
    status: string;
    statusColor: string;
    statusColor2: string; // Lighter shade for background
}

export interface WeeklySummary {
    total: string;
    billable: string;
    nonBillable: string;
    days: string[];
    hours: string[];
}

// ===========================
// DATA CONSTANTS
// ===========================

export const WEEKLY_DATA: TimeData[] = [
    { label: 'W1', value: 40.0, max: 40, unit: 'hrs' },
    { label: 'W2', value: 20.0, max: 40, unit: 'hrs' },
    { label: 'W3', value: 16.0, max: 40, unit: 'hrs' },
    { label: 'W4', value: 4.0, max: 40, unit: 'hrs' },
];

export const MONTHLY_DATA: TimeData[] = [
    { label: 'Jan', value: 10, max: 100, unit: 'hrs' },
    { label: 'Feb', value: 85, max: 100, unit: 'hrs' },
    { label: 'Mar', value: 75, max: 100, unit: 'hrs' },
    { label: 'Apr', value: 20, max: 100, unit: 'hrs' },
    { label: 'May', value: 70, max: 100, unit: 'hrs' },
    { label: 'Jun', value: 65, max: 100, unit: 'hrs' },
    { label: 'Jul', value: 60, max: 100, unit: 'hrs' },
    { label: 'Aug', value: 40, max: 100, unit: 'hrs' },
    { label: 'Sep', value: 35, max: 100, unit: 'hrs' },
    { label: 'Oct', value: 50, max: 100, unit: 'hrs' },
    { label: 'Nov', value: 45, max: 100, unit: 'hrs' },
    { label: 'Dec', value: 55, max: 100, unit: 'hrs' },
];

export const CLIENT_DATA: TimeData[] = [
    { label: 'Client X', value: 80, max: 100, unit: 'hrs' },
    { label: 'Client Z', value: 60, max: 100, unit: 'hrs' },
    { label: 'Client Y', value: 50, max: 100, unit: 'hrs' },
    { label: 'Client Alpha', value: 30, max: 100, unit: 'hrs' },
    { label: 'Client Beta', value: 25, max: 100, unit: 'hrs' },
    { label: 'Client C', value: 20, max: 100, unit: 'hrs', style: { opacity: 0.5 } },
    { label: 'Client D', value: 15, max: 100, unit: 'hrs', style: { opacity: 0.5 } },
];

export const SERVICE_DATA: TimeData[] = [
    { label: 'Category A', value: 95, max: 100, unit: 'hrs' },
    { label: 'Category C', value: 95, max: 100, unit: 'hrs' },
    { label: 'Category B', value: 30, max: 100, unit: 'hrs' },
    { label: 'Category D', value: 15, max: 100, unit: 'hrs', style: { opacity: 0.5 } },
    { label: 'Category E', value: 15, max: 100, unit: 'hrs', style: { opacity: 0.5 } },
    { label: 'Category F', value: 15, max: 100, unit: 'hrs', style: { opacity: 0.5 } },
    { label: 'Category G', value: 5, max: 100, unit: 'hrs', style: { opacity: 0.5 } },
];

export const HISTORY_DATA: HistoryEntry[] = [
  {
    week: "June 17 - June 24, 2024", submitted: "June 21, 2024", hours: "40.00",
    status: "Draft", statusColor: "#f97316", statusColor2: "#fdba74"
  },
  {
    week: "June 10 - June 16, 2024", submitted: "June 14, 2024", hours: "40.00",
    status: "Rejected", statusColor: "#ef4444", statusColor2: "#fca5a5"
  },
  {
    week: "June 3 - June 9, 2024", submitted: "June 7, 2024", hours: "40.00",
    status: "Approved", statusColor: "#22c55e", statusColor2: "#86efac"
  },
  {
    week: "May 27 - June 2, 2024", submitted: "May 31, 2024", hours: "40.00",
    status: "Pending for Approval", statusColor: "#f97316", statusColor2: "#fdba74"
  },
  {
    week: "May 20 - May 27, 2024", submitted: "May 24, 2024", hours: "40.00",
    status: "Approved", statusColor: "#22c55e", statusColor2: "#86efac"
  }
];


export const WEEKLY_SUMMARY_DATA: WeeklySummary = {
    total: '40.00',
    billable: '36.00',
    nonBillable: '4.00',
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    hours: ['8.00', '8.00', '8.00', '8.00', '8.00']
};

export const DAILY_DATA_RAW: TimeData[] = [
  { label: "Mon", value: 8.0, max: 8, unit: "hrs" },
  { label: "Tue", value: 4.0, max: 8, unit: "hrs" },
  { label: "Wed", value: 3.2, max: 8, unit: "hrs" },
  { label: "Thu", value: 0.8, max: 8, unit: "hrs" },
  { label: "Fri", value: 8.0, max: 8, unit: "hrs" },
];

// ===========================
// UTILITY FUNCTIONS
// ===========================

/** Utility to split a total value into billable (70%) and non-billable (30%) */
export const exampleSplit = (value: number, ratio = 0.7) => {
  const billable = Math.round((value * ratio) * 10) / 10;
  const nonBillable = Math.round((value - billable) * 10) / 10;
  return { billable, nonBillable };
};

/** Utility: convert value/max to percent (clamped 0..100) */
export const toPercent = (value: number, max: number) => {
  if (!max || max <= 0) return 0;
  const p = (value / max) * 100;
  if (p < 0) return 0;
  if (p > 100) return 100;
  return p;
};

// NOTE: computePercents is no longer needed since Mantine Charts handles stacking logic.