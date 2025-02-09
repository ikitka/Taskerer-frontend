
const TaskItem = ({ task, actions }) => {

  const sortedActions = (actions || []).sort((a, b) => a.action_date - b.action_date);

  return (
    <div className="task-item">
      <h3>{task.task_name}</h3>
      <p>Начало: {new Date(task.task_start_date).toLocaleString()}</p>
      <p>Конец: {new Date(task.task_end_date).toLocaleString()}</p>
      <p>Статус: {task.task_status}</p>
      <div className="actions-container">
        <h4>Экшены:</h4>
        {sortedActions.length > 0 ? (
          sortedActions.map((action) => (
            <div key={action.action_id} className="action-item">
              <p>Дата: {new Date(action.action_date).toLocaleString()}</p>
              <p>Описание: {action.action_text}</p>
            </div>
          ))
        ) : (
          <p>Нет экшенов</p>
        )}
      </div>
    </div>
  );
};

export default TaskItem;