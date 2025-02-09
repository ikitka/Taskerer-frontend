import queuesApi from "./entities/queuesApi";
import tasksApi from "./entities/tasksApi";
import actionsApi from "./entities/actionsApi";

const api = {
  ...queuesApi,
  ...tasksApi,
  ...actionsApi,
};

export default api;