(() => {
  'use strict';

  const originalOfferings = [
    { code: 'UX301', classes: [
      { letter: 'A', day: 'Senin', start: '08.00', end: '09.40', seats: 12, lecturer: 'Nadia Pratama' },
      { letter: 'B', day: 'Selasa', start: '10.00', end: '11.40', seats: 6, lecturer: 'Reza Mahendra' }
    ] },
    { code: 'UX302', classes: [
      { letter: 'A', day: 'Senin', start: '09.00', end: '10.40', seats: 8, lecturer: 'Mira Anindya' },
      { letter: 'B', day: 'Rabu', start: '13.00', end: '14.40', seats: 10, lecturer: 'Dimas Saputra' }
    ] },
    { code: 'UX303', classes: [
      { letter: 'A', day: 'Kamis', start: '08.00', end: '09.40', seats: 0, lecturer: 'Luna Ramadhani' },
      { letter: 'B', day: null, start: null, end: null, seats: 14, lecturer: 'Belum ditetapkan' }
    ] },
    { code: 'UX304', classes: [
      { letter: 'A', day: 'Senin', start: '09.40', end: '11.20', seats: 9, lecturer: 'Salma Wiratama' },
      { letter: 'B', day: 'Jumat', start: '08.00', end: '09.40', seats: 5, lecturer: 'Fajar Adinata' }
    ] }
  ];

  // Academic history and teaching assignments are fictional fixtures for the demo.
  const currentSemester = 7;
  const curriculum = [
    // Code, subject, semester, credits, previous grade, instructor, study topics.
    ['UX301', 'Rekayasa Interaksi', 7, 3, null, 'Nadia Pratama', 'Riset pengguna, alur tugas, dan pengujian kegunaan.'],
    ['UX302', 'Analisis Data', 7, 3, null, 'Mira Anindya', 'Pembersihan data, visualisasi, dan interpretasi hasil.'],
    ['UX304', 'Desain Produk Digital', 7, 3, null, 'Salma Wiratama', 'Konsep produk, prototipe, dan evaluasi desain.'],
    ['IF701', 'Manajemen Proyek TI', 7, 3, null, 'Rina Maharani', 'Lingkup proyek, estimasi, risiko, dan jadwal pengerjaan.'],
    ['IF702', 'Komputasi Awan', 7, 3, null, 'Ari Kencana', 'Infrastruktur virtual, penyimpanan, dan penyebaran layanan.'],
    ['IF703', 'Audit Sistem Informasi', 7, 3, null, 'Dina Aulia', 'Kontrol TI, bukti audit, dan pelaporan temuan.'],
    ['IF704', 'Pembelajaran Mesin', 7, 3, null, 'Bima Hanif', 'Klasifikasi, regresi, dan evaluasi model.'],
    ['IF705', 'Sistem Terdistribusi', 7, 3, null, 'Sari Utami', 'Replikasi, konsistensi, dan komunikasi antarlayanan.'],
    ['IF101', 'Dasar Pemrograman', 1, 3, 'A', 'Alif Nugraha', 'Variabel, percabangan, perulangan, dan fungsi.'],
    ['IF102', 'Pengantar Informatika', 1, 2, 'A', 'Nisa Larasati', 'Representasi informasi dan komponen sistem komputer.'],
    ['IF103', 'Logika Informatika', 1, 3, 'A', 'Arman Yusuf', 'Proposisi, inferensi, dan pembuktian logis.'],
    ['IF104', 'Bahasa Indonesia', 1, 2, 'A', 'Maya Kartika', 'Kalimat efektif, sitasi, dan laporan ilmiah.'],
    ['IF105', 'Kalkulus', 1, 3, 'B', 'Tari Anjani', 'Limit, turunan, integral, dan penerapannya.'],
    ['IF106', 'Matematika Diskrit', 1, 3, 'C', 'Reno Surya', 'Himpunan, relasi, kombinatorika, dan graf.'],
    ['IF301', 'Struktur Data', 3, 3, 'A', 'Dani Purnama', 'List, pohon, graf, dan operasi pencarian.'],
    ['IF302', 'Basis Data', 3, 3, 'A', 'Ayu Raharja', 'Pemodelan relasional, normalisasi, dan kueri.'],
    ['IF303', 'Pemrograman Berorientasi Objek', 3, 3, 'A', 'Tika Permata', 'Abstraksi, enkapsulasi, pewarisan, dan polimorfisme.'],
    ['IF304', 'Sistem Operasi', 3, 3, 'A', 'Bayu Aditya', 'Proses, penjadwalan, memori, dan sistem berkas.'],
    ['IF305', 'Jaringan Komputer', 3, 3, 'B', 'Ilham Darma', 'Pengalamatan, routing, dan protokol transport.'],
    ['IF306', 'Statistika', 3, 2, 'C', 'Laras Mentari', 'Distribusi, estimasi parameter, dan uji hipotesis.'],
    ['IF501', 'Rekayasa Perangkat Lunak', 5, 3, 'A', 'Intan Safira', 'Analisis kebutuhan, desain, dan siklus pengembangan.'],
    ['IF502', 'Pemrograman Web', 5, 3, 'A', 'Raka Pradana', 'HTTP, formulir, layanan web, dan pengelolaan sesi.'],
    ['IF503', 'Kecerdasan Buatan', 5, 3, 'A', 'Rani Widya', 'Strategi pencarian dan representasi pengetahuan.'],
    ['IF504', 'Analisis Algoritma', 5, 3, 'A', 'Dian Wisesa', 'Kompleksitas, rekursi, dan strategi optimasi.'],
    ['IF505', 'Pengujian Perangkat Lunak', 5, 3, 'C', 'Dewi Lestari', 'Kasus uji, pengujian integrasi, dan regresi.'],
    ['UX303', 'Etika Profesi', 5, 2, 'B', 'Luna Ramadhani', 'Privasi, tanggung jawab profesional, dan studi kasus.']
  ];
  const weekdays = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];
  const periods = [['08.00', '09.40'], ['10.00', '11.40'], ['13.00', '14.40']];
  const slots = weekdays.flatMap(day => periods.map(([start, end]) => ({ day, start, end })));

  const courses = curriculum.map(([code, name, semester, credits, grade, lecturer, topics], index) => {
    const original = originalOfferings.find(course => course.code === code);
    const options = Array.from('ABCDEFGHI', (letter, section) => {
      // Keep existing class IDs and A/B schedules for saved drafts and demo links.
      const existing = original?.classes.find(option => option.letter === letter);
      if (existing) return existing;
      const slot = slots[(index + section * 4) % slots.length];
      return { letter, ...slot, seats: 3 + (index + section) % 19, lecturer };
    });
    return { code, name, semester, credits, grade, topics, classes: options };
  });

  const classes = new Map();
  for (const course of courses) {
    for (const option of course.classes) {
      option.id = `${course.code}-${option.letter}`;
      option.course = course;
      classes.set(option.id, option);
    }
  }

  window.RuangKRS = { courses, classes, currentSemester, weekdays };
})();
