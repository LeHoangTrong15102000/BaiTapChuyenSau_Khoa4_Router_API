// tạo ra class service chứa các hàm tương tác với backEnd

import axios from 'axios';
import { DOMAIN } from '../utils/constants/settingSystem';

export class TodoListService {
  // eslint-disable-next-line no-useless-constructor
  constructor() {}
  getTaskApi = () => {
    return axios({
      url: `${DOMAIN}/ToDoList/GetAllTask`,
      method: 'GET',
    });
  };

  // Xử lý APi addTaskName
  addTaskApi = (taskName) => {
    return axios({
      url: `${DOMAIN}/ToDoList/AddTask`,
      method: 'POST',
      // Data gửi đi là object có modal là taskName
      data: {
        taskName: taskName,
      },
    });
  };
}

// export 1 cái biến để gọi service này, export 1 cai class ra
export const todoListService = new TodoListService();
