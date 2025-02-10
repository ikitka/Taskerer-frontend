// Tasks.js

import React, { useEffect, useState } from 'react';
import useDateStore from '../../stores/dateStore';
import useQueuesSlice from '../../stores/dataStore/slices/queueSlice';
import { getISODate } from '../../handlers/getISOdate';
import useTasksSlice from '../../stores/dataStore/slices/taskSlice';
import useActionsSlice from '../../stores/dataStore/slices/actionSlice';
import TaskItem from './TaskItem';
import QueueFilter from './QueueFilter';
import './Tasks.css'; // Импорт CSS-файла
import generateAndDownloadReport from '../../handlers/generateReport';

const Tasks = () => {
  const { queues, loadQueues } = useQueuesSlice();
  const { tasks, loadTasksForAllQueues } = useTasksSlice();
  const { actions, loadActionsForTask } = useActionsSlice();
  const [isLoading, setIsLoading] = useState(false);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [selectedQueues, setSelectedQueues] = useState(null);
  const { currentWeek } = useDateStore();

  useEffect(() => {
    const fetchTasks = async () => {
      await loadQueues();
    };
    fetchTasks();
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      const startDate = currentWeek[0];
      const endDate = currentWeek[currentWeek.length - 1];
      const isoStartDate = getISODate(startDate);
      const isoEndDate = getISODate(endDate);
      setIsLoading(true);
      await loadTasksForAllQueues(queues, isoStartDate, isoEndDate);
      setIsLoading(false);
    };
    if (queues.length > 0) {
      fetchTasks();
    }
  }, [currentWeek, queues]);

  useEffect(() => {
    if (tasks && queues) {
      let filtered = [];
      if (selectedQueues && selectedQueues.length > 0) {
        filtered = selectedQueues
          .map((queueId) => tasks[queueId])
          .filter((queueTasks) => queueTasks)
          .flat();
      } else {
        filtered = [];
      }
      setFilteredTasks(filtered);
      filtered.forEach((task) => {
        loadActionsForTask(task.task_id);
        console.log("actions", actions);
      });
    }
  }, [tasks, queues, selectedQueues]);

  const handleDownloadReport = () => {
    generateAndDownloadReport(queues, tasks, actions);
  };

  return (
    <div className="tasks-container">
      {/* Фильтр по очередям */}
      <div className="queue-filter-container">
        <QueueFilter
          queues={queues}
          onFilterChange={(selected) => setSelectedQueues(selected)}
        />
        <button className="task-action-button" onClick={handleDownloadReport} style={{ width: '120px', justifyContent: 'flex-end' }}>
          Get report
        </button>
      </div>
      {/* Список задач */}
      <div className="task-list-container">
        {isLoading ? (
          <p>Loading...</p>
        ) : filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TaskItem key={task.task_id} task={task} actions={actions[task.task_id]} />
          ))
        ) : (
          <p>No tasks</p>
        )}
      </div>
    </div>
  );
};

export default Tasks;