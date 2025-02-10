import React, { useState, useEffect } from 'react';
import './Multiselect.css';

const Multiselect = ({ queues, selectedQueues, onSelectAll, onCheckboxChange }) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const isAllSelected = selectedQueues.length === queues.length;

  const togglePopup = (e) => {
    e.stopPropagation(); // Предотвращаем распространение события
    setIsPopupVisible(!isPopupVisible);
  };

  // Закрытие попапа при клике вне его области
  useEffect(() => {
    const handleOutsideClick = (event) => {
      const popup = document.querySelector('.multiselect-popup');
      const tagsContainer = document.querySelector('.multiselect-selected-tags');

      if (
        popup &&
        !popup.contains(event.target) &&
        (!tagsContainer || !tagsContainer.contains(event.target))
      ) {
        setIsPopupVisible(false);
      }
    };

    if (isPopupVisible) {
      document.addEventListener('click', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isPopupVisible]);

  return (
    <div className="multiselect-container">
      {/* Отображение выбранных тегов */}
      <div 
        className="multiselect-selected-tags" 
        onClick={togglePopup}
      >
        {selectedQueues.map(queueId => (
          <span key={queueId} className="multiselect-tag">
            {queues.find(q => q.queue_id.toString() === queueId)?.queue_key}
          </span>
        ))}
        {!isAllSelected && (
          <span className="multiselect-select-all-link" onClick={(e) => { e.stopPropagation(); onSelectAll(); }}>
            Выбрать все
          </span>
        )}
      </div>

      {/* Попап с выбором очередей */}
      <div 
        className={`multiselect-popup ${isPopupVisible ? 'active' : ''}`}
      >
        <label>
          <input
            type="checkbox"
            id="multiselect-select-all-checkbox"
            checked={isAllSelected}
            onChange={onSelectAll}
            className="multiselect-select-all-checkbox"
          />
          Выбрать все
        </label>
        {queues.map((queue) => (
          <label key={queue.queue_id}>
            <input
              type="checkbox"
              checked={selectedQueues.includes(queue.queue_id.toString())}
              onChange={() => onCheckboxChange(queue.queue_id.toString())}
            />
            {queue.queue_key}
          </label>
        ))}
      </div>
    </div>
  );
};

export default Multiselect;