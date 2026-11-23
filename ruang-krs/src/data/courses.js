(() => {
  'use strict';

  const courses = [
    { code: 'UX301', name: 'Rekayasa Interaksi', credits: 3, classes: [
      { letter: 'A', day: 'Senin', start: '08.00', end: '09.40', seats: 12, lecturer: 'Nadia Pratama' },
      { letter: 'B', day: 'Selasa', start: '10.00', end: '11.40', seats: 6, lecturer: 'Reza Mahendra' }
    ] },
    { code: 'UX302', name: 'Analisis Data', credits: 3, classes: [
      { letter: 'A', day: 'Senin', start: '09.00', end: '10.40', seats: 8, lecturer: 'Mira Anindya' },
      { letter: 'B', day: 'Rabu', start: '13.00', end: '14.40', seats: 10, lecturer: 'Dimas Saputra' }
    ] },
    { code: 'UX303', name: 'Etika Profesi', credits: 2, classes: [
      { letter: 'A', day: 'Kamis', start: '08.00', end: '09.40', seats: 0, lecturer: 'Luna Ramadhani' },
      { letter: 'B', day: null, start: null, end: null, seats: 14, lecturer: 'Belum ditetapkan' }
    ] },
    { code: 'UX304', name: 'Desain Produk Digital', credits: 3, classes: [
      { letter: 'A', day: 'Senin', start: '09.40', end: '11.20', seats: 9, lecturer: 'Salma Wiratama' },
      { letter: 'B', day: 'Jumat', start: '08.00', end: '09.40', seats: 5, lecturer: 'Fajar Adinata' }
    ] }
  ];

  const classes = new Map();
  for (const course of courses) {
    for (const option of course.classes) {
      option.id = `${course.code}-${option.letter}`;
      option.course = course;
      classes.set(option.id, option);
    }
  }

  window.RuangKRS = { courses, classes };
})();
