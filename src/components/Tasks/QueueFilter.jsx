import React, { useState, useEffect } from 'react';

const QueueFilter = ({ queues, onFilterChange }) => {
  const [selectedQueues, setSelectedQueues] = useState([]);

  // Инициализация всех очередей как выбранных
  useEffect(() => {
    if (queues.length > 0 && selectedQueues.length === 0) {
      setSelectedQueues(queues.map((queue) => queue.queue_id.toString()));
    }
  }, [queues]);

  // Функция для обработки изменения чекбоксов очередей
  const handleCheckboxChange = (queueId) => {
    if (selectedQueues.includes(queueId)) {
      setSelectedQueues(selectedQueues.filter((id) => id !== queueId));
    } else {
      setSelectedQueues([...selectedQueues, queueId]);
    }
  };

  // Функция для обработки "Выбрать все"
  const handleSelectAll = () => {
    if (selectedQueues.length === queues.length) {
      setSelectedQueues([]); // Если все уже выбраны, снимаем все
    } else {
      setSelectedQueues(queues.map((queue) => queue.queue_id.toString())); // Выбираем все
    }
  };

  // Автоматическое обновление состояния "Выбрать все"
  useEffect(() => {
    const isAllSelected = selectedQueues.length === queues.length;
    document.querySelector('#select-all-checkbox').checked = isAllSelected;
  }, [selectedQueues, queues]);

  // При изменении выбранных очередей вызываем callback
  useEffect(() => {
    onFilterChange(selectedQueues.length > 0 ? selectedQueues : null);
  }, [selectedQueues, onFilterChange]);

  return (
    <div className="queue-filter">
      <h4>Фильтр по очередям</h4>
      <label>
        <input
          type="checkbox"
          id="select-all-checkbox"
          checked={selectedQueues.length === queues.length}
          onChange={handleSelectAll}
        />
        Выбрать все
      </label>
      {queues.map((queue) => (
        <label key={queue.queue_id}>
          <input
            type="checkbox"
            checked={selectedQueues.includes(queue.queue_id.toString())}
            onChange={() => handleCheckboxChange(queue.queue_id.toString())}
          />
          {queue.queue_key}
        </label>
      ))}
    </div>
  );
};

export default QueueFilter;