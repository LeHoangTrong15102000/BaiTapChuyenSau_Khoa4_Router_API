import React, { Component } from 'react';
import './TodoList.css';
import axios from 'axios';

class TodoList extends Component {
  // Trong quá trình làm nếu muốn test nhanh API thì dùng postman để test
  state = {
    // taskList là một mảng chứa các danh sách các todoList của chúng ta
    taskList: [],
  };
  getTaskList = () => {
    let promise = axios({
      url: 'http://svcy.myclass.vn/api/ToDoList/GetAllTask',
      method: 'GET',
    });

    // Nếu mà thành công thì làm gì đó
    promise.then((result) => {
      console.log(result.data);
      // Nếu gọi API set lại kết quả thành công thì render lại giao diện của chúng ta
      this.setState({
        taskList: result.data, // thì cái mảng rỗng nó chỉ thêm taskList vào nữa thôi là được
      });
    });
    promise.catch((err) => {
      console.log(err.response.data);
    });
  };
  // Từ state viết hàm render taskTodo
  renderTaskTodo = () => {
    return this.state.taskList
      .filter((item) => !item.status)
      .map((task, index) => {
        return (
          <li>
            <span>{task.taskName}</span>
            <div className="buttons">
              <button className="remove">
                <i className="fa fa-trash" />
              </button>
              <button className="complete">
                <i className="far fa-check-circle" />
                <i className="fas fa-check-circle" />
              </button>
            </div>
          </li>
        );
      });
  };

  // Từ state viết hàm render TaskCompleted
  renderTaskCompleted = () => {
    return this.state.taskList
      .filter((item) => item.status)
      .map((task, index) => (
        <li>
          <span>{task.taskName}</span>
          <div className="buttons">
            <button className="remove">
              <i className="fa fa-trash" />
            </button>
            <button className="complete">
              <i className="far fa-check-circle" />
              <i className="fas fa-check-circle" />
            </button>
          </div>
        </li>
      ));
  };
  render() {
    return (
      <div>
        <button
          onClick={() => {
            this.getTaskList();
          }}
        >
          Get task list
        </button>
        <div className="card">
          <div className="card__header">
            <img src="./img/X2oObC4.png" />
          </div>
          {/* <h2>hello!</h2> */}
          <div className="card__body">
            <div className="card__content">
              <div className="card__title">
                <h2>My Tasks</h2>
                <p>September 9,2020</p>
              </div>
              <div className="card__add">
                <input
                  id="newTask"
                  type="text"
                  placeholder="Enter an activity..."
                />
                <button id="addItem">
                  <i className="fa fa-plus" />
                </button>
              </div>
              <div className="card__todo">
                {/* Uncompleted tasks */}
                <ul className="todo" id="todo">
                  {this.renderTaskTodo()}
                </ul>
                {/* Completed tasks */}
                <ul className="todo" id="completed">
                  {this.renderTaskCompleted()}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TodoList;
