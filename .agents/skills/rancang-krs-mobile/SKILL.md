---
name: rancang-krs-mobile
description: Rancang dan periksa antarmuka mobile Ruang KRS versi PRD + Skill, terutama jadwal, konfirmasi kelas, fokus keyboard, dan pemulihan draf atau penyimpanan. Gunakan untuk proyek ini, bukan antarmuka akademik lain.
---

# Rancang KRS Mobile

## Acuan proyek

- Baca [PRD](../../../PRD.md) untuk lingkup, data demo, aturan bentrok, dan batas simulasi 24 SKS. Gunakan riwayat nilai simulasi dan blokir pengambilan ulang seluruh kelas mata kuliah yang bernilai A.
- Gunakan [UX Specification](../../../UX-SPEC.md) untuk layar dan alur, [Design System](../../../DESIGN-SYSTEM.md) untuk token serta komponen, dan [Interaction Specification](../../../INTERACTION-SPEC.md) untuk konfirmasi, fokus, dan pemulihan.
- Pilih kasus terdampak dari [Acceptance Criteria](../../../ACCEPTANCE-CRITERIA.md). Dokumen proyek menyimpan rincian; jangan menyalinnya menjadi aturan baru di skill.

Buka [struktur aplikasi](../../../README.md#struktur-aplikasi) untuk menemukan tampilan, aturan jadwal, penyimpanan, dan CSS di folder `ruang-krs/`. Gunakan penanda simulasi pada pengajuan dan hasil. Matriks jadwal mingguan, integrasi InfoKHS, dan aturan akademik resmi berada di luar lingkup demo.

## Informasi dan keputusan kelas

- Pertahankan karakter ruang kerja akademik serta token sistem desain: latar hangat, teks gelap, banner kuning, tombol biru, dan angka waktu berlebar konsisten. Gunakan panel draf desktop dan akses total SKS pada navigasi ponsel tanpa menutup isi.
- Susun identitas kelas, hari dan jam WIB, kuota, dosen, lalu tindakan secara konsisten. Bedakan kuota penuh, waktu belum diketahui, dan bentrok dengan draf. Jika waktu belum tersedia, jelaskan bahwa jadwal belum dapat diperiksa.
- Tampilkan nama kelas penyebab serta rentang irisan dekat alternatif yang bentrok. Sediakan jalan kembali ke alternatif. Jam yang hanya bersentuhan tidak bentrok; penggantian kelas mengabaikan pilihan lama dari mata kuliah yang sama saat memeriksa jadwal dan SKS.
- Terapkan tambah atau ganti setelah konfirmasi identitas kelas. Pertahankan hasil terakhir saat draf berubah. Tindakan dari tab dengan draf usang harus ditahan dan meminta pengguna meninjau data terbaru; jangan mengklaim perlindungan serentak penuh bila Web Locks tidak tersedia.

## Konteks dan fokus keyboard

- Saat detail kembali ke pilihan mata kuliah yang sama, pulihkan fokus ke tautan **Lihat detail kelas** pembukanya. Saat pilihan kembali ke penawaran, pulihkan fokus ke kartu mata kuliah jika masih tampil. Pertahankan kueri selama navigasi dalam halaman; jangan menjanjikan kueri bertahan setelah muat ulang.
- Membuka konfirmasi memfokuskan tombol setuju; **Batal** memulihkan fokus ke tambah/ganti. Setelah hapus, fokus menuju tombol hapus berikutnya atau tautan penawaran bila draf kosong.
- Saat menyimpan hasil, fokus menuju pesan proses. Jika gagal dan Tinjau KRS masih terbuka, kembalikan fokus ke simpan. Perpindahan lain memfokuskan judul layar; pembukaan pertama mempertahankan posisi awal peramban.
- Penyelesaian simpan draf tidak boleh menarik pengguna dari layar yang sudah dipilihnya. Ikuti aturan keadaan terbaru pada spesifikasi interaksi.

## Verifikasi sesuai perubahan

- Konfirmasi dan fokus: **AC05-01**, **AC05-02**, **AC05-03**, **AC05-04**, serta **AC01-03**.
- Penyimpanan dan pemulihan: utamakan **AC06-01** dan **AC06-02**; tambahkan **AC06-03** sampai **AC06-05** jika jalur kegagalan, muat ulang, atau pemisahan draf/hasil berubah.
- Dua tab dan penyelesaian asinkron: **AC06-06** untuk hasil terbaru, **AC06-07** untuk tambah/ganti/hapus/simpan dari draf lama, dan **AC06-08** untuk perpindahan layar selama simpan.
- Untuk perubahan visual atau aturan pemilihan, periksa **AC01-01** pada lebar 360 px dan desktop, serta kasus bentrok, jam bersentuhan, status, atau SKS yang terdampak. Catat hasil aktual dan batas pemeriksaan; kriteria penerimaan bukan bukti keberhasilan uji pengguna.
