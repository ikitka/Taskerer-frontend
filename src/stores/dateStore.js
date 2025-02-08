import { create } from 'zustand';
import { getWeekForDate } from '../handlers/calendarHandler';

const useDateStore = create((set) => ({
  selectedDate: new Date(),
  currentWeek: getWeekForDate(new Date()),
  setSelectedDate: (date) =>
    set((state) => {
      const newSelectedDate = new Date(date);
      const week = getWeekForDate(newSelectedDate);
      return { selectedDate: newSelectedDate, currentWeek: week };
    }),
}));

export default useDateStore;