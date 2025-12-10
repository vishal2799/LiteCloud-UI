import '@mantine/core/styles.css';
import '@mantine/charts/styles.css';
import '@mantine/dates/styles.css';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from "react-router";
import EmployeeDashboard from './screens/EmployeeDashboard/EmployeeDashboard.tsx';
import { AppThemeProvider } from './context/AppThemeProvider.tsx';
import Layout from './components/Layout.tsx';
import Timesheet from './screens/WeeklyTimesheet/WeeklyTimesheet.tsx';
import NotFoundPage from './screens/NotFoundPage.tsx';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppThemeProvider>
      <BrowserRouter>
      <Layout>
      <Routes>
      <Route path="/" element={<App />} />
      <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
      <Route path="/add-hours" element={<Timesheet />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
          </Layout>
    </BrowserRouter>
    </AppThemeProvider>
  </StrictMode>,
)
