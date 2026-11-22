# Panduan agen pengembangan Ruang KRS

Repositori ini memuat eksperimen PRD + Skill untuk Worksheet 12. Ruang KRS membantu mahasiswa UMM membandingkan kelas, mengetahui bentrok, dan memeriksa hasil KRS dalam simulasi di browser. Implementasinya menggunakan HTML, CSS, JavaScript, dan data lokal.

## Dokumen acuan

1. Baca [PRD.md](PRD.md) untuk ruang lingkup, data demo, dan kebutuhan UXR. PRD ini dipakai bersama versi PRD saja.
2. Gunakan [UX-SPEC.md](UX-SPEC.md) untuk struktur lima layar dan alur pengguna, serta [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md) untuk tata letak dan pola visual.
3. Gunakan [INTERACTION-SPEC.md](INTERACTION-SPEC.md) untuk keputusan pengguna, aturan validasi, fokus, dan pemulihan setelah kesalahan.
4. Pakai [ACCEPTANCE-CRITERIA.md](ACCEPTANCE-CRITERIA.md) untuk memilih skenario verifikasi yang relevan. Untuk antarmuka KRS di ponsel, terapkan juga [Skill Rancang KRS Mobile](.agents/skills/rancang-krs-mobile/SKILL.md).

Jika dokumen merinci perilaku yang berbeda dari PRD, ikuti batas produk pada PRD dan catat perbedaan sebelum mengubah perilaku. Gunakan penawaran dan batas SKS simulasi yang sama saat membandingkan kedua versi.

## Perubahan dan verifikasi

- `index.html` memuat struktur dasar halaman. `styles.css` memuat sistem visual. `krs.js` memegang data, evaluasi bentrok dan SKS, serta penyimpanan. `app.js` memegang navigasi, antarmuka, dan umpan balik tindakan.
- Pertahankan akses melalui `index.html` dan alamat relatif. Jalankan `node --check app.js` dan `node --check krs.js` untuk pemeriksaan sintaks. Buka langsung di browser atau jalankan `python -m http.server 8000` dari repositori untuk pengujian lokal.
- Prioritaskan nama kelas, hari dan jam, kuota, dan tindakan yang dapat dipahami sebelum pengguna mengonfirmasi. Pertahankan status tertulis, fokus yang terlihat, dan kegunaan pada lebar 360 px.
- Uji skenario utama dari penawaran hingga hasil. Untuk perubahan aturan, periksa kelas bentrok, jadwal yang hanya bersentuhan, batas SKS, penggantian, dan penghapusan. Untuk perubahan penyimpanan, uji kegagalan, percobaan ulang, dan pemuatan ulang.
- Catat perubahan yang sudah dikerjakan pada [CHANGELOG.md](CHANGELOG.md). Laporkan kriteria yang lulus, yang gagal, dan yang belum diuji. Untuk perbandingan eksperimen, catat jumlah revisi dan durasi hanya jika pengukurannya tersedia.
