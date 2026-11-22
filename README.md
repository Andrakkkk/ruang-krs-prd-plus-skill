# Ruang KRS — Versi PRD + Skill

Ruang KRS adalah prototipe pengisian Kartu Rencana Studi untuk mahasiswa Universitas Muhammadiyah Malang. Proyek Worksheet 12 Rekayasa Interaksi ini menerapkan kebutuhan dari Worksheet 8, terutama kejelasan informasi kelas dan pemeriksaan bentrok sebelum pemilihan.

Versi ini menggunakan PRD yang sama dengan versi PRD saja, ditambah skill **Rancang KRS Mobile**. Skill tersebut memandu cara menampilkan informasi jadwal dan bentrok, menjaga akses ke draf pada layar ponsel, serta mengembalikan fokus keyboard saat pengguna kembali ke pilihan sebelumnya. Prototipe mencakup lima layar dari penawaran mata kuliah hingga hasil simulasi. Data kelas, batas 8 SKS, dan hasil pengajuan bersifat simulasi.

[Spesifikasi kebutuhan produk (PRD)](PRD.md) · [Skill Rancang KRS Mobile](.agents/skills/rancang-krs-mobile/SKILL.md) · [Catatan perubahan](CHANGELOG.md)

## Menjalankan prototipe

Buka `index.html` di peramban dengan JavaScript aktif. Pertahankan seluruh berkas sumber dalam satu folder. Prototipe dapat dijalankan secara luring tanpa memasang dependensi.

Jika peramban membatasi penyimpanan dari berkas lokal, jalankan perintah berikut dari folder repositori menggunakan Python.

```powershell
python -m http.server 8000
```

Buka [Ruang KRS di server lokal](http://localhost:8000/). Untuk memuat kembali draf dan hasil, gunakan alamat dan profil peramban yang sama.

## Skenario demonstrasi

1. Di **Penawaran**, cari `UX301` dan bandingkan dua kelas Rekayasa Interaksi. Buka Kelas A, pilih **Tambahkan ke draf**, lalu periksa nama kelas sebelum mengonfirmasi. Total draf menjadi **3 dari 8 SKS**.
2. Buka **Analisis Data Kelas A**. Prototipe menampilkan bentrok dengan Rekayasa Interaksi Kelas A pada Senin **09.00–09.40 WIB**. Gunakan **Lihat alternatif kelas** untuk memilih Analisis Data Kelas B pada Rabu. Total draf menjadi **6 dari 8 SKS**.
3. Buka **Tinjau KRS**, periksa pilihan dan total SKS, lalu pilih **Simpan hasil simulasi**. Periksa daftar kelas pada layar **Hasil** dan muat ulang halaman untuk memastikan hasil tetap tersedia.
4. Pilih **Mulai pengisian baru** untuk membuka draf kosong. Hasil sebelumnya tetap tersedia hingga pengajuan baru berhasil disimpan.

Untuk memeriksa kondisi tambahan, buka Etika Profesi Kelas A yang penuh dan Kelas B yang belum memiliki jadwal. Desain Produk Digital Kelas A dapat ditambahkan ketika draf hanya berisi Rekayasa Interaksi Kelas A karena jadwalnya berurutan pada pukul 09.40 WIB. Jika draf sudah berisi 6 SKS, menambah kelas 3 SKS akan melampaui batas simulasi.

## Penyimpanan dan lingkup

Prototipe menyimpan kode kelas demo secara lokal dengan draf terpisah dari hasil terakhir. Jika penyimpanan gagal, layar menampilkan pemberitahuan dan draf tetap tersedia selama halaman terbuka. Prototipe menggunakan data simulasi tanpa integrasi ke InfoKHS UMM. Daftar hasil menampilkan hari dan jam setiap kelas. Matriks jadwal mingguan dicatat sebagai pengembangan lanjutan di PRD.
