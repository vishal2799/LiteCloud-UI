import '@mantine/core/styles.css';
import '@mantine/charts/styles.css';
import '@mantine/dates/styles.css';

import EmployeeDashboard from './screens/EmployeeDashboard/EmployeeDashboard';
import { AppThemeProvider } from './context/AppThemeProvider';
import Layout from './components/Layout';
import Timesheet from './screens/WeeklyTimesheet/WeeklyTimesheet';
import { Button, Group } from '@mantine/core';
import { NavLink } from 'react-router';

export default function App() {

  return (
    <Group>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/employee-dashboard">Employee Dashboard</NavLink>
      <NavLink to="/add-hours">Add Hours</NavLink>
    </Group>
  )
}