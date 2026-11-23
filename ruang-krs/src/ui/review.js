(() => {
  'use strict';

  const { offerHash } = window.RuangKRSRoutes;
  const UI = window.RuangKRSUI;
  const { arrow, backLink, intro, emptyState, selectionList, summaryPanel } = UI.components;

  function renderReview(state) {
    const { draft, feedback } = state;
    return `${backLink(offerHash, 'Kembali ke penawaran')}
      ${intro('Tinjau KRS', 'Periksa daftar kelas dan total SKS sebelum menyimpan hasil simulasi.')}
      ${feedback ? `<p class="feedback-note">${feedback}</p>` : ''}
      <div class="workspace">
        ${draft.length ? selectionList(draft, state, true) : emptyState('Draf KRS masih kosong', 'Pilih kelas terlebih dahulu untuk menyusun draf.',
          `<a id="add-options" class="button button-secondary" href="${offerHash}">Lihat penawaran ${arrow()}</a>`)}
        ${summaryPanel(draft, state, false)}
      </div>`;
  }

  UI.renderReview = renderReview;
})();
