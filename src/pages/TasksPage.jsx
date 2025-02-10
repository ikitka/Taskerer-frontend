import React from 'react';
import DateManager from "../components/DateManager/DateManager";
import Tasks from "../components/Tasks/Tasks";
import './TasksPage.css';

const TasksPage = () => {
  return (
    <div className="container">
      <div className="left-panel">
        <DateManager />
      </div>
      <div className="right-panel">
        <Tasks />
      </div>
    </div>
  );
};

export default TasksPage;