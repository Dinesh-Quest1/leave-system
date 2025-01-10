export function getMonthAsString(date: Date | null): string {
  if (!date) return '';
  return date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
}

export function getAllDatesOfMonth(
  currentDate: Date
): { date: string; day: string }[] {
  const dateFormat = new Date(currentDate);
  const year = dateFormat.getFullYear();
  const month = dateFormat.getMonth();
  const allDates = [];

  let date = new Date(year, month, 1);

  while (date.getMonth() === month) {
    const day = date.toLocaleString('en-US', { weekday: 'long' });
    const localDate = date.toLocaleDateString('en-CA');
    allDates.push({
      date: localDate,
      day: day,
      ...(date.getDate() === 1 && { firstDay: true }),
    });

    date.setDate(date.getDate() + 1);
  }

  if (allDates?.[0]?.day !== 'Sunday') {
    const previousMonthLastDay = new Date(year, month, 0);

    while (allDates?.[0]?.day !== 'Sunday') {
      const day = previousMonthLastDay.toLocaleString('en-US', {
        weekday: 'long',
      });
      const localDate = previousMonthLastDay.toLocaleDateString('en-CA');
      allDates.unshift({ date: localDate, day: day, previous: true });

      previousMonthLastDay.setDate(previousMonthLastDay.getDate() - 1);
    }
  }

  if (allDates?.[allDates?.length - 1]?.day !== 'Saturday') {
    const nextMonthFirstDay = new Date(year, month + 1, 1);

    while (allDates?.[allDates?.length - 1]?.day !== 'Saturday') {
      const day = nextMonthFirstDay.toLocaleString('en-US', {
        weekday: 'long',
      });
      const localDate = nextMonthFirstDay.toLocaleDateString('en-CA');
      allDates.push({
        date: localDate,
        day: day,
        next: true,
        ...(nextMonthFirstDay.getDate() === 1 && { firstDay: true }),
      });

      nextMonthFirstDay.setDate(nextMonthFirstDay.getDate() + 1);
    }
  }

  return allDates;
}
