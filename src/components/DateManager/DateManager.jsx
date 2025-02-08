import React, { useEffect, useState } from "react";
import Calendar from "../../ui/calendar/Calendar";
import useDateStore from "../../stores/dateStore";

const DateManager = () => {
  const { selectedDate, currentWeek, setSelectedDate } = useDateStore();

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="date-manager-container">
      <h2>Выбор даты</h2>
      <p>Текущая выбранная дата: {selectedDate?.toLocaleDateString() || "Не выбрана"}</p>
      <ul>
        {currentWeek.map((day, idx) => (
          <li key={idx}>{day.toLocaleDateString("ru-RU", { weekday: "short", day: "numeric", month: "short" })}</li>
        ))}
      </ul>
      <Calendar onDateSelect={handleDateSelect} initialDate={selectedDate} />
    </div>
  );
};

export default DateManager;