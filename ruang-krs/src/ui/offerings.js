(() => {
  'use strict';

  const { courses } = window.RuangKRS;
  const { courseHash } = window.RuangKRSRoutes;
  const UI = window.RuangKRSUI;
  const { arrow, intro, draftPanel, emptyState, escapeAttribute } = UI.components;

  function offerCard(course) {
    return `<li>
      <a class="course-card panel" id="course-${course.code}" href="${courseHash(course.code)}" aria-labelledby="name-${course.code} action-${course.code}">
        <div class="card-meta"><span class="course-code">${course.code}</span><span>${course.credits} SKS</span></div>
        <h3 id="name-${course.code}">${course.name}</h3>
        <p>${course.classes.length} alternatif kelas</p>
        <span class="card-action" id="action-${course.code}">Lihat pilihan kelas ${arrow()}</span>
      </a>
    </li>`;
  }

  function renderOfferResults(query) {
    const terms = query.toLowerCase().trim().split(/\s+/);
    const filtered = courses.filter(course => {
      const haystack = `${course.code} ${course.name}`.toLowerCase();
      return terms.every(term => haystack.includes(term));
    });
    return {
      count: filtered.length,
      html: filtered.length
        ? `<ul class="course-grid">${filtered.map(offerCard).join('')}</ul>`
        : emptyState('Mata kuliah tidak ditemukan', 'Coba nama atau kode mata kuliah lain.',
          '<button class="button button-secondary" id="clear-search" type="button">Hapus pencarian</button>')
    };
  }

  function renderOfferings(state) {
    const results = renderOfferResults(state.query);
    return `${intro('Penawaran mata kuliah', 'Bandingkan jadwal, kuota, dan dosen sebelum menyusun draf KRS.')}
      <div class="workspace">
        <section class="offering" aria-labelledby="course-heading">
          <label for="course-search">Cari mata kuliah</label>
          <div class="search-field">
            <span class="search-mark" aria-hidden="true"></span>
            <input id="course-search" type="search" placeholder="Contoh: UX301 atau Rekayasa Interaksi" autocomplete="off" value="${escapeAttribute(state.query)}">
          </div>
          <div class="list-heading"><h2 id="course-heading">Mata kuliah tersedia</h2><span id="course-count" role="status">${results.count} mata kuliah</span></div>
          <div id="course-results">${results.html}</div>
        </section>
        ${draftPanel(state)}
      </div>`;
  }

  Object.assign(UI, { renderOfferings, renderOfferResults });
})();
