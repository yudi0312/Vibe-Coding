import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar'; 
import './Dashboard.css';

// --- IMPORT ICON LUCILE ---
import { Check, Edit, Trash2, Zap, AlertTriangle, Coffee, ListPlus, RotateCcw } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [tugas, setTugas] = useState([]);
  const [keyword, setKeyword] = useState('');
  // const [darkMode, setDarkMode] = useState(false); <-- Dihapus

  // --- LOAD DATA ---
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) { navigate('/login'); return; }
    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    getTugas(parsedUser.token);
  }, [navigate]);

  const getTugas = async (token) => {
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get('http://localhost:5000/api/tugas', config);
      setTugas(response.data);
    } catch (error) { console.log(error); }
  };

  const deleteTask = async (id) => {
    if(!window.confirm('Hapus tugas ini?')) return;
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.delete(`http://localhost:5000/api/tugas/${id}`, config);
      setTugas(tugas.filter((t) => t._id !== id));
    } catch (error) { alert('Gagal hapus'); }
  };

  const toggleSelesai = async (item) => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const response = await axios.put(`http://localhost:5000/api/tugas/${item._id}`, { sudahSelesai: !item.sudahSelesai }, config);
      setTugas(tugas.map((t) => (t._id === item._id ? response.data : t)));
    } catch (error) { alert('Gagal update status'); }
  };

  const onLogout = () => { localStorage.removeItem('user'); navigate('/login'); };

  // --- HELPER ---
  const getFileUrl = (filePath) => {
    if (!filePath) return null;
    const cleanPath = filePath.replace(/\\/g, '/');
    return `http://localhost:5000/${cleanPath}`;
  };

  const hitungSisaHari = (deadlineString, sudahSelesai) => {
    if (sudahSelesai) return { text: "SELESAI", cssClass: "status-done" };
    const diffDays = Math.ceil((new Date(deadlineString) - new Date()) / (1000 * 60 * 60 * 24));
    if (diffDays < 0) return { text: `TELAT ${Math.abs(diffDays)} HARI`, cssClass: "status-late" };
    if (diffDays === 0) return { text: "HARI INI!", cssClass: "status-today" };
    return { text: `Sisa ${diffDays} Hari`, cssClass: "status-ok" };
  };

  const getWarnaPrioritas = (p) => {
    // Menggunakan nama ikon Lucide untuk label
    if (p === 'Tinggi') return { label: 'PENTING', cssClass: 'prio-high', icon: <AlertTriangle size={14} /> };
    if (p === 'Sedang') return { label: 'SEDANG', cssClass: 'prio-medium', icon: <Zap size={14} /> };
    return { label: 'SANTAI', cssClass: 'prio-low', icon: <Coffee size={14} /> };
  };

  const filteredTugas = tugas.filter(t => t.judul.toLowerCase().includes(keyword.toLowerCase()) || (t.mataKuliah && t.mataKuliah.toLowerCase().includes(keyword.toLowerCase())));
  const totalTugas = tugas.length;
  const tugasSelesai = tugas.filter(t => t.sudahSelesai).length;
  const persentase = totalTugas === 0 ? 0 : Math.round((tugasSelesai / totalTugas) * 100);

  if (!user) return <div style={{padding:'40px', textAlign:'center'}}>Loading...</div>;

  return (
    <div className={`dashboard-container`}>
      
      {/* --- NAVBAR --- */}
      <Navbar 
        user={user} 
        onLogout={onLogout} 
      />

      <div className="dashboard-content">
        
        {/* HEADER PROGRESS & SEARCH */}
        <div className="dashboard-grid" style={{ marginBottom: '30px' }}>
            
            {/* Kolom Kiri: Progress */}
            <div className="progress-card">
                <div className="progress-header">
                    <h3 className="progress-title">Progress Tugas</h3>
                    <span className="progress-percent">{persentase}%</span>
                </div>
                <div className="progress-track">
                    <div className="progress-fill" style={{ width: `${persentase}%` }}></div>
                </div>
            </div>
            
            {/* Kolom Kanan: Search & Add Button */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input 
                  type="text" 
                  placeholder="Cari tugas..." 
                  value={keyword} 
                  onChange={(e) => setKeyword(e.target.value)} 
                  className="search-input"
                />
                
                <button onClick={() => navigate('/tambah-tugas')} className="btn-add-task">
                    <span className="plus-icon"><ListPlus size={20} /></span> Tambah Tugas Baru
                </button>
            </div>
        </div>

        {/* LIST TUGAS */}
        <h3 className="section-title">Daftar Tugas ({filteredTugas.length})</h3>
        
        {filteredTugas.length === 0 && (
           <div className="empty-state">
              <p>Tidak ada tugas ditemukan.</p>
           </div>
        )}

        <div className="dashboard-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
          {filteredTugas.map((item) => {
            const statusInfo = hitungSisaHari(item.deadline, item.sudahSelesai);
            const prioInfo = getWarnaPrioritas(item.prioritas);
            
            // --- LOGIKA COVER TEXT YANG AKAN DITAMPILKAN DI COVER SECTION ---
            // 1. Cek apakah mata kuliah adalah 'Umum' (nilai default dari backend)
            const isDefaultMatkul = item.mataKuliah && item.mataKuliah.toLowerCase() === 'umum';
            
            // 2. Tentukan teks yang akan ditampilkan di cover
            const coverDisplay = isDefaultMatkul 
                ? (item.judul || 'TUGAS BARU') 
                : (item.mataKuliah || item.judul || 'TUGAS BARU');
            // --- END LOGIKA COVER TEXT ---

            return (
              <div key={item._id} className={`task-card ${item.sudahSelesai ? 'completed' : ''}`}>
                
                {/* START: Cover Image Section (Sekarang menjadi TEXT COVER) */}
                <div className="task-cover text-cover" style={{position: 'relative'}}>
                  {/* Langsung tampilkan teks di dalam div cover */}

                </div>
                {/* END: Cover Image Section */}

                <div className="task-body">
                  {/* Task Header: Mata Kuliah, Priority Badge, dan Judul */}
                  <div className="task-detail-header">
                    <span className="task-tag">{item.mataKuliah}</span>
                    
                    {/* START: PRIORITY BADGE DI BODY */}
                    <span className={`priority-badge ${prioInfo.cssClass}`} style={{marginBottom: '5px'}}>
                      {prioInfo.icon} {prioInfo.label}
                    </span>
                    {/* END: PRIORITY BADGE DI BODY */}

                    <h3 className="task-title">{item.judul}</h3>
                  </div>

                  {/* Deskripsi */}
                  <p className="task-desc">{item.deskripsi}</p>

                  {/* START: Lampiran Section */}
                  {item.lampiran && (
                      <div className="task-attachment-display">
                           <span style={{fontSize:'14px', color: 'var(--text-soft)', fontWeight: 'bold'}}>Lampiran:</span>
                           
                           {item.lampiran.match(/\.(jpeg|jpg|png|gif)$/i) ? (
                                <img 
                                    src={getFileUrl(item.lampiran)} 
                                    alt="Lampiran Tugas" 
                                    style={{maxHeight: '100px', maxWidth: '100%', borderRadius: '4px', objectFit: 'cover', marginTop: '5px', border: '1px solid var(--border-color)'}}
                                />
                            ) : (
                                <a href={getFileUrl(item.lampiran)} target="_blank" rel="noopener noreferrer" className="attachment-link" style={{marginTop: '5px'}}>
                                    <span style={{marginRight:'5px'}}>📄</span> Lihat Dokumen
                                </a>
                            )}
                      </div>
                  )}
                  {/* END: Lampiran Section */}

                  <div className="task-footer">
                    <span className={`status-badge ${statusInfo.cssClass}`}>{statusInfo.text}</span>
                    
                    <div className="action-buttons">
                      <button onClick={() => toggleSelesai(item)} className="btn-icon" title="Tandai Selesai">
                        {item.sudahSelesai ? <RotateCcw size={20} /> : <Check size={20} />}
                      </button>
                      <button onClick={() => navigate(`/edit-tugas/${item._id}`)} className="btn-icon" title="Edit">
                        <Edit size={20} />
                      </button>
                      <button onClick={() => deleteTask(item._id)} className="btn-icon" style={{color: 'var(--danger)'}} title="Hapus">
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div> {/* End task-body */}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;