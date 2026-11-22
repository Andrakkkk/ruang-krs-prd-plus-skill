# Kriteria Penerimaan Ruang KRS

Kriteria ini menjadi acuan rilis prototipe **PRD + Skill**, diturunkan dari [PRD](PRD.md) dan [Spesifikasi Interaksi](INTERACTION-SPEC.md). **Seluruh butir merupakan kriteria yang harus diverifikasi, bukan pernyataan bahwa pengujian telah lulus.** Catat hasil aktual secara terpisah dengan ID kasus, peramban, viewport, langkah, hasil, dan bukti.

## Prioritas dan cara pemeriksaan

- **P0** — wajib sebelum demo: kebutuhan Must Have UXR-01/02/03/05 dan keadaan yang dapat menyebabkan pilihan atau hasil keliru.
- **P1** — kelengkapan demo: konteks, pemulihan, serta kebutuhan pendukung UXR-04/06/07.
- **P2** — pengembangan lanjutan UXR-08; bukan penghalang rilis lima layar saat ini.

Gunakan data kelas pada PRD. Setiap kasus dimulai dengan keadaan draf/hasil yang disebutkan, menggunakan profil uji terpisah. Pengujian perubahan draf tidak boleh bergantung pada sisa skenario sebelumnya. Pemeriksaan viewport dilakukan pada **360 × 800** dan **1440 × 900 piksel CSS**, zoom 100%. Pembatasan penyimpanan dan data rusak disimulasikan melalui harness atau alat pengembang khusus pengujian, bukan ditambahkan sebagai kontrol produk.

## UXR-01 Informasi dan navigasi mobile

| ID / prioritas | Given | When | Then | Verifikasi |
|---|---|---|---|---|
| AC01-01 / P0 | Lima layar memiliki data yang relevan. | Buka setiap layar pada kedua viewport. | Tidak ada gulir horizontal halaman; nama kelas, jadwal, kuota, dosen, serta aksi tidak terpotong atau saling menimpa. Gulir vertikal diperbolehkan. | Inspeksi tampilan dan bandingkan `scrollWidth` dengan `clientWidth` dokumen. |
| AC01-02 / P1 | Penawaran terbuka tanpa pencarian. | Ketik `ux301`, lalu kueri yang tidak ditemukan, kemudian **Hapus pencarian**. | Kueri pertama menampilkan satu mata kuliah; kueri kedua menampilkan nol hasil dan petunjuk; penghapusan memulihkan empat mata kuliah serta fokus ke masukan. | UI dan hitung kartu. |
| AC01-03 / P1 | Pencarian `UX301` aktif. | Buka pilihan, detail A, kembali ke pilihan, lalu penawaran. | Dua alternatif berada pada halaman pilihan yang sama. Fokus kembali ke pembuka detail, lalu kartu UX301; kueri tetap `UX301`. Draf tidak berubah karena navigasi. | Keyboard dan `document.activeElement`. |
| AC01-04 / P1 | Aplikasi dibuka melalui tautan langsung. | Buka `#/kelas/UX301-A`, kemudian hash kelas yang tidak dikenal. | Detail A dapat dibaca; hash tidak dikenal menampilkan penawaran dan pemberitahuan tanpa galat aplikasi. | URL, judul layar, dan konsol. |

## UXR-02 Hari dan waktu kuliah

| ID / prioritas | Given | When | Then | Verifikasi |
|---|---|---|---|---|
| AC02-01 / P0 | Data demo belum diubah. | Baca pilihan, detail, draf, dan hasil untuk UX301-A. | Hari Senin serta rentang **08.00–09.40 WIB** konsisten; pengguna tidak perlu menerjemahkan kode slot. | Cocokkan teks dengan PRD dan `krs.js`. |
| AC02-02 / P0 | Detail UX303-B terbuka. | Periksa informasi jadwal. | Tertulis **Waktu belum tersedia**, bukan angka jam buatan, kode `()`, atau pernyataan bebas bentrok. | UI dan pemeriksaan data. |

## UXR-03 Pencegahan bentrok

| ID / prioritas | Given | When | Then | Verifikasi |
|---|---|---|---|---|
| AC03-01 / P0 | Draf berisi UX301-A, total 3 SKS. | Buka pilihan dan detail UX302-A. | Sebutkan Rekayasa Interaksi A serta irisan **Senin 09.00–09.40 WIB**. Tombol tambah nonaktif dan alternatif tetap dapat dibuka. Draf tetap satu kelas. | UI, keadaan tombol, dan draf. |
| AC03-02 / P0 | Draf hanya berisi UX301-A. | Buka UX304-A lalu konfirmasi penambahan. | Tertulis tidak bentrok dan jam yang bersentuhan **09.40 WIB**. Kedua kelas tercatat; total 6 SKS. | UI dan daftar draf. |
| AC03-03 / P0 | Draf berisi UX301-A dan UX302-B, total 6 SKS. | Buka UX301-B dan konfirmasi penggantian. | Pemeriksaan mengabaikan UX301-A; draf berisi UX301-B dan UX302-B, tanpa duplikat dan tetap 6 SKS. | UI serta identitas kelas dalam draf. |
| AC03-04 / P0 | Objek kelas uji terpisah dari data demo disiapkan. | Periksa interval pada hari sama yang sebagian beririsan, sama persis, dan saling mencakup; lalu interval jam sama pada hari berbeda. | Tiga kondisi pertama terdeteksi bentrok dengan irisan yang tepat. Hari berbeda tidak bentrok. | Uji fungsi `assess` dengan salinan objek serta peta data; jangan mengubah data demo tersimpan. |

## UXR-04 Status dan kuota

| ID / prioritas | Given | When | Then | Verifikasi |
|---|---|---|---|---|
| AC04-01 / P0 | Detail UX303-A terbuka. | Periksa kuota dan tindakan. | **0 kursi tersisa** serta **Kelas penuh** terbaca. Tambah nonaktif; draf tidak berubah. | UI dan keadaan tombol. |
| AC04-02 / P0 | Detail UX303-B terbuka. | Periksa kuota, dosen, jadwal, dan tindakan. | Kuota 14 dibedakan dari waktu yang belum tersedia; dosen **Belum ditetapkan**; pemeriksaan jadwal belum dapat dipastikan; tambah nonaktif. | UI dan keadaan tombol. |
| AC04-03 / P1 | UX301-A dapat dipilih. | Tambahkan kelas lalu buka kembali detailnya. | Kuota contoh tetap 12; tertulis kelas sudah di draf dan tersedia akses ke Tinjau KRS, tanpa penambahan duplikat. | UI dan jumlah entri draf. |

## UXR-05 Konfirmasi dan kendali pengguna

| ID / prioritas | Given | When | Then | Verifikasi |
|---|---|---|---|---|
| AC05-01 / P0 | Draf kosong, detail UX301-A terbuka. | Pilih **Tambahkan ke draf**, lalu **Batal**. | Konfirmasi menyebut Rekayasa Interaksi A dan waktunya sebelum perubahan. Setelah batal, draf tetap kosong dan fokus kembali ke tombol tambah. | UI, draf, dan fokus. |
| AC05-02 / P0 | Konfirmasi UX301-A terbuka. | Pilih **Ya, tambahkan**. | Satu entri UX301-A ditambahkan, layar Tinjau KRS terbuka, dan pesan penambahan terlihat. Mengunjungi detail yang sama tidak memberi aksi tambah lagi. | UI dan daftar draf. |
| AC05-03 / P0 | Lima layar dapat diakses. | Ukur tombol utama; jalankan alur utama dengan Tab, Shift+Tab, Enter/Space sesuai jenis kontrol. | Target tombol utama minimal **44 × 44 piksel CSS**; fokus terlihat; aksi dapat dijalankan tanpa penunjuk; pencarian memiliki label. | Ukuran DOM dan uji keyboard. |
| AC05-04 / P1 | Draf memiliki dua kelas. | Hapus kelas pertama lalu kelas terakhir. | Setiap penghapusan memperbarui daftar dan total; fokus menuju tombol hapus yang tersisa, lalu tautan penawaran ketika kosong. Simpan nonaktif saat kosong. | UI dan fokus. |

## UXR-06 Hasil tindakan dan kegagalan penyimpanan

| ID / prioritas | Given | When | Then | Verifikasi |
|---|---|---|---|---|
| AC06-01 / P0 | Draf UX301-A dan UX302-B valid, penyimpanan diizinkan. | Pilih **Simpan hasil simulasi**; coba aktivasi ulang selama proses. | Keadaan diproses terlihat; tombol simpan dan hapus nonaktif. Hanya satu pengajuan diterima. Hasil berisi dua kelas/6 SKS, draf kosong; pemuatan ulang mempertahankan hasil. | UI selama proses dan data setelah pemuatan ulang. |
| AC06-02 / P0 | Ada hasil lama; draf baru valid; operasi tulis penyimpanan dibuat gagal. | Simpan hasil baru. | Kegagalan tampil, draf baru tetap tersedia, hasil lama tidak diganti, dan tidak muncul klaim berhasil. Setelah izin dipulihkan, pengguna dapat mencoba lagi. | Injeksi kegagalan, UI, lalu percobaan ulang. |
| AC06-03 / P1 | Penyimpanan dibuat gagal sebelum perubahan draf. | Tambah atau hapus kelas. | Perubahan terlihat selama halaman terbuka dan pemberitahuan menjelaskan penyimpanan sementara. Tidak ada jaminan perubahan bertahan setelah muat ulang. | Injeksi kegagalan dan UI. |
| AC06-04 / P1 | Data lokal tidak dapat diurai atau memuat identitas kelas tidak valid. | Muat aplikasi. | Tidak ada crash; data yang tidak valid tidak menjadi kelas pilihan; pemberitahuan pemulihan terlihat dan penawaran tetap dapat digunakan. | Injeksi data rusak dan UI. |
| AC06-05 / P1 | Hasil dua kelas berhasil tersimpan. | Pilih **Mulai pengisian baru**, tambah satu kelas baru, lalu buka Hasil. | Draf baru terpisah; hasil lama masih berisi dua kelas sampai penyimpanan hasil berikutnya berhasil. Tombol hasil dapat menawarkan **Lanjutkan pengisian**. | UI dan daftar draf/hasil. |
| AC06-06 / P0 | Dua tab A/B menggunakan alamat dan profil yang sama; B sudah membaca keadaan lama. | A menyimpan hasil UX301-A dan UX302-B. Setelah itu B melakukan perubahan draf dari keadaan lamanya. | Perubahan draf B tidak menghapus atau mengganti hasil terbaru A. Setelah keadaan terbaru dimuat, Hasil tetap berisi dua kelas A/6 SKS, kecuali pengguna kemudian secara sengaja menyimpan hasil baru. Bila tindakan B ditahan karena usang, alasannya terlihat. | Jalankan urutan dua tab secara deterministik; periksa UI dan data persisten. **Belum dinyatakan lulus sampai penanggung jawab validasi mengonfirmasi.** |
| AC06-07 / P0 | Tab A/B membaca draf yang sama. A kemudian mengubah draf dan berhasil menyimpannya; B masih memegang versi lama. | B mencoba tambah, ganti, hapus, atau simpan hasil berdasarkan draf lama. | Draf terbaru A tidak ditimpa secara diam-diam. Tindakan usang B ditahan dengan penjelasan serta jalur meninjau keadaan terbaru; tidak ada pesan berhasil untuk perubahan yang belum diterapkan. Setelah meninjau ulang, pengguna dapat melanjutkan dari data terbaru. | Ulangi urutan deterministik untuk setiap jenis mutasi. **Belum dinyatakan lulus sampai penanggung jawab validasi mengonfirmasi.** |

## UXR-07 Total dan batas SKS

| ID / prioritas | Given | When | Then | Verifikasi |
|---|---|---|---|---|
| AC07-01 / P1 | Draf kosong. | Tambah UX301-A, tambah UX302-B, lalu hapus salah satunya. | Total berubah **0 → 3 → 6 → 3 SKS** pada navigasi dan tinjauan tanpa pemuatan ulang; batas demo tetap 8 SKS. | UI setelah setiap tindakan. |
| AC07-02 / P0 | Draf berisi UX301-A dan UX302-B, total 6 SKS. | Buka UX304-A. | Jadwal dapat tidak bentrok, tetapi proyeksi **9 SKS** melampaui batas demo **8 SKS**. Tambah nonaktif; draf tetap 6 SKS. | UI, keadaan tombol, dan draf. |

## UXR-08 Verifikasi jadwal dan lingkup lanjutan

| ID / prioritas | Given | When | Then | Verifikasi |
|---|---|---|---|---|
| AC08-01 / P1 | Hasil UX301-A dan UX302-B tersimpan. | Buka Hasil. | Nama, kelas, hari, jam, jumlah dua kelas, dan total 6 SKS sesuai pilihan akhir. Jika belum ada hasil, petunjuk menuju Tinjau KRS menggantikan daftar. | UI untuk hasil terisi dan kosong. |
| AC08-02 / P2 | Pengembangan matriks jadwal mingguan disetujui untuk rilis berikutnya. | Petakan kelas hasil ke hari dan rentang waktu. | Setiap kelas muncul pada hari/jam yang benar dan matriks terbaca pada ponsel. **Belum menjadi fitur rilis demo ini.** | Pemeriksaan rancangan dan UI pada tahap berikutnya. |

## Keputusan rilis dan batas pembuktian

Rilis demo memerlukan seluruh P0 dan P1 yang masuk lingkup lulus, atau pengecualian tertulis dengan dampak dan tindak lanjut. AC08-02 tetap tertunda. Catatan kegagalan harus menyebut ID kasus dan hasil aktual; jangan mengubah kriteria hanya agar hasil tampak lulus.

Pemeriksaan ini membuktikan perilaku prototipe, bukan capaian pengguna. Waktu interpretasi, penurunan kesalahan, rasa yakin, dan kepuasan pada Worksheet 8 memerlukan uji pengguna terpisah. Angka kinerja atau persentase keberhasilan pada worksheet tidak boleh dilaporkan sebagai hasil demo tanpa pengukuran.
