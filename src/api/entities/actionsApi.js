import config from "../config";

const actionsApi = {

  getTaskActions: async (taskId) => {
    try {
      const response = await fetch(config.url + `tasks/${taskId}/actions`, {
        method: 'GET'
      });
      const data = await response.json();
      return data;
    } catch (error) { 
      console.error('Error get task actions: ', error);
      return [];
    }
  },

  createAction: async (action) => {
    try {
      const response = await fetch(config.url + `actions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(action)
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error create task action: ', error);
      return [];
    }
  },

  deleteAction: async (actionId) => {
    try {
      const response = await fetch(config.url + `actions/${actionId}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error delete task action: ', error);
      return [];
    }
  },

  updateAction: async (actionId, action) => {
    try {
      const response = await fetch(config.url + `actions/${actionId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(action)
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error update task action: ', error);
      return [];
    }
  },

};

export default actionsApi;
