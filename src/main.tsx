import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login.tsx';
import SignUp from './pages/signUp.tsx';
import Dashboard from './components/dashboard.tsx';
import ProtectedRoute from './components/protectedRoute.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/" element={<App />} />
      </Routes>
    </Router>
  </StrictMode>,
)
