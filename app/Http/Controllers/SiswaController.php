<?php

namespace App\Http\Controllers;

use App\Models\Siswa;
use Illuminate\Http\Request;

class SiswaController extends Controller
{
    public function index()
    {
        return response()->json([
            'status' => true,
            'data'   => Siswa::all(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama'          => 'required|string',
            'nis'           => 'required|string|unique:siswas',
            'kelas'         => 'required|string',
            'jenis_kelamin' => 'required|in:Laki-laki,Perempuan',
        ]);

        $siswa = Siswa::create($request->all());

        return response()->json([
            'status'  => true,
            'message' => 'Siswa berhasil ditambahkan',
            'data'    => $siswa,
        ], 201);
    }

    public function show($id)
    {
        return response()->json([
            'status' => true,
            'data'   => Siswa::findOrFail($id),
        ]);
    }

    public function update(Request $request, $id)
    {
        $siswa = Siswa::findOrFail($id);

        $request->validate([
            'nama'          => 'required|string',
            'nis'           => 'required|string|unique:siswas,nis,' . $id,
            'kelas'         => 'required|string',
            'jenis_kelamin' => 'required|in:Laki-laki,Perempuan',
        ]);

        $siswa->update($request->all());

        return response()->json([
            'status'  => true,
            'message' => 'Data berhasil diperbarui',
            'data'    => $siswa,
        ]);
    }

    public function destroy($id)
    {
        Siswa::findOrFail($id)->delete();

        return response()->json([
            'status'  => true,
            'message' => 'Data berhasil dihapus',
        ]);
    }
}