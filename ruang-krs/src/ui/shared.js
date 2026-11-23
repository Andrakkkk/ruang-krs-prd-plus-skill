(() => {
  'use strict';

  const { classes, totalCredits, creditLimit } = window.RuangKRS;
  const { offerHash, reviewHash } = window.RuangKRSRoutes;

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

  function draftPanel(state) {
    const { draft } = state;
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

  function emptyState(title, text, action = '') {
    return `<div class="empty-state panel"><h2>${title}</h2><p>${text}</p>${action}</div>`;
  }

  function selectionList(ids, state, removable = false) {
    return `<ul class="selection-list panel">${ids.map(id => {
      const item = classes.get(id);
      return `<li>
        <div class="selection-info">
          ${courseContext(item.course)}
          <h2>${item.course.name}</h2>
          <p>Kelas ${item.letter} · ${schedule(item)}</p>
        </div>
        ${removable ? `<button class="button button-text" type="button" data-remove="${id}" aria-label="Hapus ${item.course.name} kelas ${item.letter}" ${state.submitting ? 'disabled' : ''}>Hapus</button>` : ''}
      </li>`;
    }).join('')}</ul>`;
  }

  function summaryPanel(ids, state, final) {
    const { draft, submitting, submitNotice } = state;
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

  function escapeAttribute(value) {
    return String(value).replace(/[&"<>']/g, character => ({
      '&': '&amp;', '"': '&quot;', '<': '&lt;', '>': '&gt;', "'": '&#39;'
    })[character]);
  }

  window.RuangKRSUI = {
    fullName,
    components: {
      arrow, backLink, intro, schedule, courseContext, creditStatus,
      conflictStatus, facts, draftPanel, emptyState, selectionList,
      summaryPanel, escapeAttribute
    }
  };
})();
