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
import {
  ADD_TASK_API,
  GET_TASKLIST_API,
} from '../../redux/constants/TodoListTypes';

const TodoListSaga = (props) => {
  let [state, setState] = useState({
    values: {
      taskName: '',
    },
    errors: {
      taskName: '',
    },
  });

  // Dùng useSelector để lấy giá trị từ Redux về
  let { taskList } = useSelector((state) => state.TodoListReducer);

  // Sử dụng useDispatch để dispatch những action lên Reducer
  const dispatch = useDispatch();

  // Viết hàm getTask lấy dữ liệu từ backEnd xuống
  const getTaskList = () => {
    // dispatch đúng cái Type của action là được (tên action Saga)
    // dispatch action saga
    dispatch({
      type: GET_TASKLIST_API, // phải viết chính xác cái tên thì nó mới lên Reducer và gọi APi ra
      data: 'Trong',
    });
  };

  // Tại đây sẽ băt sự kiện useEffect để dispatch cái action, chỉ cần truyền tên action đi thôi thì tự động nó sẽ nhảy vào cái action đó để thực thi
  useEffect(() => {
    // Gọi hàm getTaskList
    getTaskList();
    return () => {}; // thằng Return này là của componentWillUnmount
  }, []);

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
    event.preventDefault();
    // khi addTask thì gửi taskName lên, ở đây sẽ dispatch 1 cái action saga
    dispatch({
      // Khi ta dispatch lên thì trên saga nó sẽ lặng nghe sự kiện của chúng ta
      type: ADD_TASK_API,
      // phải thêm taskName ở dưới đây vào thì ở trên nó mới nhận được và xử lý
      taskName: state.values.taskName,
      // gọi lên trên đó thì nó sẽ bóc tách ra taskName, sẽ có hàm theo dõi nó trên saga, Nếu dispatch đúng tên thì nó sẽ lặng nghe sự kiện
    });
  };

  const deleteTaskName = (taskName) => {};
  // Button mà không để type là button thì nó sẽ hiểu là type là submit
  // Xử lý hàm DONE task
  const doneTaskName = (taskName) => {};

  // xử lý hàm undo cho taskName
  const rejectTaskName = (taskName) => {};

  return (
    <div className="card">
      <button
        className="btn btn-success"
        onClick={() => {
          // Dispatch 1 cái action có type đúng với thằng mình đã định nghĩa
          dispatch({
            type: GET_TASKLIST_API,
          });
        }}
      >
        Dispatch action saga getTaskAPI
      </button>
      <div className="card__header">
        <img src="./img/X2oObC4.png" alt="Img123" />
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
