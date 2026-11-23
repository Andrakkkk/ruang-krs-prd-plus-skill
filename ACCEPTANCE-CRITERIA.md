# **ACCEPTANCE CRITERIA**

## **Project: Ruang KRS — Versi PRD + Skill**

**Version:** 1.0

**Status:** Kriteria rilis dengan catatan verifikasi terbatas

**References:**

- [PRD.md](PRD.md)
- [UX-SPEC.md](UX-SPEC.md)
- [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md)
- [INTERACTION-SPEC.md](INTERACTION-SPEC.md)

# **1. Purpose**

Dokumen ini mendefinisikan kriteria penerimaan prototipe **Ruang KRS versi PRD + Skill**, diturunkan dari PRD dan Spesifikasi Interaksi. Tujuannya memastikan alur pemilihan, pemeriksaan jadwal, konfirmasi, penyimpanan, dan pemulihan memenuhi kebutuhan Worksheet 8 dalam lingkup simulasi.

**Seluruh butir merupakan kriteria yang harus diverifikasi, bukan pernyataan bahwa pengujian telah lulus.** Catat hasil aktual secara terpisah dengan ID kasus, peramban, viewport, langkah, hasil, dan bukti.

# **2. Acceptance Criteria Convention**

Setiap kasus memiliki ID tetap, judul, **Priority**, **Verification**, **Given** untuk kondisi awal, **When** untuk tindakan, serta **Then** untuk hasil yang diharapkan. Kelompok kasus mempertahankan hubungan dengan ID UXR pada Worksheet 8.

## **Priority**

| Priority | Description |
|---|---|
| P0 | Wajib sebelum demo: kebutuhan Must Have UXR-01/02/03/05 dan keadaan yang dapat menyebabkan pilihan atau hasil keliru. |
| P1 | Kelengkapan demo: konteks, pemulihan, serta kebutuhan pendukung UXR-04/06/07. |
| P2 | Pengembangan lanjutan UXR-08; bukan penghalang rilis lima layar saat ini. |

## **Verification Method**

- **Manual Test:** pemeriksaan tindakan, navigasi, dan hasil melalui antarmuka.
- **Visual Inspection:** pemeriksaan keterbacaan, tata letak, dan keadaan kontrol.
- **Automated Test:** pemeriksaan fungsi atau data dengan skrip.
- **Integration Test:** pemeriksaan penyimpanan, pemuatan ulang, kegagalan, serta perubahan antar tab.

Rincian metode pada setiap kasus menentukan pemeriksaan yang diperlukan; label metode bukan klaim bahwa pengujian telah dilakukan.

## **Test Setup**

Gunakan data kelas pada PRD. Jalankan server statis dari root repositori sebagaimana dijelaskan di [README](README.md), lalu buka aplikasi pada `http://localhost:8000/ruang-krs/`. Setiap kasus dimulai dengan keadaan draf/hasil yang disebutkan, menggunakan profil uji terpisah. Pengujian perubahan draf tidak boleh bergantung pada sisa skenario sebelumnya. Pemeriksaan viewport dilakukan pada **360 × 800** dan **1440 × 900 piksel CSS**, zoom 100%. Pembatasan penyimpanan dan data rusak disimulasikan melalui harness atau alat pengembang khusus pengujian, bukan ditambahkan sebagai kontrol produk.

# **3. Informasi dan Navigasi Mobile**

**Requirement:** UXR-01

### **AC01-01 — Tata letak lima layar**

**Priority:** P0

**Verification:** Inspeksi tampilan dan bandingkan `scrollWidth` dengan `clientWidth` dokumen.

**Given:** Lima layar memiliki data yang relevan.

**When:** Buka setiap layar pada kedua viewport.

**Then:** Tidak ada gulir horizontal halaman; nama kelas, jadwal, kuota, dosen, serta aksi tidak terpotong atau saling menimpa. Gulir vertikal diperbolehkan.

### **AC01-02 — Pencarian dan hasil kosong**

**Priority:** P1

**Verification:** UI dan hitung kartu.

**Given:** Penawaran terbuka tanpa pencarian.

**When:** Ketik `ux301`, lalu kueri yang tidak ditemukan, kemudian **Hapus pencarian**.

**Then:** Kueri pertama menampilkan satu mata kuliah; kueri kedua menampilkan nol hasil dan petunjuk; penghapusan memulihkan empat mata kuliah serta fokus ke masukan.

### **AC01-03 — Konteks pencarian dan pemulihan fokus**

**Priority:** P1

**Verification:** Keyboard dan `document.activeElement`.

**Given:** Pencarian `UX301` aktif.

**When:** Buka pilihan, detail A, kembali ke pilihan, lalu penawaran.

**Then:** Dua alternatif berada pada halaman pilihan yang sama. Fokus kembali ke pembuka detail, lalu kartu UX301; kueri tetap `UX301`. Draf tidak berubah karena navigasi.

### **AC01-04 — Tautan langsung dan alamat tidak dikenal**

**Priority:** P1

**Verification:** URL, judul layar, dan konsol.

**Given:** Aplikasi dibuka melalui tautan langsung.

**When:** Buka `#/kelas/UX301-A`, kemudian hash kelas yang tidak dikenal.

**Then:** Detail A dapat dibaca; hash tidak dikenal menampilkan penawaran dan pemberitahuan tanpa galat aplikasi.

# **4. Hari dan Waktu Kuliah**

**Requirement:** UXR-02

### **AC02-01 — Konsistensi hari dan waktu**

**Priority:** P0

**Verification:** Cocokkan teks dengan PRD dan [data kelas](ruang-krs/src/data/courses.js).

**Given:** Data demo belum diubah.

**When:** Baca pilihan, detail, draf, dan hasil untuk UX301-A.

**Then:** Hari Senin serta rentang **08.00–09.40 WIB** konsisten; pengguna tidak perlu menerjemahkan kode slot.

### **AC02-02 — Waktu yang belum tersedia**

**Priority:** P0

**Verification:** UI dan pemeriksaan data.

**Given:** Detail UX303-B terbuka.

**When:** Periksa informasi jadwal.

**Then:** Tertulis **Waktu belum tersedia**, bukan angka jam buatan, kode `()`, atau pernyataan bebas bentrok.

# **5. Pencegahan Bentrok**

**Requirement:** UXR-03

### **AC03-01 — Bentrok sebagian**

**Priority:** P0

**Verification:** UI, keadaan tombol, dan draf.

**Given:** Draf berisi UX301-A, total 3 SKS.

**When:** Buka pilihan dan detail UX302-A.

**Then:** Sebutkan Rekayasa Interaksi A serta irisan **Senin 09.00–09.40 WIB**. Tombol tambah nonaktif dan alternatif tetap dapat dibuka. Draf tetap satu kelas.

### **AC03-02 — Jam yang hanya bersentuhan**

**Priority:** P0

**Verification:** UI dan daftar draf.

**Given:** Draf hanya berisi UX301-A.

**When:** Buka UX304-A lalu konfirmasi penambahan.

**Then:** Tertulis tidak bentrok dan jam yang bersentuhan **09.40 WIB**. Kedua kelas tercatat; total 6 SKS.

### **AC03-03 — Penggantian kelas tanpa duplikat**

**Priority:** P0

**Verification:** UI serta identitas kelas dalam draf.

**Given:** Draf berisi UX301-A dan UX302-B, total 6 SKS.

**When:** Buka UX301-B dan konfirmasi penggantian.

**Then:** Pemeriksaan mengabaikan UX301-A; draf berisi UX301-B dan UX302-B, tanpa duplikat dan tetap 6 SKS.

### **AC03-04 — Variasi irisan waktu**

**Priority:** P0

**Verification:** Uji fungsi `assess` dengan salinan objek serta peta data; jangan mengubah data demo tersimpan.

**Given:** Objek kelas uji terpisah dari data demo disiapkan.

**When:** Periksa interval pada hari sama yang sebagian beririsan, sama persis, dan saling mencakup; lalu interval jam sama pada hari berbeda.

**Then:** Tiga kondisi pertama terdeteksi bentrok dengan irisan yang tepat. Hari berbeda tidak bentrok.

# **6. Status dan Kuota**

**Requirement:** UXR-04

### **AC04-01 — Kelas penuh**

**Priority:** P0

**Verification:** UI dan keadaan tombol.

**Given:** Detail UX303-A terbuka.

**When:** Periksa kuota dan tindakan.

**Then:** **0 kursi tersisa** serta **Kelas penuh** terbaca. Tambah nonaktif; draf tidak berubah.

### **AC04-02 — Kuota dan kelengkapan jadwal**

**Priority:** P0

**Verification:** UI dan keadaan tombol.

**Given:** Detail UX303-B terbuka.

**When:** Periksa kuota, dosen, jadwal, dan tindakan.

**Then:** Kuota 14 dibedakan dari waktu yang belum tersedia; dosen **Belum ditetapkan**; pemeriksaan jadwal belum dapat dipastikan; tambah nonaktif.

### **AC04-03 — Kelas yang sudah berada di draf**

**Priority:** P1

**Verification:** UI dan jumlah entri draf.

**Given:** UX301-A dapat dipilih.

**When:** Tambahkan kelas lalu buka kembali detailnya.

**Then:** Kuota contoh tetap 12; tertulis kelas sudah di draf dan tersedia akses ke Tinjau KRS, tanpa penambahan duplikat.

# **7. Konfirmasi dan Kendali Pengguna**

**Requirement:** UXR-05

### **AC05-01 — Pembatalan konfirmasi**

**Priority:** P0

**Verification:** UI, draf, dan fokus.

**Given:** Draf kosong, detail UX301-A terbuka.

**When:** Pilih **Tambahkan ke draf**, lalu **Batal**.

**Then:** Konfirmasi menyebut Rekayasa Interaksi A dan waktunya sebelum perubahan. Setelah batal, draf tetap kosong dan fokus kembali ke tombol tambah.

### **AC05-02 — Konfirmasi penambahan**

**Priority:** P0

**Verification:** UI dan daftar draf.

**Given:** Konfirmasi UX301-A terbuka.

**When:** Pilih **Ya, tambahkan**.

**Then:** Satu entri UX301-A ditambahkan, layar Tinjau KRS terbuka, dan pesan penambahan terlihat. Mengunjungi detail yang sama tidak memberi aksi tambah lagi.

### **AC05-03 — Target sentuh dan kendali keyboard**

**Priority:** P0

**Verification:** Ukuran DOM dan uji keyboard.

**Given:** Lima layar dapat diakses.

**When:** Ukur tombol utama; jalankan alur utama dengan Tab, Shift+Tab, Enter/Space sesuai jenis kontrol.

**Then:** Target tombol utama minimal **44 × 44 piksel CSS**; fokus terlihat; aksi dapat dijalankan tanpa penunjuk; pencarian memiliki label.

### **AC05-04 — Penghapusan dan fokus**

**Priority:** P1

**Verification:** UI dan fokus.

**Given:** Draf memiliki dua kelas.

**When:** Hapus kelas pertama lalu kelas terakhir.

**Then:** Setiap penghapusan memperbarui daftar dan total; fokus menuju tombol hapus yang tersisa, lalu tautan penawaran ketika kosong. Simpan nonaktif saat kosong.

# **8. Hasil Tindakan dan Kegagalan Penyimpanan**

**Requirement:** UXR-06

### **AC06-01 — Penyimpanan hasil dan pemuatan ulang**

**Priority:** P0

**Verification:** UI selama proses dan data setelah pemuatan ulang.

**Given:** Draf UX301-A dan UX302-B valid, penyimpanan diizinkan.

**When:** Pilih **Simpan hasil simulasi**; coba aktivasi ulang selama proses.

**Then:** Keadaan diproses terlihat; tombol simpan dan hapus nonaktif. Hanya satu pengajuan diterima. Hasil berisi dua kelas/6 SKS, draf kosong; pemuatan ulang mempertahankan hasil.

### **AC06-02 — Kegagalan penyimpanan hasil dan percobaan ulang**

**Priority:** P0

**Verification:** Injeksi kegagalan, UI, lalu percobaan ulang.

**Given:** Ada hasil lama; draf baru valid; operasi tulis penyimpanan dibuat gagal.

**When:** Simpan hasil baru.

**Then:** Kegagalan tampil, draf baru tetap tersedia, hasil lama tidak diganti, dan tidak muncul klaim berhasil. Setelah izin dipulihkan, pengguna dapat mencoba lagi.

### **AC06-03 — Kegagalan penyimpanan draf**

**Priority:** P1

**Verification:** Injeksi kegagalan dan UI.

**Given:** Penyimpanan dibuat gagal sebelum perubahan draf.

**When:** Tambah atau hapus kelas.

**Then:** Perubahan terlihat selama halaman terbuka dan pemberitahuan menjelaskan penyimpanan sementara. Tidak ada jaminan perubahan bertahan setelah muat ulang.

### **AC06-04 — Pemulihan data lokal tidak valid**

**Priority:** P1

**Verification:** Injeksi data rusak dan UI.

**Given:** Data lokal tidak dapat diurai atau memuat identitas kelas tidak valid.

**When:** Muat aplikasi.

**Then:** Tidak ada crash; data yang tidak valid tidak menjadi kelas pilihan; pemberitahuan pemulihan terlihat dan penawaran tetap dapat digunakan.

### **AC06-05 — Pemisahan draf baru dan hasil terakhir**

**Priority:** P1

**Verification:** UI dan daftar draf/hasil.

**Given:** Hasil dua kelas berhasil tersimpan.

**When:** Pilih **Mulai pengisian baru**, tambah satu kelas baru, lalu buka Hasil.

**Then:** Draf baru terpisah; hasil lama masih berisi dua kelas sampai penyimpanan hasil berikutnya berhasil. Tombol hasil dapat menawarkan **Lanjutkan pengisian**.

### **AC06-06 — Hasil terakhir saat tab lain mengubah draf**

**Priority:** P0

**Verification:** Uji dua tab, lalu periksa tampilan dan penyimpanan.

**Given:** Dua tab memakai alamat dan profil yang sama. Tab B sudah membaca keadaan lama.

**When:** Tab A menyimpan hasil UX301-A dan UX302-B. Tab B kemudian mengubah draf.

**Then:** Hasil dari tab A tetap berisi dua kelas dan 6 SKS setelah dimuat ulang. Jika draf tab B perlu ditinjau ulang, tampilkan alasannya.

### **AC06-07 — Perlindungan draf dari tindakan tab lama**

**Priority:** P0

**Verification:** Ulangi urutan dua tab untuk keempat tindakan.

**Given:** Kedua tab membaca draf yang sama. Tab A menyimpan perubahan saat tab B masih memegang versi lama.

**When:** Tab B mencoba tambah, ganti, hapus, atau simpan hasil berdasarkan draf lama.

**Then:** Aplikasi mempertahankan draf terbaru, menahan tindakan tab B, dan menampilkan pesan untuk meninjau pilihan terbaru.

### **AC06-08 — Perpindahan layar saat penyimpanan**

**Priority:** P1

**Verification:** Tahan operasi penyimpanan, pindah layar, lalu lanjutkan penyimpanan.

**Given:** Pengguna sudah mengonfirmasi penambahan dan penyimpanan draf masih berjalan.

**When:** Pengguna membuka layar Hasil sebelum penyimpanan draf selesai.

**Then:** Setelah perubahan tersimpan, ringkasan SKS diperbarui dan pengguna tetap berada di layar Hasil.

# **9. Total dan Batas SKS**

**Requirement:** UXR-07

### **AC07-01 — Pembaruan total SKS**

**Priority:** P1

**Verification:** UI setelah setiap tindakan.

**Given:** Draf kosong.

**When:** Tambah UX301-A, tambah UX302-B, lalu hapus salah satunya.

**Then:** Total berubah **0 → 3 → 6 → 3 SKS** pada navigasi dan tinjauan tanpa pemuatan ulang; batas demo tetap 8 SKS.

### **AC07-02 — Pilihan melampaui batas SKS**

**Priority:** P0

**Verification:** UI, keadaan tombol, dan draf.

**Given:** Draf berisi UX301-A dan UX302-B, total 6 SKS.

**When:** Buka UX304-A.

**Then:** Jadwal dapat tidak bentrok, tetapi proyeksi **9 SKS** melampaui batas demo **8 SKS**. Tambah nonaktif; draf tetap 6 SKS.

# **10. Verifikasi Jadwal dan Lingkup Lanjutan**

**Requirement:** UXR-08

### **AC08-01 — Verifikasi daftar hasil**

**Priority:** P1

**Verification:** UI untuk hasil terisi dan kosong.

**Given:** Hasil UX301-A dan UX302-B tersimpan.

**When:** Buka Hasil.

**Then:** Nama, kelas, hari, jam, jumlah dua kelas, dan total 6 SKS sesuai pilihan akhir. Jika belum ada hasil, petunjuk menuju Tinjau KRS menggantikan daftar.

### **AC08-02 — Matriks jadwal mingguan lanjutan**

**Priority:** P2

**Verification:** Pemeriksaan rancangan dan UI pada tahap berikutnya.

**Given:** Pengembangan matriks jadwal mingguan disetujui untuk rilis berikutnya.

**When:** Petakan kelas hasil ke hari dan rentang waktu.

**Then:** Setiap kelas muncul pada hari/jam yang benar dan matriks terbaca pada ponsel. **Belum menjadi fitur rilis demo ini.**

# **11. Release Acceptance**

Rilis demo memerlukan seluruh P0 dan P1 yang masuk lingkup lulus, atau pengecualian tertulis dengan dampak dan tindak lanjut. AC08-02 tetap tertunda. Catatan kegagalan harus menyebut ID kasus dan hasil aktual; jangan mengubah kriteria hanya agar hasil tampak lulus.

Pemeriksaan ini membuktikan perilaku prototipe, bukan capaian pengguna. Waktu interpretasi, penurunan kesalahan, rasa yakin, dan kepuasan pada Worksheet 8 memerlukan uji pengguna terpisah. Angka kinerja atau persentase keberhasilan pada worksheet tidak boleh dilaporkan sebagai hasil demo tanpa pengukuran.

# **12. Test Execution Report**

Setiap kasus memerlukan catatan hasil sebelum dinyatakan lulus. Gunakan kolom berikut agar hasil dapat ditelusuri tanpa menyamakan kriteria dengan bukti.

| Field | Description |
|---|---|
| Criteria ID | ID kasus yang diperiksa, tanpa mengganti penomoran. |
| Test Status | Pass, Fail, Blocked, atau Not Tested. |
| Test Context | Peramban, viewport, keadaan awal, dan langkah yang dijalankan. |
| Test Evidence | Tangkapan layar, log, atau keluaran pengujian. |
| Bug Reference | Rujukan masalah jika ditemukan. |
| Notes | Hasil aktual, batas pemeriksaan, dan tindak lanjut. |

## **Test Status**

- **Pass:** hasil aktual memenuhi kriteria yang diperiksa.
- **Fail:** hasil aktual belum memenuhi kriteria.
- **Blocked:** pengujian tidak dapat dilaksanakan karena dependensi.
- **Not Tested:** pengujian belum dilakukan.

### Hasil verifikasi pembaruan

| Skenario | Hasil |
|---|---|
| Alur demo di Chrome, lebar 360 dan 1440 px | Lulus untuk lima layar, pencarian, bentrok dan batas jam, status kelas, konfirmasi, penggantian, penghapusan, batas SKS, kegagalan simpan, dan pemuatan ulang hasil. |
| AC06-06, perubahan draf dari tab lain | Lulus. Kedua kelas dan 6 SKS pada hasil terakhir tetap tersimpan. |
| AC06-07, tindakan dengan draf lama | Lulus. Percobaan tambah, ganti, hapus, dan simpan menampilkan peringatan tanpa menimpa draf terbaru atau hasil terakhir. |
| AC06-08, perpindahan layar saat penyimpanan | Lulus. Setelah penambahan selesai, layar Hasil tetap terbuka dan total SKS draf diperbarui. |
| Penyimpanan hasil akhir saat pengguna berpindah layar | Lulus. Hasil tersimpan, total draf diperbarui, dan layar Penawaran tetap terbuka sampai pengguna memilih layar lain. |

Tabel mencatat skenario yang dijalankan pada pembaruan ini. Pemeriksaan penuh seluruh kriteria serta pengukuran pengalaman pengguna dan durasi eksperimen memerlukan pencatatan terpisah.

**End of ACCEPTANCE-CRITERIA v1.0**
