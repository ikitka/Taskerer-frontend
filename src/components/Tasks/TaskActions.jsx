import React, { useEffect, useState } from 'react';
import useDateStore from '../../stores/dateStore';
import './TaskActions.css'; // Импортируем CSS для этого компонента

const TaskActions = ({ task, actions, createAction, updateAction, deleteAction, loadActionsForTask }) => {
  const [isEditing, setIsEditing] = useState(null);
  const [editText, setEditText] = useState(''); // Состояние для текста редактирования
  const { selectedDate } = useDateStore(); // Получаем selectedDate из store

  useEffect(() => {
    if (task.task_id) {
      loadActionsForTask(task.task_id);
    }
  }, [task.task_id, loadActionsForTask]);

  const handleAddAction = () => {
    if (!task.task_id) return;
    const newAction = {
      task_id: task.task_id,
      action_text: 'Пусто',
    };
    createAction(task.task_id, newAction);
    setEditText('');
  };

  const handleEditAction = (actionId, text) => {
    setIsEditing(actionId);
    setEditText(text); // Устанавливаем начальный текст для редактирования
  };

  const handleSaveEdit = (actionId) => {
    if (task.task_id && editText.trim() !== '') {
      updateAction(task.task_id, actionId, { action_text: editText });
      setIsEditing(null); // Выходим из режима редактирования после сохранения
      setEditText('');
    } else {
      alert('Текст не может быть пустым');
    }
  };

  const handleDeleteAction = (actionId) => {
    if (window.confirm('Вы уверены, что хотите удалить этот экшен?')) {
      deleteAction(task.task_id, actionId);
      if (isEditing === actionId) {
        setIsEditing(null); // Если удаляем текущий редактируемый экшен, выходим из режима редактирования
      }
    }
  };

  const sortedActions = (actions[task.task_id] || []).sort(
    (a, b) => a.action_date - b.action_date
  );

  const isSameDay = (date) => {
    const dateStartOfDay = new Date(date);
    dateStartOfDay.setHours(0, 0, 0, 0);
  
    const selectedDateMidday = new Date(selectedDate);
    selectedDateMidday.setHours(0, 0, 0, 0);
    
    return (
      dateStartOfDay.toISOString().split('T')[0] ===
      selectedDateMidday.toISOString().split('T')[0]
    );
  };

  return (
    <div className="task-actions-container">
      {sortedActions.length > 0 ? (
        sortedActions.map((action) => (
          <div key={action.action_id} className="task-action-item">
            {isEditing === action.action_id ? (
              <div className="task-action-edit-mode">
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  autoFocus
                />
                <button
                  className="task-action-button"
                  onClick={() => handleSaveEdit(action.action_id)}
                >
                  Save
                </button>
                <button
                  className="task-action-button"
                  onClick={() => setIsEditing(null)} // Кнопка "Отмена"
                >
                  Close
                </button>
                <button
                  className="task-action-button delete-action-button"
                  onClick={() => handleDeleteAction(action.action_id)}
                >
                  Del
                </button>
              </div>
            ) : (
              <div
                onDoubleClick={() => handleEditAction(action.action_id, action.action_text)}
                className="task-action-display"
              >
                {/* Отдельный блок для даты */}
                <span 
                  className={`task-action-date ${isSameDay(new Date(action.action_date)) ? 'active-date' : ''}`}
                >
                  {String(new Date(action.action_date).getDate()).padStart(2, '0')}.{String(new Date(action.action_date).getMonth() + 1).padStart(2, '0')}.{new Date(action.action_date).getFullYear()}
                </span>
                {/* Основной текст действия */}
                <span className="task-action-text">- {action.action_text}</span>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No actions</p>
      )}
      <button className="task-action-button" onClick={handleAddAction}>
        Add
      </button>
    </div>
  );
};

export default TaskActions;