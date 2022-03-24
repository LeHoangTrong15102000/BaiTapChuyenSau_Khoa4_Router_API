import React, { Component } from "react";
import "./TodoList.css";
import axios from "axios";

class TodoList extends Component {
  // Trong quá trình làm nếu muốn test nhanh API thì dùng postman để test
  state = {
    // taskList là một mảng chứa các danh sách các todoList của chúng ta
    taskList: [],
    values: {
      taskName: "",
    },
    errors: {
      taskName: "", // erros ban đầu là rỗng
    },
  };
  getTaskList = () => {
    let promise = axios({
      url: "http://svcy.myclass.vn/api/ToDoList/GetAllTask",
      method: "GET",
    });

    // Nếu mà thành công thì làm gì đó
    promise.then((result) => {
      alert('Thành công')
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
          <li key={index}>
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
        <li key={index}>
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

  // Hàm sẽ tự động được render sau khi nội dung component được render
  componentDidMount() {
    this.getTaskList(); // Khi vừa load lên thì nó sẽ gọi các taskList ra cho chúng ta
  }

  // Hàm handleChange
  handleChange = (event) => {
  
    let { value, name } = event.target;
    // console.log(value, name)
    // cặp nhật value vào state đồng thời check validation\
    let newValues = { ...this.state.values }; // Tạo ra một object values mới
    newValues = { ...newValues, [name]: value };

    let newErrors = { ...this.state.errors }; // tạo ra một lỗi mới\
    // Validation chỉ cho nhập vào là chữ
    let regexString = /^[a-z A-Z]+$/;
    // Nếu chuỗi đầu vào hợp lệ thì cho thực hiện
    if (!regexString.test(value) || value.trim() === ' ') {
      // Kiểm tra cái value nếu nó không hợp lệ
      newErrors[name] = name + " is invalid !!";
    } else {
      newErrors[name] = ""; //Nếu nó ko có lỗi thì trả về là rỗng
    }

    // newErrors = {...newErrors, [name]: value.trim() === ''}

    this.setState({
      ...this.state,
      values: newValues,
      errors: newErrors,
    });
  };

  // Để thêm sự kiện onSubmit để khi mà click hay làm gì đó thì nó cũng addTask cho chúng ta
  addTask = (event) => {
    event.preventDefault(); // Ngăn chặn việc load lại trang của sự kiện.
    console.log(this.state.values.taskName)

    // Đưa dữ liệu lên server
    let promise = axios({
      url: "http://svcy.myclass.vn/api/ToDoList/AddTask",
      method: 'POST', // với phương thúc là post thì cũng phải cần thêm cho nó cái data nữa
      data: {taskName: this.state.values.taskName}// Gửi lên cho nó một cái object mà bên backEnd cung cấp, phải viết đúng định dạng mà backEnd cung cấp
    })

    // Xử lý thành công
    promise.then(result => {
      console.log(result.data)
      
      // Mỗi lần thêm task mới vào thì load lại tất cả các task để người dùng có thể thấy được
      // request API lần nữa lấy những cái task mới về 
      this.getTaskList();
    })

    // Xử lý thất bại 
    promise.catch(errors => {
      alert(errors.response.data)
    })
  };

  // Đầu tiền phải tạo cái biến lấy giá trị người dùng nhập vào

  // ComponentDidUpdate

  render() {
    return (
      <form onSubmit={this.addTask}>
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
              <div className="form-group">
                <div className="card__title">
                  <h2>My Tasks</h2>
                  <p>September 9,2020</p>
                </div>
                <div className="card__add">
                  <input
                    name="taskName"
                    onChange={this.handleChange}
                    id="newTask"
                    type="text"
                    placeholder="Enter an activity..."
                  />

                  <button id="addItem" onClick={this.addTask}>
                    <i className="fa fa-plus" />
                  </button>
                </div>
                <span className="text-danger">{this.state.errors.taskName}</span>
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
      </form>
    );
  }
}

export default TodoList;
