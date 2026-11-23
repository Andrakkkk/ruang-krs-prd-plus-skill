(() => {
  'use strict';

  const { classes, assess } = window.RuangKRS;
  const storageKey = 'ruang-krs-prd-skill-v1';

  function sanitizeList(list) {
    if (!Array.isArray(list)) return [];
    const valid = [];
    for (const id of list) {
      const option = classes.get(id);
      if (!option) continue;
      const status = assess(option, valid);
      if (status.canAdd && !status.replacement) valid.push(id);
    }
    return valid;
  }

  function readChoices() {
    const raw = localStorage.getItem(storageKey);
    if (raw === null) return { draft: [], result: [], loadFailed: false };

    try {
      const saved = JSON.parse(raw);
      if (!Array.isArray(saved?.draft) || !Array.isArray(saved?.result)) throw new Error('Format data lokal');
      const draft = sanitizeList(saved.draft);
      const result = sanitizeList(saved.result);
      const loadFailed = draft.length !== saved.draft.length || result.length !== saved.result.length;
      return { draft, result, loadFailed };
    } catch {
      return { draft: [], result: [], loadFailed: true };
    }
  }

  function load() {
    try {
      return readChoices();
    } catch {
      return { draft: [], result: [], loadFailed: true };
    }
  }

  function sameChoices(first, second) {
    return first.length === second.length && first.every((id, index) => id === second[index]);
  }

  async function save({ expectedDraft, draft, result }) {
    function writeChoices() {
      let current;
      try {
        current = readChoices();
        if (!sameChoices(expectedDraft, current.draft)) return { ...current, status: 'stale' };

        const next = { draft, result: result ?? current.result };
        localStorage.setItem(storageKey, JSON.stringify(next));
        return { ...next, status: 'saved' };
      } catch {
        return { status: 'failed', result: current?.loadFailed ? undefined : current?.result };
      }
    }

    // Serialize the read, stale-draft check, and write across tabs when available.
    try {
      if (navigator.locks) return await navigator.locks.request(storageKey, writeChoices);
    } catch {
      // Some browsers restrict Web Locks even when local storage is accessible.
    }
    return writeChoices();
  }

  Object.assign(window.RuangKRS, { load, save, storageKey });
})();
