const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const tugasRoutes = require('./routes/tugasRoutes'); // <-- TAMBAHAN 1

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Terhubung: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error Koneksi: ${error.message}`);
    process.exit(1);
  }
};

connectDB();

// ... kode import lainnya
const path = require('path'); // Tambahkan ini di paling atas

// ... (setelah app.use express.json)

// --- IZINKAN AKSES KE FOLDER UPLOADS ---
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ... (baru masuk ke routes)

app.use('/api/users', userRoutes);
app.use('/api/tugas', tugasRoutes); // <-- TAMBAHAN 2

app.get('/', (req, res) => {
  res.send('API TugasKu Siap Digunakan!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di port ${PORT}`);
});