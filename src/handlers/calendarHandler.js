
export function getWeekForDate(date) {
  const week = [];
  const currentDay = date.getDay();
  const startDate = new Date(date);
  startDate.setDate(startDate.getDate() - currentDay);

  for (let i = 0; i < 7; i++) {
    week.push(new Date(startDate));
    startDate.setDate(startDate.getDate() + 1);
  }

  return week;
}