import React, { useState } from "react";
import "./Calendar.css";

const Calendar = ({ onDateSelect, initialDate }) => {
  const [currentViewDate, setCurrentViewDate] = useState(new Date(initialDate || new Date()));
  const daysOfWeek = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

  // Получение количества дней в месяце
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  // Получение начального дня месяца
  const getStartDay = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  // Генерация массива дней для календаря
  const generateCalendarDays = () => {
    const totalCells = 42;
    const daysInMonth = getDaysInMonth(currentViewDate);
    const startDay = getStartDay(currentViewDate);
    const calendarDays = [];
    for (let i = 0; i < startDay; i++) {
      calendarDays.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      const day = new Date(currentViewDate.getFullYear(), currentViewDate.getMonth(), i);
      calendarDays.push(day);
    }
    const remainingCells = totalCells - calendarDays.length;
    for (let i = 0; i < remainingCells; i++) {
      calendarDays.push(null);
    }
    return calendarDays;
  };

  // Обработчик нажатия на кнопку "<" (предыдущий месяц)
  const handlePrevMonth = () => {
    setCurrentViewDate((prevDate) => {
      let newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };

  // Обработчик нажатия на кнопку ">" (следующий месяц)
  const handleNextMonth = () => {
    setCurrentViewDate((prevDate) => {
      let newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };

  // Генерируем дни для календаря
  const calendarDays = generateCalendarDays();

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button className="navigation-button" onClick={handlePrevMonth}>
          {"<"}
        </button>
        <span>{currentViewDate.toLocaleString("ru", { month: "long", year: "numeric" })}</span>
        <button className="navigation-button" onClick={handleNextMonth}>
          {">"}
        </button>
      </div>
      <div className="calendar-grid">
        {daysOfWeek.map((day, idx) => (
          <div key={idx} className="calendar-day-name">
            {day}
          </div>
        ))}
        {calendarDays.map((day, idx) => {
          if (!day) {
            return <div key={idx} className="calendar-day">&nbsp;</div>;
          }
          const isToday = day.toDateString() === new Date().toDateString();
          const isSelected =
            day &&
            initialDate &&
            day.toDateString() === initialDate.toDateString();
          return (
            <div
              key={idx}
              className={`calendar-day ${isToday ? "today" : ""} ${isSelected ? "selected" : ""}`}
              onClick={() => onDateSelect(day)}
            >
              {day.getDate()}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;