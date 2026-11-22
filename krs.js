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

  const storageKey = 'ruang-krs-prd-skill-v1';
  const creditLimit = 8;

  function minutes(time) {
    const [hours, remainder] = time.split('.').map(Number);
    return hours * 60 + remainder;
  }

  function assess(option, draft) {
    const previous = draft.map(id => classes.get(id)).find(item => item.course === option.course);
    const projectedCredits = totalCredits(draft) - (previous?.course.credits || 0) + option.course.credits;
    const overlaps = [];
    const adjacent = [];

    if (option.day) {
      for (const id of draft) {
        const item = classes.get(id);
        if (item.course === option.course || item.day !== option.day) continue;

        const startsLater = minutes(item.start) > minutes(option.start);
        const endsEarlier = minutes(item.end) < minutes(option.end);
        const start = startsLater ? item.start : option.start;
        const end = endsEarlier ? item.end : option.end;

        if (minutes(start) < minutes(end)) overlaps.push({ item, start, end });
        else if (minutes(start) === minutes(end)) adjacent.push({ item, time: start });
      }
    }

    const selected = previous === option;
    return {
      selected,
      replacement: selected ? null : previous,
      overlaps,
      adjacent,
      projectedCredits,
      exceedsLimit: projectedCredits > creditLimit,
      canAdd: !selected && Boolean(option.day) && option.seats > 0 && overlaps.length === 0 && projectedCredits <= creditLimit
    };
  }

  function sanitizeList(list) {
    if (!Array.isArray(list)) return [];
    const valid = [];
    for (const id of list) {
      const option = classes.get(id);
      if (!option) continue;
      const status = assess(option, valid);
      if (status.canAdd && !status.replacement) valid.push(id);
    }
    return valid;
  }

  function load() {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw === null) return { draft: [], result: [], loadFailed: false };
      const saved = JSON.parse(raw);
      if (!Array.isArray(saved?.draft) || !Array.isArray(saved?.result)) throw new Error('Format data lokal');
      const draft = sanitizeList(saved.draft);
      const result = sanitizeList(saved.result);
      const loadFailed = draft.length !== saved.draft.length || result.length !== saved.result.length;
      return { draft, result, loadFailed };
    } catch {
      return { draft: [], result: [], loadFailed: true };
    }
  }

  function save(draft, result) {
    try {
      localStorage.setItem(storageKey, JSON.stringify({ draft, result }));
      return true;
    } catch {
      return false;
    }
  }

  function totalCredits(ids) {
    return ids.reduce((total, id) => total + classes.get(id).course.credits, 0);
  }

  window.RuangKRS = { courses, classes, assess, load, save, totalCredits, creditLimit, storageKey };
})();
