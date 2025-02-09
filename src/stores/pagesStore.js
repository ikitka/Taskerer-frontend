import { create } from 'zustand';
import QueuesPage from '../pages/QueuesPage';
import TasksPage from '../pages/TasksPage';
import SettingsPage from '../pages/SettingsPage';
import CreateTaskForm from '../components/CreateTaskForm/CreateTaskForm';

const usePageStore = create((set) => ({
  currentPage: 'tasks',
  setPage: (page) => set({ currentPage: page }),
  pages: [{id: 'tasks',     title: 'Задачи',    component: TasksPage},
          {id: 'queues',    title: 'Очереди',   component: QueuesPage},
          {id: 'tasks-create',    title: 'Создать задачу',   component: CreateTaskForm},
          {id: 'settings',  title: 'Настройки', component: SettingsPage},
  ],
}));

export default usePageStore;