const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Cek header Authorization
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Ambil token dari header
      token = req.headers.authorization.split(' ')[1];

      // Verifikasi token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Ambil data user dari token (tanpa password)
      req.user = await User.findById(decoded.id).select('-password');

      next(); // Lanjut ke proses berikutnya
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Tidak ada akses, token gagal');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Tidak ada akses, token tidak ditemukan');
  }
});

module.exports = { protect };