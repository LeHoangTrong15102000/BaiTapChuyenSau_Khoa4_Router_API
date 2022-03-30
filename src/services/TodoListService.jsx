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
        taskName: taskName, // Truyền cái taskName mà bên backEnd cung cấp để dispatch lên
      },
    });
       
  };

  // Xử lý hàm deleteTask
  deleteTaskApi = (taskName) => {
    return axios({
      url: `${DOMAIN}/ToDoList/deleteTask?taskName=${taskName}`,
      method: 'DELETE'
    })
  }

  // Xử lý check done task
  doneTaskApi = (taskName) => {
    return axios({
      url: `${DOMAIN}/ToDoList/doneTask?taskName=${taskName}`,
      method: 'PUT'
    })
  }

  // Xử lý rejectTask
  rejectTasKApi = (taskName) => {
    return axios({
      url: `${DOMAIN}/ToDoList/rejectTask?taskName=${taskName}`,
      method: 'PUT'
    })
  }
}

// export 1 cái biến để gọi service này, export 1 cai class ra
export const todoListService = new TodoListService(); // export ra để ở các file kết nối để dễ liên kết
