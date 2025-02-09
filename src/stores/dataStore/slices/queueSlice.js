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

  deleteQueue: async (queueId) => {
    await queuesApi.deleteQueue(queueId);
    set((state) => ({ queues: state.queues.filter((q) => q.id !== queueId) }));
  },

}));

export default useQueuesSlice;