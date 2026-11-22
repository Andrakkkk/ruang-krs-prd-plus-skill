(() => {
  'use strict';

  const { courses, classes, assess, load, save, totalCredits, creditLimit } = window.RuangKRS;
  const main = document.getElementById('konten');
  const live = document.getElementById('announcement');
  const count = document.getElementById('draft-count');
  const navLinks = document.querySelectorAll('[data-nav]');
  const initial = load();
  let draft = initial.draft;
  let result = initial.result;
  let storageNotice = initial.loadFailed
    ? 'Sebagian atau seluruh data lokal tidak dapat dibaca. Periksa pilihan yang tersedia.'
    : '';
  let submitNotice = '';
  let submitting = false;
  let classConfirmationId = '';
  let feedback = '';
  let query = '';
  let route;
  let announcementTimer;

  const offerHash = '#/penawaran';
  const reviewHash = '#/tinjau';
  const resultHash = '#/hasil';
  const courseHash = code => `#/mata-kuliah/${code}`;
  const classHash = id => `#/kelas/${id}`;

  function announce(message) {
    live.textContent = '';
    window.clearTimeout(announcementTimer);
    announcementTimer = window.setTimeout(() => { live.textContent = message; }, 30);
  }

  function currentRoute() {
    const path = location.hash.slice(1);
    if (path === '/penawaran' || path === '/tinjau' || path === '/hasil') {
      return { page: path.slice(1) };
    }

    const courseMatch = /^\/mata-kuliah\/(UX\d+)$/.exec(path);
    const course = courseMatch && courses.find(item => item.code === courseMatch[1]);
    if (course) return { page: 'pilihan', course };

    const classMatch = /^\/kelas\/(UX\d+-[A-Z])$/.exec(path);
    const option = classMatch && classes.get(classMatch[1]);
    if (option) return { page: 'detail', option, course: option.course };

    history.replaceState(null, '', offerHash);
    return { page: 'penawaran', missing: Boolean(path) };
  }

  function arrow() {
    return '<span class="arrow" aria-hidden="true">→</span>';
  }

  function backLink(href, label) {
    return `<a class="back-link" href="${href}"><span aria-hidden="true">←</span> ${label}</a>`;
  }

  function intro(title, description, context = '') {
    return `<div class="page-intro">
      ${context}
      <h1 id="page-heading" tabindex="-1">${title}</h1>
      <p>${description}</p>
    </div>`;
  }

  function schedule(option) {
    if (!option.day) return 'Waktu belum tersedia';
    return `${option.day} <span class="time">${option.start}–${option.end} WIB</span>`;
  }

  function fullName(option) {
    return `${option.course.name} · Kelas ${option.letter}`;
  }

  function courseContext(course) {
    return `<p class="course-context"><span class="course-code">${course.code}</span><span>${course.credits} SKS</span></p>`;
  }

  function statusBox(kind, title, content = '') {
    return `<div class="status-box status-${kind}">
      <p class="status-title">${title}</p>
      ${content}
    </div>`;
  }

  function creditStatus(status) {
    if (!status.exceedsLimit) return '';
    return statusBox('attention', 'Melebihi batas SKS simulasi', `<p>Dengan pilihan ini, total menjadi ${status.projectedCredits} SKS. Batas draf adalah ${creditLimit} SKS untuk simulasi.</p>`);
  }

  function conflictStatus(option, status) {
    if (!option.day) {
      return statusBox('muted', 'Jadwal belum dapat diperiksa', '<p>Waktu kelas belum tersedia.</p>');
    }
    if (status.overlaps.length) {
      return statusBox('attention', 'Bentrok dengan draf KRS', `<ul class="conflict-list">
        ${status.overlaps.map(({ item, start, end }) => `<li>
          <strong>${fullName(item)}</strong><br>
          ${option.day} <span class="time">${start}–${end} WIB</span>
        </li>`).join('')}
      </ul>`);
    }
    if (status.adjacent.length) {
      return statusBox('clear', 'Tidak bentrok', `<ul class="adjacent-list">
        ${status.adjacent.map(({ item, time }) => `<li>Jadwal bersentuhan pada <span class="time">${time} WIB</span> dengan ${fullName(item)}.</li>`).join('')}
      </ul>`);
    }
    return statusBox('clear', 'Tidak bentrok');
  }

  function facts(option) {
    return `<dl class="class-facts">
      <div><dt>Jadwal</dt><dd>${schedule(option)}</dd></div>
      <div><dt>Kuota</dt><dd><span class="time">${option.seats}</span> kursi tersisa${option.seats === 0 ? ' <strong class="label-attention">· Kelas penuh</strong>' : ''}</dd></div>
      <div><dt>Dosen</dt><dd>${option.lecturer}</dd></div>
    </dl>`;
  }

  function compactList(ids) {
    return `<ul class="compact-list">${ids.map(id => {
      const item = classes.get(id);
      return `<li><strong>${item.course.name}</strong><span>Kelas ${item.letter} · ${schedule(item)}</span></li>`;
    }).join('')}</ul>`;
  }

  function draftPanel() {
    return `<aside class="draft-panel panel" aria-labelledby="draft-panel-heading">
      <div class="panel-heading">
        <h2 id="draft-panel-heading">Draf KRS</h2>
        <span class="balance">${totalCredits(draft)} / ${creditLimit} SKS</span>
      </div>
      ${draft.length ? compactList(draft) : '<p class="panel-empty">Belum ada kelas di draf.</p>'}
      <p class="limit-note">Batas ${creditLimit} SKS untuk simulasi.</p>
      <a class="button button-secondary panel-button" href="${reviewHash}">Tinjau KRS ${arrow()}</a>
    </aside>`;
  }

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

  function emptyState(title, text, action = '') {
    return `<div class="empty-state panel"><h2>${title}</h2><p>${text}</p>${action}</div>`;
  }

  function renderOfferResults() {
    const terms = query.toLowerCase().trim().split(/\s+/);
    const filtered = courses.filter(course => {
      const haystack = `${course.code} ${course.name}`.toLowerCase();
      return terms.every(term => haystack.includes(term));
    });
    document.getElementById('course-count').textContent = `${filtered.length} mata kuliah`;
    document.getElementById('course-results').innerHTML = filtered.length
      ? `<ul class="course-grid">${filtered.map(offerCard).join('')}</ul>`
      : emptyState('Mata kuliah tidak ditemukan', 'Coba nama atau kode mata kuliah lain.',
        '<button class="button button-secondary" id="clear-search" type="button">Hapus pencarian</button>');
  }

  function offerings() {
    return `${intro('Penawaran mata kuliah', 'Bandingkan jadwal, kuota, dan dosen sebelum menyusun draf KRS.')}
      <div class="workspace">
        <section class="offering" aria-labelledby="course-heading">
          <label for="course-search">Cari mata kuliah</label>
          <div class="search-field">
            <span class="search-mark" aria-hidden="true"></span>
            <input id="course-search" type="search" placeholder="Contoh: UX301 atau Rekayasa Interaksi" autocomplete="off">
          </div>
          <div class="list-heading"><h2 id="course-heading">Mata kuliah tersedia</h2><span id="course-count" role="status"></span></div>
          <div id="course-results"></div>
        </section>
        ${draftPanel()}
      </div>`;
  }

  function optionCard(option) {
    const status = assess(option, draft);
    return `<article class="option-card panel" aria-labelledby="option-${option.id}">
      <div class="panel-heading">
        <h2 id="option-${option.id}">Kelas ${option.letter}</h2>
        ${status.selected ? '<span class="state-tag">Di draf</span>' : ''}
      </div>
      ${facts(option)}
      ${conflictStatus(option, status)}
      ${creditStatus(status)}
      <a class="button button-secondary" id="open-${option.id}" href="${classHash(option.id)}" aria-label="Lihat detail kelas ${option.letter}">Lihat detail kelas ${arrow()}</a>
    </article>`;
  }

  function options(course) {
    return `${backLink(offerHash, 'Kembali ke penawaran')}
      ${intro(course.name, 'Pilihan kelas', courseContext(course))}
      <div class="workspace">
        <div class="option-grid">${course.classes.map(optionCard).join('')}</div>
        ${draftPanel()}
      </div>`;
  }

  function detailAction(option, status) {
    if (status.selected) {
      return `<a class="button button-primary" href="${reviewHash}">Tinjau KRS ${arrow()}</a>`;
    }
    const action = status.replacement ? 'Ganti kelas di draf' : 'Tambahkan ke draf';
    if (status.canAdd && classConfirmationId === option.id) {
      const confirmLabel = status.replacement ? 'Ya, ganti kelas' : 'Ya, tambahkan';
      return `<div class="class-confirmation" role="group" aria-labelledby="class-confirmation-heading">
        <p id="class-confirmation-heading"><strong>Konfirmasi ${status.replacement ? 'penggantian' : 'penambahan'} kelas</strong></p>
        <p>${fullName(option)} · ${schedule(option)}</p>
        <div class="actions">
          <button class="button button-primary" id="confirm-class" type="button" ${submitting ? 'disabled' : ''}>${confirmLabel} ${arrow()}</button>
          <button class="button button-secondary" id="cancel-class" type="button">Batal</button>
        </div>
      </div>`;
    }
    const available = `<button class="button button-primary" id="add-class" type="button" ${submitting ? 'disabled' : ''}>${action} ${arrow()}</button>`;
    const alternative = `<a class="button button-secondary" href="${courseHash(option.course.code)}">Lihat alternatif kelas ${arrow()}</a>`;
    if (status.canAdd) return available;
    return `${alternative}<button class="button button-primary" id="add-class" type="button" disabled>${action}</button>`;
  }

  function detail(option) {
    const status = assess(option, draft);
    let selectionStatus = '';
    if (status.selected) {
      selectionStatus = '<p class="selection-note">Kelas ini sudah ada di draf KRS.</p>';
    } else if (status.replacement) {
      selectionStatus = `<p class="selection-note">Memilih kelas ini akan menggantikan ${fullName(status.replacement)} di draf. Pemeriksaan jadwal menggunakan kelas lain yang sudah dipilih.</p>`;
    }

    let unavailable = '';
    if (option.seats === 0) unavailable = '<p class="action-note">Kelas penuh. Pilih kelas lain yang masih memiliki kuota.</p>';
    else if (!option.day) unavailable = '<p class="action-note">Waktu kelas perlu tersedia sebelum kelas dapat dipilih.</p>';
    else if (status.overlaps.length) unavailable = '<p class="action-note">Pilih alternatif agar jadwal di draf bebas bentrok.</p>';

    return `${backLink(courseHash(option.course.code), 'Kembali ke pilihan kelas')}
      ${intro(`Kelas ${option.letter}`, option.course.name, courseContext(option.course))}
      <div class="workspace">
        <div class="detail-panel panel">
          <section aria-labelledby="class-info-heading">
            <h2 id="class-info-heading">Informasi kelas</h2>
            ${facts(option)}
          </section>
          <section class="check-section" aria-labelledby="check-heading">
            <h2 id="check-heading">Pemeriksaan jadwal</h2>
            ${selectionStatus}
            ${conflictStatus(option, status)}
            ${creditStatus(status)}
            ${unavailable}
            <div class="actions">${detailAction(option, status)}</div>
          </section>
        </div>
        ${draftPanel()}
      </div>`;
  }

  function selectionList(ids, removable = false) {
    return `<ul class="selection-list panel">${ids.map(id => {
      const item = classes.get(id);
      return `<li>
        <div class="selection-info">
          ${courseContext(item.course)}
          <h2>${item.course.name}</h2>
          <p>Kelas ${item.letter} · ${schedule(item)}</p>
        </div>
        ${removable ? `<button class="button button-text" type="button" data-remove="${id}" aria-label="Hapus ${item.course.name} kelas ${item.letter}" ${submitting ? 'disabled' : ''}>Hapus</button>` : ''}
      </li>`;
    }).join('')}</ul>`;
  }

  function summaryPanel(ids, final) {
    const action = final
      ? `<a class="button button-primary panel-button" id="start-new" href="${offerHash}">${draft.length ? 'Lanjutkan pengisian' : 'Mulai pengisian baru'} ${arrow()}</a>`
      : `<button class="button button-primary panel-button" id="confirm-draft" type="button" ${ids.length && !submitting ? '' : 'disabled'} ${submitting ? 'aria-busy="true"' : ''}>${submitting ? 'Menyimpan…' : `Simpan hasil simulasi ${arrow()}`}</button>`;
    return `<aside class="summary-panel panel" aria-labelledby="summary-heading">
      <h2 id="summary-heading">${final ? 'Ringkasan hasil' : 'Ringkasan draf'}</h2>
      <dl><div><dt>Jumlah kelas</dt><dd>${ids.length}</dd></div>
      <div class="summary-total"><dt>Total SKS</dt><dd>${totalCredits(ids)}${final ? '' : ` / ${creditLimit}`} SKS</dd></div></dl>
      ${final ? '' : `<p class="limit-note">Batas ${creditLimit} SKS untuk simulasi.</p>`}
      ${submitNotice && !final ? `<p class="inline-alert" role="alert">${submitNotice}</p>` : ''}
      ${submitting && !final ? '<p class="submission-progress" id="submit-progress" tabindex="-1" role="status">Penyimpanan simulasi sedang diproses.</p>' : ''}
      ${action}
    </aside>`;
  }

  function review() {
    return `${backLink(offerHash, 'Kembali ke penawaran')}
      ${intro('Tinjau KRS', 'Periksa daftar kelas dan total SKS sebelum menyimpan hasil simulasi.')}
      ${feedback ? `<p class="feedback-note">${feedback}</p>` : ''}
      <div class="workspace">
        ${draft.length ? selectionList(draft, true) : emptyState('Draf KRS masih kosong', 'Pilih kelas terlebih dahulu untuk menyusun draf.',
          `<a id="add-options" class="button button-secondary" href="${offerHash}">Lihat penawaran ${arrow()}</a>`)}
        ${summaryPanel(draft, false)}
      </div>`;
  }

  function results() {
    const title = 'Hasil simulasi';
    const content = result.length
      ? `${intro(title, 'Pilihan KRS tersimpan di peramban ini.')}
        <div class="workspace">${selectionList(result)}${summaryPanel(result, true)}</div>`
      : `${intro(title, 'Hasil akan muncul setelah draf disimpan.')}
        ${emptyState('Belum ada hasil tersimpan', 'Tinjau draf dan simpan pilihan untuk menampilkan hasil simulasi.',
          `<a class="button button-secondary" href="${reviewHash}">Tinjau KRS ${arrow()}</a>`)}`;
    return `${backLink(offerHash, 'Kembali ke penawaran')}${content}`;
  }

  const screens = { penawaran: offerings, pilihan: options, detail, tinjau: review, hasil: results };

  function render() {
    const section = route.course ? 'penawaran' : route.page;
    navLinks.forEach(link => {
      if (link.dataset.nav === section) link.setAttribute('aria-current', route.course ? 'location' : 'page');
      else link.removeAttribute('aria-current');
      if (link.dataset.nav === 'tinjau') link.setAttribute('aria-label', `Tinjau KRS, ${totalCredits(draft)} dari ${creditLimit} SKS simulasi`);
    });
    count.textContent = `${totalCredits(draft)} / ${creditLimit} SKS`;

    main.innerHTML = `${storageNotice ? `<p class="inline-alert storage-alert" role="status">${storageNotice}</p>` : ''}
      ${route.missing ? '<p class="inline-alert storage-alert">Tautan tersebut tidak ditemukan. Penawaran mata kuliah ditampilkan.</p>' : ''}
      ${screens[route.page](route.option || route.course)}`;

    if (route.page === 'penawaran') {
      document.getElementById('course-search').value = query;
      renderOfferResults();
    }
    const pageTitle = route.option ? fullName(route.option) : document.getElementById('page-heading').textContent;
    document.title = `${pageTitle} · Ruang KRS`;
  }

  function navigate() {
    const previous = route;
    route = currentRoute();
    classConfirmationId = '';
    if (route.page !== 'tinjau') {
      submitNotice = '';
      feedback = '';
    }
    render();
    if (!previous) return;

    let restoreId = '';
    if (previous.page === 'detail' && route.page === 'pilihan' && route.course === previous.course) {
      restoreId = `open-${previous.option.id}`;
    } else if (previous.page === 'pilihan' && route.page === 'penawaran') {
      restoreId = `course-${previous.course.code}`;
    }
    const restoreTarget = document.getElementById(restoreId);
    if (restoreTarget) {
      restoreTarget.focus();
      return;
    }
    window.scrollTo(0, 0);
    document.getElementById('page-heading').focus({ preventScroll: true });
  }

  function updateDraft(next) {
    const stored = save(next, result);
    draft = next;
    submitNotice = '';
    storageNotice = stored ? '' : 'Perubahan draf hanya tersedia selama halaman ini terbuka. Periksa izin penyimpanan peramban sebelum memuat ulang.';
    return stored;
  }

  function addClass() {
    if (route.page !== 'detail' || submitting || classConfirmationId !== route.option.id) return;
    const option = route.option;
    const status = assess(option, draft);
    if (!status.canAdd) return;
    const next = status.replacement
      ? draft.map(id => id === status.replacement.id ? option.id : id)
      : [...draft, option.id];
    const stored = updateDraft(next);
    feedback = `${fullName(option)} ${status.replacement ? 'menggantikan pilihan sebelumnya' : 'ditambahkan ke draf'}.`;
    announce(`${feedback}${stored ? '' : ' Perubahan hanya tersedia selama halaman terbuka.'}`);
    location.hash = reviewHash;
  }

  function removeClass(id) {
    const position = draft.indexOf(id);
    if (route.page !== 'tinjau' || position < 0 || submitting) return;
    const stored = updateDraft(draft.filter(item => item !== id));
    feedback = `${fullName(classes.get(id))} dihapus dari draf.`;
    render();
    const buttons = main.querySelectorAll('[data-remove]');
    const nextFocus = buttons[Math.min(position, buttons.length - 1)] || document.getElementById('add-options');
    nextFocus.focus();
    announce(`${feedback}${stored ? '' : ' Perubahan hanya tersedia selama halaman terbuka.'}`);
  }

  async function confirmDraft() {
    if (route.page !== 'tinjau' || draft.length === 0 || submitting) return;
    const submitted = [...draft];
    submitNotice = '';
    submitting = true;
    render();
    document.getElementById('submit-progress').focus();
    await new Promise(resolve => window.setTimeout(resolve, 450));
    submitting = false;
    if (!save([], submitted)) {
      submitNotice = 'Hasil gagal disimpan. Draf masih tersedia di halaman ini. Periksa izin penyimpanan peramban, lalu coba lagi.';
      render();
      document.getElementById('confirm-draft')?.focus();
      if (route.page !== 'tinjau') announce(submitNotice);
      return;
    }
    result = submitted;
    draft = [];
    storageNotice = '';
    announce('Hasil simulasi tersimpan.');
    if (route.page === 'hasil') render();
    else location.hash = resultHash;
  }

  function setClassConfirmation(open) {
    if (route.page !== 'detail' || submitting || !assess(route.option, draft).canAdd) return;
    classConfirmationId = open ? route.option.id : '';
    render();
    document.getElementById(open ? 'confirm-class' : 'add-class').focus();
  }

  main.addEventListener('input', event => {
    if (event.target.id !== 'course-search') return;
    query = event.target.value;
    renderOfferResults();
  });

  main.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button) return;
    if (button.id === 'add-class') setClassConfirmation(true);
    if (button.id === 'cancel-class') setClassConfirmation(false);
    if (button.id === 'confirm-class') addClass();
    if (button.id === 'confirm-draft') confirmDraft();
    if (button.dataset.remove) removeClass(button.dataset.remove);
    if (button.id === 'clear-search') {
      const search = document.getElementById('course-search');
      search.value = '';
      query = '';
      renderOfferResults();
      search.focus();
    }
  });

  document.querySelector('.skip-link').addEventListener('click', event => {
    event.preventDefault();
    main.focus();
  });
  window.addEventListener('hashchange', navigate);
  navigate();
})();
