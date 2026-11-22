# Sistem Desain Ruang KRS

Versi 1.0 · Varian PRD dan Skill · Worksheet 12 Rekayasa Interaksi

Sistem desain ini mendokumentasikan tampilan yang digunakan dalam [styles.css](styles.css), komponen pada [app.js](app.js), serta struktur [index.html](index.html). Acuannya adalah [PRD](PRD.md), [spesifikasi UX](UX-SPEC.md), dan skill lokal [Rancang KRS Mobile](.agents/skills/rancang-krs-mobile/SKILL.md). Nilai di bawah mempertahankan desain prototipe saat ini.

## Arah visual

Ruang KRS memakai latar krem hangat, teks navy, dan aksen merah bata. Tipografi serif menonjolkan judul dan identitas, sedangkan teks antarmuka memakai font sistem agar informasi kelas mudah dipindai. Panel ringkas draf melengkapi ruang kerja pada desktop. Ponsel mengutamakan alur vertikal dan akses draf melalui navigasi.

Warna membantu membedakan keadaan, tetapi status selalu disertai tulisan. Ornamen dibatasi pada tanda kalender merek dan ikon pencarian yang dibuat dengan CSS. Keduanya bersifat dekoratif; label teks tetap menjelaskan fungsi.

## Token warna

Semua nama token pada tabel berikut sudah tersedia di `:root` dalam CSS.

| Token | Nilai | Pemakaian |
|---|---|---|
| `--canvas` | `#f8f3e9` | Latar halaman |
| `--paper` | `#fffcf6` | Header, kartu, detail, dan masukan |
| `--rail` | `#efe8db` | Panel draf, ringkasan, konfirmasi, serta latar navigasi aktif |
| `--line` | `#d9cebd` | Bingkai dan pemisah |
| `--navy` | `#1c303e` | Teks utama dan judul |
| `--muted` | `#50606a` | Keterangan, label fakta, placeholder, dan keadaan netral |
| `--brick` | `#943e32` | Tombol utama dan tanda merek |
| `--brick-dark` | `#762d25` | Hover tombol utama, tautan aksi, dan teks perhatian |
| `--brick-pale` | `#f6e4dc` | Latar perhatian dan penghitung SKS |
| `--focus` | `#265d84` | Garis fokus keyboard |
| `--positive` | `#2b584b` | Teks bebas bentrok, status di draf, dan umpan balik berhasil |
| `--positive-pale` | `#e9efe7` | Latar keadaan positif |
| `--status-neutral` | `#efeae2` | Latar status netral dan tombol nonaktif |

Tombol utama memakai teks putih. Bingkai masukan pencarian menggunakan `#a59885`, sedangkan tombol sekunder memakai `#a69780`. Kedua nilai tersebut merupakan nilai langsung pada CSS, belum menjadi variabel. Jangan menyamakan warna perhatian dengan arti kelas penuh: label menjelaskan apakah masalahnya kuota, bentrok, atau batas SKS.

## Tipografi

Ukuran `rem` mengikuti pengaturan font pengguna. Padanan piksel hanya berlaku bila ukuran dasar peramban 16 px; CSS mempertahankan `font-size: 100%` dan tinggi baris dasar 1.5.

| Peran | Aturan yang digunakan |
|---|---|
| Teks antarmuka | `system-ui, -apple-system, 'Segoe UI', sans-serif` |
| Merek | Georgia atau serif, tebal, 1.5rem, tinggi baris 1 |
| Judul halaman | Georgia atau serif, bobot 400, `clamp(2.4rem, 5.25vw, 4.05rem)`, tinggi baris 1.04, jarak huruf −0.045em |
| Judul panel dan detail | Georgia atau serif, tebal, 1.35rem, tinggi baris 1.2 |
| Judul kartu mata kuliah | Georgia atau serif, tebal, `clamp(1.15rem, 2vw, 1.35rem)`, tinggi baris 1.2 |
| Fakta kelas | 0.88rem; nilai lebih tebal daripada label |
| Label pencarian | 0.87rem, bobot 700 |
| Tombol | 0.85rem, bobot 750, tinggi baris 1.25 |
| Kode mata kuliah | Consolas atau Courier New, 0.82rem, bobot 700, jarak huruf 0.055em |
| Label simulasi | 0.75rem, tinggi baris 1.35 |

Jam dan angka SKS memakai `font-variant-numeric: tabular-nums` agar perubahan angka tidak mengganggu penjajaran. Jadwal ditulis **Senin 08.00–09.40 WIB**. Jika data belum tersedia, gunakan tulisan **Waktu belum tersedia**, bukan kode kosong atau jam perkiraan.

## Tata letak dan ukuran

| Aturan | Nilai dalam CSS | Fungsi |
|---|---|---|
| Lebar konten maksimum | `--shell: 71rem` | Membatasi panjang baris dan lebar ruang kerja |
| Ruang samping | `--side: clamp(1rem, 3.5vw, 2rem)` | Menjaga jarak isi dari tepi layar |
| Radius panel | `--radius: .75rem` | Bentuk dasar kartu dan panel |
| Ruang kerja lebar | `minmax(0, 1fr) minmax(15.25rem, 18.5rem)` | Konten utama dan panel draf atau ringkasan |
| Jarak kolom ruang kerja | 1.6rem; menjadi 1rem sampai 55rem | Pemisahan isi utama dan panel |
| Grid mata kuliah dan kelas | Dua kolom, jarak 0.85rem | Perbandingan alternatif pada layar lebar |
| Padding kartu kelas | 1.05rem | Ruang baca fakta dan status |
| Padding detail | `clamp(1rem, 3vw, 1.55rem)` | Menyesuaikan ruang dalam panel |
| Tombol | Tinggi minimum 2.75rem; padding 0.55rem 0.84rem | Memenuhi tinggi sentuh 44 px pada dasar 16 px |
| Masukan pencarian | Tinggi minimum 3.15rem | Area mengetik yang lapang |

CSS menggunakan jarak sesuai konteks komponen, bukan satu skala token jarak global. Pertahankan hubungan visual yang ada: identitas kelas, fakta, penjelasan kondisi, lalu tindakan. Nama panjang boleh membungkus; nama dan alasan pembatasan tidak dipotong demi menyamakan tinggi kartu.

PRD mensyaratkan target sentuh utama minimal 44 × 44 piksel CSS. Tombol berlabel pada prototipe memakai tinggi minimum 2.75rem dan lebar mengikuti label serta padding. Jangan membuat kontrol ikon kecil dengan menganggap tinggi saja sudah memenuhi ukuran target.

## Komponen dan perilaku visual

| Komponen | Struktur dan keadaan |
|---|---|
| Header dan navigasi | Merek, label Mode simulasi, lalu Penawaran, Tinjau KRS, dan Hasil. Navigasi aktif memakai latar rail, teks brick-dark, serta `aria-current`. Total SKS ditampilkan pada Tinjau KRS. |
| Kartu mata kuliah | Kode dan SKS, nama, jumlah alternatif, lalu **Lihat pilihan kelas**. Seluruh kartu merupakan tautan. Hover menegaskan bingkai dan label aksi. |
| Kartu kelas | Identitas kelas dan label **Di draf** jika dipilih; urutan fakta tetap jadwal, kuota, dosen. Status konflik dan batas SKS berada sebelum tautan detail. |
| Fakta kelas | Pasangan label dan nilai memakai `dl`, `dt`, dan `dd`, dengan pemisah tipis. Waktu dan kuota diperlakukan sebagai data berbeda. |
| Status perhatian | `.status-attention`: brick-dark di atas brick-pale, garis kiri 3 px. Menjelaskan bentrok atau batas SKS dengan judul dan rincian. |
| Status netral | `.status-muted`: muted di atas status-neutral. Menjelaskan jadwal yang belum dapat diperiksa. |
| Status positif | `.status-clear`: positive di atas positive-pale. Menyatakan tidak bentrok; jam yang bersentuhan dijelaskan dalam teks. |
| Konfirmasi kelas | `.class-confirmation`: panel inline berlatar rail. Memuat identitas pilihan, jadwal, tombol ya, dan **Batal**. Bukan modal atau layar keenam. |
| Panel draf | Isi ringkas pilihan dan total SKS dengan tautan **Tinjau KRS**. Panel ini disembunyikan pada layar sampai 55rem. |
| Panel ringkasan | Jumlah kelas dan total SKS. Pada tinjauan, sertakan batas simulasi serta tombol simpan; pada hasil, tawarkan pengisian berikutnya. |
| Daftar pilihan | Setiap baris berisi kode, SKS, nama, kelas, dan jadwal. Tindakan **Hapus** hanya ada pada draf. |
| Keadaan kosong | Judul, penjelasan singkat, dan aksi menuju langkah yang relevan. Gunakan untuk pencarian kosong, draf kosong, dan hasil yang belum ada. |
| Umpan balik | `.feedback-note` untuk perubahan berhasil; `.inline-alert` untuk perhatian atau kegagalan; `.submission-progress` untuk proses simpan. Pesan menyebut akibat dan langkah berikutnya. |

### Tombol dan masukan

Tautan dipakai untuk berpindah layar; tombol dipakai untuk mengubah pilihan, membuka konfirmasi, menghapus, atau menyimpan. Jangan menambahkan tindakan perubahan data langsung pada kartu penawaran.

| Jenis | Tampilan | Penggunaan |
|---|---|---|
| `.button-primary` | Latar brick, teks putih; hover brick-dark | Tambah, ganti, konfirmasi, simpan, dan mulai atau lanjutkan pengisian |
| `.button-secondary` | Latar paper, bingkai hangat, teks navy; hover brick-dark | Detail, alternatif kelas, batal, dan kembali ke penawaran dari keadaan kosong |
| `.button-text` | Latar transparan, teks brick-dark; hover brick-pale | Hapus kelas dari draf |
| `:disabled` | Latar status-neutral, teks muted, bingkai line | Aksi yang belum memenuhi syarat atau sedang diproses |

Setiap tombol nonaktif harus memiliki alasan yang terbaca di dekatnya. Pengguna tetap dapat membuka detail kelas penuh atau kelas tanpa jadwal. Pada pencarian, label **Cari mata kuliah** selalu terlihat; placeholder hanya memberi contoh nama atau kode. Ikon pencarian tidak menerima fokus dan tidak menggantikan label.

## Responsif

Breakpoint ditulis dalam `rem` pada CSS. Padanan 880 px dan 592 px berikut mengasumsikan dasar 16 px.

| Lebar | Penyesuaian |
|---|---|
| Di atas 55rem | Ruang kerja dua kolom dengan panel samping; kartu penawaran dan alternatif dua kolom |
| Sampai 55rem | Ruang kerja satu kolom; panel draf samping hilang; panel ringkasan tinjauan dan hasil tetap ditampilkan setelah daftar |
| Sampai 37rem | Merek dan navigasi menjadi dua baris; navigasi tiga kolom; kartu satu kolom; jarak grid 0.65rem; padding halaman dan baris pilihan diperkecil |

Pada 360 px, akses draf melalui navigasi dan penghitung SKS harus tetap tersedia. Jangan mengganti panel draf yang disembunyikan dengan elemen mengambang yang menutup isi. Alternatif pada ponsel dibandingkan melalui gulir vertikal di halaman yang sama; tidak perlu tab peramban baru.

## Fokus dan aksesibilitas

`:focus-visible` memakai garis 3 px warna focus dengan jarak 3 px. Garis fokus berlaku pada tautan, tombol, masukan, dan sasaran fokus programatis yang relevan. Jangan menghilangkan outline tanpa pengganti yang terlihat.

- Tautan **Lompat ke konten** tersembunyi di luar layar sampai mendapat fokus; aktivasi memindahkan fokus ke `main`.
- Dokumen memakai bahasa Indonesia, satu judul utama per layar, landmark header, navigasi, main, dan footer.
- Fokus kembali ke pemicu detail atau kartu mata kuliah saat pengguna menelusuri balik. Pergantian layar lain memfokuskan judul.
- Konfirmasi inline memfokuskan tombol ya; pembatalan kembali ke tombol tambah atau ganti. Tidak ada perangkap fokus modal.
- Pengumuman tindakan memakai area `aria-live="polite"`. Jumlah hasil pencarian memakai `role="status"`; kegagalan penyimpanan hasil memakai `role="alert"`.
- Keadaan **Di draf**, **Kelas penuh**, **Tidak bentrok**, dan jadwal belum tersedia selalu tertulis. Tanda warna atau ikon tidak menjadi satu-satunya petunjuk.

Spesifikasi ini tidak menyatakan bahwa audit aksesibilitas lengkap telah lulus. Saat mengubah komponen, periksa kontras kombinasi yang digunakan, pembesaran teks, urutan fokus, nama kontrol, dan lebar 360 px pada antarmuka yang dirender.

## Konsistensi bahasa dan jejak kebutuhan

Gunakan istilah **draf** untuk pilihan yang masih disusun dan **hasil simulasi** untuk hasil yang sudah disimpan secara lokal. Hindari pesan **KRS resmi berhasil diajukan**. Tuliskan nama kelas dan rentang waktu pada konflik agar pengguna dapat mengambil keputusan tanpa mengingat layar sebelumnya.

| Keputusan desain | Kebutuhan yang dilayani |
|---|---|
| Kartu vertikal, nama membungkus, aksi berlabel | UXR-01 dan UXR-05 |
| Angka tabular dan format waktu 24 jam WIB | UXR-02 |
| Penjelasan konflik dekat alternatif dan jalur kembali | UXR-03 |
| Fakta kuota, dosen, dan waktu terpisah | UXR-04 |
| Konfirmasi inline dengan nama kelas | UXR-05 |
| Pesan proses, berhasil, gagal, dan keadaan kosong | UXR-06 |
| Penghitung SKS di navigasi dan panel ringkasan | UXR-07 |
| Daftar hasil dengan hari dan waktu | Mendukung peninjauan; matriks mingguan UXR-08 masih di luar implementasi saat ini |
