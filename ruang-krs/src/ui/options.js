(() => {
  'use strict';

  const { assess } = window.RuangKRS;
  const { offerHash, classHash } = window.RuangKRSRoutes;
  const UI = window.RuangKRSUI;
  const { arrow, backLink, intro, courseContext, facts, conflictStatus, creditStatus, draftPanel } = UI.components;

  function optionCard(option, state) {
    const status = assess(option, state.draft);
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

  function renderOptions(course, state) {
    return `${backLink(offerHash, 'Kembali ke penawaran')}
      ${intro(course.name, 'Pilihan kelas', courseContext(course))}
      <div class="workspace">
        <div class="option-grid">${course.classes.map(option => optionCard(option, state)).join('')}</div>
        ${draftPanel(state)}
      </div>`;
  }

  UI.renderOptions = renderOptions;
})();
