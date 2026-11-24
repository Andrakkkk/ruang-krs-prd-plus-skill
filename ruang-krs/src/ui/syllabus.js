(() => {
  'use strict';
  const summaries = {
    UX301: ['Merancang interaksi berdasarkan kebutuhan pengguna.', 'Riset pengguna, alur tugas, prototipe, dan evaluasi kegunaan.'],
    UX302: ['Mengolah data untuk menjawab pertanyaan analitis.', 'Eksplorasi, pembersihan, visualisasi, dan interpretasi data.'],
    UX303: ['Menilai tanggung jawab profesional dalam praktik teknologi.', 'Privasi, konflik kepentingan, dan studi kasus keputusan etis.'],
    UX304: ['Mengembangkan konsep produk digital dan menguji rancangan.', 'Perumusan masalah, desain antarmuka, dan pengujian prototipe.']
  };
  const dialog = document.createElement('dialog');
  dialog.className = 'syllabus-dialog';
  dialog.setAttribute('aria-labelledby', 'syllabus-heading');
  document.body.append(dialog);
  document.addEventListener('click', event => {
    const trigger = event.target.closest('[data-syllabus]');
    if (!trigger) return;
    const course = window.RuangKRS.courses.find(item => item.code === trigger.dataset.syllabus);
    const [goal, topics] = summaries[course.code];
    dialog.innerHTML = `<header><span class="course-code">${course.code} · ${course.credits} SKS</span>
      <form method="dialog"><button aria-label="Tutup silabus" autofocus>×</button></form></header>
      <h2 id="syllabus-heading">${course.name}</h2><p class="dialog-label">Silabus simulasi</p>
      <h3>Tujuan pembelajaran</h3><p>${goal}</p><h3>Topik perkuliahan</h3><p>${topics}</p>
      <h3>Dosen dan jadwal</h3><ul>${course.classes.map(option => `<li><strong>Kelas ${option.letter} · ${option.lecturer}</strong><br>${window.RuangKRSUI.components.schedule(option)}</li>`).join('')}</ul>
      <form method="dialog"><button class="button button-primary">Kembali ke katalog</button></form>`;
    dialog.showModal();
  });
  window.addEventListener('hashchange', () => { if (dialog.open) dialog.close(); });
})();
