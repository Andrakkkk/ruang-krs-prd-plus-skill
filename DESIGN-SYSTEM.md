# **DESIGN SYSTEM**

## **Project: Ruang KRS**

**Version:** 1.0

**Status:** Spesifikasi desain prototipe simulasi · Varian PRD + Skill

**Reference:** [PRD.md](PRD.md) v1.0, [UX-SPEC.md](UX-SPEC.md) v1.0, [Rancang KRS Mobile](.agents/skills/rancang-krs-mobile/SKILL.md)

---

# **1. Design Direction**

## **1.1 Design Concept**

Ruang kerja akademik dengan latar krem hangat, teks navy, dan aksen merah bata. Judul serif memberi hierarki, sedangkan font sistem membantu pembacaan informasi kelas. Spesifikasi mengikuti [CSS aplikasi](ruang-krs/assets/css), struktur [index.html](ruang-krs/index.html), dan [komponen bersama](ruang-krs/src/ui/shared.js).

Karakteristik desain:

- Informasi kelas lebih menonjol daripada dekorasi.
- Urutan jadwal, kuota, dosen, dan tindakan konsisten antaralternatif.
- Panel draf melengkapi konten pada desktop; ponsel memakai alur vertikal.
- Status dijelaskan melalui tulisan, dengan warna sebagai pendukung.
- Elemen merek dan pencarian dibuat dengan CSS tanpa dependensi ikon eksternal.

## **1.2 Design Principles**

1. **Clarity:** Nama kelas, waktu, dan konsekuensi pilihan mudah dipindai.
2. **Consistency:** Gunakan token, tipografi, status, dan label aksi yang sama pada lima layar.
3. **Simplicity:** Pertahankan ruang kosong dan ornamen yang memiliki fungsi.
4. **Accessibility:** Sediakan label, fokus terlihat, dan informasi yang dipahami tanpa warna.
5. **Reusability:** Gunakan komponen kartu, fakta kelas, status, dan ringkasan yang sudah tersedia.

---

# **2. Color System**

## **2.1 Primary Colors**

| Token | Hex | Usage |
|---|---|---|
| `--brick` | `#943e32` | Tombol utama, tanda merek, bingkai kartu saat hover |
| `--brick-dark` | `#762d25` | Hover tombol utama, tautan aksi, teks perhatian dan navigasi aktif |
| `--brick-pale` | `#f6e4dc` | Latar perhatian, penghitung SKS, dan hover tombol teks |

Tombol utama menggunakan teks putih. Tidak ada warna primer biru atau gradasi baru dalam varian ini.

## **2.2 Neutral Colors**

| Token | Hex | Usage |
|---|---|---|
| `--canvas` | `#f8f3e9` | Latar halaman |
| `--paper` | `#fffcf6` | Header, kartu, panel detail, dan masukan |
| `--rail` | `#efe8db` | Panel draf, ringkasan, konfirmasi, dan navigasi aktif |
| `--line` | `#d9cebd` | Bingkai dan pemisah |
| `--navy` | `#1c303e` | Judul dan teks utama |
| `--muted` | `#50606a` | Keterangan, label fakta, placeholder, dan teks netral |
| `--status-neutral` | `#efeae2` | Latar status netral dan tombol nonaktif |

Bingkai masukan pencarian memakai nilai langsung `#a59885`; tombol sekunder memakai `#a69780`. Kedua nilai sudah ada dalam CSS, belum berupa variabel.

## **2.3 Semantic Colors**

| Token | Hex | Usage |
|---|---|---|
| `--positive` | `#2b584b` | Teks bebas bentrok, label Di draf, dan umpan balik berhasil |
| `--positive-pale` | `#e9efe7` | Latar keadaan positif |
| `--brick-dark` / `--brick-pale` | `#762d25` / `#f6e4dc` | Pasangan teks/latar perhatian atau kegagalan |
| `--focus` | `#265d84` | Garis fokus keyboard |

## **2.4 Class Status Colors**

| Status | Color | Background |
|---|---|---|
| Di draf | `--positive` | `--positive-pale` |
| Tidak bentrok | `--positive` | `--positive-pale` |
| Bentrok atau melebihi batas SKS | `--brick-dark` | `--brick-pale` |
| Jadwal belum dapat diperiksa | `--muted` | `--status-neutral` |
| Kelas penuh | Penegasan `--brick-dark` pada informasi kuota | Mengikuti permukaan kartu |

Warna tidak menjadi satu-satunya penanda. Jadwal, kuota, dan dosen adalah fakta terpisah; tulisan **Tidak bentrok** tidak berarti semua syarat penambahan sudah terpenuhi.

---

# **3. Typography System**

## **3.1 Font Family**

- **Primary Font:** `system-ui, -apple-system, 'Segoe UI', sans-serif` untuk teks antarmuka.
- **Heading Font:** `Georgia, serif` untuk merek, judul halaman, dan judul panel/kartu tertentu.
- **Code Font:** `Consolas, 'Courier New', monospace` untuk kode mata kuliah.

Ukuran dasar memakai `font-size: 100%`, mengikuti preferensi pengguna. Padanan piksel hanya berlaku bila ukuran dasar peramban 16 px.

## **3.2 Typography Scale**

| Token atau selector | Size | Weight | Usage |
|---|---|---|---|
| `.brand` | 1.5rem | Bold | Merek Ruang KRS |
| `.page-intro h1` | `clamp(2.4rem, 5.25vw, 4.05rem)` | 400 | Judul halaman |
| Judul panel/detail | 1.35rem | 700 | Ringkasan, detail, dan keadaan kosong |
| `.course-card h3` | `clamp(1.15rem, 2vw, 1.35rem)` | 700 | Nama mata kuliah |
| `.class-facts` | 0.88rem | Nilai 625 | Jadwal, kuota, dan dosen |
| Label pencarian | 0.87rem | 700 | Label masukan |
| `.button` | 0.85rem | 750 | Label aksi |
| `.course-code` | 0.82rem | 700 | Kode mata kuliah |
| `.simulation-label` | 0.75rem | Normal | Mode simulasi |

Line height mengikuti konteks: dasar 1.5, judul halaman 1.04, judul panel/kartu 1.2, tombol 1.25, dan label simulasi 1.35. Judul halaman memakai jarak huruf −0.045em; kode mata kuliah 0.055em.

Jam dan angka SKS menggunakan `font-variant-numeric: tabular-nums`. Format jadwal: **Senin 08.00–09.40 WIB**. Data tanpa waktu ditulis **Waktu belum tersedia**, tanpa angka perkiraan.

---

# **4. Spacing System**

CSS saat ini memakai jarak menurut konteks komponen, belum memiliki skala global bernama `space-*`. Pertahankan nilai yang sudah digunakan berikut.

| Token atau selector | Value | Usage |
|---|---|---|
| `--side` | `clamp(1rem, 3.5vw, 2rem)` | Ruang samping halaman |
| `.workspace` | Gap 1.6rem; menjadi 1rem sampai 55rem | Konten dan panel samping |
| `.course-grid`, `.option-grid` | Gap 0.85rem; menjadi 0.65rem sampai 37rem | Jarak antarkartu |
| `.option-card` | Padding 1.05rem, gap 0.7rem | Isi kartu kelas |
| `.draft-panel`, `.summary-panel` | Padding 1.15rem | Isi panel ringkas |
| `.detail-panel` | Padding `clamp(1rem, 3vw, 1.55rem)` | Isi detail |
| `.class-confirmation` | Padding 0.8rem | Konfirmasi inline |
| `.actions` | Gap 0.55rem, boleh membungkus | Kelompok tombol |

Nama panjang dan alasan pembatasan boleh membungkus. Jangan memotong informasi hanya untuk menyamakan tinggi kartu.

---

# **5. Layout System**

## **5.1 Main Layout**

**Desktop:**

- Lebar konten maksimum `--shell: 71rem`, dengan margin tengah.
- Ruang kerja: `minmax(0, 1fr) minmax(15.25rem, 18.5rem)` untuk konten dan panel samping.
- Grid mata kuliah dan alternatif memakai dua kolom.
- Navigasi berada di header, bukan sidebar.

**Tablet:**

- Pada lebar sampai 55rem, ruang kerja menjadi satu kolom.
- Panel draf samping disembunyikan; panel ringkasan pada tinjauan dan hasil tetap mengikuti daftar.
- Tinjau KRS dan total SKS tetap tersedia dalam navigasi.

**Mobile:**

- Pada lebar sampai 37rem, header menjadi dua baris dan kartu satu kolom.
- Navigasi tetap menampilkan Penawaran, Tinjau KRS, dan Hasil.
- Halaman 360 px tidak memerlukan geser horizontal. Tidak ada panel mengambang yang menutup isi.

## **5.2 Responsive Breakpoints**

| Breakpoint | Width | Layout |
|---|---|---|
| Mobile | Sampai 37rem | Header dua baris, kartu satu kolom, jarak lebih ringkas |
| Tablet | Di atas 37rem sampai 55rem | Ruang kerja satu kolom, kartu dua kolom, tanpa panel draf samping |
| Desktop | Di atas 55rem | Konten utama dan panel samping |
| Maximum content width | 71rem | Lebar konten maksimum pada layar luas |

Breakpoint 37rem dan 55rem setara sekitar 592 px dan 880 px pada dasar 16 px. Perubahan ukuran dasar pengguna tetap harus dihormati.

---

# **6. Component Design Specifications**

## **6.1 Buttons**

| Type | Appearance | Usage |
|---|---|---|
| Primary | Latar brick, teks putih; hover brick-dark | Tambah, ganti, konfirmasi, simpan, mulai/lanjutkan pengisian |
| Secondary | Latar paper, bingkai `#a69780`, teks navy | Detail, alternatif, batal, dan akses dari keadaan kosong |
| Text | Transparan, teks brick-dark; hover brick-pale | Hapus kelas |
| Disabled | Latar status-neutral, teks muted, bingkai line | Aksi terhalang atau sedang diproses |

Specifications:

- Tinggi minimum 2.75rem; padding 0.55rem 0.84rem; radius 0.4rem.
- Ukuran font 0.85rem, bobot 750, tinggi baris 1.25.
- Target tombol utama minimal 44 × 44 piksel CSS sesuai PRD. Lebar tombol saat ini mengikuti label dan padding; tinggi minimum saja tidak cukup untuk kontrol ikon baru.
- Jelaskan alasan aksi nonaktif di dekatnya. Tautan berpindah layar; tombol mengubah data atau membuka konfirmasi.

## **6.2 Input Fields**

Masukan yang digunakan adalah **Search Input** untuk nama atau kode mata kuliah.

- Label terlihat: **Cari mata kuliah**. Placeholder memberi contoh, tidak menggantikan label.
- Tinggi minimum 3.15rem; lebar 100%; padding 0.6rem 1rem 0.6rem 2.55rem.
- Bingkai 1 px `#a59885`, radius 0.45rem, latar paper, teks navy.
- Ikon pencarian dekoratif tidak menerima fokus. Jumlah hasil memakai `role="status"`.
- Belum ada textarea, date picker, time picker, atau formulir akun dalam lingkup ini.

## **6.3 Cards**

Specifications:

- Permukaan paper, bingkai 1 px line, radius `--radius: .75rem`.
- Tanpa bayangan tambahan. Grid dan padding mengikuti bagian Spacing System.
- Kartu mata kuliah merupakan tautan; hover memperjelas bingkai dan label aksi.
- Kartu kelas menggunakan urutan identitas, jadwal, kuota, dosen, pemeriksaan, lalu tindakan.

Types: Course Card, Class Option Card, Class Detail Panel, Draft Panel, Summary Panel, dan Empty State Panel.

## **6.4 Status Badge**

Label **Di draf** memakai `.state-tag`: warna positive, latar positive-pale, radius 0.3rem, padding 0.12rem 0.45rem, font 0.76rem, dan bobot 750.

Pemeriksaan jadwal memakai `.status-box` dengan padding 0.55rem 0.65rem, radius 0.25rem, garis kiri 3 px, serta font 0.835rem. Variannya `.status-clear`, `.status-muted`, dan `.status-attention`. Sertakan judul serta nama kelas/jam irisan ketika ada konflik.

## **6.5 Navigation**

**Desktop:** merek dan label simulasi di kiri, tiga tautan utama di header. Item aktif memakai rail, brick-dark, dan `aria-current`. Tautan memiliki tinggi minimum 2.75rem.

**Mobile:** merek dan label simulasi berada pada baris pertama; navigasi tiga kolom pada baris berikutnya. Label dan total SKS tetap terlihat. Tautan kembali tersedia pada layar turunan.

## **6.6 Modal and Inline Confirmation**

Prototipe menggunakan **konfirmasi inline**, bukan modal. `.class-confirmation` berada dalam halaman detail, berlatar rail, bingkai 1 px line, radius 0.5rem, dan padding 0.8rem.

Konfirmasi menyebut mata kuliah, kelas, dan jadwal serta tombol ya dan **Batal**. Fokus menuju tombol ya, lalu kembali ke tombol tambah/ganti jika dibatalkan. Tidak ada overlay, penguncian halaman, atau perangkap fokus modal. Penghapusan draf dilakukan langsung dengan umpan balik.

## **6.7 Toast Notification and Inline Feedback**

Umpan balik saat ini ditampilkan **inline**, tidak berupa toast mengambang dengan hitung mundur.

| Type | Component | Behavior |
|---|---|---|
| Success | `.feedback-note` | Teks positive di atas positive-pale untuk hasil perubahan draf |
| Attention or Error | `.inline-alert` | Teks brick-dark di atas brick-pale untuk penyimpanan gagal, draf usang, atau rute tidak dikenal |
| Processing | `.submission-progress` | Teks navy di atas paper; **Menyimpan…** pada tombol |

Ketiganya memakai radius 0.4rem, padding 0.6rem 0.75rem, dan font 0.85rem. Pengumuman tindakan memakai `aria-live="polite"`; kegagalan penyimpanan hasil memakai `role="alert"`. Pesan kegagalan menjelaskan akibat serta cara mencoba lagi, tanpa menyatakan penyimpanan berhasil.

---

# **7. Class Schedule Component**

## **7.1 Class Schedule Facts**

Gunakan `.class-facts` dengan pasangan `dl`, `dt`, dan `dd`. Urutan tetap: **Jadwal**, **Kuota**, **Dosen**. Label memakai muted; nilai lebih tebal. Nama dosen dan fakta panjang dapat membungkus. Ketersediaan kursi tidak disamakan dengan kelengkapan waktu.

## **7.2 Draft and Result Schedule**

Draf ringkas memakai `.compact-list`. Tinjauan serta hasil memakai `.selection-list` berisi kode, SKS, nama, kelas, hari, dan jam. Ringkasan menampilkan jumlah kelas dan total SKS; draf juga menyertakan batas demo.

Komponen yang tersedia adalah daftar jadwal. Matriks mingguan, navigasi bulan, pemilihan tanggal, dan ekspor kalender belum diimplementasikan. UXR-08 tetap tercatat sebagai pengembangan berikutnya dalam PRD.

## **7.3 Schedule Indicators**

- **Tidak bentrok:** positive; jika jam bersentuhan, jelaskan waktu pertemuannya.
- **Bentrok dengan draf KRS:** attention; sebutkan nama kelas dan interval irisan.
- **Jadwal belum dapat diperiksa:** muted; jelaskan waktu belum tersedia.
- **Kelas penuh:** penegasan teks pada kuota 0.
- **Melebihi batas SKS simulasi:** attention; sebutkan proyeksi dan batas 8 SKS.

Semua indikator harus terbaca pada ponsel tanpa memerlukan warna atau ingatan dari layar lain.

---

# **8. Iconography**

Prototipe menggunakan ikon dekoratif dari CSS dan karakter panah, tanpa pustaka Lucide atau dependensi ikon tambahan.

- Tanda kalender merek dibuat dengan pseudo-element pada `.brand-mark` berukuran 2.125rem.
- Ikon pencarian `.search-mark` berukuran 0.8rem dan tidak menerima interaksi.
- Panah pada tautan/tombol mendampingi label teks dan memakai `aria-hidden="true"`.
- Ikon tidak menggantikan nama kontrol. Tidak ada tombol ikon tanpa label pada alur saat ini.

---

# **9. Design Tokens**

Variabel berikut merupakan nilai aktual `:root` dalam CSS. Gunakan kembali saat mengubah komponen; ukuran tipografi dan jarak kontekstual dijelaskan pada bagian sebelumnya.

```css
:root {
  --canvas: #f8f3e9;
  --paper: #fffcf6;
  --rail: #efe8db;
  --line: #d9cebd;
  --navy: #1c303e;
  --muted: #50606a;
  --brick: #943e32;
  --brick-dark: #762d25;
  --brick-pale: #f6e4dc;
  --focus: #265d84;
  --positive: #2b584b;
  --positive-pale: #e9efe7;
  --status-neutral: #efeae2;
  --radius: .75rem;
  --shell: 71rem;
  --side: clamp(1rem, 3.5vw, 2rem);
}
```

Tidak semua nilai CSS telah dijadikan token. Jangan mencantumkan nama token baru seolah sudah diimplementasikan; selaraskan dokumentasi dengan CSS bila refaktor dilakukan.

---

# **10. Accessibility Guidelines**

1. Pertahankan keterbacaan serta kontras teks dan latar. Pemeriksaan visual bukan pengganti audit aksesibilitas lengkap.
2. Sertai warna dengan status tertulis: Di draf, Tidak bentrok, Kelas penuh, atau jadwal belum tersedia.
3. Beri label terlihat pada pencarian, serta nama yang menjelaskan tujuan setiap tautan/tombol.
4. Gunakan elemen HTML sesuai fungsi, bahasa dokumen `id`, landmark halaman, dan satu judul utama per layar.
5. Pertahankan `:focus-visible`: outline 3 px warna focus dengan offset 3 px. Tautan **Lompat ke konten** muncul saat fokus dan memindahkannya ke `main`.
6. Pulihkan fokus saat menelusuri kembali, membatalkan konfirmasi, menghapus kelas, atau memulihkan kesalahan. Rincian mengikuti UX-SPEC dan INTERACTION-SPEC.
7. Periksa alur dengan keyboard, pembesaran teks, nama kontrol, dan lebar 360 px. Dokumen ini tidak menyatakan audit lengkap telah lulus.

---

# **11. Design Consistency Rules**

1. Gunakan kembali kartu, fakta kelas, status, tombol, dan panel ringkasan sebelum membuat pola baru.
2. Pertahankan palet hangat, navy, dan merah bata; gunakan token aktual dari bagian 9.
3. Ikuti hierarki serif untuk judul dan font sistem untuk informasi serta tindakan.
4. Gunakan urutan identitas, hari/jam, kuota, dosen, pemeriksaan, lalu aksi pada alternatif.
5. Pakai varian tombol sesuai fungsi dan label Indonesia yang sama pada seluruh layar.
6. Istilah **draf** berarti pilihan yang masih disusun; **hasil simulasi** berarti hasil yang berhasil disimpan lokal.
7. Pertahankan breakpoint 37rem/55rem serta akses Tinjau KRS ketika panel samping disembunyikan.
8. Konfirmasi tambah/ganti tetap inline; pesan proses dan kegagalan tetap dekat konteks tindakan.
9. Pertahankan lima layar dan batas PRD. Jejak desain: kartu UXR-01, waktu UXR-02, konflik UXR-03, fakta terpisah UXR-04, konfirmasi UXR-05, umpan balik UXR-06, serta penghitung SKS UXR-07. Matriks mingguan UXR-08 masih ditunda.

---

**End of DESIGN-SYSTEM v1.0**
