# PRD Ruang KRS

Versi 1.0 · Rekayasa Interaksi · Dasar riset Worksheet 8 UX Requirements

## Tujuan

Ruang KRS adalah prototipe mandiri untuk membantu mahasiswa UMM memilih kelas melalui ponsel. Pengguna bisa membaca jam yang sebenarnya, memahami kuota dan status, membandingkan alternatif, mendeteksi konflik jadwal, dan memeriksa hasil pemilihan. Gunakan identitas visual orisinal dengan nama Ruang KRS. Seluruh data, tindakan penyimpanan, dan hasil pengajuan merupakan simulasi. Posisikan keterangan simulasi secara ringkas di antarmuka. Lingkup ini memakai data sintetis dan penyimpanan peramban. Integrasi InfoKHS, akun, sinkronisasi antarperangkat, dan aturan akademik resmi berada di luar lingkup.

Pengguna utama ialah mahasiswa yang mengisi KRS mandiri di ponsel, baik yang sudah berpengalaman maupun yang pertama kali mengisi. Hasil riset Worksheet 8 menunjukkan bahwa kode waktu, perpindahan tab, status ambigu, dan tata letak lebar menghambat pemilihan yang tepat. Prioritas utama adalah **UXR-03**, mengetahui bentrok sebelum pilihan ditetapkan.

## Kebutuhan dan kriteria penerimaan

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

Worksheet 8 memprioritaskan UXR-01, UXR-02, UXR-03, dan UXR-05 sebagai Must Have. UXR-04, UXR-06, dan UXR-07 mendukung demo. Pengguna dapat membandingkan minimal dua alternatif satu mata kuliah pada layar yang sama dan memahami langkah berikutnya dari label aksi setiap layar. Indikator pengalaman pada Worksheet 8 perlu diuji langsung dengan pengguna. Pemeriksaan prototipe menguji perilaku perangkat lunak.

## Lima layar demo

1. **Penawaran mata kuliah** — Daftar mata kuliah beserta kode, jumlah alternatif, SKS, dan pencarian berdasarkan nama atau kode. Sediakan kondisi hasil pencarian kosong dan akses ke draf.
2. **Pilihan kelas** — Semua kelas untuk satu mata kuliah. Informasi hari dan waktu, kuota, dosen, serta dampak bentrok terlihat dalam konteks kelas. Pengguna dapat membuka detail kelas mana pun untuk membaca kondisi pemilihannya.
3. **Detail kelas** — Penjelasan status, informasi kelas, serta pemeriksaan konflik. Pengguna mengonfirmasi kelas yang tersedia, sudah terjadwal, bebas bentrok, dan masih dalam batas demo. Jika mata kuliah yang sama sudah ada, jelaskan kelas mana yang diganti, lalu periksa jadwal serta total SKS terhadap pilihan lain dalam draf. Jika kandidat sudah ada di draf, tawarkan akses ke draf.
4. **Tinjau KRS** — Daftar yang dipilih, total dibanding batas demo 8 SKS, tindakan hapus, akses kembali ke penawaran, dan konfirmasi simulasi. Draf kosong tidak dapat diajukan.
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

Bentrok terjadi bila hari sama dan `mulaiA < selesaiB` serta `mulaiB < selesaiA`. Abaikan kelas yang sedang diganti saat memeriksa konflik dan menghitung SKS. Durasi tumpang tindih dimulai dari jam mulai yang paling akhir dan berakhir pada jam selesai yang paling awal. Sisa kuota tidak berubah karena aktivitas lokal. Nilai batas 8 SKS serta jam pada tabel merupakan pengaturan demo, bukan aturan atau jadwal UMM.

## Kualitas dan implementasi

- Gunakan HTML, CSS, JavaScript, dan data statis tanpa instalasi dependensi atau kunci akses. Halaman awal `index.html` bisa dijalankan melalui server statis, dan bisa dibuka langsung jika struktur kode memungkinkan. Navigasi dapat memakai hash agar kompatibel dengan GitHub Pages. Gunakan path aset relatif.
- Antarmuka berbahasa Indonesia, responsif dari 360 px, dengan tombol yang mudah disentuh, fokus keyboard yang terlihat, masukan berlabel, serta status tertulis yang tetap jelas tanpa warna. Gunakan hierarki tampilan yang fokus pada pemilihan kelas atau langkah saat ini.
- Simpan hanya identitas pilihan kelas demo di peramban. Jangan meminta NIM, kata sandi, atau informasi akun. Tangani hasil atau draf kosong, pencarian tanpa hasil, pilihan bentrok, kuota habis, waktu belum tersedia, serta kegagalan penyimpanan tanpa menampilkan keberhasilan yang keliru.
- Sertakan README dengan cara menjalankan dan skenario demo. Catat perubahan yang benar-benar selesai di `CHANGELOG.md`. Periksa alur layar, konflik, kuota penuh, kelas tanpa waktu, jam bersebelahan, konfirmasi tambah dan ganti, batas SKS, penghapusan, penyimpanan akhir, serta lebar 360 px.

Skenario demonstrasi utama dimulai dengan memilih Rekayasa Interaksi A. Analisis Data A bentrok pada Senin 09.00–09.40. Analisis Data B pada Rabu adalah alternatif yang bisa dipilih. Setelah meninjau draf, pengguna menyimpan hasil simulasi dan membuka hasil akhir. Uji Desain Produk Digital A ketika hanya Rekayasa Interaksi A di draf untuk membuktikan jam yang bersentuhan di 09.40 bisa dipilih. Ketika kedua mata kuliah utama sudah dipilih dan totalnya 6 SKS, Desain Produk Digital A akan melampaui batas demo 8 SKS.
