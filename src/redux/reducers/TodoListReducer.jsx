import { GET_TASK_API } from '../constants/TodoListTypes';

const stateDefault = {
  taskList: [],
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = stateDefault, action) => {
  switch (action.type) {
    case GET_TASK_API: {
      // thì nó lấy state.taskList = action.taskList
      state.taskList = action.taskList; // Do trên đây có gọi action.taskList
      return { ...state };
    }
    default:
      return state;
  }
};
