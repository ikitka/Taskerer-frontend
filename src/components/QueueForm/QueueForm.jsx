import React, { useState } from 'react';
import useQueuesSlice from '../../stores/dataStore/slices/queueSlice';
import './QueueForm.css'; // Импорт стилей

const QueueForm = () => {
  const [newQueueKey, setNewQueueKey] = useState(''); // Для создания новой очереди
  const [editMode, setEditMode] = useState(null); // ID очереди для редактирования
  const [editedQueueKey, setEditedQueueKey] = useState(''); // Отредактированный queue_key
  const { queues, loadQueues, createQueue, updateQueue, deleteQueue } = useQueuesSlice();

  // Загрузка очередей при монтировании компонента
  React.useEffect(() => {
    loadQueues();
  }, [loadQueues]);

  // Обработчик создания новой очереди
  const handleCreateQueue = async (e) => {
    e.preventDefault();
    if (!newQueueKey.trim()) {
      alert('Please enter a queue key');
      return;
    }
    try {
      await createQueue({ queue_key: newQueueKey });
      setNewQueueKey(''); // Очистка поля ввода
    } catch (error) {
      console.error('Error creating queue:', error);
      alert('Failed to create queue');
    }
  };

  // Обработчик редактирования очереди
  const handleEditQueue = (queueId) => {
    const queueToEdit = queues.find((queue) => queue.queue_id === queueId);
    if (queueToEdit) {
      setEditMode(queueId);
      setEditedQueueKey(queueToEdit.queue_key || '');
    }
  };

  // Обработчик сохранения изменений при редактировании
  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editMode || !editedQueueKey.trim()) {
      alert('Please select a queue and enter a new key');
      return;
    }
    try {
      await updateQueue(editMode, { queue_key: editedQueueKey });
      setEditMode(null); // Выход из режима редактирования
      setEditedQueueKey('');
    } catch (error) {
      console.error('Error updating queue:', error);
      alert('Failed to update queue');
    }
  };

  // Обработчик удаления очереди
  const handleDeleteQueue = async (queueId) => {
    if (window.confirm('Are you sure you want to delete this queue?')) {
      try {
        await deleteQueue(queueId);
      } catch (error) {
        console.error('Error deleting queue:', error);
        alert('Failed to delete queue');
      }
    }
  };

  return (
    <div className="queue-form-container">
      <h3>Manage Queues</h3>

      {/* Создание новой очереди */}
      <form onSubmit={handleCreateQueue} className="create-queue-form">
        <div className="form-group">
          <label>Create New Queue:</label>
          <input 
            type="text" 
            value={newQueueKey} 
            onChange={(e) => setNewQueueKey(e.target.value)} 
            placeholder="Enter queue key"
            required
          />
        </div>
        <button type="submit">Create Queue</button>
      </form>

      {/* Список существующих очередей */}
      {queues.length > 0 && (
        <div className="queue-list">
          <h4>Existing Queues:</h4>
          <ul>
            {queues.map((queue) => (
              <li key={queue.queue_id} className="queue-item">
                {editMode === queue.queue_id ? (
                  <form onSubmit={handleSaveEdit} className="edit-queue-form">
                    <input 
                      type="text" 
                      value={editedQueueKey} 
                      onChange={(e) => setEditedQueueKey(e.target.value)} 
                      required
                    />
                    <button type="submit">Save</button>
                    <button type="button" onClick={() => setEditMode(null)}>Cancel</button>
                  </form>
                ) : (
                  <>
                    <span>{queue.queue_key || `Queue ${queue.queue_id}`}</span>
                    <div className="queue-actions">
                      <button type="button" onClick={() => handleEditQueue(queue.queue_id)}>
                        Edit
                      </button>
                      <button type="button" onClick={() => handleDeleteQueue(queue.queue_id)}>
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default QueueForm;