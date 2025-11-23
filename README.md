# Vibe Coding

| Nama                          | NRP        |
|-------------------------------|------------|
| Putu Yudi Nandanjaya Wiraguna | 5027241080 |

## ITugas - Student Task Management System

Aplikasi web modern dirancang khusus untuk membantu mahasiswa dalam mengelola, memprioritaskan, dan mengarsipkan tugas kuliah mereka secara efisien.

### Masalah yang Diselesaikan (Problem Statement)

Dalam lingkungan akademik yang intens, mahasiswa sering menghadapi tantangan:
1. **Lupa Dimana Menaruh Tugas**: File tugas, draft, dan materi pendukung tersebar di berbagai platform (Google Drive, WhatsApp, folder lokal, dll.), menyebabkan kesulitan saat ingin mengakses atau merevisi tugas.
2. **Deadline Terlewat**: Ketiadaan platform untuk memprioritaskan tenggat waktu tugas yang berbeda-beda, sehingga tugas dengan prioritas tinggi sering terlewat.
3. **Keterbatasan To-Do List Konvensional**: Aplikasi To-Do List umum tidak mendukung fungsionalitas unggah file dan kategori mata kuliah, yang penting untuk proyek akademik.

### Solusi yang Dibuat (Solution Overview)

ITugas menyediakan solusi sebagai Digital Academic Hub yang berfokus pada:
1. **Pengarsipan Terpusat**: Memungkinkan mahasiswa mengunggah file lampiran (gambar, PDF, dokumen) langsung ke tugas yang relevan, menjadikannya satu-satunya sumber kebenaran data tugas mereka.
2. **Visualisasi Prioritas & Deadline**: Menampilkan status tugas (Sisa Hari / Telat / Hari Ini) dan memvisualisasikan prioritas (Tinggi/Sedang/Rendah) dengan jelas di dashboard.
3. **Manajemen Mata Kuliah**: Tugas dikelompokkan berdasarkan mata kuliah, memudahkan mahasiswa fokus pada beban studi per mata pelajaran.

### Tech Stack & Fitur Utama

Aplikasi ini dibangun menggunakan tumpukan teknologi MERN (MongoDB, Express, React, Node) yang dikombinasikan dengan praktik pengembangan modern.

**Tech Stack**
| **Bagian**        | **Teknologi**                                                                 |
|-------------------|-------------------------------------------------------------------------------|
| **Frontend**      | React.js, Axios, React Router Dom, Lucide Icons                               |
| **Styling**       | Pure CSS (dengan CSS Variables untuk tema konsisten)                          |
| **Backend**       | Node.js (Express.js)                                                          |
| **Database**      | MongoDB (Mongoose ODM)                                                        |
| **Authentication**| JWT (JSON Web Token), Bcrypt Hashing                                          |
| **File Handling** | Multer (unggah file dari Frontend ke Backend)   

**Fitur Fungsional**

- **Authentication**: Pendaftaran, Login, dan Logout menggunakan token JWT yang tersimpan di localStorage.
- **CRUD Tugas**: Pengguna dapat membuat, membaca (list/detail), memperbarui status, dan menghapus tugas.
- **Unggah File/Lampiran**: Mendukung pengunggahan gambar (JPG, PNG) atau dokumen sebagai lampiran tugas. Lampiran ditampilkan di detail kartu tugas.
- **Akses Responsif**: Tampilan yang dioptimalkan untuk perangkat mobile dan desktop.
- **Pemisahan Halaman**: Memenuhi 3 halaman wajib: Login/Register, Dashboard (List Data), dan Halaman Form (Tambah/Edit).

### Cara Menjalankan Project (Setup Instructions)

Pastikan Anda memiliki Node.js, npm, dan Git terinstal di sistem Anda.

**Persiapan Database (MongoDB Atlas)**

1. Buat akun di MongoDB Atlas.
2. Buat cluster gratis dan dapatkan Connection String (MONGO_URI) Anda.
3. Pastikan alamat IP Anda diizinkan untuk terhubung ke database.

**Setup Backend**

1. Clone repository backend (itugas-backend):
```
git clone https://github.com/yudi0312/Vibe-Coding
cd backend
```

2. Install dependencies:
```
npm install
```
3. Buat folder baru bernama uploads di root folder backend.
- Backend Anda menggunakan folder ini untuk menyimpan file yang diunggah oleh Multer.
4. Buat file .env di root folder backend dengan isi:
```
PORT=5000
MONGO_URI=[String Koneksi MongoDB Atlas Anda]
JWT_SECRET=rahasia-sangat-panjang
```

5. Jalankan server:
```
npm run dev  # Atau npm start, sesuaikan dengan package.json Anda
```
-   Server akan berjalan di http://localhost:5000.

**Setup Frontend**

1. Clone repository frontend (itugas-frontend):
```
git clone https://github.com/yudi0312/Vibe-Coding
cd frontend
```
2. Install dependencies:
```
npm install
```
3. Buat file .env di root folder frontend dengan isi:
```
# Saat bekerja lokal:
REACT_APP_API_URL=http://localhost:5000

# Setelah deploy backend, ganti dengan URL Render/Railway Anda:
# REACT_APP_API_URL=[https://itugas-backend.onrender.com](https://itugas-backend.onrender.com) 
```

4. Jalankan aplikasi React:
```
npm start
```
- Aplikasi akan terbuka di http://localhost:3000.

**Dokumentasi**

<img width="1909" height="963" alt="image" src="https://github.com/user-attachments/assets/230b50d3-a242-4ff0-b948-5af7b05a1cd2" />


<img width="1907" height="963" alt="image" src="https://github.com/user-attachments/assets/5199a179-5a92-484c-8e8f-df05dd1a7cbc" />


<img width="1913" height="962" alt="image" src="https://github.com/user-attachments/assets/5732da2c-09f2-4688-947f-18761eea773f" />



