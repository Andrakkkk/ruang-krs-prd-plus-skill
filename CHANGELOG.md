# Changelog Ruang KRS

## Unreleased

### Dokumentasi

- Memperjelas README proyek, panduan menjalankan prototipe, dan urutan demonstrasi untuk peninjauan Worksheet 12.
- Melengkapi dokumentasi eksperimen PRD + Skill dengan spesifikasi UX, sistem desain, spesifikasi interaksi, kriteria penerimaan, dan panduan agen AI.

### Perbaikan

- Mempertahankan hasil KRS terakhir ketika draf diubah dari tab lain.
- Menahan tindakan yang memakai draf lama ketika tab lain sudah menyimpan pilihan baru. Pengguna melihat draf terbaru beserta pesan untuk meninjau ulang sebelum melanjutkan.
- Mempertahankan layar yang dipilih pengguna jika penyimpanan draf selesai setelah pengguna berpindah layar.

### Verifikasi

- Mengulang alur demo di Chrome pada lebar 360 dan 1440 px. Skenario dua tab dan perpindahan layar tercatat pada [kriteria penerimaan](ACCEPTANCE-CRITERIA.md#hasil-verifikasi-pembaruan).

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
