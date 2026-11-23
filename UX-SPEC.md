# **USER EXPERIENCE SPECIFICATION (UX-SPEC)**

## **Fitur: Pemilihan Kelas dan Penyusunan KRS Ruang KRS**

**Versi:** 1.0

**Referensi:** [PRD.md](PRD.md) v1.0, Worksheet 8 UX Requirements

**Status:** Spesifikasi prototipe simulasi · Varian PRD + Skill

---

# **1. UX Overview**

## **1.1 UX Objective**

Membantu mahasiswa memahami penawaran kelas, mengetahui bentrok sebelum memilih, dan memeriksa hasil KRS melalui ponsel. Prioritas utama adalah **UXR-03**, mengetahui bentrok sebelum pilihan ditetapkan.

Pengguna harus dapat:

- Membaca hari serta jam mulai dan selesai tanpa menerjemahkan kode waktu.
- Membandingkan alternatif satu mata kuliah pada halaman yang sama.
- Membedakan kuota penuh, waktu belum tersedia, dan konflik dengan draf.
- Memeriksa identitas kelas sebelum mengonfirmasi tambah atau ganti.
- Meninjau total SKS serta mengetahui hasil tindakan dan penyimpanan.

## **1.2 UX Design Principles**

1. **Visibility:** Jadwal, kuota, dosen, dampak bentrok, dan total SKS mudah ditemukan.
2. **Simplicity:** Informasi tersedia dalam konteks pilihan tanpa membuka tab peramban tambahan.
3. **Consistency:** Urutan fakta dan label aksi konsisten antaralternatif.
4. **Feedback:** Perubahan draf serta penyimpanan memiliki respons yang jelas.
5. **Error Prevention:** Penambahan yang tidak memenuhi syarat dicegah sebelum draf berubah.
6. **Accessibility:** Label, status tertulis, fokus keyboard, dan tata letak ponsel mendukung penggunaan tanpa bergantung pada warna.

Skill [Rancang KRS Mobile](.agents/skills/rancang-krs-mobile/SKILL.md) memperjelas urutan informasi, konteks bentrok, akses draf pada ponsel, dan pemulihan fokus. Aturan visual mengikuti [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md).

---

# **2. User Context**

## **2.1 Primary Persona**

**Mahasiswa pengisi KRS mandiri melalui ponsel**

Karakteristik berdasarkan sasaran pengguna dalam PRD:

- Dapat sudah berpengalaman atau baru pertama kali mengisi KRS.
- Membutuhkan informasi waktu dan status kelas yang langsung dipahami.
- Terhambat oleh kode waktu, perpindahan tab, status ambigu, dan tampilan lebar.
- Ingin memilih kelas yang sesuai tanpa harus menghafal informasi layar sebelumnya.

Profil kerja ini tidak menambahkan identitas, usia, atau semester yang tidak ditetapkan dalam PRD.

## **2.2 User Goals**

| Goal | Expected Experience | Requirement |
|---|---|---|
| Membaca informasi di ponsel | Kartu dan tindakan terbaca pada lebar 360 px tanpa geser halaman horizontal | UXR-01 |
| Memahami waktu kuliah | Hari, jam mulai, dan jam selesai 24 jam WIB terlihat langsung | UXR-02 |
| Menghindari jadwal bentrok | Kelas terdampak dan rentang irisan diketahui sebelum penambahan | UXR-03 |
| Memahami ketersediaan | Kuota, kelengkapan waktu, dan dosen disampaikan terpisah | UXR-04 |
| Memilih kelas yang dimaksud | Nama kelas diperiksa sebelum tambah atau ganti dikonfirmasi | UXR-05 |
| Mengetahui hasil tindakan | Pesan proses, berhasil, dan gagal menjelaskan keadaan pilihan | UXR-06 |
| Memantau beban pilihan | Total dibanding batas demo 8 SKS diperbarui setelah perubahan | UXR-07 |
| Memeriksa hasil jadwal | Daftar hasil memuat hari dan waktu; matriks mingguan merupakan tahap berikutnya | UXR-08 |

UXR-01, UXR-02, UXR-03, dan UXR-05 berstatus Must Have dalam Worksheet 8 sebagaimana dicatat di PRD. UXR-04, UXR-06, dan UXR-07 mendukung demo; UXR-08 berstatus Could Have.

## **2.3 Main User Scenario**

Mahasiswa membuka Penawaran, mencari UX301, lalu membandingkan kelas Rekayasa Interaksi. Ia membaca Kelas A pada Senin 08.00–09.40 WIB, membuka detail, dan mengonfirmasi penambahannya ke draf.

Ketika membuka Analisis Data Kelas A, ia mengetahui bentrok dengan Rekayasa Interaksi A pada Senin 09.00–09.40 WIB. Ia kembali ke alternatif dan memilih Analisis Data B pada Rabu. Total draf menjadi 6 dari 8 SKS.

Mahasiswa meninjau daftar dan menyimpan hasil simulasi. Setelah penyimpanan berhasil, hasil ditampilkan dan draf dikosongkan. Data ini merupakan contoh demonstrasi, bukan jadwal atau pengajuan KRS resmi.

---

# **3. Information Architecture (IA)**

## **3.1 Sitemap**

```text
Ruang KRS
├── Penawaran mata kuliah (PAGE-01)
│   ├── Pencarian nama atau kode
│   └── Pilihan kelas (PAGE-02)
│       └── Detail kelas (PAGE-03)
│           ├── Pemeriksaan jadwal dan batas SKS
│           └── Konfirmasi tambah atau ganti
├── Tinjau KRS (PAGE-04)
│   ├── Daftar draf dan hapus kelas
│   └── Simpan hasil simulasi
└── Hasil simulasi (PAGE-05)
    ├── Daftar hasil terakhir
    └── Mulai atau lanjutkan pengisian
```

## **3.2 Primary Navigation**

1. **Penawaran** — `#/penawaran`.
2. **Tinjau KRS** — `#/tinjau`, disertai total dan batas SKS simulasi.
3. **Hasil** — `#/hasil`.

Pilihan dan detail kelas merupakan turunan Penawaran. Contoh rutenya `#/mata-kuliah/UX301` dan `#/kelas/UX301-A`. Tautan valid dapat dibuka langsung. Rute tidak dikenal diarahkan ke Penawaran dengan pemberitahuan. Konfirmasi inline bukan layar tambahan.

---

# **4. Page Specification**

## **PAGE-01: Penawaran Mata Kuliah**

### **Purpose**

Membantu mahasiswa menemukan mata kuliah yang akan dibandingkan.

### **Information Components**

- Judul dan penjelasan penawaran.
- Masukan berlabel **Cari mata kuliah**, contoh nama atau kode, dan jumlah hasil.
- Kartu berisi kode, SKS, nama mata kuliah, serta jumlah alternatif.
- Aksi **Lihat pilihan kelas** dan akses ke Tinjau KRS.
- Panel ringkas draf pada layar lebar; keadaan pencarian kosong bila diperlukan.

### **User Actions**

- Mengetik nama atau kode untuk menyaring daftar.
- Menghapus pencarian ketika tidak ada hasil.
- Membuka pilihan kelas, tinjauan, atau hasil.

### **Expected Outcome**

Pengguna menemukan mata kuliah dan memahami langkah berikutnya tanpa membuka tab baru. Pencarian tetap dipertahankan selama sesi halaman ketika menelusuri layar turunannya.

---

## **PAGE-02: Pilihan Kelas**

### **Purpose**

Menyediakan semua alternatif untuk satu mata kuliah agar jadwal dan kondisi pemilihannya dapat dibandingkan.

### **Information Components**

- Nama mata kuliah, kode, dan SKS.
- Identitas kelas serta label **Di draf** jika sudah dipilih.
- Hari dan jam WIB, kuota, serta dosen dalam urutan yang sama.
- Konflik beserta nama kelas dan jam irisan; penjelasan jam bersentuhan jika relevan.
- Peringatan proyeksi SKS dan tautan **Lihat detail kelas**.

### **User Actions**

- Membandingkan alternatif dalam satu halaman.
- Membuka detail kelas, termasuk kelas penuh atau tanpa waktu.
- Kembali ke Penawaran atau membuka Tinjau KRS.

### **Expected Outcome**

Pengguna mengetahui konsekuensi kandidat sebelum mengambil keputusan. Pada ponsel, alternatif disusun vertikal untuk diperiksa dengan gulir halaman yang sama.

---

## **PAGE-03: Detail Kelas**

### **Purpose**

Membantu pengguna memeriksa informasi dan mengonfirmasi kelas yang akan ditambahkan atau diganti.

### **Information Components**

- Identitas mata kuliah dan kelas, jadwal, kuota, serta dosen.
- Hasil pemeriksaan jadwal dan proyeksi total SKS.
- Alasan tertulis jika penambahan tidak tersedia.
- Keterangan kelas lama yang akan diganti untuk mata kuliah yang sama.
- Konfirmasi inline dengan nama, kelas, jadwal, tombol ya, dan **Batal**.

### **User Actions**

- Memilih **Tambahkan ke draf** atau **Ganti kelas di draf**, kemudian mengonfirmasi atau membatalkan.
- Memilih **Lihat alternatif kelas** saat kandidat terhalang.
- Membuka **Tinjau KRS** jika kelas sudah di draf.

### **Expected Outcome**

Draf berubah hanya setelah konfirmasi dan pemeriksaan syarat. Pembatalan mempertahankan pilihan. Kelas yang sama tidak ditambahkan dua kali; penggantian mempertahankan satu kelas per mata kuliah.

---

## **PAGE-04: Tinjau KRS**

### **Purpose**

Memastikan daftar kelas dan total SKS telah sesuai sebelum hasil simulasi disimpan.

### **Information Components**

- Daftar pilihan berisi kode, SKS, nama, kelas, hari, dan waktu.
- Tindakan **Hapus** untuk setiap kelas.
- Jumlah kelas dan total dibanding batas simulasi 8 SKS.
- Umpan balik perubahan, tombol **Simpan hasil simulasi**, serta pesan proses atau kegagalan.
- Petunjuk menuju Penawaran ketika draf kosong.

### **User Actions**

- Menghapus kelas langsung dari draf.
- Kembali menambah atau mengganti pilihan melalui Penawaran.
- Memeriksa daftar, lalu menyimpan hasil simulasi atau mencoba lagi jika gagal.

### **Expected Outcome**

Pengguna mengetahui isi draf sebelum menyimpan. Draf kosong tidak dapat disimpan. Selama proses, tombol simpan dan hapus nonaktif untuk mencegah tindakan berulang.

---

## **PAGE-05: Hasil Simulasi**

### **Purpose**

Menunjukkan hasil terakhir yang berhasil disimpan di peramban.

### **Information Components**

- Judul **Hasil simulasi** dan penjelasan penyimpanan lokal.
- Daftar kelas beserta hari dan waktu, jumlah kelas, serta total SKS.
- **Mulai pengisian baru** atau **Lanjutkan pengisian** sesuai keadaan draf.
- Keadaan **Belum ada hasil tersimpan** jika hasil belum tersedia.

### **User Actions**

- Memeriksa hasil atau kembali ke Penawaran.
- Memulai draf baru atau melanjutkan draf yang ada.
- Membuka Tinjau KRS jika belum ada hasil tersimpan.

### **Expected Outcome**

Pengguna membedakan hasil tersimpan dari draf yang masih disusun. Hasil lama tetap tersedia sampai penyimpanan hasil baru berhasil.

---

# **5. User Flow**

## **5.1 Flow: Menambahkan atau Mengganti Kelas**

```text
Penawaran → Pilihan kelas → Detail kelas → Pemeriksaan syarat
                                          ├── Terhalang → Baca alasan → Lihat alternatif
                                          └── Memenuhi → Tambah atau ganti → Konfirmasi
                                                                         ├── Batal → Detail
                                                                         └── Ya → Perbarui draf → Tinjau KRS
```

Kelas lama dari mata kuliah yang sama diabaikan saat memeriksa konflik dan menghitung proyeksi SKS. Penggantian tetap memerlukan konfirmasi identitas kandidat.

## **5.2 Flow: Menangani Bentrok Jadwal**

```text
Draf berisi UX301-A → Buka UX302-A → Bentrok Senin 09.00–09.40 WIB
                    → Lihat alternatif kelas → Buka UX302-B → Konfirmasi → Tinjau KRS
```

Jam bersentuhan bukan bentrok: UX301-A berakhir 09.40 dan UX304-A dimulai 09.40 pada Senin. Keduanya dapat dipilih jika total SKS masih memenuhi batas demo.

## **5.3 Flow: Menyimpan Hasil Simulasi**

```text
Tinjau KRS → Periksa daftar dan total → Simpan hasil simulasi → Menyimpan…
                                                              ├── Berhasil → Hasil baru tersimpan → Draf kosong → Hasil
                                                              ├── Gagal → Draf dan hasil lama tetap tersedia → Coba lagi
                                                              └── Draf berubah di tab lain → Tampilkan pilihan terbaru → Tinjau ulang
```

---

# **6. User Interaction Requirements**

## **6.1 Class Selection**

- Kandidat harus memiliki waktu, kuota lebih dari nol, bebas bentrok, dan total proyeksi maksimal 8 SKS.
- Detail menyebut kelas sebelum tambah atau ganti dikonfirmasi; **Batal** tidak mengubah draf.
- Kandidat yang sudah dipilih menawarkan Tinjau KRS. Kandidat terhalang tetap dapat dibaca dan memiliki jalan ke alternatif.
- Tombol utama memenuhi target sentuh minimal 44 × 44 piksel CSS sesuai PRD.

## **6.2 Schedule Interaction**

- Hari dan waktu menggunakan format 24 jam WIB, tanpa konversi kode internal InfoKHS.
- Bentrok terjadi pada hari sama jika `mulaiA < selesaiB` dan `mulaiB < selesaiA`.
- Sebutkan kelas di draf yang terdampak serta rentang irisannya sebelum penambahan.
- Waktu belum tersedia tidak dinyatakan bebas bentrok. Kuota dan dosen tetap ditampilkan terpisah.

## **6.3 Draft and Result Interaction**

- Total/batas SKS diperbarui pada navigasi dan tinjauan setelah perubahan. Proyeksi di atas batas tidak mengubah draf.
- Hapus langsung memperbarui daftar dan memberikan umpan balik; hasil terakhir tidak ikut dihapus.
- Draf dan hasil disimpan terpisah. Kegagalan perubahan draf mempertahankan pilihan dalam memori halaman dengan pemberitahuan penyimpanan sementara.
- Draf usang dari tab lain tidak boleh menimpa pilihan terbaru. Tampilkan pemberitahuan dan minta pengguna meninjau ulang sebelum mencoba lagi.

## **6.4 Feedback and Focus Interaction**

- Pesan menyebut tindakan dan kelas terkait; proses, berhasil, dan gagal dibedakan secara tertulis.
- Pergantian layar memfokuskan judul. Saat kembali dari detail ke pilihan, pulihkan fokus ke tautan detail; saat kembali ke Penawaran, ke kartu mata kuliah.
- Konfirmasi memfokuskan tombol ya; pembatalan kembali ke tombol tambah/ganti. Setelah hapus, fokus menuju tombol hapus yang tersisa atau tautan Penawaran.
- Penyimpanan memfokuskan pesan proses. Kegagalan memberi kesempatan mencoba lagi; pemberitahuan draf usang memfokuskan pesan jika pengguna masih di layar asal.
- Pengumuman tindakan menggunakan `aria-live="polite"`; tidak ada notifikasi push atau pengingat luar aplikasi.

Rincian interaksi dan skenario pemeriksaan tersedia pada [INTERACTION-SPEC.md](INTERACTION-SPEC.md) dan [ACCEPTANCE-CRITERIA.md](ACCEPTANCE-CRITERIA.md).

---

# **7. Responsive Experience**

## **Desktop**

- Di atas 55rem, konten dan panel samping membentuk dua kolom.
- Kartu penawaran dan alternatif memiliki dua kolom; navigasi berada pada header.
- Panel draf menampilkan ringkasan pilihan tanpa menggantikan halaman Tinjau KRS.

## **Tablet**

- Pada lebar sampai 55rem, ruang kerja menjadi satu kolom dan panel draf samping disembunyikan.
- Total SKS serta akses Tinjau KRS tetap ada di navigasi.
- Panel ringkasan pada tinjauan dan hasil mengikuti daftar, tetap tersedia untuk dibaca.

## **Mobile**

- Pada lebar sampai 37rem, header menjadi dua baris dan kartu menjadi satu kolom.
- Pada 360 px, informasi dan aksi tidak memerlukan geser halaman horizontal atau zoom.
- Alternatif dibandingkan melalui gulir vertikal dalam satu halaman.
- Fokus terlihat, pencarian berlabel, dan status dipahami tanpa warna.

---

# **8. Empty States**

### **Empty Search Results**

Pesan: **Mata kuliah tidak ditemukan**. Petunjuk: coba nama atau kode lain. Aksi: **Hapus pencarian**, lalu fokus kembali ke masukan.

### **Empty Draft**

Pesan: **Draf KRS masih kosong**. Aksi: **Lihat penawaran**. Tombol simpan nonaktif.

### **Empty Results**

Pesan: **Belum ada hasil tersimpan**. Aksi: **Tinjau KRS** untuk memeriksa dan menyimpan draf.

---

# **9. UX Error Prevention**

1. Periksa kuota, kelengkapan waktu, bentrok, duplikasi mata kuliah, dan proyeksi SKS sebelum perubahan.
2. Tampilkan alasan pembatasan dekat kandidat serta akses ke alternatif; jangan mengandalkan tombol nonaktif tanpa penjelasan.
3. Konfirmasikan tambah dan ganti. Penghapusan langsung memiliki umpan balik dan pembaruan fokus.
4. Cegah penyimpanan hasil ganda dan perubahan draf berulang ketika proses sebelumnya masih berjalan.
5. Jika penyimpanan akhir gagal, pertahankan draf dan hasil terakhir; jangan menampilkan keberhasilan.
6. Jika data lokal tidak terbaca, tampilkan pemberitahuan serta data yang dapat dipulihkan. Jika draf berubah di tab lain, tampilkan pilihan terbaru tanpa menimpa perubahan tersebut.
7. Rute tidak dikenal kembali ke Penawaran dengan pesan yang jelas.

---

# **10. UX Deliverables**

Dokumen UX ini menjadi acuan untuk:

1. Sitemap lima layar dan rute hash.
2. User flow tambah, ganti, pemeriksaan bentrok, dan penyimpanan hasil.
3. Page specification PAGE-01 sampai PAGE-05.
4. Prototipe interaktif pada [ruang-krs/index.html](ruang-krs/index.html), [ruang-krs/app.js](ruang-krs/app.js), dan [ruang-krs/krs.js](ruang-krs/krs.js).
5. UI design dan responsive design pada [ruang-krs/styles.css](ruang-krs/styles.css) serta [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md).
6. Interaction specification dan kriteria penerimaan pada dokumen terkait.

Perilaku diperiksa melalui skenario dalam ACCEPTANCE-CRITERIA. Pemahaman pengguna, keberhasilan tugas, serta waktu penyelesaian tetap memerlukan evaluasi pengguna; dokumen ini bukan laporan bahwa evaluasi tersebut telah lulus.

---

# **11. UX Design Constraints**

- Seluruh data, kuota, batas 8 SKS, dan hasil pengajuan merupakan simulasi. Header menyatakan **Mode simulasi** dan footer menjelaskan data contoh.
- Tidak ada akun, permintaan NIM/kata sandi, integrasi InfoKHS resmi, atau sinkronisasi antarperangkat.
- Pemeriksaan konflik hanya mencakup kelas demo di draf; agenda luar aplikasi tidak ikut diperiksa. Kuota tidak berubah karena pilihan lokal.
- Draf dan hasil tersimpan pada alamat serta profil peramban yang sama selama penyimpanan diizinkan. Pencarian bertahan dalam sesi halaman, tidak disimpan secara lokal.
- Matriks jadwal mingguan UXR-08 belum diimplementasikan; hasil saat ini berupa daftar hari dan waktu.
- Pertahankan lima layar, label Indonesia, dan ruang lingkup PRD. Jangan menyatakan hasil simulasi sebagai pengajuan KRS resmi.

---

**End of UX-SPEC v1.0**
