const express = require('express');
const router = express.Router();
const { getTugas, createTugas, updateTugas, deleteTugas } = require('../controllers/tugasController');
const { protect } = require('../middleware/authMiddleware');

// 1. Import Multer & Path
const multer = require('multer');
const path = require('path');

// 2. Konfigurasi Penyimpanan File
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Simpan di folder 'uploads'
  },
  filename: (req, file, cb) => {
    // Format nama file: file-WAKTU-namaasli.jpg (biar tidak bentrok)
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// 3. Inisialisasi Upload
const upload = multer({ storage: storage });

// 4. Pasang 'upload.single' di route POST
// Artinya: Kita menerima 1 file dari input bernama 'fileLampiran'
router.route('/')
  .get(protect, getTugas)
  .post(protect, upload.single('fileLampiran'), createTugas);

router.route('/:id')
  .delete(protect, deleteTugas)
  .put(protect, updateTugas);

module.exports = router;