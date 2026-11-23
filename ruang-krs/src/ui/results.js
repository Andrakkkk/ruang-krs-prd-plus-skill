(() => {
  'use strict';

  const { offerHash, reviewHash } = window.RuangKRSRoutes;
  const UI = window.RuangKRSUI;
  const { arrow, backLink, intro, emptyState, selectionList, summaryPanel } = UI.components;

  function renderResults(state) {
    const { result } = state;
    const title = 'Hasil simulasi';
    const content = result.length
      ? `${intro(title, 'Pilihan KRS tersimpan di peramban ini.')}
        <div class="workspace">${selectionList(result, state)}${summaryPanel(result, state, true)}</div>`
      : `${intro(title, 'Hasil akan muncul setelah draf disimpan.')}
        ${emptyState('Belum ada hasil tersimpan', 'Tinjau draf dan simpan pilihan untuk menampilkan hasil simulasi.',
          `<a class="button button-secondary" href="${reviewHash}">Tinjau KRS ${arrow()}</a>`)}`;
    return `${backLink(offerHash, 'Kembali ke penawaran')}${content}`;
  }

  UI.renderResults = renderResults;
})();
