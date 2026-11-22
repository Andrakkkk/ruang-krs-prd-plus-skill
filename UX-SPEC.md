# Spesifikasi UX Ruang KRS

Versi 1.0 · Varian PRD dan Skill · Worksheet 12 Rekayasa Interaksi

Ruang KRS membantu mahasiswa membaca penawaran, membandingkan kelas, dan mengetahui bentrok sebelum mengubah draf. Spesifikasi ini mengikuti [PRD](PRD.md), kebutuhan UXR-01 sampai UXR-08, serta [Rancang KRS Mobile](.agents/skills/rancang-krs-mobile/SKILL.md). Lima layar dan perilaku yang dijelaskan merujuk pada prototipe saat ini di [app.js](app.js) dan [krs.js](krs.js). Aturan tampilannya dijelaskan dalam [sistem desain](DESIGN-SYSTEM.md).

## Pengguna dan tujuan

Persona kerja yang digunakan adalah **mahasiswa pengisi KRS mandiri melalui ponsel**. Pengguna dapat sudah berpengalaman atau baru pertama kali mengisi. Profil ini memakai sasaran pengguna dalam PRD; usia, semester, identitas pribadi, serta hasil pengukuran baru tidak ditambahkan.

Hambatan yang menjadi dasar perancangan ialah kode waktu yang sulit dipahami, pemeriksaan jadwal dengan berpindah tab, status kelas yang ambigu, dan tata letak lebar pada layar ponsel. Pengguna membutuhkan informasi yang bisa dibaca dalam konteks pilihan, tanpa harus menghafal kode dari layar sebelumnya.

| Tujuan pengguna | Pengalaman yang dituju | Jejak kebutuhan |
|---|---|---|
| Memahami kapan kuliah berlangsung | Hari serta jam mulai dan selesai terlihat dalam format 24 jam WIB | UXR-02 |
| Memilih kelas tanpa bentrok | Nama kelas yang bertabrakan dan jam irisan diketahui sebelum penambahan | UXR-03 |
| Menilai alternatif kelas | Jadwal, kuota, dan dosen dapat dibandingkan pada layar pilihan kelas | UXR-01, UXR-04 |
| Memilih kelas yang dimaksud | Nama mata kuliah dan kelas diperiksa sebelum konfirmasi tambah atau ganti | UXR-05 |
| Mengetahui keadaan pilihan | Draf, total SKS, umpan balik, dan hasil tersimpan dibedakan dengan jelas | UXR-06, UXR-07 |

UXR-01, UXR-02, UXR-03, dan UXR-05 berstatus Must Have pada Worksheet 8 sebagaimana dicatat di PRD. UXR-03 menjadi prioritas utama karena menyangkut ketepatan jadwal yang dipilih. UXR-04, UXR-06, dan UXR-07 mendukung demo. UXR-08 berstatus Could Have; hasil saat ini berupa daftar kelas dengan hari dan waktu, belum berupa matriks mingguan.

## Lingkup pengalaman

Semua data kelas, kuota, batas 8 SKS, dan penyimpanan adalah simulasi. Header memuat **Mode simulasi**, sedangkan footer menjelaskan bahwa data merupakan contoh. Aplikasi tidak meminta NIM atau kata sandi dan tidak mengajukan KRS ke InfoKHS resmi.

Draf dan hasil terakhir disimpan terpisah di peramban yang sama. Ketersediaan penyimpanan bergantung pada izin peramban. Tidak ada sinkronisasi antarperangkat atau perubahan kuota akibat pilihan lokal. Pemeriksaan bentrok hanya mencakup kelas demo di draf; agenda di luar data aplikasi tidak ikut diperiksa.

## Struktur lima layar

Navigasi utama selalu menyediakan Penawaran, Tinjau KRS beserta total SKS, dan Hasil. Pilihan kelas serta detail kelas merupakan turunan Penawaran.

| Layar dan rute | Isi dan tindakan utama | Jalan kembali |
|---|---|---|
| Penawaran mata kuliah · `#/penawaran` | Pencarian nama atau kode, jumlah hasil, kartu mata kuliah, dan jumlah alternatif. Pilih **Lihat pilihan kelas**. | Navigasi ke Tinjau KRS atau Hasil |
| Pilihan kelas · `#/mata-kuliah/UX301` | Alternatif satu mata kuliah, hari dan waktu, kuota, dosen, serta dampak terhadap draf. Pilih **Lihat detail kelas**. | **Kembali ke penawaran** |
| Detail kelas · `#/kelas/UX301-A` | Informasi kelas, pemeriksaan jadwal, alasan pembatasan, dan konfirmasi tambah atau ganti. | **Kembali ke pilihan kelas** atau **Lihat alternatif kelas** |
| Tinjau KRS · `#/tinjau` | Daftar pilihan, penghapusan, total dibanding batas demo, dan **Simpan hasil simulasi**. | **Kembali ke penawaran** |
| Hasil simulasi · `#/hasil` | Daftar hasil terakhir dan total SKS. **Mulai pengisian baru** atau **Lanjutkan pengisian**, sesuai keadaan draf. | **Kembali ke penawaran** |

Kode rute pada tabel adalah contoh dari data demo. Tautan kelas atau mata kuliah yang valid dapat dibuka langsung. Rute yang tidak dikenal dikembalikan ke Penawaran dengan pemberitahuan bahwa tautan tidak ditemukan.

## Alur utama dan keputusan

1. Pengguna mencari UX301, membuka pilihan Rekayasa Interaksi, lalu membandingkan Kelas A dan B.
2. Pada detail Kelas A, pengguna membaca Senin 08.00–09.40 WIB dan memilih **Tambahkan ke draf**. Konfirmasi muncul di halaman yang sama, menyebut mata kuliah, kelas, dan jadwal. **Batal** mempertahankan draf; **Ya, tambahkan** menambah kelas dan membuka Tinjau KRS.
3. Saat membuka Analisis Data Kelas A, pengguna melihat bentrok dengan Rekayasa Interaksi Kelas A pada Senin 09.00–09.40 WIB. Penambahan tidak tersedia. **Lihat alternatif kelas** mengembalikan pengguna ke semua alternatif mata kuliah tersebut.
4. Analisis Data Kelas B pada Rabu dapat ditambahkan. Total draf menjadi 6 dari 8 SKS. Pengguna meninjau pilihan sebelum menyimpan hasil simulasi.
5. Tombol berubah menjadi **Menyimpan…** dan halaman menyampaikan proses penyimpanan. Keberhasilan membuka Hasil dan mengosongkan draf. Hasil terakhir tetap disimpan sampai penyimpanan hasil baru berhasil.

Kelas yang waktunya hanya bersentuhan tidak dianggap bentrok. Contohnya, Rekayasa Interaksi A berakhir 09.40 dan Desain Produk Digital A dimulai 09.40 pada Senin. Ketika hanya kelas pertama ada di draf, kelas kedua dapat dipilih. Jika draf sudah berisi 6 SKS, penambahan mata kuliah 3 SKS dibatasi karena akan menjadi 9 SKS.

Penggantian hanya berlaku pada kelas lain dari mata kuliah yang sama. Detail menyebut pilihan yang akan diganti. Pemeriksaan bentrok dan total SKS mengabaikan kelas lama tersebut; perubahan baru berlaku setelah pengguna mengonfirmasi. Kelas yang sudah ada di draf menawarkan **Tinjau KRS**.

## Informasi dan keadaan antarmuka

Kuota, kelengkapan waktu, dan konflik adalah tiga informasi berbeda. Kelas dengan kuota tersedia tetap dapat memiliki waktu yang belum diketahui. Tulisan **Tidak bentrok** menjelaskan hasil pemeriksaan jadwal, bukan jaminan bahwa kelas dapat ditambahkan tanpa memenuhi kondisi lain.

| Keadaan | Informasi yang ditampilkan | Tindakan dan pemulihan |
|---|---|---|
| Hasil pencarian kosong | **Mata kuliah tidak ditemukan** dan saran mengganti nama atau kode | **Hapus pencarian** mengembalikan daftar dan fokus ke kolom pencarian |
| Draf kosong | **Draf KRS masih kosong** | **Lihat penawaran**; penyimpanan hasil tidak tersedia |
| Kelas penuh | Kuota 0 dan tulisan **Kelas penuh** | Detail tetap dapat dibaca; kembali ke alternatif |
| Waktu belum tersedia | **Waktu belum tersedia** dan **Jadwal belum dapat diperiksa** | Penambahan tidak tersedia; pilih alternatif dengan jadwal lengkap |
| Dosen belum ditetapkan | Teks **Belum ditetapkan** pada informasi dosen | Status tetap terbaca terpisah dari kuota dan jadwal |
| Bentrok dengan draf | Nama kelas terdampak dan rentang irisan | Penambahan tidak tersedia; **Lihat alternatif kelas** |
| Melebihi batas | Total setelah penambahan dan batas 8 SKS simulasi | Draf tidak berubah; pilih alternatif atau tinjau draf |
| Konfirmasi tambah atau ganti | Nama mata kuliah, kelas, jadwal, serta pilihan ya atau batal | Konfirmasi berada di halaman, tanpa dialog modal |
| Perubahan berhasil | Nama kelas dan hasil penambahan, penggantian, atau penghapusan | Total dan isi draf diperbarui; hasil juga diumumkan ke pembaca layar |
| Sedang menyimpan hasil | **Menyimpan…** dan penjelasan proses | Pengajuan ganda dicegah; kontrol hapus dinonaktifkan selama proses |
| Gagal menyimpan draf | Penjelasan bahwa perubahan hanya tersedia selama halaman terbuka | Pilihan tetap ada di memori halaman; pengguna diminta memeriksa izin penyimpanan sebelum memuat ulang |
| Gagal menyimpan hasil | **Hasil gagal disimpan** dan petunjuk mencoba lagi | Draf dan hasil sebelumnya dipertahankan; tidak menampilkan keberhasilan |
| Belum ada hasil | **Belum ada hasil tersimpan** | **Tinjau KRS** untuk melanjutkan pengisian |
| Data lokal tidak dapat dibaca | Pemberitahuan untuk memeriksa pilihan yang tersedia | Tampilkan data yang dapat dipulihkan; jangan mengklaim semua pilihan tersimpan |

## Ponsel dan penggunaan keyboard

Pada lebar 360 px, informasi dan tindakan mengikuti satu kolom tanpa memerlukan pergeseran halaman ke samping. Pada layar kecil, pengguna membandingkan alternatif dengan menggulir pada halaman yang sama. Panel draf samping disembunyikan pada lebar sampai 55rem; tautan Tinjau KRS dan total SKS tetap ada di navigasi. Rincian breakpoint mengikuti sistem desain.

Semua kontrol menggunakan tautan, tombol, atau masukan HTML sesuai fungsinya. Pencarian memiliki label terlihat. Fokus keyboard diberi garis yang jelas dan tautan **Lompat ke konten** tersedia sebelum header. Status tidak disampaikan melalui warna saja.

Setelah pergantian layar, fokus diarahkan ke judul. Saat kembali dari detail ke pilihan, fokus dipulihkan ke tautan detail kelas yang sebelumnya dibuka. Saat kembali dari pilihan ke Penawaran, fokus dipulihkan ke kartu mata kuliah. Pencarian dipertahankan selama sesi halaman; isi pencarian tidak disimpan ke penyimpanan lokal.

Konfirmasi tambah atau ganti memindahkan fokus ke tombol ya; pembatalan mengembalikannya ke tombol tambah atau ganti. Penghapusan memindahkan fokus ke tombol hapus berikutnya atau tautan menuju penawaran jika draf menjadi kosong. Penyimpanan memfokuskan pesan proses; kegagalan mengembalikan fokus ke tombol simpan ketika pengguna masih berada di layar tinjauan.

## Pemeriksaan penerimaan

Gunakan skenario berikut untuk memeriksa perilaku prototipe. Daftar ini merupakan kriteria pemeriksaan, bukan laporan pengujian pengguna.

| Pemeriksaan | Hasil yang diharapkan | Jejak PRD |
|---|---|---|
| Buka kelima layar pada 360 px dan desktop | Informasi, navigasi, serta aksi terbaca; tidak ada pergeseran halaman horizontal | UXR-01 |
| Baca dua alternatif satu mata kuliah | Hari dan jam 24 jam WIB terlihat tanpa konversi kode atau tab tambahan | UXR-02, UXR-03 |
| Pilih UX301-A lalu buka UX302-A | Nama kelas konflik dan irisan Senin 09.00–09.40 WIB muncul sebelum penambahan | UXR-03 |
| Pilih UX301-A lalu buka UX304-A | Jadwal bersentuhan di 09.40, bebas bentrok, dan dapat dipilih jika total mengizinkan | UXR-03, UXR-07 |
| Buka kedua kelas UX303 | Kuota penuh dan waktu belum tersedia memiliki penjelasan berbeda; keduanya tidak dapat ditambahkan | UXR-04 |
| Tambah dan ganti kelas, lalu batalkan | Draf tidak berubah sebelum konfirmasi; pembatalan mempertahankan pilihan | UXR-05 |
| Tambah mata kuliah 3 SKS saat draf berisi 6 SKS | Total proyeksi 9 SKS dijelaskan dan draf tetap 6 SKS | UXR-07 |
| Simpan hasil, muat ulang, lalu susun draf baru | Hasil terakhir tetap ada sampai hasil baru berhasil disimpan | UXR-06 |
| Simulasikan penyimpanan gagal | Pesan kegagalan tersedia dan data tidak ditandai berhasil disimpan | UXR-06 |
| Gunakan Tab, Shift+Tab, Enter, dan tombol Space pada tombol | Urutan fokus mengikuti isi; konfirmasi, kembali, dan hapus memiliki tujuan fokus yang masuk akal | Kualitas dan implementasi |

Keberhasilan tugas, pemahaman pengguna, dan waktu penyelesaian tetap memerlukan evaluasi dengan pengguna. Pemeriksaan fungsi maupun kesesuaian tampilan tidak menggantikan evaluasi pengalaman tersebut.
