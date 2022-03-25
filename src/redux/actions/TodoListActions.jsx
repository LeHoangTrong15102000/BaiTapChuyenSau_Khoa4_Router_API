import { GET_TASK_API } from '../constants/TodoListTypes';

export const first = (payload) => ({
  type: GET_TASK_API,
  payload,
});
