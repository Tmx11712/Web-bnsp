# Panduan Ujian BNSP - Junior Web Programmer
## Proyek: Aplikasi CRUD Data Siswa (React + Laravel + MySQL)

---

## 🚀 Cara Setup di Komputer Baru

Jika kamu baru saja meng-clone repository ini, ikuti langkah-langkah berikut untuk menjalankan aplikasi:

### 1. Persiapan Database
*   Buka **Laragon** atau **XAMPP** dan pastikan MySQL berjalan.
*   Buat database baru melalui phpMyAdmin atau Terminal dengan nama: `db_siswa`.
*   (Opsional) Jika ingin menggunakan data yang sudah ada, import file `db_siswa.sql` ke database tersebut.

### 2. Backend (Laravel)
Buka terminal di folder utama proyek:
```bash
# 1. Install dependensi PHP
composer install

# 2. Setup environment file
cp .env.example .env

# 3. Generate Application Key
php artisan key:generate

# 4. Konfigurasi Database di file .env
# 

# 5. Jalankan migrasi dan isi data sampel (Seeder)
php artisan migrate:fresh --seed

# 6. Jalankan server backend
php artisan serve
# → Backend akan berjalan di http://localhost:8000
```

### 3. Frontend (React)
Buka terminal baru di dalam folder `frontend-siswa`:
```bash
# 1. Masuk ke folder frontend
cd frontend-siswa

# 2. Install dependensi Node.js
npm install

# 3. Jalankan server frontend
npm run dev
# → Frontend akan berjalan di http://localhost:5173
```

---

## 📚 Cara Menjelaskan ke Penguji BNSP

### 1. Arsitektur Proyek
> "Proyek ini menggunakan arsitektur **REST API**. Frontend (React) terpisah sepenuhnya dari Backend (Laravel). Mereka berkomunikasi melalui HTTP request menggunakan format data **JSON**."

### 2. Database & Migration
> "Struktur tabel database didefinisikan menggunakan **Laravel Migrations**. Tabel `siswas` memiliki kolom: `id`, `nama`, `nis` (unique), `kelas`, dan `jenis_kelamin`. Ini memudahkan manajemen database tanpa harus menyentuh SQL secara manual."

### 3. Keamanan Dasar (Mass Assignment)
> "Pada Model `Siswa`, saya menggunakan properti `$fillable`. Ini adalah fitur **Mass Assignment Protection** di Laravel untuk memastikan hanya kolom tertentu yang boleh diisi, guna mencegah serangan injeksi data."

### 4. Logic Controller (CRUD)
> "Semua logika bisnis ada di `SiswaController`. Saya menggunakan method standar Laravel:"
> - `index()`: Mengambil semua data.
> - `store()`: Validasi input dan simpan data baru.
> - `update()`: Mengubah data yang sudah ada.
> - `destroy()`: Menghapus data berdasarkan ID.

### 5. Frontend Logic (React Hooks)
> "Di sisi client, saya menggunakan **React Hooks**:"
> - `useState`: Mengelola data siswa, status loading, dan tampilan modal.
> - `useEffect`: Mengambil data dari API secara otomatis saat aplikasi pertama kali dimuat.
> - **Axios**: Library untuk melakukan HTTP request ke backend.

---

## ❓ Perkiraan Pertanyaan Penguji

*   **"Apa itu CORS?"**
    *   *Jawaban: Izin keamanan agar domain frontend (port 5173) bisa mengakses data dari domain backend (port 8000).*
*   **"Kenapa NIS harus unique?"**
    *   *Jawaban: Untuk integritas data, memastikan setiap siswa memiliki identitas unik yang tidak tertukar.*
*   **"Apa keuntungan pakai REST API?"**
    *   *Jawaban: Modularitas. Backend yang sama bisa digunakan untuk aplikasi web, mobile, atau desktop sekaligus.*

---

## ✅ Unit Kompetensi BNSP yang Terpenuhi
*   **J.620100.016.01**: Membuat Antarmuka Web (React + Tailwind)
*   **J.620100.017.02**: Membuat Program Basis Data (MySQL + Migrations)
*   **J.620100.018.02**: Membuat Logika Pemrograman (Controller & Logic)
*   **J.620100.019.02**: Mengintegrasikan Basis Data dengan Web (REST API)
