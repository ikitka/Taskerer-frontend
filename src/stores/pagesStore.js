import { create } from 'zustand';
import QueuesPage from '../pages/QueuesPage';
import TasksPage from '../pages/TasksPage';
import SettingsPage from '../pages/SettingsPage';

// Маппинг компонентов
const pagesData = [
  {
    id: 'tasks',
    title: 'Задачи',
    component: TasksPage,
  },
  {
    id: 'queues',
    title: 'Очереди',
    component: QueuesPage,
  },
  {
    id: 'settings',
    title: 'Настройки',
    component: SettingsPage,
  },
];

const usePageStore = create((set) => ({
  currentPage: 'tasks',
  setPage: (page) => set({ currentPage: page }),
  pages: pagesData,
}));

export default usePageStore;