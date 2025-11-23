import React from 'react';
import './Dashboard.css'; // Digunakan untuk styling kelas 'dashboard-nav', 'nav-title', dll.

const Navbar = ({ user, onLogout, darkMode, setDarkMode }) => {
  
  // Warna Primer AuthPage (Purple-Blue, dari Auth.css)
  const AUTH_PRIMARY_COLOR = '#172a45'; 

  // --- STYLE KHUSUS TULISAN "ITUGAS" ---
  const ITugasTitle = (isAuthPage) => (
      <a href="/" 
         className={isAuthPage ? "logo" : "nav-title"} 
         style={{
           fontSize: '28px', 
           fontWeight: '700', 
           fontFamily: "'Poppins', sans-serif",
           textDecoration: 'none',
           
           // Warna dinamis: Navy Blue untuk Dashboard, Purple Blue untuk AuthPage
           color: isAuthPage ? AUTH_PRIMARY_COLOR : 'var(--white)' 
         }}>
         ITugas
      </a>
  );

  // --- KOMPONEN TOGGLE SWITCH BARU ---
  const ThemeToggleSwitch = setDarkMode && (
    <div className="theme-switch">
      <input 
        type="checkbox" 
        id="theme-toggle" 
        checked={darkMode} 
        onChange={() => setDarkMode(!darkMode)}
      />
      {/* Label berfungsi sebagai body dari switch */}
      <label htmlFor="theme-toggle"></label>
    </div>
  );


  // --- KONFIGURASI STYLE KHUSUS AUTHPAGE (Saat user belum login) ---
  if (!user) {
    return (
      <nav className="navbar" style={{position: 'fixed', top: 0, width: '100%', padding: '20px 50px', zIndex: 100, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}> 
        {ITugasTitle(true)} {/* Panggil fungsi Logo untuk AuthPage */}
        
        {ThemeToggleSwitch} {/* <-- Panggil Switch di AuthPage */}

        {/* Style lokal agar switch terlihat di AuthPage */}
        <style>{`
          .navbar { background: var(--bg-card) !important; }
          .dark-mode .navbar { background: var(--bg-card) !important; }
        `}</style>
      </nav>
    );
  }


  // --- KONFIGURASI STYLE DASHBOARD ---
  return (
    <nav className="dashboard-nav" style={{ position: 'sticky', top: 0, zIndex: 100, marginBottom: 0 }}>
      {/* BAGIAN KIRI: LOGO (Tanpa Gambar) */}
      <div className="nav-brand">
        <h2 className="nav-title" style={{ fontFamily: "'Poppins', sans-serif" }}>ITugas</h2> 
      </div>

      {/* BAGIAN KANAN: MENU (Dashboard Mode) */}
      <div className="nav-actions">
        <span className="nav-user">Hai, {user.nama}</span>
        
        {ThemeToggleSwitch} {/* <-- Panggil Switch di Dashboard */}

        <button onClick={onLogout} className="btn-logout">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;