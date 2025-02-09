import { create } from 'zustand';
import actionsApi from '../../../api/entities/actionsApi';

const useActionsSlice = create((set, get) => ({
  actions: {},

  createAction: async (taskId, action) => {
    const newAction = await actionsApi.createAction(action);
    set((state) => ({
      actions: {
        ...state.actions,
        [taskId]: [...(state.actions[taskId] || []), newAction],
      },
    }));
  },

  deleteAction: async (taskId, actionId) => {
    await actionsApi.deleteAction(actionId);
    set((state) => ({
      actions: {
        ...state.actions,
        [taskId]: state.actions[taskId].filter((action) => action.id !== actionId),
      },
    }));
  },

  updateAction: async (taskId, actionId, updatedAction) => {
    await actionsApi.updateAction(actionId, updatedAction);
    set((state) => ({
      actions: {
        ...state.actions,
        [taskId]: state.actions[taskId].map((action) =>
          action.id === actionId ? { ...action, ...updatedAction } : action
        ),
      },
    }));
  },

  loadActionsForTask: async (taskId) => {
    try {
      const actions = await actionsApi.getTaskActions(taskId);
      set((state) => ({
        actions: {
          ...state.actions,
          [taskId]: actions,
        },
      }));
    } catch (error) {
      console.error(`Failed to load actions for task ${taskId}:`, error);
    }
  },

  loadActionsForAllTasks: async (taskIds) => {
    try {
      const promises = taskIds.map(async (taskId) => {
        try {
          const actions = await actionsApi.getTaskActions(taskId);
          return { taskId, actions };
        } catch (error) {
          console.error(`Failed to load actions for task ${taskId}:`, error);
          return { taskId, actions: [] };
        }
      });

      const results = await Promise.all(promises);

      set((state) => {
        const newActions = { ...state.actions };
        results.forEach(({ taskId, actions }) => {
          newActions[taskId] = actions;
        });
        return { actions: newActions };
      });
    } catch (error) {
      console.error('Failed to load actions for all tasks:', error);
    }
  },
}));

export default useActionsSlice;