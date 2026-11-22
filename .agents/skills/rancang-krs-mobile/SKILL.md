---
name: rancang-krs-mobile
description: Gunakan saat membuat atau memeriksa antarmuka Ruang KRS dari PRD proyek ini, terutama keterbacaan jadwal, pilihan kelas, dan pemulihan saat jadwal bentrok di ponsel.
---

# Rancang KRS Mobile

Baca `PRD.md` di root proyek. Gunakan data, definisi konflik, serta ruang lingkup yang ditetapkan di PRD. Untuk KRS, pengguna berulang kali mengecek pilihan sambil menunggu kesempatan mengambil kelas. Kurangi pekerjaan mengingat informasi saat mereka pindah layar.

- Susun tampilan seperti ruang kerja akademik. Gunakan latar hangat yang tenang, teks navy, dan satu aksen merah bata. Di desktop, boleh gunakan panel ringkas draf di samping konten. Di ponsel, jadikan akses ke draf ringkas dan mudah dijangkau tanpa menutup kontrol atau isi. Gunakan ruang kosong dan tipografi, bukan ornamen tanpa fungsi.
- Tampilkan jam dalam angka berlebar konsisten. Pertahankan urutan informasi antaralternatif: identitas kelas, hari dan jam, kuota, dosen, lalu aksi. Bedakan fakta jadwal, sinyal ketersediaan, dan dampak konflik agar mahasiswa tidak menyamakan jadwal yang belum diketahui dengan kelas penuh.
- Antisipasi hambatan pada layar pilihan kelas. Jika ada konflik, tampilkan nama kelas yang bertabrakan dan jam irisan di dekat opsi. Pada detail, berikan tindakan untuk kembali ke alternatif. Untuk jam belum tersedia, sampaikan jadwal belum dapat diperiksa.
- Pertahankan konteks saat kembali: pencarian penawaran, pilihan draf, dan mata kuliah yang sedang dievaluasi. Jika memungkinkan, kembalikan fokus keyboard ke aksi yang membuka detail. Pisahkan identitas komponen, pengolahan konflik, dan penyimpanan agar status tetap konsisten setelah kembali atau memuat ulang halaman.
- Setelah implementasi, jalankan skenario demo yang sama dengan PRD pada desktop dan lebar 360 px. Periksa fokus keyboard, urutan pembacaan, kondisi tanpa hasil pencarian, kelas penuh, jadwal belum tersedia, bentrok parsial, jam yang hanya bersentuhan, serta hasil simulasi setelah dimuat ulang. Catat hasil yang benar-benar bisa diverifikasi.
