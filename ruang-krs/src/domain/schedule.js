(() => {
  'use strict';

  const { classes } = window.RuangKRS;
  const creditLimit = 24;

  function hasGradeA(course) {
    return course.grade === 'A';
  }

  function minutes(time) {
    const [hours, remainder] = time.split('.').map(Number);
    return hours * 60 + remainder;
  }

  function assess(option, draft) {
    const previous = draft.map(id => classes.get(id)).find(item => item.course === option.course);
    const projectedCredits = totalCredits(draft) - (previous?.course.credits || 0) + option.course.credits;
    const overlaps = [];
    const adjacent = [];

    if (option.day) {
      for (const id of draft) {
        const item = classes.get(id);
        if (item.course === option.course || item.day !== option.day) continue;

        const startsLater = minutes(item.start) > minutes(option.start);
        const endsEarlier = minutes(item.end) < minutes(option.end);
        const start = startsLater ? item.start : option.start;
        const end = endsEarlier ? item.end : option.end;

        if (minutes(start) < minutes(end)) overlaps.push({ item, start, end });
        else if (minutes(start) === minutes(end)) adjacent.push({ item, time: start });
      }
    }

    const selected = previous === option;
    return {
      selected,
      replacement: selected ? null : previous,
      overlaps,
      adjacent,
      projectedCredits,
      exceedsLimit: projectedCredits > creditLimit,
      canAdd: !hasGradeA(option.course) && !selected && Boolean(option.day) && option.seats > 0 && overlaps.length === 0 && projectedCredits <= creditLimit
    };
  }

  function totalCredits(ids) {
    return ids.reduce((total, id) => total + classes.get(id).course.credits, 0);
  }

  Object.assign(window.RuangKRS, { creditLimit, assess, totalCredits, hasGradeA });
})();
