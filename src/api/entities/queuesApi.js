import config from "../config";

const queuesApi = {

  getQueues: async () => {
    try {
      const response = await fetch(config.url + `queues`, {
        method: 'GET'
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error get queues: ', error);
      return [];
    }
  },

  getQueue: async (queueId) => {
    try {
      const response = await fetch(config.url + `queues/${queueId}`, {
        method: 'GET'
      });
      const data = await response.json();
      return data;    
    } catch (error) {
      console.error('Error get queue: ', error);
      return [];
    }
  },

  createQueue: async (queue) => {
    try {
      const response = await fetch(config.url + `queues`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(queue)
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error create queue: ', error);
      return [];
    }
  },

  updateQueue: async (queueId, queue) => {
    try {
      const response = await fetch(config.url + `queues/${queueId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(queue)
      });
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error update queue: ', error);
      return [];
    }
  },

  deleteQueue: async (queueId) => {
    try {
      const response = await fetch(config.url + `queues/${queueId}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error delete queue: ', error);
      return [];
    }
  },

  getQueueTasks: async (queueId, startDate, endDate) => {
    try {
      const response = await fetch(config.url + `queues/${queueId}/tasks?start_date=${startDate}&end_date=${endDate}`, {
        method: 'GET'
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error get queue tasks: ', error);
      return [];
    }
  },

};

export default queuesApi;
