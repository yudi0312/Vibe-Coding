import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';      // <-- Diperbarui
import Register from './pages/Register';  // <-- Diperbarui
import Dashboard from './components/Dashboard';
import TaskFormPage from './pages/TaskFormPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Mengarahkan root ke /login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Halaman 1: Login */}
        <Route path="/login" element={<Login />} />
        
        {/* Halaman 1: Register */}
        <Route path="/register" element={<Register />} />
        
        {/* Halaman 2: Dashboard (List Data) */}
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Halaman 3: Form Tambah/Edit (Detail Data) */}
        <Route path="/tambah-tugas" element={<TaskFormPage />} />
        <Route path="/edit-tugas/:id" element={<TaskFormPage />} />
      </Routes>
    </Router>
  );
}

export default App;