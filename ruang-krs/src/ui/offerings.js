(() => {
  'use strict';

  const { courses, classes, assess, creditLimit, totalCredits } = window.RuangKRS;
  const { courseHash, classHash } = window.RuangKRSRoutes;
  const UI = window.RuangKRSUI;
  const { arrow, draftPanel, emptyState, escapeAttribute, schedule } = UI.components;
  const weekdays = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];

  function classRow(option, draft) {
    const status = assess(option, draft);
    let label = option.seats + ' kursi';
    let tone = '';
    if (status.selected) { label = 'Di draf'; tone = 'selected'; }
    else if (status.overlaps.length) { label = 'Bentrok'; tone = 'warning'; }
    else if (!option.seats) { label = 'Penuh'; tone = 'warning'; }
    else if (!option.day) { label = 'Menunggu jadwal'; tone = 'pending'; }
    return `<a class="catalog-row" href="${classHash(option.id)}">
      <strong>Kelas ${option.letter}</strong><span>${schedule(option)}</span>
      <small class="seat-tag ${tone}">${label}</small><span aria-hidden="true">↗</span></a>`;
  }

  function offerCard(course, options, draft) {
    return `<li class="catalog-card panel">
      <a class="course-card" id="course-${course.code}" href="${courseHash(course.code)}">
        <div class="card-meta"><span class="course-code">${course.code}</span><span>${course.credits} SKS</span></div>
        <h3>${course.name}</h3><span class="card-action">Lihat pilihan kelas ${arrow()}</span>
      </a>
      ${options.map(option => classRow(option, draft)).join('')}
      <button class="syllabus-link" data-syllabus="${course.code}" type="button">Silabus &amp; dosen ↗</button>
    </li>`;
  }

  function renderOfferResults(query, day, availableOnly, draft) {
    const terms = query.toLowerCase().trim().split(/\s+/);
    const cards = [];
    for (const course of courses) {
      const haystack = (course.code + ' ' + course.name).toLowerCase();
      if (!terms.every(term => haystack.includes(term))) continue;
      const options = course.classes.filter(option => (!day || option.day === day) && (!availableOnly || option.seats > 0));
      if (options.length) cards.push(offerCard(course, options, draft));
    }
    return { count: cards.length, html: cards.length ? '<ul class="course-grid">' + cards.join('') + '</ul>' :
      emptyState('Mata kuliah tidak ditemukan', 'Coba kata kunci lain atau ubah filter kelas.',
        '<button class="button button-secondary" id="clear-search" type="button">Hapus pencarian dan filter</button>') };
  }

  function weekPreview(draft) {
    const selected = draft.map(id => classes.get(id));
    return `<section class="week-panel panel" aria-labelledby="week-heading">
      <h2 id="week-heading">Jadwal mingguan</h2>
      <dl>${weekdays.map(day => {
        const items = selected.filter(item => item.day === day).sort((a, b) => a.start.localeCompare(b.start));
        return `<div><dt>${day}</dt><dd>${items.length ? items.map(item =>
          `<span><b>${item.course.code} · ${item.letter}</b><br>${item.start}–${item.end} WIB</span>`).join('') : '—'}</dd></div>`;
      }).join('')}</dl>
    </section>`;
  }

  function renderOfferings(state) {
    const { draft, query, day, availableOnly } = state;
    const results = renderOfferResults(query, day, availableOnly, draft);
    const credits = totalCredits(draft);
    const metrics = [['Batas beban', creditLimit, 'SKS'], ['Beban terpilih', credits, 'SKS'], ['Sisa beban', creditLimit - credits, 'SKS'], ['Mata kuliah terpilih', draft.length, 'MK']];
    return `<div class="page-intro portal-banner"><div><h1 id="page-heading" tabindex="-1">Penawaran mata kuliah</h1>
      <p>Bandingkan kelas dan susun rencana studi semester ini.</p></div>
      <a class="button button-secondary" href="#/tinjau">Tinjau draf ↗</a></div>
      <dl class="metrics">${metrics.map(([label, value, unit]) => `<div><dt>${label}</dt><dd>${value} <small>${unit}</small></dd></div>`).join('')}</dl>
      <section class="catalog-toolbar" aria-label="Pencarian dan filter">
        <div><label for="course-search">Cari mata kuliah</label><div class="search-field"><span class="search-mark" aria-hidden="true"></span>
        <input id="course-search" type="search" placeholder="Nama atau kode mata kuliah" autocomplete="off" value="${escapeAttribute(query)}"></div></div>
        <div><label for="day-filter">Hari kuliah</label><select id="day-filter"><option value="">Semua hari</option>
        ${weekdays.map(value => `<option${value === day ? ' selected' : ''}>${value}</option>`).join('')}</select></div>
        <label class="quota-filter"><input type="checkbox" id="available-only" ${availableOnly ? 'checked' : ''}> Kuota tersedia</label>
      </section>
      <div class="workspace"><section class="offering" aria-labelledby="course-heading">
        <div class="list-heading"><h2 id="course-heading">Katalog mata kuliah</h2><span id="course-count" role="status">${results.count} mata kuliah</span></div>
        <div id="course-results">${results.html}</div></section><div class="catalog-aside">${draftPanel(state)}${weekPreview(draft)}</div></div>`;
  }

  Object.assign(UI, { renderOfferings, renderOfferResults });
})();
