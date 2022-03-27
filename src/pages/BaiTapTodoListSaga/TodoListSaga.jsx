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

const TodoListSaga = (props) => {
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
  const getTaskList = () => {};

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
  const addTask = (event) => {};

  const deleteTaskName = (taskName) => {};
  // Button mà không để type là button thì nó sẽ hiểu là type là submit
  // Xử lý hàm DONE task
  const doneTaskName = (taskName) => {};

  // xử lý hàm undo cho taskName
  const rejectTaskName = (taskName) => {};

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

export default TodoListSaga;