# AGENTS.md

## AI Coding Agent Instructions

- **Proyek** — Ruang KRS
- **Versi** — 1.0
- **Tujuan** — Panduan pengembangan dan verifikasi eksperimen PRD + Skill pada Worksheet 12

---

## 1. Project Context

Ruang KRS membantu mahasiswa UMM membandingkan kelas, memahami bentrok, dan memeriksa hasil pemilihan KRS. Prototipe berjalan di browser dengan HTML, CSS, JavaScript, dan data simulasi lokal.

## 2. Mandatory Documentation

| Dokumen | Gunakan untuk |
|---|---|
| [PRD.md](PRD.md) | Tujuan, ruang lingkup, ID UXR, aturan produk, dan data simulasi yang juga dipakai versi PRD saja |
| [UX-SPEC.md](UX-SPEC.md) | Lima layar, struktur navigasi, alur pemilihan, dan keadaan pengguna |
| [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md) | Warna, tipografi, komponen, dan tata letak responsif |
| [INTERACTION-SPEC.md](INTERACTION-SPEC.md) | Aturan konfirmasi, validasi, fokus, dan pemulihan dari kegagalan |
| [ACCEPTANCE-CRITERIA.md](ACCEPTANCE-CRITERIA.md) | Kriteria hasil, metode verifikasi, dan bukti pemeriksaan yang tersedia |

Untuk pekerjaan antarmuka KRS di ponsel, gunakan juga [Skill Rancang KRS Mobile](.agents/skills/rancang-krs-mobile/SKILL.md).

## 3. Core Development Principles

- **Specification-Driven Development.** Kaitkan perubahan dengan kebutuhan atau masalah yang dapat direproduksi.
- **UX-First Implementation.** Tampilkan nama kelas, jadwal, kuota, dan alasan bentrok sebelum pengguna mengonfirmasi.
- **Design Consistency.** Gunakan kembali token, pola kartu, tombol, status tertulis, dan fokus dari sistem desain.
- **Functional Completeness.** Pastikan tindakan yang terlihat dapat menyelesaikan alur, termasuk keadaan kosong atau gagal yang relevan.

## 4. Development Workflow

1. **Analyze.** Tentukan skenario, kebutuhan UXR, dan kriteria penerimaan yang terkena perubahan.
2. **Project Setup.** Buka [ruang-krs/index.html](ruang-krs/index.html) langsung. Untuk server lokal, jalankan `python -m http.server 8000` dari root repo dan buka [localhost:8000/ruang-krs/](http://localhost:8000/ruang-krs/).
3. **Design Implementation.** Susun atau perbaiki layar dan tindakan sesuai spesifikasi UX dan sistem desain.
4. **Functional Implementation.** Terapkan validasi, perpindahan fokus, dan penyimpanan sesuai spesifikasi interaksi.
5. **Validation.** Uji perilaku yang terdampak, lalu catat perubahan dan bukti verifikasi.

## 5. Feature Implementation Rules

- **Penawaran dan pilihan kelas.** Gunakan data yang sama dengan PRD dan tampilkan jam dalam format 24 jam WIB.
- **Bentrok dan batas SKS.** Periksa irisan pada hari yang sama. Hitung ulang ketika kelas diganti. Gunakan batas simulasi 8 SKS.
- **Konfirmasi dan hasil.** Tampilkan identitas kelas sebelum mutasi. Tampilkan keadaan proses serta pesan berhasil atau gagal.
- **Penyimpanan.** Pertahankan hasil terakhir saat draf berubah. Bila draf sudah berubah di tab lain, tampilkan keadaan terbaru agar pengguna dapat meninjau ulang.

## 6. Component Architecture

Aplikasi berada di `ruang-krs/`. Di dalamnya, `index.html` memuat struktur dasar, `styles.css` memuat sistem visual, `krs.js` mengelola data, validasi dan penyimpanan, serta `app.js` mengelola navigasi, tampilan dan umpan balik. `index.html` pada root meneruskan tautan demo lama beserta fragmen rutenya ke folder aplikasi.

## 7. Code Quality Rules

Gunakan pengenal yang menjelaskan perannya dan terapkan aturan validasi pada satu tempat yang dipakai oleh setiap tindakan terkait. Pertahankan jalur aset relatif. Dari root repo, jalankan `node --check ruang-krs/app.js` dan `node --check ruang-krs/krs.js` saat mengubah JavaScript.

## 8. Responsive Design Rules

Periksa lebar 360 px dan desktop. Pertahankan akses ke total SKS, sasaran sentuh tombol utama, urutan baca, dan indikator fokus. Gunakan aturan breakpoint pada sistem desain.

## 9. Testing Requirements

- **Functional Testing.** Jalankan alur penawaran sampai hasil, termasuk tambah, ganti, konfirmasi, dan hapus.
- **Validation Testing.** Uji bentrok, jam bersebelahan, kelas penuh, jadwal belum tersedia, dan batas SKS.
- **Persistence Testing.** Untuk perubahan penyimpanan, uji gagal dan coba ulang, muat ulang, serta dua tab dengan keadaan berbeda.
- **Responsive Testing.** Periksa fokus papan ketik, tombol, dan akses informasi pada perangkat sempit serta desktop.

## 10. Visual Validation

Bandingkan layar yang diubah dengan pola pada sistem desain. Pastikan pesan status tetap dipahami melalui teks dan halaman dapat digunakan tanpa gulir horizontal pada 360 px.

## 11. Scope Control

Pertahankan ruang lingkup prototipe, data sintetis, serta penawaran dan batas demo yang sama saat membandingkan kedua versi. Matriks jadwal mingguan merupakan pengembangan lanjutan. Integrasi InfoKHS, kuota nyata, dan akun mahasiswa berada di luar ruang lingkup.

## 12. Decision and Assumption Management

Jika spesifikasi rinci menyatakan perilaku yang berbeda, gunakan PRD untuk menentukan batas produk. Catat perbedaan yang memengaruhi implementasi. Verifikasi perilaku terhadap kode dan kriteria sebelum menuliskannya sebagai hasil.

## 13. Completion Report

Catat perubahan yang telah dikerjakan di [CHANGELOG.md](CHANGELOG.md). Ringkas fitur atau berkas yang berubah, kriteria yang lulus, gagal, atau belum diuji, dan batasan yang masih berpengaruh. Untuk perbandingan eksperimen, laporkan jumlah revisi dan durasi jika ada catatan pengukuran.

## 14. Final Instruction

Utamakan ketepatan jadwal dan integritas hasil, lalu periksa apakah pengguna dapat menjalankan alur dari penawaran hingga hasil pada ponsel.
