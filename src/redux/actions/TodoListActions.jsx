import { GET_TASK_API, ADD_TASK_API } from '../constants/TodoListTypes';
import axios from 'axios';

// Đây là những service quản lí dựa trên state của ứng dụng, Sau này sẽ có service quản lí trên nghiệp vụ

// Cái action lấy API đã đem lưu trữ trên actions nên có maintain thì chỉ cần lên đây chỉnh sửa
export const getTaskListAPI = () => {
  // Thì thằng middleWare trả về cho chúng ta một cái function
  // Tiền xử lý dữ liệu sau đó xử lý function

  // Nên dùng async await để xử lý đối với gọi API
  return async (dispatch) => {
    // cái function này nhận sau khi tham số dispatch của component gọi lên
    // Lấy dữ liệu truyền xuống taskList

    // API quy định status code 200 là thành công
    try {
      // ...rest lấy các phần tử còn lại của thuộc tính await
      let { data, status, ...rest } = await axios({
        url: 'http://svcy.myclass.vn/api/ToDoList/GetAllTask',
        method: 'GET',
      });
      if (status === 200) {
        dispatch({
          type: GET_TASK_API,
          taskList: data,
        });
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };
};

// addTask thì nó sẽ truyền vào cái taskName mới
export const addTaskAPI = (taskName) => {
  return async (dispatch) => {
    // thằng dispatch này có được là từ thz useDispatch của ReduxThunk nên nó mới trả  ra tham số là dispatch của chúng ta, Nếu ko dùng dispatch mà gọi hàm bình thường thì nó ko tự load lại trang cho chúng ta.
    // Xử lý trước khi dispatch lên Redux
    try {
      // Phải có await thì mấy đoạn code khác mới đợi thằng await được ko thì vừa chạy nó sẽ chạy các đoạn code phía dưới
      let { data, status } = await axios({
        url: 'http://svcy.myclass.vn/api/ToDoList/AddTask',
        method: 'POST', // với phương thúc là post thì cũng phải cần thêm cho nó cái data nữa
        data: { taskName: taskName }, // Gửi lên cho nó một cái object mà bên backEnd cung cấp, phải viết đúng định dạng mà backEnd cung cấp
      });

      if (status === 200) {
        dispatch(getTaskListAPI());
      }
    } catch (error) {
      console.log(error.response.data);
    }

    // Xử lý thành công
    // promise.then((result) => {
    //   console.log(result.data);

    //   // Mỗi lần thêm task mới vào thì load lại tất cả các task để người dùng có thể thấy được
    //   // request API lần nữa lấy những cái task mới về

    //   // Nếu xử lý dữ liệu thành công thì dispatch nó lên Redux
    //   ; // cái dispatch tham số ở đây cũng giống như useDispatch
    // });

    // // Xử lý thất bại
    // promise.catch((errors) => {
    //   alert(errors.response.data);
    // });
  };
};

// Xử lý done task
export const doneTaskAPI = (taskName) => {
  return async (dispatch) => {
    // put đúng chuẩn thì truyền qua url hoặc object
    // Thì ở đây ko cần phải truyền dữ liệu gì lên chỉ cần thay đổi trạng thái của taskName
    try {
      let { data, status } = await axios({
        url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
        method: 'PUT',
      });
      if (status === 200) {
        dispatch(getTaskListAPI(taskName));
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };
};

// Xử lý delete task
export const deleteTaskAPI = (taskName) => {
  // function này là do redux thunk trả ra cho chúng ta
  // Những action dispatch thông qua redux thunk thì nó ko có type mà nó return về function
  return async (dispatch) => {
    try {
      let { data, status } = await axios({
        // Truyền vào taskName
        url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
        method: 'DELETE',
      });
      if (status === 200) {
        dispatch(getTaskListAPI(taskName));
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };
};

// Xử lý reject task
export const rejectTaskAPI = (taskName) => {
  return async (dispatch) => {
    try {
      let { data, status } = await axios({
        url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
        method: 'PUT',
      });

      if (status === 200) {
        dispatch(getTaskListAPI(taskName));
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };
};
