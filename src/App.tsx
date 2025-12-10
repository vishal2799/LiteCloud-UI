import {  Group } from '@mantine/core';
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