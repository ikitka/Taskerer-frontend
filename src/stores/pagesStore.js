import { create } from 'zustand';
import QueuesPage from '../pages/QueuesPage';
import TasksPage from '../pages/TasksPage';
import SettingsPage from '../pages/SettingsPage';
import CreateTaskForm from '../components/CreateTaskForm/CreateTaskForm';

const usePageStore = create((set) => ({
  currentPage: 'tasks',
  setPage: (page) => set({ currentPage: page }),
  pages: [{id: 'tasks',     title: 'Tasks',    component: TasksPage},
          {id: 'tasks-create',    title: 'Add task',   component: CreateTaskForm},
          {id: 'queues',    title: 'Queues',   component: QueuesPage},
          {id: 'settings',  title: 'Settings', component: SettingsPage},
  ],
}));

export default usePageStore;