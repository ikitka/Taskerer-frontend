import config from "../config";

const tasksApi = {

  getTask: async (taskId) => {
    try {
      const response = await fetch(config.url + `tasks/${taskId}`, {
        method: 'GET'
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error get task: ', error);
      return [];
    }
  },

  createTask: async (task) => {
    try {
      const response = await fetch(config.url + `tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error create task: ', error);
      return [];
    }
  },

  updateTask: async (taskId, task) => {
    try {
      const response = await fetch(config.url + `tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error update task: ', error);
      return [];
    }
  },

  deleteTask: async (taskId) => {
    try {
      const response = await fetch(config.url + `tasks/${taskId}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error delete task: ', error);
      return [];
    }
  },

};

export default tasksApi;
