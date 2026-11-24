(() => {
  'use strict';

  const { classes, assess, load, save, totalCredits, creditLimit } = window.RuangKRS;
  const { offerHash, reviewHash, resultHash, classHash, resolveRoute } = window.RuangKRSRoutes;
  const {
    fullName, renderOfferings, renderOfferResults, renderOptions, renderDetail, renderReview, renderResults
  } = window.RuangKRSUI;
  const main = document.getElementById('konten');
  const live = document.getElementById('announcement');
  const count = document.getElementById('draft-count');
  const navLinks = document.querySelectorAll('[data-nav]');
  const initial = load();
  let draft = initial.draft;
  let persistedDraft = initial.draft;
  let result = initial.result;
  let storageNotice = initial.loadFailed
    ? 'Sebagian atau seluruh data lokal tidak dapat dibaca. Periksa pilihan yang tersedia.'
    : '';
  let submitNotice = '';
  let submitting = false;
  let editingDraft = false;
  let classConfirmationId = '';
  let feedback = '';
  let query = '';
  let day = '';
  let availableOnly = false;
  let route;
  let announcementTimer;

  function announce(message) {
    live.textContent = '';
    window.clearTimeout(announcementTimer);
    announcementTimer = window.setTimeout(() => { live.textContent = message; }, 30);
  }

  const screens = {
    penawaran: renderOfferings,
    pilihan: state => renderOptions(route.course, state),
    detail: state => renderDetail(route.option, state),
    tinjau: renderReview,
    hasil: renderResults
  };

  function updateOfferResults() {
    const matches = renderOfferResults(query, day, availableOnly, draft);
    document.getElementById('course-count').textContent = matches.count + ' mata kuliah';
    document.getElementById('course-results').innerHTML = matches.html;
  }

  function render(preserveFocus = false) {
    const active = document.activeElement;
    const focusId = preserveFocus && main.contains(active) ? active.id : '';
    const section = route.course ? 'penawaran' : route.page;
    const draftCredits = totalCredits(draft);
    const viewState = { draft, result, query, day, availableOnly, feedback, submitting, editingDraft, classConfirmationId, submitNotice };
    navLinks.forEach(link => {
      if (link.dataset.nav === section) link.setAttribute('aria-current', route.course ? 'location' : 'page');
      else link.removeAttribute('aria-current');
      if (link.dataset.nav === 'tinjau') link.setAttribute('aria-label', `Tinjau KRS, ${draftCredits} dari ${creditLimit} SKS simulasi`);
    });
    count.textContent = `${draftCredits} / ${creditLimit} SKS`;

    main.innerHTML = `${storageNotice ? `<p class="inline-alert storage-alert" id="storage-notice" role="status" tabindex="-1">${storageNotice}</p>` : ''}
      ${route.missing ? '<p class="inline-alert storage-alert">Tautan tersebut tidak ditemukan. Penawaran mata kuliah ditampilkan.</p>' : ''}
      ${screens[route.page](viewState)}`;

    const pageTitle = route.option ? fullName(route.option) : document.getElementById('page-heading').textContent;
    document.title = `${pageTitle} Â· Ruang KRS`;
    if (focusId) document.getElementById(focusId)?.focus({ preventScroll: true });
  }

  function navigate() {
    const previous = route;
    route = resolveRoute(location.hash);
    if (route.fallback) history.replaceState(null, '', offerHash);
    classConfirmationId = '';
    if (previous && route.page === 'hasil') {
      const latest = load();
      if (!latest.loadFailed) result = latest.result;
    }
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

  function refreshStaleDraft(latest, origin) {
    draft = latest.draft;
    persistedDraft = latest.draft;
    result = latest.result;
    classConfirmationId = '';
    submitNotice = '';
    feedback = '';
    storageNotice = 'Draf berubah di tab lain. Pilihan terbaru ditampilkan. Periksa kembali sebelum mencoba lagi.';
    render(route !== origin);
    if (route === origin) document.getElementById('storage-notice').focus();
    else announce(storageNotice);
  }

  async function updateDraft(next) {
    const origin = route;
    editingDraft = true;
    const outcome = await save({ expectedDraft: persistedDraft, draft: next });
    editingDraft = false;
    if (outcome.status === 'stale') {
      refreshStaleDraft(outcome, origin);
      return outcome.status;
    }

    if (outcome.result) result = outcome.result;
    draft = next;
    submitNotice = '';
    if (outcome.status === 'saved') persistedDraft = next;
    storageNotice = outcome.status === 'saved' ? '' : 'Perubahan draf hanya tersedia selama halaman ini terbuka. Periksa izin penyimpanan peramban sebelum memuat ulang.';
    return outcome.status;
  }

  async function addClass() {
    if (route.page !== 'detail' || submitting || editingDraft || classConfirmationId !== route.option.id) return;
    const origin = route;
    const option = route.option;
    const status = assess(option, draft);
    if (!status.canAdd) return;
    const next = status.replacement
      ? draft.map(id => id === status.replacement.id ? option.id : id)
      : [...draft, option.id];
    const statusSave = await updateDraft(next);
    if (statusSave === 'stale') return;
    const message = `${fullName(option)} ${status.replacement ? 'menggantikan pilihan sebelumnya' : 'ditambahkan ke draf'}.`;
    announce(`${message}${statusSave === 'saved' ? '' : ' Perubahan hanya tersedia selama halaman terbuka.'}`);
    if (route === origin && location.hash === classHash(option.id)) {
      feedback = message;
      location.hash = reviewHash;
      return;
    }
    if (route.page === 'tinjau') feedback = message;
    render(true);
  }

  async function removeClass(id) {
    const position = draft.indexOf(id);
    if (route.page !== 'tinjau' || position < 0 || submitting || editingDraft) return;
    const origin = route;
    const statusSave = await updateDraft(draft.filter(item => item !== id));
    if (statusSave === 'stale') return;
    const message = `${fullName(classes.get(id))} dihapus dari draf.`;
    announce(`${message}${statusSave === 'saved' ? '' : ' Perubahan hanya tersedia selama halaman terbuka.'}`);
    if (route.page === 'tinjau') feedback = message;
    if (route !== origin || location.hash !== reviewHash) {
      render(true);
      return;
    }
    render();
    const buttons = main.querySelectorAll('[data-remove]');
    const nextFocus = buttons[Math.min(position, buttons.length - 1)] || document.getElementById('add-options');
    nextFocus?.focus();
  }

  async function confirmDraft() {
    if (route.page !== 'tinjau' || draft.length === 0 || submitting || editingDraft) return;
    const origin = route;
    const submitted = [...draft];
    submitNotice = '';
    submitting = true;
    render();
    document.getElementById('submit-progress').focus();
    await new Promise(resolve => window.setTimeout(resolve, 450));
    const outcome = await save({ expectedDraft: persistedDraft, draft: [], result: submitted });
    submitting = false;
    if (outcome.status === 'stale') {
      refreshStaleDraft(outcome, origin);
      return;
    }
    if (outcome.result) result = outcome.result;
    if (outcome.status === 'failed') {
      submitNotice = 'Hasil gagal disimpan. Draf masih tersedia di halaman ini. Periksa izin penyimpanan peramban, lalu coba lagi.';
      render();
      document.getElementById('confirm-draft')?.focus();
      if (route.page !== 'tinjau') announce(submitNotice);
      return;
    }
    draft = outcome.draft;
    persistedDraft = outcome.draft;
    storageNotice = '';
    announce('Hasil simulasi tersimpan.');
    if (route === origin && location.hash === reviewHash) location.hash = resultHash;
    else render(true);
  }

  function setClassConfirmation(open) {
    if (route.page !== 'detail' || submitting || editingDraft || !assess(route.option, draft).canAdd) return;
    classConfirmationId = open ? route.option.id : '';
    render();
    document.getElementById(open ? 'confirm-class' : 'add-class').focus();
  }

  main.addEventListener('change', event => {
    if (event.target.id === 'day-filter') day = event.target.value;
    else if (event.target.id === 'available-only') availableOnly = event.target.checked;
    else return;
    updateOfferResults();
  });

  main.addEventListener('input', event => {
    if (event.target.id !== 'course-search') return;
    query = event.target.value;
    updateOfferResults();
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
      document.getElementById('day-filter').value = '';
      document.getElementById('available-only').checked = false;
      day = '';
      availableOnly = false;
      search.value = '';
      query = '';
      updateOfferResults();
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
