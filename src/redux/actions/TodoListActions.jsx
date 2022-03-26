import { GET_TASK_API, ADD_TASK_API } from '../constants/TodoListTypes';
import axios from 'axios';

// Đây là những service quản lí dựa trên state của ứng dụng, Sau này sẽ có service quản lí trên nghiệp vụ

// Cái action lấy API đã đem lưu trữ trên actions nên có maintain thì chỉ cần lên đây chỉnh sửa
export const getTaskListAPI = () => {
  // Thì thằng middleWare trả về cho chúng ta một cái function
  // Tiền xử lý dữ liệu sau đó xử lý function
  return (dispatch) => {
    // cái function này nhận sau khi tham số dispatch của component gọi lên
    // Lấy dữ liệu truyền xuống taskList
    let promise = axios({
      url: 'http://svcy.myclass.vn/api/ToDoList/GetAllTask',
      method: 'GET',
    });

    // Nếu mà thành công thì làm gì đó
    promise.then((result) => {
      alert('Thành công');
      console.log(result.data);
      // Nếu gọi API set lại kết quả thành công thì render lại giao diện của chúng ta

      // setState({
      //   ...state,
      //   taskList: result.data, // thì cái mảng rỗng nó chỉ thêm taskList vào nữa thôi là được
      // });

      // sau khi lấy dữ liệu từ backEnd về thì dispatch dữ liệu lên Reducer
      // Những action dispatch trực tiếp lên Reducer thì nó có type
      dispatch({
        type: GET_TASK_API,
        taskList: result.data,
      });
    });
    promise.catch((err) => {
      console.log(err.response.data);
    });
  };
};

// addTask thì nó sẽ truyền vào cái taskName mới
export const addTaskAPI = (taskName) => {
  return (dispatch) => {
    // thằng dispatch này có được là từ thz useDispatch của ReduxThunk nên nó mới trả  ra tham số là dispatch của chúng ta, Nếu ko dùng dispatch mà gọi hàm bình thường thì nó ko tự load lại trang cho chúng ta.
    // Xử lý trước khi dispatch lên Redux
    let promise = axios({
      url: 'http://svcy.myclass.vn/api/ToDoList/AddTask',
      method: 'POST', // với phương thúc là post thì cũng phải cần thêm cho nó cái data nữa
      data: { taskName }, // Gửi lên cho nó một cái object mà bên backEnd cung cấp, phải viết đúng định dạng mà backEnd cung cấp
    });

    // Xử lý thành công
    promise.then((result) => {
      console.log(result.data);

      // Mỗi lần thêm task mới vào thì load lại tất cả các task để người dùng có thể thấy được
      // request API lần nữa lấy những cái task mới về

      // Nếu xử lý dữ liệu thành công thì dispatch nó lên Redux
      dispatch(getTaskListAPI()); // cái dispatch tham số ở đây cũng giống như useDispatch
    });

    // Xử lý thất bại
    promise.catch((errors) => {
      alert(errors.response.data);
    });
  };
};

// Xử lý done task
export const doneTaskAPI = (taskName) => {
  return (dispatch) => {
    // put đúng chuẩn thì truyền qua url hoặc object
    // Thì ở đây ko cần phải truyền dữ liệu gì lên chỉ cần thay đổi trạng thái của taskName
    let promise = axios({
      url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
      method: 'PUT',
    });
    // Xử lý thành công
    promise.then((result) => {
      alert(result.data);
      // xử lý sau khi dispatch thành công
      dispatch(getTaskListAPI(taskName));
    });

    // Xử lý thất bại
    promise.catch((errors) => {
      alert(errors.response.data);
    });
  };
};

// Xử lý delete task
export const deleteTaskAPI = (taskName) => {
  // function này là do redux thunk trả ra cho chúng ta
  // Những action dispatch thông qua redux thunk thì nó ko có type mà nó return về function
  return (dispatch) => {
    let promise = axios({
      // Truyền vào taskName
      url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
      method: 'DELETE',
    });

    // Nếu thành công thì
    promise.then((result) => {
      alert(result.data);
      // sau khi thực hiện delete API gọi lại phương thức dispatchAction getTaskListApi để load lại task
      dispatch(getTaskListAPI(taskName)); //
    });

    promise.catch((errors) => {
      alert(errors.response.data); //Có trả về response không thì bên phía backEnd quy định, Nên phải trao đổi với backEnd
    });
  };
};

// Xử lý reject task
export const rejectTaskAPI = (taskName) => {
  return (dispatch) => {
    let promise = axios({
      url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
      method: 'PUT',
    });

    // Thành công
    promise.then((res) => {
      alert(res.data);
      // Xử lý sau khi dispatch thành công load lại API
      dispatch(getTaskListAPI(taskName));
    });

    // thất bại
    promise.catch((err) => {
      alert(err.response.data);
    });
  };
};
