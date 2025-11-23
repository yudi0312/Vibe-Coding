const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  nama: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Email tidak boleh kembar
  },
  password: {
    type: String,
    required: true,
  },
}, {
  timestamps: true, // Otomatis catat waktu dibuat
});

module.exports = mongoose.model('User', userSchema);