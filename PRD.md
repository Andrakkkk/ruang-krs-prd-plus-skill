# **PRODUCT REQUIREMENTS DOCUMENT (PRD)**

## **Fitur: Pemilihan Kelas dan Penyusunan KRS Ruang KRS**

**Versi:** 1.0

**Status:** Spesifikasi prototipe

**Jenis Produk:** Prototipe web pemilihan kelas dan pemeriksaan jadwal KRS

**Referensi:** Worksheet 8 UX Requirements, Rekayasa Interaksi

---

## 1. Product Overview

### 1.1 Latar Belakang

Mahasiswa UMM yang memilih kelas melalui ponsel harus memahami waktu kuliah, membandingkan alternatif, dan memeriksa apakah jadwal beririsan. Worksheet 8 mencatat bahwa pengguna harus menafsirkan kode waktu, berpindah tab saat memeriksa jadwal, dan mencari informasi kelas pada tata letak yang kurang sesuai untuk ponsel.

### 1.2 Product Vision

Ruang KRS menyediakan satu alur untuk membaca penawaran, membandingkan kelas, memeriksa bentrok sebelum mengubah draf, dan meninjau hasil pemilihan. Antarmuka menampilkan identitas Ruang KRS dan menandai data serta hasil pengajuan sebagai simulasi.

### 1.3 Target Pengguna

Mahasiswa aktif UMM yang memprogram KRS secara mandiri melalui peramban ponsel. Ruang lingkup mencakup mahasiswa yang sudah terbiasa dan yang baru pertama kali memilih kelas.

## 2. User Problem

1. Kode waktu perlu ditafsirkan sebelum kelas dapat dibandingkan.
2. Pemeriksaan bentrok manual mengharuskan pengguna berpindah tab atau memeriksa catatan. Responden melaporkan hampir salah memilih kelas.
3. Penanda ambigu menyulitkan pengguna membedakan jadwal yang belum tersedia dari kuota yang penuh.
4. Tata letak lebar menyulitkan pengguna ponsel menemukan informasi dan tindakan yang dibutuhkan untuk memilih kelas.

### Problem Statement

Mahasiswa yang menyusun KRS melalui ponsel membutuhkan cara untuk membaca waktu, memahami status, dan memeriksa bentrok dalam alur yang sama agar dapat memilih jadwal yang sesuai dan mengetahui hasil penyimpanannya.

## 3. User Persona

**Persona rujukan** — V.A.L dari Worksheet 6 dan 7, mahasiswa yang mengisi KRS secara mandiri melalui ponsel.

### Karakteristik

- Membaca penawaran melalui peramban ponsel dan membandingkan kandidat terhadap pilihan yang sudah dibuat.
- Mahasiswa yang pertama kali mengisi KRS juga memerlukan petunjuk yang jelas mengenai keadaan saat ini dan langkah selanjutnya.

### Goals

- Memilih kelas dengan jadwal yang dapat diikuti.
- Mengetahui bentrok dan total SKS sebelum mengajukan pilihan.
- Memeriksa kelas yang tersimpan pada akhir proses.

### Pain Points

- Jam kuliah dikodekan dan harus diterjemahkan.
- Pemeriksaan manual menuntut pengguna mengingat informasi ketika berganti tab.
- Status jadwal, kuota, dan letak tombol tidak selalu langsung terlihat pada ponsel.

## 4. Product Goals

1. Menyajikan hari, jam, kuota, dan status agar pengguna bisa membandingkan alternatif.
2. Menjelaskan bentrok sebelum kelas masuk draf. Ini merupakan prioritas utama **UXR-03**.
3. Mendukung konfirmasi tambah atau ganti, penghapusan kelas, dan penyimpanan hasil dari ponsel.
4. Memberi kejelasan mengenai isi draf, total SKS, dan hasil yang terakhir tersimpan.

### Success Metrics

| Indikator | Target awal | Cara memeriksa |
|---|---|---|
| Kelima layar dapat digunakan pada 360 px dengan zoom normal | 5 dari 5 layar terbaca tanpa gulir horizontal | Uji antarmuka pada viewport ponsel |
| Pilihan bentrok, jam yang bersentuhan, dan jadwal belum tersedia dibedakan | Semua skenario contoh menampilkan keadaan yang sesuai | Jalankan skenario di bagian 12 |
| Pengguna memahami penyebab bentrok | Sedikitnya 4 dari 5 peserta uji menyebut kelas penyebab bentrok tanpa bantuan | Uji pengguna dengan skenario pemilihan kelas |
| Hasil tetap tersedia setelah muat ulang | Kelas, jadwal, dan total SKS sesuai dengan draf yang berhasil disimpan | Simpan hasil dan muat ulang pada alamat serta profil peramban yang sama |

Angka di atas merupakan sasaran awal. Target pemahaman pengguna perlu diuji langsung pada peserta.

## 5. Functional Requirements

### FR-01 — Penawaran Mata Kuliah

Tampilkan nama, kode, jumlah alternatif, dan SKS. Pengguna dapat mencari berdasarkan nama atau kode, melihat keadaan tanpa hasil, membuka pilihan kelas, dan menuju tinjauan draf.

### FR-02 — Perbandingan Pilihan Kelas

Tampilkan sedikitnya dua alternatif dari satu mata kuliah pada layar yang sama. Tampilkan hari, jam mulai dan selesai dalam format 24 jam WIB, kuota, dan dosen. Gunakan label eksplisit untuk waktu atau dosen yang belum tersedia. Beri akses ke detail setiap kelas.

### FR-03 — Pemeriksaan Bentrok dan Konfirmasi Kelas

Periksa kelas kandidat terhadap isi draf. Jelaskan kelas dan rentang waktu yang beririsan sebelum penambahan dan sediakan akses kembali ke alternatif. Penambahan hanya tersedia untuk kelas yang memiliki kuota, jadwalnya diketahui, bebas bentrok, dan tidak melampaui batas simulasi.

Tampilkan nama mata kuliah dan identitas kelas sebelum pengguna mengonfirmasi tambah atau ganti. Jika kelas lain dari mata kuliah yang sama sudah dipilih, tunjukkan pilihan yang akan diganti. Jika kandidat sudah ada, berikan akses ke draf. Pembatalan mempertahankan pilihan sebelumnya.

### FR-04 — Tinjau KRS

Tampilkan daftar pilihan dan total terhadap batas demo 8 SKS. Pengguna dapat menghapus kelas, kembali ke penawaran, atau menyimpan hasil simulasi. Pengajuan draf kosong dinonaktifkan. Saat penyimpanan berlangsung, tampilkan status proses dan cegah konfirmasi ganda.

### FR-05 — Hasil Simulasi

Tampilkan daftar kelas, hari, jam, dan total SKS yang berhasil disimpan. Beri petunjuk ketika hasil belum tersedia. Pengguna dapat kembali ke penawaran untuk memulai pengisian baru. Pertahankan hasil sebelumnya hingga penyimpanan hasil baru berhasil. Saat penyimpanan gagal, tampilkan pesan, pertahankan draf, dan sediakan kesempatan mencoba lagi.

## 6. Non-Functional Requirements

| ID | Aspek | Ketentuan |
|---|---|---|
| NFR-01 | Kompatibilitas | Gunakan HTML, CSS, JavaScript, data statis, dan jalur aset relatif. Prototipe dapat dijalankan dari server statis lokal tanpa instalasi dependensi atau kunci akses. Pembukaan dari berkas lokal mengikuti dukungan peramban. |
| NFR-02 | Usability | Gunakan label tindakan berbahasa Indonesia, status tertulis, label masukan, dan fokus papan ketik yang terlihat. Tombol utama memiliki target sentuh minimal 44 × 44 piksel CSS. |
| NFR-03 | Responsive Layout | Informasi, status, dan tindakan utama dapat dijangkau pada lebar 360 px dengan zoom normal dan tanpa gulir horizontal. |
| NFR-04 | Reliability | Draf dan hasil terakhir disimpan terpisah. Pemuatan ulang memulihkan hasil tersimpan. Pembukaan tautan langsung dan navigasi kembali menampilkan layar yang sesuai atau memberi jalur pemulihan. |
| NFR-05 | Privasi | Simpan identitas kelas contoh di peramban. Prototipe tidak meminta NIM, kata sandi, atau akun mahasiswa. |

## 7. Business Rules

1. Setiap mata kuliah menyumbang paling banyak satu kelas ke draf. Saat mengganti kelas, abaikan pilihan lama mata kuliah yang sama dalam pemeriksaan bentrok dan perhitungan SKS.
2. Kelas dengan kuota nol atau waktu belum tersedia tidak dapat ditambahkan. Kuota contoh tetap sama sepanjang simulasi.
3. Bentrok hanya terjadi pada hari yang sama ketika waktu mulai setiap kelas lebih awal daripada waktu selesai kelas pasangannya. Interval irisan dimulai dari waktu mulai yang lebih akhir dan berakhir pada waktu selesai yang lebih awal. Kelas yang waktunya hanya bersentuhan dapat dipilih apabila memenuhi aturan lain.
4. Jika penambahan melampaui batas simulasi 8 SKS, tampilkan total yang diproyeksikan dan pertahankan draf.
5. Perubahan yang berhasil disimpan menghasilkan umpan balik. Pengajuan hanya selesai setelah peramban berhasil menyimpan hasil.

## 8. User Stories

| ID | User story | Kebutuhan |
|---|---|---|
| US-01 | Sebagai mahasiswa, saya ingin mencari mata kuliah dari ponsel agar dapat membuka alternatif kelas dengan mudah. | UXR-01 |
| US-02 | Sebagai mahasiswa, saya ingin membandingkan jam, kuota, dan status kelas agar dapat memilih alternatif yang sesuai. | UXR-01, UXR-02, UXR-04 |
| US-03 | Sebagai mahasiswa, saya ingin mengetahui kelas yang bentrok dan rentang waktunya agar dapat mengubah pilihan sebelum memasukkannya ke draf. | UXR-03 |
| US-04 | Sebagai mahasiswa, saya ingin memeriksa identitas kelas dan total SKS agar dapat menghindari salah pilih atau melampaui batas demo. | UXR-05, UXR-07 |
| US-05 | Sebagai mahasiswa, saya ingin mengetahui hasil penyimpanan agar dapat meninjau kembali mata kuliah yang berhasil diajukan. | UXR-06 |

## 9. Scope

### In Scope

- Penawaran mata kuliah, pilihan kelas, detail kelas, Tinjau KRS, dan hasil simulasi.
- Pencarian lokal, perbandingan kelas, validasi jadwal dan SKS, perubahan sebelum pengajuan, serta penyimpanan peramban.
- Prioritas **Must Have** Worksheet 8 mencakup UXR-01, UXR-02, UXR-03, dan UXR-05. UXR-04, UXR-06, dan UXR-07 melengkapi kebutuhan demo.

### Out of Scope

- Integrasi InfoKHS UMM, autentikasi, data kuota aktual, aturan akademik resmi, dan sinkronisasi antarperangkat.
- Matriks jadwal mingguan penuh, yang berstatus **Could Have** pada UXR-08. Prototipe menampilkan daftar hasil beserta hari dan jam.

## 10. Assumptions & Dependencies

### Assumptions

Alamat dan profil peramban yang sama digunakan saat membuka kembali hasil. Jadwal, nama dosen, kuota, dan batas 8 SKS memakai data sintetis untuk demonstrasi.

### Dependencies

Peramban mendukung JavaScript dan penyimpanan lokal. Versi PRD saja dan PRD + Skill menggunakan spesifikasi produk dan data awal yang sama.

### Data Demo Bersama

| Kode | Mata kuliah | SKS | Kelas | Waktu (WIB) | Kuota | Dosen |
|---|---|---:|---|---|---:|---|
| UX301 | Rekayasa Interaksi | 3 | A | Senin 08.00–09.40 | 12 | Nadia Pratama |
| UX301 | Rekayasa Interaksi | 3 | B | Selasa 10.00–11.40 | 6 | Reza Mahendra |
| UX302 | Analisis Data | 3 | A | Senin 09.00–10.40 | 8 | Mira Anindya |
| UX302 | Analisis Data | 3 | B | Rabu 13.00–14.40 | 10 | Dimas Saputra |
| UX303 | Etika Profesi | 2 | A | Kamis 08.00–09.40 | 0 | Luna Ramadhani |
| UX303 | Etika Profesi | 2 | B | Waktu belum tersedia | 14 | Belum ditetapkan |
| UX304 | Desain Produk Digital | 3 | A | Senin 09.40–11.20 | 9 | Salma Wiratama |
| UX304 | Desain Produk Digital | 3 | B | Jumat 08.00–09.40 | 5 | Fajar Adinata |

## 11. Expected Deliverables

1. Prototipe interaktif dengan lima layar terhubung dan data kelas simulasi.
2. Mekanisme pemilihan kelas, pemeriksaan bentrok, validasi SKS, dan daftar hasil akhir.
3. README dengan cara menjalankan prototipe dan langkah demo.
4. Changelog yang mencatat perubahan yang telah dikerjakan.

## 12. Product Acceptance Criteria

| ID | Kebutuhan | Perilaku yang bisa didemokan |
|---|---|---|
| UXR-01 | Informasi dan tindakan terbaca di HP | Pada lebar 360 px dan zoom normal, pengguna bisa membaca kartu kelas dan memilih tanpa menggeser halaman ke samping. |
| UXR-02 | Memahami waktu | Tampilkan hari, jam mulai, dan jam selesai dalam format 24 jam WIB untuk kelas dengan waktu lengkap. |
| UXR-03 | Mengetahui bentrok | Untuk kelas yang bertumpang tindih pada hari yang sama, sebutkan kelas dalam draf dan rentang irisan sebelum aksi penambahan. Beri jalur kembali untuk memilih alternatif. Pasangan kelas yang jamnya hanya bersentuhan dapat dipilih. |
| UXR-04 | Memahami status dan kuota | Tampilkan kuota dan ketersediaan jadwal secara terpisah. Jelaskan jika dosen belum ditetapkan. Aturan simulasi memblokir penambahan kelas penuh dan kelas yang belum memiliki jadwal. |
| UXR-05 | Memastikan kelas yang akan ditambahkan | Gunakan target sentuh tombol utama minimal 44 × 44 piksel CSS. Saat pengguna akan tambah atau ganti kelas, tampilkan nama mata kuliah dan kelas untuk dikonfirmasi atau dibatalkan sebelum mengubah draf. |
| UXR-06 | Mengetahui hasil tindakan | Berikan pesan berhasil atau gagal setelah perubahan. Saat menyimpan hasil, tampilkan keadaan diproses dan cegah konfirmasi ganda. Kegagalan mempertahankan draf dan memberi kesempatan mencoba lagi. |
| UXR-07 | Memantau total SKS | Perbarui total/batas SKS setelah perubahan draf dan tampilkan di navigasi serta tinjauan. Batas demo 8 SKS memungkinkan pengujian peringatan. Pilihan yang melampaui batas tidak mengubah draf. |
| UXR-08 | Memeriksa jadwal mingguan | Berstatus Could Have di Worksheet 8. Demo ini memakai daftar hasil berisi hari dan waktu. Matriks jadwal mingguan direncanakan untuk tahap berikutnya. |

Untuk demonstrasi utama, pilih Rekayasa Interaksi A. Analisis Data A bertumpang tindih pada Senin 09.00–09.40 WIB. Gunakan Analisis Data B sebagai alternatif, lalu simpan dua pilihan dan periksa total 6 SKS. Uji Desain Produk Digital A saat hanya Rekayasa Interaksi A berada di draf untuk memeriksa batas jam 09.40 WIB. Jika draf sudah memiliki dua mata kuliah utama, kelas tambahan itu menghasilkan 9 SKS dan harus ditahan oleh aturan simulasi.
