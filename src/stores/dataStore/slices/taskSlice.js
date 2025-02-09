import { create } from 'zustand';
import queuesApi from '../../../api/entities/queuesApi';
import tasksApi from '../../../api/entities/tasksApi';


const useTasksSlice = create((set, get) => ({
  tasks: [],

  createTask: async (queueId, task) => {
    const newTask = await tasksApi.createTask(task);
    set((state) => ({
      tasks: {
        ...state.tasks,
        [queueId]: [...(state.tasks[queueId] || []), newTask],
      },
    }));
  },

  deleteTask: async (queueId, taskId) => {
    await tasksApi.deleteTask(taskId);
    set((state) => ({
      tasks: {
        ...state.tasks,
        [queueId]: state.tasks[queueId].filter((task) => task.id !== taskId),
      },
    }));
  },

  loadTasksForQueue: async (queueId, startDate, endDate) => {
    const tasks = await queuesApi.getQueueTasks(queueId, startDate, endDate);
    set((state) => ({
      tasks: {
        ...state.tasks,
        [queueId]: tasks,
      },
    }));
  },

  loadTasksForAllQueues: async (queues, startDate, endDate) => {
    try {
      const promises = queues.map(async (queue) => {
        try {
          const tasks = await queuesApi.getQueueTasks(queue.queue_id, startDate, endDate);
          return { queueId: queue.queue_id, tasks };
        } catch (error) {
          console.error(`Failed to load tasks for queue ${queue.queue_id}:`, error);
          return { queueId: queue.queue_id, tasks: [] }; // Возвращаем пустой массив в случае ошибки
        }
      });
  
      const results = await Promise.all(promises);
  
      set((state) => {
        const newTasks = { ...state.tasks };
        results.forEach(({ queueId, tasks }) => {
          newTasks[queueId] = tasks;
        });
        return { tasks: newTasks };
      });
    } catch (error) {
      console.error('Failed to load tasks for all queues:', error);
    }
  },

}));

export default useTasksSlice;