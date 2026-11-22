# Ruang KRS · PRD + Skill

Prototipe pengisian KRS dari [PRD Ruang KRS](PRD.md) dan [skill Rancang KRS Mobile](.agents/skills/rancang-krs-mobile/SKILL.md). Semua mata kuliah, aturan demonstrasi, dan hasil menggunakan data simulasi. Pilihan tersimpan melalui penyimpanan lokal peramban, dan kuota tetap mengikuti data awal.

## Menjalankan

Buka `index.html` langsung di peramban dengan JavaScript aktif. Prototipe berfungsi luring dengan HTML, CSS, dan JavaScript yang disertakan. Gunakan alamat file yang sama pada peramban yang sama untuk memuat ulang pilihan yang sudah tersimpan. Jika peramban membatasi penyimpanan pada alamat `file:`, jalankan `py -m http.server 8000` dari folder ini, kemudian buka [Ruang KRS di server lokal](http://localhost:8000/).

## Skenario demo

1. Buka **Penawaran** dan cari `UX301`. Coba juga kata kunci yang tidak ada, lalu hapus pencarian. Buka Rekayasa Interaksi, lihat dua alternatif, lalu buka Kelas A. Pilih **Tambahkan ke draf** dan periksa nama kelas sebelum memilih **Ya, tambahkan**. Total draf menjadi `3 / 8 SKS`.
2. Buka Analisis Data. Kelas A bentrok dengan Rekayasa Interaksi Kelas A pada Senin `09.00–09.40 WIB`. Buka detailnya untuk melihat alasan penambahan dinonaktifkan, lalu kembali ke alternatif dan pilih Analisis Data Kelas B pada Rabu.
3. Buka Desain Produk Digital Kelas A. Jadwalnya mulai pada Senin `09.40 WIB`, tepat saat Rekayasa Interaksi Kelas A berakhir. Layar menjelaskan bahwa jadwal tersebut tidak bentrok. Dengan dua kelas di draf, memilihnya akan menghasilkan 9 SKS dan melewati batas simulasi 8 SKS. Hapus Analisis Data Kelas B dari draf untuk mencoba menambahkan Desain Produk Digital Kelas A.
4. Buka Etika Profesi. Kelas A penuh dengan nol kursi tersisa. Kelas B memiliki kuota, tetapi waktu belum tersedia dan jadwal belum dapat diperiksa. Buka detail masing-masing untuk melihat status dan alasan penambahan dinonaktifkan.
5. Buka Rekayasa Interaksi Kelas B. Detail menunjukkan Kelas A akan diganti dan pemeriksaan jadwal memakai mata kuliah lain di draf. Buka konfirmasi, coba **Batal** untuk mempertahankan Kelas A, lalu ulangi konfirmasi untuk menggantinya.
6. Di **Tinjau KRS**, periksa daftar dan total SKS, lalu pilih **Simpan hasil simulasi**. Tindakan pengubahan draf dinonaktifkan selama pemrosesan. Setelah layar hasil muncul, muat ulang halaman untuk memastikan daftar masih ada. Pilih **Mulai pengisian baru** untuk kembali ke penawaran dengan draf kosong. Hasil sebelumnya tetap tersedia di **Hasil** sampai pengajuan baru berhasil.

## Navigasi dan penyimpanan

Fragmen `#/penawaran`, `#/mata-kuliah/UX301`, `#/kelas/UX301-A`, `#/tinjau`, dan `#/hasil` dapat dibuka langsung. Navigasi kembali dari detail memulihkan fokus pada tautan kelas asal. Kata kunci penawaran tetap ada selama halaman terbuka, termasuk setelah kembali dari pilihan kelas.

Penyimpanan hanya mencatat kode kelas demo, dengan daftar draf dan hasil yang terpisah. Jika penyimpanan draf gagal, draf masih dapat digunakan selama halaman terbuka. Jika penyimpanan hasil gagal, layar tinjau menampilkan pesan gagal dan mempertahankan draf serta hasil terakhir yang berhasil disimpan.
