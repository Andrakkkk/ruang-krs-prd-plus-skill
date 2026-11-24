# Ruang KRS — Versi PRD + Skill

Ruang KRS adalah prototipe pengisian Kartu Rencana Studi untuk mahasiswa Universitas Muhammadiyah Malang. Proyek Worksheet 12 Rekayasa Interaksi ini menerapkan kebutuhan dari Worksheet 8, terutama kejelasan informasi kelas dan pemeriksaan bentrok sebelum pemilihan.

Versi ini mengembangkan skenario mahasiswa semester 7 berdasarkan PRD awal dan skill **Rancang KRS Mobile**. Skill tersebut memandu cara menampilkan informasi jadwal dan bentrok, menjaga akses ke draf pada layar ponsel, serta mengembalikan fokus keyboard saat pengguna kembali ke pilihan sebelumnya. Prototipe mencakup lima layar dari penawaran mata kuliah hingga hasil simulasi. Data kelas, batas 24 SKS, dan hasil pengajuan bersifat simulasi.

## Katalog semester ganjil

Profil demo berada di semester 7. Katalog memuat enam mata kuliah per semester untuk semester 1, 3, dan 5, serta delapan mata kuliah semester 7. Setiap mata kuliah menawarkan kelas A–I. Dari 18 mata kuliah semester terdahulu, 12 memiliki nilai A dan terkunci. Enam lainnya dapat diulang selama kelas memenuhi ketentuan jadwal, kuota, dan SKS.

Untuk mendemokan aturannya, filter **Semester 1**, lalu bandingkan **Dasar Pemrograman** (nilai A) dengan **Kalkulus** (nilai B). Buka kelas I masing-masing untuk melihat alasan penguncian atau melanjutkan ke konfirmasi.

## Dokumen eksperimen

| Dokumen | Peran |
|---|---|
| [PRD](PRD.md) | Kebutuhan, ruang lingkup, dan data demo semester 7 |
| [Spesifikasi UX](UX-SPEC.md) | Struktur lima layar, navigasi, dan alur pengguna |
| [Sistem desain](DESIGN-SYSTEM.md) | Aturan tampilan, komponen, dan tata letak responsif |
| [Spesifikasi interaksi](INTERACTION-SPEC.md) | Perilaku pemilihan kelas, umpan balik, dan pemulihan kesalahan |
| [Kriteria penerimaan](ACCEPTANCE-CRITERIA.md) | Skenario dan hasil yang harus diperiksa |
| [Panduan agen AI](AGENTS.md) | Urutan membaca spesifikasi, mengerjakan perubahan, dan melaporkan hasil uji |

[Skill Rancang KRS Mobile](.agents/skills/rancang-krs-mobile/SKILL.md) · [Catatan perubahan](CHANGELOG.md)

## Menjalankan prototipe

Buka [ruang-krs/index.html](ruang-krs/index.html) di peramban dengan JavaScript aktif. Aplikasi dapat dijalankan secara luring tanpa memasang dependensi. Pertahankan struktur folder sehingga browser dapat memuat aset dan skripnya.

`index.html` di root mengarahkan ke folder aplikasi dengan mempertahankan query dan rute hash pada tautan lama.

Jika peramban membatasi penyimpanan dari berkas lokal, jalankan perintah berikut dari folder repositori menggunakan Python.

```powershell
python -m http.server 8000
```

Buka [Ruang KRS di server lokal](http://localhost:8000/ruang-krs/). Contoh tautan langsung ke detail kelas: [Rekayasa Interaksi A](http://localhost:8000/ruang-krs/#/kelas/UX301-A). Untuk memuat kembali draf dan hasil, gunakan alamat dan profil peramban yang sama.

## Struktur aplikasi

```text
ruang-krs/
├── index.html                 Struktur halaman dan urutan pemuatan aset
├── assets/css/
│   ├── site.css               Titik masuk CSS
│   ├── base.css               Token warna, gaya dasar, dan fokus
│   ├── layout.css             Tata letak dan navigasi
│   ├── components.css         Kartu, tombol, formulir, dan status
│   └── responsive.css         Penyesuaian untuk layar sempit
└── src/
    ├── app.js                 Keadaan aplikasi dan pengendali tindakan
    ├── router.js              Pemetaan alamat ke layar
    ├── data/courses.js         Data kelas simulasi
    ├── domain/schedule.js      Aturan bentrok dan total SKS
    ├── infrastructure/
    │   └── storage.js         Penyimpanan draf dan hasil di browser
    └── ui/
        ├── shared.js          Komponen yang dipakai bersama
        ├── offerings.js       Layar penawaran dan pencarian
        ├── options.js         Layar pilihan kelas
        ├── detail.js          Layar detail dan konfirmasi kelas
        ├── review.js          Layar tinjau KRS
        └── results.js         Layar hasil simulasi
```

HTML memuat skrip lokal sesuai urutan dependensinya agar aplikasi dapat dijalankan langsung dari berkas maupun melalui server statis. Dokumen eksperimen tersedia di tingkat utama repositori.

## Skenario demonstrasi

1. Di **Penawaran**, cari `UX301` dan bandingkan kelas A–I Rekayasa Interaksi. Buka Kelas A, pilih **Tambahkan ke draf**, lalu periksa nama kelas sebelum mengonfirmasi. Total draf menjadi **3 dari 24 SKS**.
2. Buka **Analisis Data Kelas A**. Prototipe menampilkan bentrok dengan Rekayasa Interaksi Kelas A pada Senin **09.00–09.40 WIB**. Gunakan **Lihat alternatif kelas** untuk memilih Analisis Data Kelas B pada Rabu. Total draf menjadi **6 dari 24 SKS**.
3. Buka **Tinjau KRS**, periksa pilihan dan total SKS, lalu pilih **Simpan hasil simulasi**. Periksa daftar kelas pada layar **Hasil** dan muat ulang halaman untuk memastikan hasil tetap tersedia.
4. Pilih **Mulai pengisian baru** untuk membuka draf kosong. Hasil sebelumnya tetap tersedia hingga pengajuan baru berhasil disimpan.

Untuk memeriksa kondisi tambahan, buka Etika Profesi Kelas A yang penuh dan Kelas B yang belum memiliki jadwal. Desain Produk Digital Kelas A dapat ditambahkan ketika draf hanya berisi Rekayasa Interaksi Kelas A karena jadwalnya berurutan pada pukul 09.40 WIB. Untuk mencapai 24 SKS, pilih delapan mata kuliah semester 7: UX301-A, UX302-B, UX304-A, dan IF701-A hingga IF705-A. Membuka Kalkulus A sesudahnya menunjukkan proyeksi 27 SKS.

## Penyimpanan dan lingkup

Prototipe menyimpan kode kelas demo secara lokal dengan draf terpisah dari hasil terakhir. Jika penyimpanan gagal, layar menampilkan pemberitahuan dan draf tetap tersedia selama halaman terbuka. Prototipe menggunakan data simulasi tanpa integrasi ke InfoKHS UMM. Daftar hasil menampilkan hari dan jam setiap kelas. Matriks jadwal mingguan dicatat sebagai pengembangan lanjutan di PRD.
