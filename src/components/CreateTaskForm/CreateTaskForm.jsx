import React, { useState } from 'react';
import useQueuesSlice from '../../stores/dataStore/slices/queueSlice';
import useTasksSlice from '../../stores/dataStore/slices/taskSlice';
import './CreateTaskForm.css'; // Импорт стилей

const CreateTaskForm = () => {
  const [taskName, setTaskName] = useState('');
  const [taskStartDate, setTaskStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [taskEndDate, setTaskEndDate] = useState(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split('T')[0];
  });
  const [taskStatus, setTaskStatus] = useState('new');
  const { queues } = useQueuesSlice();
  const { createTask } = useTasksSlice();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedQueue || !taskName || !taskStartDate || !taskEndDate || !taskStatus) {
      alert('Please fill in all fields');
      return;
    }
    const taskData = {
      queue_id: selectedQueue,
      task_start_date: taskStartDate,
      task_end_date: taskEndDate,
      task_status: taskStatus,
      task_name: taskName,
    };
    try {
      await createTask(selectedQueue, taskData);
      clearForm();
    } catch (error) {
      console.error('Error creating task:', error);
      alert('Failed to create task');
    }
  };

  const clearForm = () => {
    setTaskName('');
    setTaskStartDate(new Date().toISOString().split('T')[0]);
    setTaskEndDate(() => {
      const today = new Date();
      today.setDate(today.getDate() + 1);
      return today.toISOString().split('T')[0];
    });
    setTaskStatus('new');
  };

  const [selectedQueue, setSelectedQueue] = useState('');

  return (
    <form onSubmit={handleSubmit} className="create-task-form">
      <h3>Create Task</h3>

      {/* Queue Selection */}
      <div className="form-group">
        <label>Queue:</label>
        <select 
          value={selectedQueue} 
          onChange={(e) => setSelectedQueue(e.target.value)} 
          required
        >
          <option value="">Select a queue</option>
          {queues.map(queue => (
            <option key={queue.queue_id} value={queue.queue_id}>
              {queue.queue_key || `Queue ${queue.queue_id}`} {/* Отображаем queue_key */}
            </option>
          ))}
        </select>
      </div>

      {/* Task Name */}
      <div className="form-group">
        <label>Task Name:</label>
        <input 
          type="text" 
          value={taskName} 
          onChange={(e) => setTaskName(e.target.value)} 
          required
        />
      </div>

      {/* Start Date */}
      <div className="form-group">
        <label>Start Date:</label>
        <input 
          type="date" 
          value={taskStartDate} 
          onChange={(e) => setTaskStartDate(e.target.value)} 
          required
        />
      </div>

      {/* End Date */}
      <div className="form-group">
        <label>End Date:</label>
        <input 
          type="date" 
          value={taskEndDate} 
          onChange={(e) => setTaskEndDate(e.target.value)} 
          required
        />
      </div>

      {/* Status */}
      <div className="form-group">
        <label>Status:</label>
        <select 
          value={taskStatus} 
          onChange={(e) => setTaskStatus(e.target.value)} 
          required
        >
          <option value="new">New</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <button type="submit">Create Task</button>
    </form>
  );
};

export default CreateTaskForm;