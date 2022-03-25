import React, {
  useState,
  useEffect,
  useReducer,
  useMemo,
  useCallback,
} from 'react';
import './TodoList.css';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

const TodoListRFC = (props) => {
  let [state, setState] = useState({
    taskList: [],
    values: {
      taskName: '',
    },
    errors: {
      taskName: '',
    },
  });

  // Viết hàm getTask lấy dữ liệu từ backEnd xuống
  const getTaskList = () => {
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
      setState({
        ...state,
        taskList: result.data, // thì cái mảng rỗng nó chỉ thêm taskList vào nữa thôi là được
      });
    });
    promise.catch((err) => {
      console.log(err.response.data);
    });
  };

  const handleChange = (event) => {
    let { value, name } = event.target;
    // console.log(value, name)
    // cặp nhật value vào state đồng thời check validation\
    let newValues = { ...state.values }; // Tạo ra một object values mới
    newValues = { ...newValues, [name]: value };

    let newErrors = { ...state.errors }; // tạo ra một lỗi mới\
    // Validation chỉ cho nhập vào là chữ
    let regexString = /^[a-z A-Z]+$/;
    // Nếu chuỗi đầu vào hợp lệ thì cho thực hiện
    if (!regexString.test(value) || value.trim() === ' ') {
      // Kiểm tra cái value nếu nó không hợp lệ
      newErrors[name] = name + ' is invalid !!';
    } else {
      newErrors[name] = ''; //Nếu nó ko có lỗi thì trả về là rỗng
    }

    // newErrors = {...newErrors, [name]: value.trim() === ''}

    setState({ ...state, values: newValues, errors: newErrors }); // setState lại giá trị và lỗi
  };

  useEffect(() => {
    getTaskList();
    // thằng Return này là của componentWillUnmount
    return () => {};
  }, []);

  const renderTaskTodo = () => {
    return state.taskList
      .filter((item) => !item.status)
      .map((task, index) => {
        return (
          <li key={index}>
            <span>{task.taskName}</span>
            <div className="buttons">
              <button
                onClick={() => {
                  // đường link URL sẽ nhận vào một cái taskName
                  deleteTaskName(task.taskName);
                }}
                className="remove"
                type="button"
              >
                <i className="fa fa-trash" />
              </button>
              <button
                onClick={() => {
                  doneTaskName(task.taskName);
                }}
                type="button"
                className="complete"
              >
                <i className="far fa-check-circle" />
                <i className="fas fa-check-circle" />
              </button>
            </div>
          </li>
        );
      });
  };

  // Từ state viết hàm render TaskCompleted
  const renderTaskCompleted = () => {
    return state.taskList
      .filter((item) => item.status)
      .map((task, index) => (
        <li key={index}>
          <span>{task.taskName}</span>
          <div className="buttons">
            <button
              onClick={() => {
                deleteTaskName(task.taskName);
              }}
              className="remove"
              // Để type vào để nó phân biệt với các button của nút submit
              type="button"
            >
              <i className="fa fa-trash" />
            </button>
            <button
              onClick={() => {
                rejectTaskName(task.taskName);
              }}
              className="complete"
              type="button"
            >
              <i className="far fa-check-circle" />
              <i className="fas fa-undo" />
            </button>
          </div>
        </li>
      ));
  };

  // xử lý hàm addTask
  const addTask = (event) => {
    event.preventDefault(); // Ngăn chặn việc load lại trang của sự kiện.
    console.log(state.values.taskName);

    // Đưa dữ liệu lên server
    let promise = axios({
      url: 'http://svcy.myclass.vn/api/ToDoList/AddTask',
      method: 'POST', // với phương thúc là post thì cũng phải cần thêm cho nó cái data nữa
      data: { taskName: state.values.taskName }, // Gửi lên cho nó một cái object mà bên backEnd cung cấp, phải viết đúng định dạng mà backEnd cung cấp
    });

    // Xử lý thành công
    promise.then((result) => {
      console.log(result.data);

      // Mỗi lần thêm task mới vào thì load lại tất cả các task để người dùng có thể thấy được
      // request API lần nữa lấy những cái task mới về
      getTaskList();
    });

    // Xử lý thất bại
    promise.catch((errors) => {
      alert(errors.response.data);
    });
  };

  const deleteTaskName = (taskName) => {
    let promise = axios({
      // Truyền vào taskName
      url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
      method: 'DELETE',
    });

    // Nếu thành công thì
    promise.then((result) => {
      alert(result.data);
      // sau khi xóa xong gọi lại hàm getTaskList
      getTaskList();
    });

    promise.catch((errors) => {
      alert(errors.response.data); //Có trả về response không thì bên phía backEnd quy định, Nên phải trao đổi với backEnd
    });
  };
  // Button mà không để type là button thì nó sẽ hiểu là type là submit
  // Xử lý hàm DONE task
  const doneTaskName = (taskName) => {
    // put đúng chuẩn thì truyền qua url hoặc object
    // Thì ở đây ko cần phải truyền dữ liệu gì lên chỉ cần thay đổi trạng thái của taskName
    let promise = axios({
      url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
      method: 'PUT',
    });
    // Xử lý thành công
    promise.then((result) => {
      alert(result.data);
      getTaskList();
    });

    // Xử lý thất bại
    promise.catch((errors) => {
      alert(errors.response.data);
    });
  };

  // xử lý hàm undo cho taskName
  const rejectTaskName = (taskName) => {
    let promise = axios({
      url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
      method: 'PUT',
    });

    // Thành công
    promise.then((res) => {
      alert(res.data);
      getTaskList();
    });

    // thất bại
    promise.catch((err) => {
      alert(err.response.data);
    });
  };

  return (
    <div className="card">
      <div className="card__header">
        <img src="./img/X2oObC4.png" />
      </div>
      {/* <h2>hello!</h2> */}
      <form className="card__body" onSubmit={addTask}>
        <div className="card__content">
          <div className="card__title">
            <h2>My Tasks</h2>
            <p>May 9,2022</p>
          </div>
          <div className="card__add">
            <input
              onChange={handleChange}
              name="taskName"
              id="newTask"
              type="text"
              placeholder="Enter an activity..."
            />
            <button onClick={addTask} id="addItem" type="button">
              <i className="fa fa-plus" />
            </button>
          </div>
          <div className="card__todo">
            {/* Uncompleted tasks */}
            <ul className="todo" id="todo">
              {renderTaskTodo()}
            </ul>
            {/* Completed tasks */}
            <ul className="todo" id="completed">
              {renderTaskCompleted()}
            </ul>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TodoListRFC;
