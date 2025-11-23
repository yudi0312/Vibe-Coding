import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar'; // Import Navbar
import { Zap, AlertTriangle, Coffee } from 'lucide-react'; // Import ikon Lucide

const TaskFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Ambil ID jika mode edit
  const isEditMode = !!id; // True jika ada ID
  const [user, setUser] = useState(null);

  // State Form
  const [judul, setJudul] = useState('');
  const [mataKuliah, setMataKuliah] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [tglDiberikan, setTglDiberikan] = useState('');
  const [tglDeadline, setTglDeadline] = useState('');
  const [prioritas, setPrioritas] = useState('Sedang');
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [existingFile, setExistingFile] = useState(null); 

  // --- TEMA (Sama dengan Dashboard & Auth) ---
  const theme = {
    bg: '#f8fafc',
    cardBg: '#ffffff',
    text: '#1e293b',
    textSoft: '#64748b',
    inputBg: '#ffffff',
    border: '#e2e8f0',
    primary: '#172a45', // Navy
    accent: '#ffc107',  // Gold
    danger: '#ef4444',
  };

  // --- Ikon Prioritas (Sama dengan Dashboard) ---
  const getPrioIcon = (p) => {
    if (p === 'Tinggi') return <AlertTriangle size={16} style={{color: theme.danger}} />;
    if (p === 'Sedang') return <Zap size={16} style={{color: theme.accent}} />;
    return <Coffee size={16} style={{color: '#10b981'}} />; // Hijau
  };


  // --- 1. LOAD USER & DATA (JIKA EDIT) ---
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) { navigate('/login'); return; }
    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);

    if (isEditMode) {
      fetchTaskDetail(parsedUser.token, id);
    }
  }, [navigate, id, isEditMode]);

  const fetchTaskDetail = async (token, taskId) => {
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get('http://localhost:5000/api/tugas', config);
      const task = response.data.find(t => t._id === taskId);
      
      if (task) {
        setJudul(task.judul);
        setMataKuliah(task.mataKuliah);
        setDeskripsi(task.deskripsi);
        // Pastikan format tanggal sesuai input date (YYYY-MM-DD)
        setTglDiberikan(task.tanggalDiberikan ? task.tanggalDiberikan.split('T')[0] : '');
        setTglDeadline(task.deadline ? task.deadline.split('T')[0] : '');
        setPrioritas(task.prioritas);
        setExistingFile(task.lampiran);
      }
    } catch (error) {
      alert('Gagal mengambil data tugas');
    }
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    if (selected && selected.type.startsWith('image/')) {
      setFilePreview(URL.createObjectURL(selected));
    } else {
      setFilePreview(null);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('judul', judul);
    formData.append('mataKuliah', mataKuliah);
    formData.append('deskripsi', deskripsi);
    formData.append('tanggalDiberikan', tglDiberikan);
    formData.append('deadline', tglDeadline);
    formData.append('prioritas', prioritas);
    if (file) formData.append('fileLampiran', file);

    try {
      const config = { 
        headers: { 
          Authorization: `Bearer ${user.token}`, 
          'Content-Type': 'multipart/form-data' 
        } 
      };

      if (isEditMode) {
        // UPDATE (PUT) - Hanya data teks. Upload file saat PUT harus ditangani backend secara terpisah.
        await axios.put(`http://localhost:5000/api/tugas/${id}`, {
          judul, 
          mataKuliah, 
          deskripsi, 
          tanggalDiberikan: tglDiberikan, 
          deadline: tglDeadline, 
          prioritas, 
          sudahSelesai: false 
        }, { headers: { Authorization: `Bearer ${user.token}` } }); 
        
        alert("✅ Tugas berhasil diperbarui!");
      } else {
        // CREATE (POST)
        await axios.post('http://localhost:5000/api/tugas', formData, config);
        alert("✅ Tugas berhasil ditambahkan!");
      }
      
      navigate('/dashboard'); 
    } catch (error) {
      console.error(error);
      alert('Gagal menyimpan tugas.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: theme.bg, fontFamily: "'Poppins', sans-serif" }}>
      {/* Navbar di Halaman Form */}
      <Navbar /> 

      <div style={{ maxWidth: '600px', margin: '0 auto', background: theme.cardBg, padding: '30px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: `1px solid ${theme.border}`, marginTop: '100px' }}>
        
        <h2 style={{ color: theme.primary, marginTop: 0, borderBottom: `2px solid ${theme.accent}`, paddingBottom: '10px', display: 'inline-block', fontFamily: "'Poppins', sans-serif" }}>
          {isEditMode ? '✏️ Edit Tugas' : '➕ Tambah Tugas Baru'}
        </h2>

        <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
          
          <div style={{ display: 'flex', gap: '15px' }}>
            <div style={{ flex: 1 }}>
              <label style={{display:'block', marginBottom:'5px', fontSize:'14px', color: theme.textSoft}}>Mata Kuliah</label>
              <input type="text" value={mataKuliah} onChange={(e) => setMataKuliah(e.target.value)} required 
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: `1px solid ${theme.border}`, outline: 'none', boxSizing:'border-box', fontFamily: 'inherit' }} />
            </div>
            <div style={{ width: '120px' }}>
               <label style={{display:'block', marginBottom:'5px', fontSize:'14px', color: theme.textSoft}}>Prioritas</label>
               <select value={prioritas} onChange={(e) => setPrioritas(e.target.value)} 
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: `1px solid ${theme.border}`, outline: 'none', fontFamily: 'inherit' }}>
                <option value="Tinggi">🚨 Tinggi</option>
                <option value="Sedang">⚡ Sedang</option>
                <option value="Rendah">☕ Rendah</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{display:'block', marginBottom:'5px', fontSize:'14px', color: theme.textSoft}}>Judul Tugas</label>
            <input type="text" value={judul} onChange={(e) => setJudul(e.target.value)} required 
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: `1px solid ${theme.border}`, outline: 'none', boxSizing:'border-box', fontFamily: 'inherit' }} />
          </div>

          <div>
            <label style={{display:'block', marginBottom:'5px', fontSize:'14px', color: theme.textSoft}}>Deskripsi</label>
            <textarea rows="4" value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} 
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: `1px solid ${theme.border}`, outline: 'none', boxSizing:'border-box', fontFamily: 'inherit' }} />
          </div>

          <div style={{ display: 'flex', gap: '15px' }}>
             <div style={{ flex: 1 }}>
              <label style={{display:'block', marginBottom:'5px', fontSize:'14px', color: theme.textSoft}}>Tanggal Diberikan</label>
              <input type="date" value={tglDiberikan} onChange={(e) => setTglDiberikan(e.target.value)} required 
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: `1px solid ${theme.border}`, outline: 'none', boxSizing:'border-box', fontFamily: 'inherit' }} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{display:'block', marginBottom:'5px', fontSize:'14px', color: theme.textSoft}}>Deadline</label>
              <input type="date" value={tglDeadline} onChange={(e) => setTglDeadline(e.target.value)} required 
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: `1px solid ${theme.border}`, outline: 'none', boxSizing:'border-box', fontFamily: 'inherit' }} />
            </div>
          </div>

          {/* Upload File */}
          <div style={{ border: `2px dashed ${theme.border}`, padding: '20px', textAlign: 'center', borderRadius: '8px', background: theme.bg }}>
            <label style={{display:'block', marginBottom:'10px', fontSize:'14px', fontWeight:'bold', color: theme.primary}}>
              {isEditMode && existingFile ? 'Ganti File Lampiran (Opsional)' : 'Upload Lampiran'}
            </label>
            <input id="fileInput" type="file" onChange={handleFileChange} style={{fontFamily: 'inherit'}} />
            
            {filePreview && (
                <div style={{ marginTop: '10px' }}>
                    <p style={{fontSize: '12px', color: theme.textSoft, marginBottom: '5px'}}>Preview Baru:</p>
                    <img src={filePreview} alt="Preview" style={{ height: '80px', borderRadius: '6px', border: `2px solid ${theme.accent}` }} />
                </div>
            )}
            
            {isEditMode && existingFile && !filePreview && (
              <p style={{fontSize:'12px', color: theme.textSoft, marginTop:'5px'}}>File saat ini terlampir: {existingFile.split('/').pop()}</p>
            )}
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button type="button" onClick={() => navigate('/dashboard')} 
              style={{ flex: 1, padding: '14px', borderRadius: '8px', border: `1px solid ${theme.border}`, background: 'transparent', cursor: 'pointer', fontWeight:'600', fontFamily: 'inherit' }}>
              Batal
            </button>
            <button type="submit" 
              style={{ flex: 2, padding: '14px', borderRadius: '8px', border: 'none', background: theme.primary, color: '#fff', cursor: 'pointer', fontWeight:'bold', fontFamily: 'inherit' }}>
              {isEditMode ? 'Simpan Perubahan' : 'Buat Tugas'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default TaskFormPage;