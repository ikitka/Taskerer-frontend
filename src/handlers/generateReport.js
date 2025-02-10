// utils/reportGenerator.js
import { saveAs } from 'file-saver'; // Для сохранения файла

const generateAndDownloadReport = (queues, tasks, actions) => {
  let reportContent = '';

  // Перебираем очереди
  queues.forEach((queue) => {
    reportContent += `Очередь ${queue.queue_key}\n\n`;

    // Получаем задачи для текущей очереди
    const queueTasks = tasks[queue.queue_id] || [];
    if (queueTasks.length > 0) {
      queueTasks.forEach((task) => {
        reportContent += `Задача ${task.task_name}\n`;

        // Получаем экшены для текущей задачи
        const taskActions = actions[task.task_id] || [];
        taskActions.forEach((action) => {
          const date = new Date(action.action_date);
          const formattedDate = `${String(date.getDate()).padStart(2, '0')}.${String(
            date.getMonth() + 1
          ).padStart(2, '0')}.${date.getFullYear()}`;
          reportContent += `${formattedDate} - ${action.action_text}\n`;
        });

        reportContent += '\n'; // Пустая строка между задачами
      });
    }

    reportContent += '\n'; // Пустая строка между очередями
  });

  // Создаем файл и предлагаем его скачать
  const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
  saveAs(blob, 'отчет.txt');
};

export default generateAndDownloadReport;