import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import '../Auth.css'; // Import CSS Global

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ nama: '', email: '', password: '' });
  const { nama, email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:5000/api/users/register', formData);
      
      if (response.data) {
        alert('✅ Registrasi Berhasil! Silakan Login.');
        // Tidak perlu simpan token, langsung arahkan ke Login
        navigate('/login');
      }
    } catch (error) {
      alert('❌ Gagal Register: ' + (error.response?.data?.message || 'Server Error'));
    }
  };

  // --- TEMA WARNA (Sama dengan Login) ---
  const theme = {
    primary: '#172a45', 
    accent: '#ffc107',  
    bg: '#f8fafc',      
    text: '#1e293b',    
    textSoft: '#64748b',
    white: '#ffffff'
  };

  const styles = {
    // Styling yang sama dengan Login.js
    title: {
      fontSize: '32px',
      fontWeight: '700',
      color: theme.primary,
      marginBottom: '10px'
    },
    button: {
      width: '100%',
      padding: '16px',
      backgroundColor: theme.primary,
      color: theme.white,
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      marginTop: '10px',
      transition: '0.3s'
    },
  };

  return (
    <div className="page-wrapper" style={{ fontFamily: "'Poppins', sans-serif" }}>
      
      {/* --- NAVBAR --- */}
      <Navbar />

      {/* --- KONTEN UTAMA --- */}
      <div className="auth-container">
        
        {/* BAGIAN KIRI (FORM) */}
        <div className="auth-left">
          <div className="auth-header" style={{ marginTop: '100px' }}>
            <h1 style={styles.title}>Create Account</h1>
            <p className="sub-text">Join and organize your tasks more efficiently.</p>
          </div>

          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input 
                type="text" 
                name="nama" 
                className="form-input" 
                placeholder="Full Name" 
                value={nama} 
                onChange={onChange} 
                required
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input 
                type="email" 
                name="email" 
                className="form-input" 
                placeholder="name@gmail.com" 
                value={email} 
                onChange={onChange} 
                required 
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input 
                type="password" 
                name="password" 
                className="form-input" 
                placeholder="••••••••••••" 
                value={password} 
                onChange={onChange} 
                required 
              />
            </div>

            <button type="submit" className="btn-primary" style={styles.button}>Register Now</button>
          </form>

          {/* TOMBOL GANTI MODE */}
          <p className="toggle-text">
            Already have an account? 
            <span className="toggle-link" onClick={() => navigate('/login')}>Login here</span>
          </p>
        </div>

        {/* BAGIAN KANAN (GAMBAR) */}
        <div className="auth-right">
          <img src="/tugas.png" alt="Ilustrasi Tugas" className="hero-image" />
        </div>
      </div>
    </div>
  );
};

export default Register;