import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { GET_TASK_API } from '../../redux/constants/TodoListTypes';
import {
  addTaskAPI,
  deleteTaskAPI,
  doneTaskAPI,
  getTaskListAPI,
  rejectTaskAPI,
} from '../../redux/actions/TodoListActions';

const TodoListRedux = (props) => {
  // lấy taskList từ Redux
  const { taskList } = useSelector((state) => state.TodoListReducer);

  // dispatch API lên store
  const dispatch = useDispatch();

  let [state, setState] = useState({
    values: {
      taskName: '',
    },
    errors: {
      taskName: '',
    },
  });

  // Gọi API tại chỗ getTaskList
  // Nên đưa những cái logic này lên action creator, thì những cái hàm nó gọi nguồn dữ liệu API thì nó chỉ cần gọi cái action đó thôi
  // Vì vậy các action lần này là hành động có nghiệp vụ xử lý, chứ không đơn thuần là cái action mà chúng ta chỉ xử lý bằng tay
  // Dùng cái action có nhiệm gọi API và cuối cùng nó sẽ dispatch lên store của Redux, cái action hành động sẽ trả về cho mình một cái function chứ không phải là một cái object nữa
  const getTaskList = () => {
    // Đã dọn code qua Redux lưu trữ, nên tại đây chỉ cần dispatch lên Reducer
    dispatch(getTaskListAPI());
  };

  const handleChange = (event) => {
    let { value, name } = event.target;
    // console.log(value, name)
    // cặp nhật value vào state đồng thời check validation\
    let newValues = { ...state.values }; // Tạo ra một object values mới
    newValues = { ...newValues, [name]: value };

    let newErrors = { ...state.errors }; // tạo ra một lỗi mới\
    // Validation chỉ cho nhập vào là chữ
    let regexString =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
    return taskList
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
    return taskList
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

    // Xử lý nhận dữ liệu từ người dùng nhập vào => gọi actions addTaskAPI()
    dispatch(addTaskAPI(state.values.taskName));
  };

  const deleteTaskName = (taskName) => {
    dispatch(deleteTaskAPI(taskName));
  };
  // Button mà không để type là button thì nó sẽ hiểu là type là submit
  // Xử lý hàm DONE task
  const doneTaskName = (taskName) => {
    dispatch(doneTaskAPI(taskName));
  };

  // xử lý hàm undo cho taskName
  const rejectTaskName = (taskName) => {
    dispatch(rejectTaskAPI(taskName));
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

export default TodoListRedux;
