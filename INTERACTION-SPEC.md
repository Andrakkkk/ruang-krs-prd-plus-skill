# Spesifikasi Interaksi Ruang KRS

Dokumen ini menjelaskan interaksi versi **PRD + Skill** berdasarkan [PRD](PRD.md), data dan aturan pada `krs.js`, serta alur pada `app.js`. Spesifikasi menjadi acuan pemeriksaan; isinya bukan laporan hasil pengujian. Seluruh kelas, dosen, kuota, batas 8 SKS, dan penyimpanan merupakan simulasi.

## Ruang lingkup dan sumber kebutuhan

| Kebutuhan Worksheet 8 | Penerapan interaksi |
|---|---|
| UXR-01 | Kartu kelas terbaca pada ponsel; informasi dan tindakan tidak memerlukan geser horizontal. |
| UXR-02 | Hari dan rentang waktu 24 jam WIB tampil langsung. |
| UXR-03 | Bentrok dijelaskan sebelum penambahan, beserta kelas penyebab dan jam irisan. |
| UXR-04 | Kuota, kelengkapan jadwal, dan dosen disajikan sebagai informasi terpisah. |
| UXR-05 | Penambahan dan penggantian memerlukan konfirmasi identitas kelas. |
| UXR-06 | Tindakan memberikan umpan balik; penyimpanan akhir memiliki keadaan diproses, berhasil, dan gagal. |
| UXR-07 | Total draf dibanding batas demo diperbarui setelah perubahan. |
| UXR-08 | Daftar hasil memuat hari dan waktu. Matriks jadwal mingguan ditunda sesuai PRD. |

Skill [Rancang KRS Mobile](.agents/skills/rancang-krs-mobile/SKILL.md) mengarahkan urutan informasi yang konsisten, konteks bentrok, akses draf, dan pemulihan fokus. Integrasi InfoKHS, autentikasi, aturan SKS resmi, perubahan kuota langsung, serta sinkronisasi antarperangkat berada di luar lingkup.

## Layar dan perpindahan

| Layar dan alamat hash | Interaksi serta hasil |
|---|---|
| Penawaran — `#/penawaran` | Pencarian menyaring nama atau kode saat pengguna mengetik, tanpa membedakan huruf besar dan kecil. Kata pencarian dapat dipisahkan spasi. Jumlah hasil ikut berubah. Kartu membuka pilihan mata kuliah terkait. Jika tidak ada hasil, tampilkan penjelasan dan **Hapus pencarian**; tombol itu mengosongkan pencarian dan mengembalikan fokus ke masukan. |
| Pilihan kelas — `#/mata-kuliah/UX301` | Kedua alternatif tersedia pada halaman yang sama; pada ponsel disusun vertikal. Setiap kartu memuat kelas, hari dan waktu, kuota, dosen, pemeriksaan bentrok, serta **Lihat detail kelas**. Membuka detail tetap diizinkan untuk kelas yang tidak dapat ditambahkan. |
| Detail — `#/kelas/UX301-A` | Tampilkan identitas lengkap dan hasil pemeriksaan. Jika memenuhi syarat, **Tambahkan ke draf** membuka konfirmasi di dalam halaman. **Batal** menutupnya tanpa mengubah draf. **Ya, tambahkan** menambah satu kelas lalu membuka Tinjau KRS. |
| Tinjau KRS — `#/tinjau` | Tampilkan daftar, jumlah kelas, total/batas SKS, **Hapus**, dan **Simpan hasil simulasi**. Hapus langsung mengeluarkan kelas; hasil terakhir tidak berubah. Draf kosong memberi tautan ke penawaran dan tombol simpan nonaktif. |
| Hasil — `#/hasil` | Tampilkan daftar akhir, hari dan waktu, serta total SKS yang berhasil disimpan. Tanpa hasil, tampilkan petunjuk menuju Tinjau KRS. **Mulai pengisian baru** kembali ke penawaran; bila sudah ada draf baru, label menjadi **Lanjutkan pengisian**. |

Navigasi utama menyediakan Penawaran, Tinjau KRS, dan Hasil. Hash yang dikenal dapat dibuka langsung. Hash mata kuliah atau kelas yang tidak dikenal diarahkan ke penawaran dengan pemberitahuan; aplikasi tidak membuat data kelas baru.

## Pemilihan dan penggantian kelas

1. Periksa kandidat terhadap kelas lain di draf. Untuk mata kuliah yang sama, abaikan kelas lama ketika menghitung bentrok dan proyeksi SKS.
2. Kandidat dapat ditambahkan jika waktunya tersedia, kuota lebih dari nol, bebas bentrok, belum menjadi pilihan yang sama, dan total proyeksi tidak melebihi 8 SKS.
3. Jika mata kuliah sudah memiliki kelas lain, tampilkan kelas lama yang akan diganti. Aksi menjadi **Ganti kelas di draf**, lalu konfirmasi **Ya, ganti kelas**. Penggantian mempertahankan satu kelas per mata kuliah.
4. Jika kandidat sudah ada di draf, tampilkan keterangan tersebut dan **Tinjau KRS**; tidak ada penambahan duplikat.
5. Untuk kandidat terhalang, nonaktifkan tombol tambah/ganti dan sediakan **Lihat alternatif kelas**. Tampilkan alasan tertulis yang relevan, bukan hanya warna.

Konfirmasi penambahan/penggantian menampilkan nama mata kuliah, kelas, hari, serta jam kandidat. Konfirmasi bukan modal: konten tetap berada di halaman detail. Membatalkan mengembalikan fokus ke tombol tambah/ganti. Berpindah layar menutup konfirmasi tanpa mengubah pilihan.

## Aturan jadwal dan keadaan terhalang

Bentrok terjadi jika hari sama dan `mulaiA < selesaiB` serta `mulaiB < selesaiA`. Irisan dimulai pada waktu mulai yang paling akhir dan berakhir pada waktu selesai yang paling awal. Semua kelas dalam draf yang bertabrakan harus disebutkan.

| Keadaan | Respons dan contoh demo |
|---|---|
| Bentrok | Dengan Rekayasa Interaksi A di draf, Analisis Data A menampilkan bentrok Senin **09.00–09.40 WIB**. Penambahan terhalang; Analisis Data B tetap menjadi alternatif. |
| Jam hanya bersentuhan | Rekayasa Interaksi A berakhir 09.40 dan Desain Produk Digital A mulai 09.40. Tampilkan **Tidak bentrok** serta waktu pertemuannya. Keduanya dapat dipilih jika total SKS masih memenuhi batas demo. |
| Kuota habis | Etika Profesi A menampilkan **0 kursi tersisa** dan **Kelas penuh**. Kelas dapat dibaca, tetapi tidak ditambahkan. |
| Waktu belum tersedia | Etika Profesi B menampilkan kuota 14, dosen **Belum ditetapkan**, dan **Jadwal belum dapat diperiksa**. Tidak dinyatakan bebas bentrok. Pemblokiran pilihan ini adalah aturan prototipe. |
| Melampaui batas | Draf 6 SKS ditambah kelas 3 SKS menghasilkan proyeksi 9 SKS. Tampilkan proyeksi serta batas 8 SKS; draf tidak berubah. |

Kuota contoh tidak berkurang setelah pengguna menambah kelas. Hari dan jam tidak diturunkan dari kode slot InfoKHS. Agenda magang atau bimbingan tidak ikut diperiksa.

## Penyimpanan dan umpan balik

- Draf dan hasil terakhir merupakan dua daftar terpisah pada penyimpanan peramban versi ini. Penambahan, penggantian, dan penghapusan memperbarui draf serta memberikan pesan tentang tindakan yang dilakukan.
- Jika perubahan draf gagal disimpan, perubahan tetap tersedia dalam memori halaman, disertai pemberitahuan bahwa data dapat hilang setelah pemuatan ulang. Hasil terakhir tidak diganti oleh perubahan draf.
- **Simpan hasil simulasi** menampilkan keadaan **Menyimpan…** dan pesan proses. Selama proses, tombol simpan dan tindakan perubahan draf nonaktif. Jeda simulasi sekitar 450 ms bukan janji kinerja server.
- Jika penyimpanan akhir berhasil, draf dikosongkan dan hasil diganti dengan salinan pilihan yang diajukan, kemudian layar Hasil dibuka. Jika gagal, draf dan hasil sebelumnya dipertahankan; tampilkan kegagalan dan kesempatan mencoba lagi.
- Memuat ulang pada alamat serta profil peramban yang sama memulihkan data yang tersimpan. Data yang tidak terbaca atau tidak sesuai disaring; tampilkan pemberitahuan pemulihan. Tidak ada jaminan data bertahan jika pengguna menghapus penyimpanan atau peramban menolaknya.

### Perlindungan perubahan dari tab lain

Perubahan draf saja tidak boleh mengganti hasil terbaru yang berhasil disimpan melalui tab lain. Sebelum menyimpan perubahan, versi halaman yang masih memegang data lama harus memperhatikan keadaan tersimpan yang lebih baru.

Jika tab lain telah mengubah draf, tab lama tidak boleh diam-diam menimpa pilihan tersebut. Pertahankan draf terbaru, beri penjelasan bahwa data telah berubah, dan arahkan pengguna meninjau keadaan terbaru sebelum melanjutkan. Permintaan dari tab lama belum dianggap berhasil jika belum diterapkan. Kegagalan penyimpanan tetap memberikan pesan serta kesempatan mencoba lagi.

Jika pengguna sudah berpindah layar ketika perubahan draf selesai, perbarui ringkasan draf di layar yang sedang dibuka. Perpindahan otomatis ke Tinjau KRS berlaku ketika pengguna masih berada di detail kelas yang memulai penambahan. Pemeriksaan perlindungan data dan navigasi dicatat pada **AC06-06** sampai **AC06-08**.

## Responsif, fokus, dan akses

Pada lebar 360 px, kartu tersusun vertikal dan total SKS tetap tersedia di navigasi. Panel draf tambahan ditampilkan pada desktop. Gulir vertikal diperbolehkan; informasi penting tidak harus berada sekaligus dalam tinggi satu layar.

Tombol utama memiliki sasaran minimal 44 × 44 piksel CSS. Masukan pencarian berlabel; penanda status tetap bermakna tanpa warna. Navigasi keyboard menggunakan indikator fokus dan tautan **Lompat ke konten**.

Saat kembali dari detail ke pilihan mata kuliah yang sama, fokus dipulihkan ke **Lihat detail kelas** yang membukanya. Saat kembali dari pilihan ke penawaran, fokus menuju kartu mata kuliah terkait. Pencarian dipertahankan selama navigasi dalam halaman, tetapi tidak dijanjikan bertahan setelah pemuatan ulang. Setelah penghapusan, fokus menuju tombol hapus berikutnya atau tautan penawaran jika draf kosong. Perpindahan lain mengarahkan fokus ke judul layar; pembukaan pertama tidak memindahkan fokus secara paksa.

Kriteria yang dapat diperiksa tercantum pada [Acceptance Criteria](ACCEPTANCE-CRITERIA.md).
