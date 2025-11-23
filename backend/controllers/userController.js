const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// Fungsi bikin Token (Karcis Masuk)
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @desc    Register User Baru
// @route   POST /api/users/register
const registerUser = asyncHandler(async (req, res) => {
  const { nama, email, password } = req.body;

  // 1. Cek kelengkapan data
  if (!nama || !email || !password) {
    res.status(400);
    throw new Error('Mohon lengkapi semua data');
  }

  // 2. Cek apakah user sudah ada
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User sudah terdaftar');
  }

  // 3. Hash Password (Amankan password)
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // 4. Buat User di Database
  const user = await User.create({
    nama,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      nama: user.nama,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Data user tidak valid');
  }
});

// @desc    Login User
// @route   POST /api/users/login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Cari user berdasarkan email
  const user = await User.findOne({ email });

  // Cek password
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      nama: user.nama,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Email atau password salah');
  }
});

module.exports = { registerUser, loginUser };