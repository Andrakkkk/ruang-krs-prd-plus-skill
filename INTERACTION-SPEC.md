# **INTERACTION SPECIFICATION**

## **Project: Ruang KRS · PRD + Skill**

**Version:** 1.0\
**Status:** Draft\
**References:**

* [PRD.md v1.0](PRD.md)
* [UX-SPEC.md v1.0](UX-SPEC.md)
* [DESIGN-SYSTEM.md v1.0](DESIGN-SYSTEM.md)
* [ACCEPTANCE-CRITERIA.md](ACCEPTANCE-CRITERIA.md)
* [Skill Rancang KRS Mobile](.agents/skills/rancang-krs-mobile/SKILL.md)

---

# **1\. Interaction Overview**

## **1.1 Objective**

Mendefinisikan perilaku lima layar Ruang KRS agar mahasiswa dapat membandingkan alternatif, mengetahui bentrok, mengonfirmasi kelas, dan memeriksa hasil simulasi. Acuan kebutuhan adalah UXR-01 sampai UXR-08 pada Worksheet 8. Ruang lingkup mencakup data demo dan penyimpanan peramban. Integrasi InfoKHS, autentikasi, aturan SKS resmi, kuota langsung, dan sinkronisasi antarperangkat berada di luar lingkup.

## **1.2 Interaction Principles**

1. **Immediate Feedback.** Tampilkan perubahan draf, proses simpan, atau alasan tindakan tertahan.
2. **Predictability.** Pertahankan urutan identitas kelas, jadwal, kuota, dosen, dan tindakan.
3. **Error Prevention.** Jelaskan bentrok dan batas simulasi sebelum pilihan diterapkan.
4. **User Control.** Beri kesempatan membatalkan konfirmasi penambahan atau penggantian.
5. **State Consistency.** Perbarui pilihan, total SKS, dan pemeriksaan bentrok berdasarkan draf yang sama.
6. **Persistence.** Pertahankan hasil terakhir sampai hasil baru berhasil disimpan.

---

# **2\. Global Interaction Behavior**

## **2.1 Navigation**

| Action | Expected Behavior |
| ----- | ----- |
| Pilih **Penawaran** | Membuka penawaran mata kuliah pada `#/penawaran`. |
| Buka kartu mata kuliah | Membuka alternatif dari mata kuliah tersebut, misalnya `#/mata-kuliah/UX301`. |
| Pilih **Lihat detail kelas** | Membuka detail alternatif tersebut, misalnya `#/kelas/UX301-A`. Kelas yang terhalang tetap dapat dibaca. |
| Pilih **Tinjau KRS** | Membuka daftar draf dan ringkasan SKS pada `#/tinjau`. |
| Pilih **Hasil** | Membuka hasil terakhir pada `#/hasil`, atau petunjuk jika belum pernah menyimpan hasil. |
| Pilih tindakan kembali | Kembali dari detail ke pilihan mata kuliah yang sama, atau dari pilihan, tinjauan, dan hasil ke Penawaran. |

Navigasi menandai bagian aktif. Alamat hash yang valid dapat dibuka langsung. Alamat yang tidak dikenal membuka Penawaran dengan pemberitahuan. Perpindahan layar mempertahankan draf yang sedang disusun.

## **2.2 Global Loading**

Data demo disertakan di aplikasi dan dibaca dari perangkat. Status proses tampil saat pengguna menyimpan hasil simulasi. Tombol berubah menjadi **Menyimpan…**, pesan proses menerima fokus, dan tombol simpan serta tindakan perubahan draf dinonaktifkan selama proses.

## **2.3 Global Error Handling**

* Data lokal yang tidak dapat dibaca atau memuat pilihan yang tidak valid ditangani dengan penyaringan dan pemberitahuan pemulihan.
* Jika perubahan draf gagal tersimpan, pilihan tetap tersedia selama halaman terbuka. Pemberitahuan menjelaskan keterbatasan tersebut.
* Jika hasil gagal disimpan, tampilkan alasan dan petunjuk mencoba lagi. Draf dan hasil terakhir tetap tersedia.
* Jika draf sudah berubah di tab lain, tampilkan draf terbaru dan minta pengguna meninjaunya sebelum mencoba lagi.

---

# **3\. Class Addition Interaction**

## **3.1 Trigger**

Pengguna membuka detail kandidat yang dapat ditambahkan dan memilih **Tambahkan ke draf**.

## **3.2 Interaction Flow**

1. Sistem menunjukkan konfirmasi di halaman detail yang memuat nama mata kuliah, kelas, hari, dan jam.
2. Pengguna memilih **Batal** atau **Ya, tambahkan**.
3. **Batal** menutup konfirmasi, mengembalikan fokus ke tombol tambah, dan mempertahankan draf.
4. **Ya, tambahkan** menerapkan pilihan sesuai pemeriksaan jadwal, SKS, dan keadaan penyimpanan.
5. Jika pilihan diterapkan, sistem memperbarui draf dan total SKS serta menyampaikan umpan balik. Sistem membuka Tinjau KRS jika pengguna masih berada pada detail asal.

## **3.3 Class Detail Interaction**

| Field | Interaction |
| ----- | ----- |
| Identitas kelas | Tampilkan kode, nama mata kuliah, huruf kelas, dan jumlah SKS. |
| Jadwal | Tampilkan hari serta jam mulai–selesai dalam format 24 jam WIB, atau **Waktu belum tersedia**. |
| Kuota | Tampilkan jumlah kursi tersisa. Nol kursi diberi status **Kelas penuh**. |
| Dosen | Tampilkan nama dosen atau **Belum ditetapkan**. |
| Pemeriksaan jadwal dan SKS | Tampilkan dampak terhadap draf sebelum tindakan tambah atau ganti. |

## **3.4 Validation Rules**

* Kandidat memiliki jadwal dan kuota lebih dari nol.
* Kandidat bebas bentrok terhadap kelas lain yang akan tetap berada di draf.
* Total draf setelah perubahan paling banyak 8 SKS. Batas ini berlaku untuk simulasi.
* Satu mata kuliah memiliki paling banyak satu kelas dalam draf. Kelas yang sudah dipilih memberi akses **Tinjau KRS**.
* Kandidat yang terhalang memiliki alasan tertulis, tombol perubahan nonaktif, dan tindakan **Lihat alternatif kelas**.

## **3.5 Selection States**

| State | Expected Behavior |
| ----- | ----- |
| Dapat dipilih | **Tambahkan ke draf** membuka konfirmasi bernama. |
| Menunggu konfirmasi | Fokus menuju **Ya, tambahkan**. Pengguna masih dapat memilih **Batal** atau pindah layar sebelum mengonfirmasi. |
| Terhalang | Tampilkan penyebab dan alternatif. Draf tetap sama. |
| Sudah dipilih | Tampilkan bahwa kelas sudah ada di draf dan sediakan **Tinjau KRS**. |
| Perubahan diterapkan | Total SKS dan daftar diperbarui. Jika hanya tersimpan sementara, tampilkan pemberitahuan. |
| Draf berubah di tab lain | Tahan permintaan, tutup konfirmasi, dan tampilkan draf terbaru sebelum pengguna mencoba lagi. |

## **3.6 Duplicate Submission Prevention**

Aplikasi menahan tindakan perubahan lain selama penulisan yang sedang berjalan. Kelas yang sudah ada memberi jalur ke draf sehingga aktivasi ulang tidak membuat entri ganda.

# **4\. Class Replacement Interaction**

## **4.1 Trigger**

Pengguna membuka kelas lain untuk mata kuliah yang sudah dipilih, lalu memilih **Ganti kelas di draf**.

## **4.2 Behavior**

1. Detail menyebut kelas lama yang akan diganti dan menampilkan pemeriksaan kandidat.
2. Konfirmasi di halaman detail menyebut kelas pengganti dan jadwalnya.
3. Pengguna memilih **Ya, ganti kelas** untuk menukar pilihan atau **Batal** untuk mempertahankan kelas lama.
4. Sistem memperbarui pilihan, total SKS, dan umpan balik setelah permintaan diterapkan.

## **4.3 Special Rules**

Kelas yang akan diganti dikeluarkan dari perhitungan bentrok dan proyeksi SKS. Kelas lain di draf tetap diperhitungkan. Saat dibatalkan, fokus kembali ke tombol ganti. Jika draf telah berubah di tab lain, prosedur pemulihan pada bagian 13 berlaku.

# **5\. Class Removal Interaction**

## **5.1 Trigger**

Pengguna memilih **Hapus** pada baris kelas di Tinjau KRS.

## **5.2 Direct Removal**

Tindakan diterapkan langsung dari baris kelas. Nama aksesibel tombol menyebut mata kuliah dan kelas yang akan dihapus.

## **5.3 Behavior**

* Setelah penghapusan diterapkan, kelas keluar dari draf, total SKS dihitung ulang, dan nama kelas disebut dalam umpan balik. Hasil terakhir tetap tersedia.
* Jika pengguna masih di Tinjau KRS, fokus menuju tombol hapus berikutnya yang tersedia, atau **Lihat penawaran** ketika draf kosong.
* Jika penulisan gagal, perubahan draf hanya berlaku selama halaman terbuka. Jika draf di tab lain lebih baru, penghapusan ditahan dan keadaan terbaru ditampilkan.

# **6\. Schedule Interaction**

## **6.1 Schedule Display**

Hari dan jam mulai–selesai ditampilkan secara langsung, misalnya **Senin 08.00–09.40 WIB**. Daftar kelas terpilih pada hasil tetap menyertakan hari dan jam. Matriks jadwal mingguan berada pada tahap lanjutan sesuai UXR-08.

## **6.2 Class Comparison**

Pilihan kelas menampilkan kedua alternatif untuk satu mata kuliah pada halaman yang sama. Setiap kartu menyajikan jadwal, kuota, dosen, dan pemeriksaan terhadap draf. Pengguna dapat membuka detail setiap alternatif lalu kembali ke pilihan asal.

## **6.3 Conflict Check**

Pada hari yang sama, bentrok terjadi jika `mulaiA < selesaiB` dan `mulaiB < selesaiA`. Irisan dimulai dari waktu mulai yang paling akhir dan berakhir pada waktu selesai yang paling awal. Sebutkan setiap kelas dalam draf yang terdampak dan rentang irisannya sebelum tombol tambah atau ganti.

## **6.4 Schedule Scenarios**

| Condition | Expected Behavior |
| ----- | ----- |
| Rekayasa Interaksi A sudah dipilih, kemudian pengguna membuka Analisis Data A | Tampilkan bentrok pada Senin **09.00–09.40 WIB**. Pengguna dapat kembali dan membuka Analisis Data B pada Rabu. |
| Rekayasa Interaksi A berakhir pukul 09.40 dan Desain Produk Digital A mulai pukul 09.40 | Tampilkan **Tidak bentrok** dan waktu persentuhan **09.40 WIB**. Kelas dapat dipilih jika batas SKS terpenuhi. |
| Jam kandidat belum tersedia | Tampilkan **Jadwal belum dapat diperiksa**. |

# **7\. Class Availability Interaction**

## **7.1 Available Status**

Kuota, jadwal, dan status terhadap draf adalah informasi terpisah. Label status tetap dapat dipahami dari teks pada kartu dan detail.

## **7.2 Status and Action**

| Condition | Expected Behavior |
| ----- | ----- |
| Etika Profesi A memiliki kuota nol | Tampilkan **0 kursi tersisa** dan **Kelas penuh**. Detail tersedia, aksi penambahan terhalang. |
| Etika Profesi B memiliki kuota 14 dan waktu belum tersedia | Tampilkan kuota, **Waktu belum tersedia**, **Jadwal belum dapat diperiksa**, dan dosen **Belum ditetapkan**. Aksi penambahan terhalang. |
| Kandidat akan menaikkan draf dari 6 menjadi 9 SKS | Tampilkan proyeksi 9 SKS dan batas 8 SKS simulasi. Draf tetap sama. |
| Kandidat sudah berada di draf | Tampilkan **Di draf** pada kartu. Detail menawarkan **Tinjau KRS**. |

## **7.3 Status Update Behavior**

Sistem menghitung kembali status bentrok dan proyeksi SKS berdasarkan draf saat ini. Data jadwal, dosen, serta kuota demo tetap sama setelah perubahan pilihan.

# **8\. Feedback Interaction**

## **8.1 Feedback Timing**

Tampilkan alasan pemblokiran sebelum pengguna bertindak. Sampaikan nama kelas yang ditambahkan, diganti, atau dihapus setelah perubahan diterapkan. Penyimpanan hasil memiliki jeda simulasi sekitar 450 ms sebelum aplikasi mencoba menulis ke penyimpanan lokal.

## **8.2 Feedback Content**

| Event | Message or Indicator |
| ----- | ----- |
| Kelas ditambahkan | Contoh pesan **Rekayasa Interaksi · Kelas A ditambahkan ke draf.** |
| Penyimpanan sedang berjalan | **Menyimpan…** dan pesan **Penyimpanan simulasi sedang diproses.** |
| Hasil berhasil disimpan | Layar Hasil dan pesan **Pilihan KRS tersimpan di peramban ini.** |
| Penyimpanan hasil gagal | Pesan **Hasil gagal disimpan** dengan petunjuk memeriksa izin peramban dan mencoba lagi. |
| Draf berubah di tab lain | **Draf berubah di tab lain. Pilihan terbaru ditampilkan. Periksa kembali sebelum mencoba lagi.** |

## **8.3 Feedback Rules**

Pesan perubahan menyebut kelas yang terdampak. Pengumuman melalui pembaca layar melengkapi status yang terlihat. Untuk perubahan draf yang hanya berlaku selama halaman terbuka, pemberitahuan tetap tampil sebelum pengguna memuat ulang.

## **8.4 Feedback on Failure**

Kegagalan menyimpan hasil mempertahankan draf dan hasil terakhir. Jika pengguna masih berada di Tinjau KRS, fokus kembali ke tombol simpan untuk mencoba lagi. Tindakan usang dari tab lain mengikuti aturan pemulihan pada bagian 13.

# **9\. Course Filtering and Search Interaction**

## **9.1 Filters**

Masukan **Cari mata kuliah** memfilter kartu berdasarkan nama atau kode tanpa membedakan huruf besar dan kecil. Setiap kata yang dipisahkan spasi dicocokkan dengan nama atau kode mata kuliah.

## **9.2 Result Order**

Kartu yang cocok tetap berurutan sesuai data penawaran. Jumlah hasil diperbarui saat pengguna mengetik.

## **9.3 Behavior**

Kata kunci tetap tersedia selama pengguna berpindah layar dalam halaman yang sama. Jika hasil kosong, tampilkan **Mata kuliah tidak ditemukan** dan **Hapus pencarian**. Tindakan itu mengosongkan masukan, memulihkan daftar, dan mengembalikan fokus ke kolom pencarian.

# **10\. Draft Review and Result Interaction**

## **10.1 Summary Display**

Navigasi menampilkan total draf dibanding batas 8 SKS. Panel desktop merangkum kelas di draf. Tinjau KRS menampilkan daftar pilihan, jumlah kelas, dan total SKS dibanding batas. Layar Hasil menampilkan kelas, hari, jam, jumlah kelas, dan total SKS yang telah tersimpan.

## **10.2 Submission and Result**

1. Pengguna memeriksa daftar dan total, lalu memilih **Simpan hasil simulasi**. Draf kosong membuat tombol ini nonaktif.
2. Sistem menampilkan keadaan diproses dan menahan aktivasi ulang.
3. Setelah penulisan berhasil, sistem mengganti hasil dan mengosongkan draf dalam satu penulisan. Hasil terbuka otomatis jika pengguna masih berada di layar Tinjau KRS yang memulai penyimpanan. Jika pengguna telah berpindah layar, aplikasi memperbarui ringkasan dan mempertahankan layar pilihan pengguna.
4. Dari Hasil, **Mulai pengisian baru** membuka Penawaran. Jika sudah ada draf baru, tombol tampil sebagai **Lanjutkan pengisian**.

# **11\. Empty State Interaction**

| Page | Condition | Message | Action |
| ----- | ----- | ----- | ----- |
| Penawaran | Pencarian tidak cocok | **Mata kuliah tidak ditemukan** | **Hapus pencarian** |
| Panel Draf KRS di desktop | Draf kosong | **Belum ada kelas di draf.** | **Tinjau KRS** |
| Tinjau KRS | Draf kosong | **Draf KRS masih kosong** | **Lihat penawaran**. Tombol simpan tetap nonaktif. |
| Hasil | Belum ada hasil tersimpan | **Belum ada hasil tersimpan** | **Tinjau KRS** |

---

# **12\. Responsive Interaction**

## **Desktop**

* Kartu penawaran dan alternatif kelas dapat tampil berdampingan.
* Panel draf tersedia di samping penawaran, pilihan, dan detail pada layar lebar.
* Konfirmasi tambah atau ganti tampil di dalam detail kelas.

## **Tablet**

* Saat ruang menyempit, area kerja beralih menjadi satu kolom. Total SKS dan akses Tinjau KRS tetap tersedia di navigasi.
* Ringkasan tinjauan serta hasil tetap tersedia setelah daftar.

## **Mobile**

* Pada lebar 360 px, kartu dan tindakan mengikuti satu kolom tanpa geser horizontal. Alternatif dibaca dengan gulir vertikal.
* Target sentuh tombol utama berukuran minimal 44 × 44 piksel CSS.
* Masukan pencarian memiliki label dan status penting disampaikan melalui teks.

## **Keyboard and Focus**

* **Lompat ke konten** memindahkan fokus ke area utama.
* Kembali dari detail memulihkan fokus ke tautan **Lihat detail kelas** terkait. Kembali dari pilihan ke Penawaran memulihkan fokus ke kartu mata kuliah terkait jika masih tampil.
* Perpindahan lain mengarahkan fokus ke judul. Pembukaan pertama membiarkan fokus pada posisi awal peramban.

# **13\. Data Consistency**

## **13.1 Local Persistence**

* Penyimpanan lokal memuat daftar identitas kelas draf dan hasil terakhir. Perubahan draf membawa hasil terakhir yang tersimpan. Penyimpanan hasil yang berhasil memperbarui hasil dan mengosongkan draf dalam satu penulisan.
* Memuat ulang alamat yang sama dengan profil peramban yang sama memulihkan data yang berhasil tersimpan. Izin penyimpanan dan penghapusan data peramban menentukan apakah data bertahan. Peramban yang membatasi penyimpanan pada alamat `file:` dapat menggunakan server lokal sebagaimana dijelaskan di [README](README.md).

## **13.2 Cross-Tab Protection**

* Sebelum menulis, aplikasi membaca data persisten terbaru. Penambahan, penggantian, atau penghapusan draf membawa hasil terbaru yang telah disimpan oleh tab lain.
* Jika versi draf dalam tab berbeda dari versi tersimpan, percobaan tambah, ganti, hapus, atau simpan hasil ditahan. Aplikasi memuat draf dan hasil terbaru, menutup konfirmasi lama, dan meminta pengguna meninjau sebelum mencoba lagi.
* Jika pengguna berpindah layar selama perubahan draf berlangsung, aplikasi memperbarui SKS pada layar yang sedang terbuka. Perpindahan otomatis ke Tinjau KRS berlaku selama pengguna masih berada pada detail asal.
* Web Locks mengurutkan operasi lintas tab jika tersedia. Jika peramban tidak menyediakannya, aplikasi tetap membaca ulang sebelum menulis. Dua operasi yang benar-benar bersamaan masih dapat bertabrakan pada jeda antara pemeriksaan dan penulisan.

Acuan verifikasi lintas tab dan perpindahan layar adalah **AC06-06**, **AC06-07**, dan **AC06-08**. Pemrosesan, kegagalan, pemulihan, dan pemuatan ulang dicakup oleh **AC06-01** sampai **AC06-05**. [Acceptance Criteria](ACCEPTANCE-CRITERIA.md)

# **14\. Interaction Completion Rules**

1. Pilihan diterapkan setelah pengguna mengonfirmasi identitas kelas.
2. Draf, total SKS, serta status kelas mencerminkan pilihan yang berlaku.
3. Hasil diperbarui setelah penyimpanan akhir berhasil.
4. Pengguna menerima umpan balik yang sesuai dengan hasil tindakan, termasuk keadaan sementara dan permintaan yang ditahan.
5. Aktivasi berulang selama penulisan tidak menghasilkan tindakan ganda.
6. Pengguna dapat memilih alternatif, meninjau pilihan terbaru, atau mencoba kembali setelah tindakan terhalang.

**End of INTERACTION-SPEC v1.0**
