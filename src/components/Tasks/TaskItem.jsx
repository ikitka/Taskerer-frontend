import React, { useEffect } from 'react';
import './TaskItem.css'; // Импортируем основной CSS
import TaskActions from './TaskActions'; // Импортируем новый компонент TaskActions
import useActionsSlice from '../../stores/dataStore/slices/actionSlice';

const TaskItem = ({ task }) => {
  const { actions, createAction, updateAction, deleteAction, loadActionsForTask } = useActionsSlice();

  return (
    <div className="task-item-container">
      <p className="task-item-title">{task.task_name}</p>
      <TaskActions
        task={task}
        actions={actions}
        createAction={createAction}
        updateAction={updateAction}
        deleteAction={deleteAction}
        loadActionsForTask={loadActionsForTask}
      />
    </div>
  );
};

export default TaskItem;