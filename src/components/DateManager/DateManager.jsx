import React, { useEffect, useState } from "react";
import Calendar from "../../ui/calendar/Calendar";
import useDateStore from "../../stores/dateStore";

const DateManager = () => {
  const { selectedDate, currentWeek, setSelectedDate } = useDateStore();

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  return (
    <div>
      <Calendar onDateSelect={handleDateSelect} initialDate={selectedDate} />
    </div>
  );
};

export default DateManager;