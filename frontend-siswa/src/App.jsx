import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:8000/api/siswa";

const KELAS_OPTIONS = [
  "X IPA 1","X IPA 2","X IPS 1","X IPS 2",
  "XI IPA 1","XI IPA 2","XI IPS 1","XI IPS 2",
  "XII IPA 1","XII IPA 2","XII IPS 1","XII IPS 2",
];

const AVATAR_COLORS = [
  "bg-blue-100 text-blue-700",
  "bg-purple-100 text-purple-700",
  "bg-green-100 text-green-700",
  "bg-orange-100 text-orange-700",
  "bg-pink-100 text-pink-700",
];

function getInitials(nama) {
  return nama.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

function Avatar({ nama, index }) {
  const color = AVATAR_COLORS[index % AVATAR_COLORS.length];
  return (
    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 ${color}`}>
      {getInitials(nama)}
    </div>
  );
}

function Modal({ siswa, onClose, onSave }) {
  const [form, setForm] = useState(
    siswa || { nama: "", nis: "", kelas: "", jenis_kelamin: "" }
  );

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-5">
          <h2 className="text-white text-lg font-semibold">
            {siswa ? "✏️ Edit Data Siswa" : "➕ Tambah Siswa Baru"}
          </h2>
          <p className="text-blue-200 text-sm mt-0.5">
            {siswa ? "Perbarui informasi siswa" : "Isi data siswa dengan lengkap"}
          </p>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">Nama Lengkap</label>
            <input name="nama" value={form.nama} onChange={handleChange} required placeholder="Masukkan nama lengkap"
              className="w-full border-2 border-gray-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-400 bg-gray-50 transition" />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">NIS</label>
            <input name="nis" value={form.nis} onChange={handleChange} required placeholder="Nomor Induk Siswa"
              className="w-full border-2 border-gray-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-400 bg-gray-50 transition" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">Kelas</label>
              <select name="kelas" value={form.kelas} onChange={handleChange} required
                className="w-full border-2 border-gray-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-400 bg-gray-50 transition">
                <option value="">Pilih Kelas</option>
                {KELAS_OPTIONS.map((k) => <option key={k}>{k}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">Jenis Kelamin</label>
              <select name="jenis_kelamin" value={form.jenis_kelamin} onChange={handleChange} required
                className="w-full border-2 border-gray-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-400 bg-gray-50 transition">
                <option value="">Pilih</option>
                <option>Laki-laki</option>
                <option>Perempuan</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 py-2.5 text-sm border-2 border-gray-200 rounded-xl hover:bg-gray-50 font-medium transition">
              Batal
            </button>
            <button type="submit"
              className="flex-1 py-2.5 text-sm bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:opacity-90 font-medium transition shadow-lg shadow-blue-200">
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function App() {
  const [siswas, setSiswas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editSiswa, setEditSiswa] = useState(null);
  const [toast, setToast] = useState("");
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    try {
      const res = await axios.get(API_URL);
      setSiswas(res.data.data);
    } catch (err) {
      console.error("Gagal mengambil data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  const handleSave = async (form) => {
    try {
      if (editSiswa) {
        await axios.put(`${API_URL}/${editSiswa.id}`, form);
        showToast("✅ Data siswa berhasil diperbarui!");
      } else {
        await axios.post(API_URL, form);
        showToast("✅ Siswa baru berhasil ditambahkan!");
      }
      setShowModal(false);
      setEditSiswa(null);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || "Terjadi kesalahan");
    }
  };

  const handleDelete = async (id, nama) => {
    if (!window.confirm(`Hapus data ${nama}?`)) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      showToast("🗑️ Data siswa berhasil dihapus!");
      fetchData();
    } catch (err) {
      alert("Gagal menghapus data");
    }
  };

  const laki = siswas.filter((s) => s.jenis_kelamin === "Laki-laki").length;
  const perempuan = siswas.filter((s) => s.jenis_kelamin === "Perempuan").length;

  const filtered = siswas.filter((s) =>
    s.nama.toLowerCase().includes(search.toLowerCase()) ||
    s.nis.toLowerCase().includes(search.toLowerCase()) ||
    s.kelas.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Navbar */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-blue-200">
              S
            </div>
            <div>
              <h1 className="text-base font-semibold text-gray-800">SiswaApp</h1>
              <p className="text-xs text-gray-400">Laravel · React · MySQL</p>
            </div>
          </div>
          <button
            onClick={() => { setEditSiswa(null); setShowModal(true); }}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition shadow-lg shadow-blue-200 flex items-center gap-2"
          >
            <span className="text-base leading-none">+</span> Tambah Siswa
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-5 mb-8">
          {[
            { label: "Total Siswa", value: siswas.length, sub: "siswa terdaftar", icon: "🎓", color: "text-gray-800" },
            { label: "Laki-laki", value: laki, sub: "siswa putra", icon: "👦", color: "text-indigo-600" },
            { label: "Perempuan", value: perempuan, sub: "siswa putri", icon: "👧", color: "text-pink-500" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-gray-500">{s.label}</p>
                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-xl">{s.icon}</div>
              </div>
              <p className={`text-4xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-gray-400 mt-1">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between gap-4">
            <h2 className="font-semibold text-gray-800">Daftar Siswa</h2>
            <input
              type="text"
              placeholder="🔍  Cari nama, NIS, kelas..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-2 border-gray-100 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-blue-300 bg-gray-50 w-64 transition"
            />
          </div>

          {loading ? (
            <div className="p-16 text-center">
              <div className="text-4xl mb-3">⏳</div>
              <p className="text-gray-400 text-sm">Memuat data...</p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  {["Siswa","NIS","Kelas","Jenis Kelamin","Aksi"].map((h) => (
                    <th key={h} className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-16 text-gray-400 text-sm">
                      <div className="text-5xl mb-3">📭</div>
                      {search ? "Tidak ada hasil pencarian." : "Belum ada data siswa."}
                    </td>
                  </tr>
                ) : (
                  filtered.map((s, i) => (
                    <tr key={s.id} className="border-t border-gray-50 hover:bg-blue-50/30 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Avatar nama={s.nama} index={i} />
                          <span className="font-medium text-gray-800 text-sm">{s.nama}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 font-mono">{s.nis}</td>
                      <td className="px-6 py-4">
                        <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-lg">{s.kelas}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-semibold px-3 py-1.5 rounded-lg ${
                          s.jenis_kelamin === "Laki-laki" ? "bg-indigo-50 text-indigo-700" : "bg-pink-50 text-pink-700"
                        }`}>
                          {s.jenis_kelamin === "Laki-laki" ? "👦 " : "👧 "}{s.jenis_kelamin}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button onClick={() => { setEditSiswa(s); setShowModal(true); }}
                            className="text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition">
                            ✏️ Edit
                          </button>
                          <button onClick={() => handleDelete(s.id, s.nama)}
                            className="text-xs font-medium text-red-500 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition">
                            🗑️ Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}

          {filtered.length > 0 && (
            <div className="px-6 py-3 border-t border-gray-50 bg-gray-50/50">
              <p className="text-xs text-gray-400">Menampilkan {filtered.length} dari {siswas.length} siswa</p>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <Modal siswa={editSiswa}
          onClose={() => { setShowModal(false); setEditSiswa(null); }}
          onSave={handleSave} />
      )}

      {toast && (
        <div className="fixed bottom-6 right-6 bg-gray-900 text-white text-sm px-5 py-3 rounded-2xl shadow-2xl z-50">
          {toast}
        </div>
      )}
    </div>
  );
}
