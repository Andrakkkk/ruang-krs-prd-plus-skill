(() => {
  'use strict';

  const { courses, classes } = window.RuangKRS;
  const offerHash = '#/penawaran';
  const reviewHash = '#/tinjau';
  const resultHash = '#/hasil';
  const courseHash = code => `#/mata-kuliah/${code}`;
  const classHash = id => `#/kelas/${id}`;

  function resolveRoute(hash) {
    const path = hash.slice(1);
    if (hash === offerHash || hash === reviewHash || hash === resultHash) {
      return { page: path.slice(1) };
    }

    const courseMatch = /^\/mata-kuliah\/(UX\d+)$/.exec(path);
    const course = courseMatch && courses.find(item => item.code === courseMatch[1]);
    if (course) return { page: 'pilihan', course };

    const classMatch = /^\/kelas\/(UX\d+-[A-Z])$/.exec(path);
    const option = classMatch && classes.get(classMatch[1]);
    if (option) return { page: 'detail', option, course: option.course };

    return { page: 'penawaran', missing: Boolean(path), fallback: true };
  }

  window.RuangKRSRoutes = Object.freeze({ offerHash, reviewHash, resultHash, courseHash, classHash, resolveRoute });
})();
