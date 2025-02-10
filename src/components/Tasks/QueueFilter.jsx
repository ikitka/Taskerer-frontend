import React, { useState, useEffect } from 'react';
import Multiselect from '../../ui/Multiselect/Multiselect';

const QueueFilter = ({ queues, onFilterChange }) => {
  const [selectedQueues, setSelectedQueues] = useState([]);

  // Инициализация всех очередей как выбранных
  useEffect(() => {
    if (queues.length > 0 && selectedQueues.length === 0) {
      setSelectedQueues(queues.map((queue) => queue.queue_id.toString()));
    }
  }, [queues]);

  // Обработка изменения чекбоксов очередей
  const handleCheckboxChange = (queueId) => {
    if (selectedQueues.includes(queueId)) {
      setSelectedQueues(selectedQueues.filter((id) => id !== queueId));
    } else {
      setSelectedQueues([...selectedQueues, queueId]);
    }
  };

  // Обработка "Выбрать все"
  const handleSelectAll = () => {
    if (selectedQueues.length === queues.length) {
      setSelectedQueues([]);
    } else {
      setSelectedQueues(queues.map((queue) => queue.queue_id.toString()));
    }
  };

  // При изменении выбранных очередей вызываем callback
  useEffect(() => {
    onFilterChange(selectedQueues.length > 0 ? selectedQueues : null);
  }, [selectedQueues, onFilterChange]);

  return (
    <Multiselect
      queues={queues}
      selectedQueues={selectedQueues}
      onSelectAll={handleSelectAll}
      onCheckboxChange={handleCheckboxChange}
    />
  );
};

export default QueueFilter;