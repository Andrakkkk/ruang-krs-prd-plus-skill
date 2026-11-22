# PRD Ruang KRS

Versi 1.0 · Rekayasa Interaksi · Dasar riset Worksheet 8 UX Requirements

## Tujuan

Ruang KRS adalah prototipe mandiri untuk membantu mahasiswa UMM memilih kelas melalui ponsel. Pengguna bisa membaca jam yang sebenarnya, memahami kuota dan status, membandingkan alternatif, mendeteksi konflik jadwal, dan memeriksa hasil pemilihan. Gunakan identitas visual orisinal dengan nama Ruang KRS. Seluruh data, tindakan penyimpanan, dan hasil pengajuan merupakan simulasi. Posisikan keterangan simulasi secara ringkas di antarmuka. Lingkup ini memakai data sintetis dan penyimpanan peramban. Integrasi InfoKHS, akun, sinkronisasi antarperangkat, dan aturan akademik resmi berada di luar lingkup.

Pengguna utama ialah mahasiswa yang mengisi KRS mandiri di ponsel, baik yang sudah berpengalaman maupun yang pertama kali mengisi. Hasil riset Worksheet 8 menunjukkan bahwa kode waktu, perpindahan tab, status ambigu, dan tata letak lebar menghambat pemilihan yang tepat. Prioritas utama adalah **UX04**, mengetahui bentrok sebelum pilihan ditetapkan.

## Kebutuhan dan kriteria penerimaan

| ID | Kebutuhan | Perilaku yang bisa didemokan |
|---|---|---|
| UX01 | Informasi dan tindakan terbaca di HP | Pada lebar 360 px dan zoom normal, pengguna bisa melihat kelas dan melakukan pemilihan tanpa menggeser halaman ke samping. |
| UX02 | Memahami waktu | Hari, jam mulai, dan jam selesai ditampilkan langsung dengan format 24 jam WIB untuk kelas yang sudah memiliki waktu. |
| UX03 | Memahami status | Kuota dan ketersediaan jadwal adalah informasi berbeda. Kelas penuh dan kelas dengan waktu belum tersedia memiliki pesan yang jelas. Keduanya belum dapat ditambahkan dalam simulasi. |
| UX04 | Mengetahui bentrok | Ketika kelas kandidat bertumpang tindih dengan pilihan pada hari yang sama, sebutkan kelas dalam draf dan interval yang bertumpang tindih sebelum tombol penambahan. Beri jalur kembali untuk memilih alternatif. Tampilkan pasangan jam yang berakhir tepat saat kelas berikutnya mulai sebagai tidak bentrok. |
| UX05 | Membandingkan alternatif | Dari satu mata kuliah, pengguna bisa melihat minimal dua alternatif di layar yang sama dengan waktu, kuota, dan dosen, serta membuka detail masing-masing. |
| UX06 | Melihat kuota dan dosen | Pengguna dapat melihat sisa kuota dan dosen pada opsi kelas. Jika dosen belum ditetapkan, gunakan kata yang menjelaskan keadaan itu. |
| UX07 | Memahami langkah berikutnya | Aksi utama di tiap layar menjelaskan kelanjutan. Tersedia kondisi awal kosong dan cara kembali tanpa kehilangan draf. |
| UX08 | Memastikan hasil | Pengguna bisa melihat kelas dan total SKS sebelum konfirmasi serta melihat daftar final di layar terpisah setelah penyimpanan simulasi. Memuat ulang halaman mempertahankan data hasil pada peramban yang sama. |

UX01–UX04 adalah prioritas inti. UX05–UX08 mendukung kelengkapan prototipe. Indikator pada Worksheet 8 merupakan sasaran untuk pengujian dengan pengguna. Demo perangkat lunak hanya memeriksa apakah perilaku yang diperlukan tersedia.

## Lima layar demo

1. **Penawaran mata kuliah** — Daftar mata kuliah beserta kode, jumlah alternatif, SKS, dan pencarian berdasarkan nama atau kode. Sediakan kondisi hasil pencarian kosong dan akses ke draf.
2. **Pilihan kelas** — Semua kelas untuk satu mata kuliah. Informasi hari dan waktu, kuota, dosen, serta dampak bentrok terlihat dalam konteks kelas. Pengguna dapat membuka detail kelas mana pun untuk membaca kondisi pemilihannya.
3. **Detail kelas** — Penjelasan status, informasi kelas, serta pemeriksaan konflik. Pengguna menambahkan kelas yang masih tersedia, sudah terjadwal, dan bebas bentrok. Jika mata kuliah yang sama sudah ada, jelaskan bahwa pilihan lama akan diganti, lalu periksa jadwal terhadap kelas lain dalam draf. Jika kandidat sudah ada di draf, tawarkan akses ke draf.
4. **Tinjau KRS** — Daftar yang dipilih, total SKS, tindakan hapus, akses kembali ke penawaran, dan konfirmasi simulasi. Draf kosong tidak dapat diajukan.
5. **Hasil simulasi** — Daftar dan total SKS yang berhasil disimpan. Pengguna bisa kembali ke penawaran untuk memulai pengisian baru. Simpan hasil lama sampai hasil baru berhasil disimpan. Tampilkan petunjuk yang jelas jika hasil belum tersedia atau penyimpanan gagal.

Pembukaan tautan langsung dan navigasi kembali harus menghasilkan halaman yang masuk akal. Pemilihan kelas, penghapusan, dan pengajuan harus mengubah data simulasi sesuai tindakan pengguna. Draf tersimpan terpisah dari hasil akhir. Tampilkan pesan yang jelas jika data gagal disimpan. Kelas dengan jadwal lengkap dapat divalidasi dengan aturan di bawah.

## Data demo bersama

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

Bentrok terjadi bila hari sama dan `mulaiA < selesaiB` serta `mulaiB < selesaiA`. Abaikan kelas yang sedang diganti untuk mata kuliah yang sama. Durasi tumpang tindih dimulai dari jam mulai yang paling akhir dan berakhir pada jam selesai yang paling awal. Sisa kuota tidak berubah karena aktivitas lokal. Gunakan jam pada tabel sebagai data simulasi, termasuk saat menjelaskan hasil pemeriksaan.

## Kualitas dan implementasi

- Gunakan HTML, CSS, JavaScript, dan data statis tanpa instalasi dependensi atau kunci akses. Halaman awal `index.html` bisa dijalankan melalui server statis, dan bisa dibuka langsung jika struktur kode memungkinkan. Navigasi dapat memakai hash agar kompatibel dengan GitHub Pages. Gunakan path aset relatif.
- Antarmuka berbahasa Indonesia, responsif dari 360 px, dengan tombol yang mudah disentuh, fokus keyboard yang terlihat, masukan berlabel, serta status tertulis yang tetap jelas tanpa warna. Gunakan hierarki tampilan yang fokus pada pemilihan kelas atau langkah saat ini.
- Simpan hanya identitas pilihan kelas demo di peramban. Jangan meminta NIM, kata sandi, atau informasi akun. Tangani hasil atau draf kosong, pencarian tanpa hasil, pilihan bentrok, kuota habis, waktu belum tersedia, serta kegagalan penyimpanan tanpa menampilkan keberhasilan yang keliru.
- Sertakan README dengan cara menjalankan dan skenario demo. Catat perubahan yang benar-benar selesai di `CHANGELOG.md`. Lakukan cek alur layar dan minimal skenario konflik, kuota penuh, kelas tanpa waktu, jam bersebelahan, penghapusan, penyimpanan akhir, serta lebar 360 px.

Skenario demonstrasi utama dimulai dengan memilih Rekayasa Interaksi A. Analisis Data A bentrok pada Senin 09.00–09.40. Analisis Data B pada Rabu adalah alternatif yang bisa dipilih. Desain Produk Digital A tidak bentrok dengan Rekayasa Interaksi A karena waktu keduanya hanya bersentuhan di 09.40. Setelah meninjau draf, pengguna menyimpan hasil simulasi dan membuka hasil akhir.
