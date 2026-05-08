<?php

namespace Database\Seeders;

use App\Models\Siswa;
use Illuminate\Database\Seeder;

class SiswaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Siswa::create([
            'nama' => 'Budi Santoso',
            'nis' => '12345',
            'kelas' => 'XII IPA 1',
            'jenis_kelamin' => 'Laki-laki',
        ]);

        Siswa::create([
            'nama' => 'Siti Aminah',
            'nis' => '12346',
            'kelas' => 'XII IPS 2',
            'jenis_kelamin' => 'Perempuan',
        ]);

        Siswa::create([
            'nama' => 'Andi Wijaya',
            'nis' => '12347',
            'kelas' => 'XI IPA 1',
            'jenis_kelamin' => 'Laki-laki',
        ]);
    }
}
