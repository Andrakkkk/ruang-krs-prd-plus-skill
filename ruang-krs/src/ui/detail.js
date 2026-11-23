(() => {
  'use strict';

  const { assess } = window.RuangKRS;
  const { reviewHash, courseHash } = window.RuangKRSRoutes;
  const UI = window.RuangKRSUI;
  const { fullName } = UI;
  const { arrow, backLink, intro, schedule, courseContext, facts, conflictStatus, creditStatus, draftPanel } = UI.components;

  function detailAction(option, status, state) {
    const { classConfirmationId, submitting } = state;
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

  function renderDetail(option, state) {
    const status = assess(option, state.draft);
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
            <div class="actions">${detailAction(option, status, state)}</div>
          </section>
        </div>
        ${draftPanel(state)}
      </div>`;
  }

  UI.renderDetail = renderDetail;
})();
