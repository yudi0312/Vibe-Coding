import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';


const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', formData);
      
      if (response.data) {
        alert('✅ Login Berhasil!');
        // Simpan data user/token
        localStorage.setItem('user', JSON.stringify(response.data));
        navigate('/dashboard');
      }
    } catch (error) {
      alert('❌ Gagal Login: ' + (error.response?.data?.message || 'Server Error'));
    }
  };

  const theme = {
    primary: '#172a45', 
    accent: '#ffc107',  
    bg: '#f8fafc',      
    text: '#1e293b',    
    textSoft: '#64748b',
    white: '#ffffff'
  };

  const styles = {
    container: {
      display: 'flex',
      minHeight: '100vh',
      width: '100%',
      backgroundColor: theme.bg,
      fontFamily: "'Poppins', sans-serif",
    },
    leftSide: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '40px 60px',
      backgroundColor: theme.white,
    },
    rightSide: {
      flex: 1,
      backgroundColor: '#e0e7ff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden'
    },
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
          
          <div className="auth-header" style={{ marginTop: '100px' }}> {/* Atur jarak dari navbar fixed */}
            <h1 style={styles.title}>Welcome Back!</h1>
            <p className="sub-text">Continue your college assignment progress today.</p>
          </div>

          <form onSubmit={onSubmit}>
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

            <button type="submit" className="btn-primary" style={styles.button}>Login</button>
          </form>

          {/* TOMBOL GANTI MODE */}
          <p className="toggle-text">
            Don't have an account? 
            <span className="toggle-link" onClick={() => navigate('/register')}> Register Now</span>
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

export default Login;