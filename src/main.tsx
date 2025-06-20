// main.tsx - Updated with email verification route
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route, Outlet, } from 'react-router-dom';
import Login from './pages/login.tsx';
import SignUp from './pages/signUp.tsx';
import EmailVerification from './pages/EmailVerification.tsx'; // Add this import
import ForgotPassword from './pages/ForgotPassword.tsx';
import ResetPassword from './pages/ResetPassword.tsx';
import Dashboard from './components/dashboard.tsx';
import Transactions from './pages/Transactions.tsx';
import Budgets from './pages/Budgets.tsx';
import Reports from './pages/Reports.tsx';
import Goals from './pages/Goals.tsx';
import ProtectedRoute from './components/auth/protectedRoute.tsx'; 
import SideBar from './components/sideBar.tsx';
import Settings from './pages/Settings.tsx';
import TopNav from './components/TopNav.tsx';
import { ThemeProvider } from './contexts/ThemeContext.tsx';

// Layout with sidebar for protected pages
function AppLayout() {
  return (
    <div className="flex">
      <SideBar />
      <main className="flex-1 min-h-screen bg-gray-50 dark:bg-gray-900">
        <TopNav />
        <div className="pt-14 md:pt-0"> {/* Add padding for top nav on mobile */}
          <Outlet />
        </div>
      </main>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          
          {/* Add email verification route */}
          <Route path="/verify-email" element={<EmailVerification />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/budgets" element={<Budgets />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Route>
      </Routes>
    </Router>
    </ThemeProvider>
  </StrictMode>
);