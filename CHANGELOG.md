# Changelog Ruang KRS

## Unreleased

### Dokumentasi

- Memperjelas README proyek, panduan menjalankan prototipe, dan urutan demonstrasi untuk peninjauan Worksheet 12.
- Melengkapi dokumentasi eksperimen PRD + Skill dengan spesifikasi UX, sistem desain, spesifikasi interaksi, kriteria penerimaan, dan panduan agen AI.
- Menata keenam dokumen spesifikasi mengikuti struktur template dosen. PRD tetap identik antarversi, dan ID kriteria serta catatan pengujian sebelumnya dipertahankan.
- Menempatkan sumber aplikasi dalam folder `ruang-krs/` dan memperbarui tautan, petunjuk menjalankan proyek, serta rujukan verifikasi pada Skill Rancang KRS Mobile.

### Struktur kode

- Memisahkan data penawaran, validasi jadwal, penyimpanan, navigasi, dan logika tindakan ke modul tersendiri.
- Menempatkan template lima layar dan komponen bersama dalam `src/ui/`. Memisahkan gaya dasar, tata letak, komponen, dan gaya responsif dalam `assets/css/`.

### Perbaikan

- Mempertahankan hasil KRS terakhir ketika draf diubah dari tab lain.
- Menahan tindakan yang memakai draf lama ketika tab lain sudah menyimpan pilihan baru. Pengguna melihat draf terbaru beserta pesan untuk meninjau ulang sebelum melanjutkan.
- Mempertahankan layar yang dipilih pengguna jika penyimpanan draf selesai setelah pengguna berpindah layar.
- Meneruskan tautan demo lama dari root repo ke folder aplikasi, termasuk parameter URL dan fragmen rutenya.
- Mempertahankan layar pilihan pengguna jika penyimpanan hasil akhir selesai setelah pengguna berpindah layar.

### Verifikasi

- Mengulang alur demo di Chrome pada lebar 360 dan 1440 px. Skenario dua tab dan perpindahan layar tercatat pada [kriteria penerimaan](ACCEPTANCE-CRITERIA.md#hasil-verifikasi-pembaruan).
- Memeriksa pembukaan folder `ruang-krs/` dari berkas lokal dan server statis, termasuk pemulihan rute detail kelas dari tautan root.
- Menguji ulang versi modular pada lebar 360 dan 1440 px. Tampilan penawaran dan peringatan bentrok pada kedua ukuran sama dengan hasil sebelum pemisahan berkas.

## 1.0.0

### Alur pemilihan kelas

- Menyediakan lima layar terhubung untuk penawaran, pilihan kelas, detail kelas, tinjau KRS, dan hasil simulasi.
- Menampilkan waktu 24 jam WIB, kuota, dosen, status penuh, dan waktu yang belum tersedia.
- Mencantumkan bentrok, kelas dalam draf yang terdampak, dan interval irisan pada daftar alternatif. Kelas yang waktunya hanya bersentuhan ditandai bebas bentrok.
- Menerapkan konfirmasi yang menyebut nama kelas, penggantian kelas untuk mata kuliah yang sama, penghapusan, dan batas simulasi 8 SKS.

### Penyimpanan dan antarmuka

- Menyimpan draf dan hasil secara terpisah dengan status pemrosesan, umpan balik berhasil dan gagal, serta pemulihan hasil setelah pemuatan ulang.
- Menggunakan palet hangat, teks biru tua, aksen merah bata, angka tabular untuk jam, dan panel draf pada desktop. Pada ponsel, total SKS draf ditampilkan di navigasi utama.
- Mempertahankan pencarian dan memulihkan fokus saat pengguna menelusuri pilihan kelas.

### Verifikasi

- Memeriksa lima layar di Chrome pada lebar 360 dan 1440 px.
- Memeriksa pencarian kosong, pemulihan fokus, bentrok parsial, jam bersebelahan, kelas penuh, waktu belum tersedia, pembatalan konfirmasi, penggantian, penghapusan, batas SKS, kegagalan penyimpanan, dan pemuatan ulang hasil.
