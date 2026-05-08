# Panduan Ujian BNSP - Junior Web Programmer
## Proyek: Aplikasi CRUD Data Siswa (React + Laravel + MySQL)

---

## 🚀 Cara Setup Cepat

### 1. Backend (Laravel) - Direktori Utama
```bash
# Di direktori: c:\laragon\www\siswa-app
composer install
# .env sudah disiapkan (menggunakan MySQL)
php artisan key:generate
php artisan migrate:fresh --seed
php artisan serve
# → Backend berjalan di http://localhost:8000
```

### 2. Frontend (React) - Direktori `frontend-siswa`
```bash
cd frontend-siswa
npm install
npm run dev
# → Frontend berjalan di http://localhost:5173
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
