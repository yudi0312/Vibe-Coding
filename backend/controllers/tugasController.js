const asyncHandler = require('express-async-handler');
const Tugas = require('../models/tugasModel');

// @desc    Ambil semua tugas user
// @route   GET /api/tugas
const getTugas = asyncHandler(async (req, res) => {
  const tugas = await Tugas.find({ user: req.user.id });
  res.status(200).json(tugas);
});

// @desc    Buat tugas baru
// @route   POST /api/tugas
// @desc    Buat tugas baru
const createTugas = asyncHandler(async (req, res) => {
  if (!req.body.judul) {
    res.status(400);
    throw new Error('Tolong isi judul tugas');
  }

  let fileData = null;
  if (req.file) {
    fileData = req.file.path;
  }

  const tugas = await Tugas.create({
    judul: req.body.judul,
    deskripsi: req.body.deskripsi,
    tanggalDiberikan: req.body.tanggalDiberikan,
    deadline: req.body.deadline,
    prioritas: req.body.prioritas || 'Sedang',
    // --- AMBIL MATA KULIAH ---
    mataKuliah: req.body.mataKuliah || 'Umum',
    // -------------------------
    user: req.user.id,
    lampiran: fileData,
  });

  res.status(200).json(tugas);
});

// @desc    Update tugas
// @route   PUT /api/tugas/:id
const updateTugas = asyncHandler(async (req, res) => {
  const tugas = await Tugas.findById(req.params.id);

  if (!tugas) {
    res.status(404);
    throw new Error('Tugas tidak ditemukan');
  }

  if (tugas.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User tidak berwenang');
  }

  // Update data apapun yang dikirim (Judul, Deskripsi, atau Status)
  const updatedTugas = await Tugas.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedTugas);
});

// @desc    Hapus tugas
// @route   DELETE /api/tugas/:id
const deleteTugas = asyncHandler(async (req, res) => {
  const tugas = await Tugas.findById(req.params.id);

  if (!tugas) {
    res.status(404);
    throw new Error('Tugas tidak ditemukan');
  }

  // Pastikan yang hapus adalah pemilik tugas
  if (tugas.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User tidak berwenang');
  }

  await tugas.deleteOne();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getTugas,
  createTugas,
  updateTugas,
  deleteTugas,
};