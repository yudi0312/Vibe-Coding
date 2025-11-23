const mongoose = require('mongoose');

const tugasSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  judul: { type: String, required: true },
  deskripsi: { type: String },
  tanggalDiberikan: { type: String, required: true },
  deadline: { type: String, required: true },
  prioritas: { type: String, enum: ['Tinggi', 'Sedang', 'Rendah'], default: 'Sedang' },
  lampiran: { type: String, default: null },
  sudahSelesai: { type: Boolean, default: false },

  // --- INOVASI BARU: MATA KULIAH ---
  mataKuliah: { 
    type: String, 
    required: [true, 'Isi nama mata kuliah'],
    default: 'Umum' 
  }
  // ---------------------------------
}, {
  timestamps: true,
});

module.exports = mongoose.model('Tugas', tugasSchema);