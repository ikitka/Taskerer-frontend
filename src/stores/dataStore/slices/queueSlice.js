import { create } from 'zustand';
import queuesApi from '../../../api/entities/queuesApi';

const useQueuesSlice = create((set, get) => ({
  queues: [],

  loadQueues: async () => {
    const queues = await queuesApi.getQueues();
    set({ queues });
  },

  createQueue: async (queue) => {
    const newQueue = await queuesApi.createQueue(queue);
    set((state) => ({ queues: [...state.queues, newQueue] }));
  },

  updateQueue: async (queueId, queue) => {
    const updatedQueue = await queuesApi.updateQueue(queueId, queue);
    set((state) => ({
      queues: state.queues.map((q) =>
        q.queue_id === queueId ? { ...q, ...updatedQueue } : q
      ),
    }));
  },

  deleteQueue: async (queueId) => {
    await queuesApi.deleteQueue(queueId);
    set((state) => ({ queues: state.queues.filter((q) => q.queue_id !== queueId) }));
  },

}));

export default useQueuesSlice;