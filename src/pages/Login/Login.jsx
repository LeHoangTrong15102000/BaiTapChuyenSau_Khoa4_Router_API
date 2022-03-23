import React, { useState } from 'react';
import { Prompt } from 'react-router-dom/cjs/react-router-dom.min';

const Login = (props) => {
  // giá trị ban đầu của userLogin là userName: '', passWord: ''
  const [userLogin, setUserLogin] = useState({ userName: '', passWord: '', status: false });
  //   console.log(userLogin); // xem mỗi lần nhập liệu thì nó có vào được cái form hay không
  // Định nghĩa hàm handleChange
  const handleChange = (event) => {
    let { value, name } = event.target;
    // Mỗi lần thay đổi mình sẽ sétUserLogin lại cho nó

    const newUserLogin = {
      ...userLogin,
      [name]: value,
    }

    let valid = true
    for (let key in newUserLogin) {
      if (key !== 'status') {
        if(newUserLogin[key].trim() === '') {
          valid = false;// Nếu mà các trường khác ngoại trừ trường status mà bằng rỗng thì ta không cho phép người dùng rời khỏi 
        }
      }
    }

    // Nếu không hợp lệ thì cản lại còn hợp lệ thì thôi
    if (!valid) {
      // Nếu không hợp lệ thì không cho chuyển trang để qua trang mới
      newUserLogin.status = true;
    } else {
      // Ngược lại thì hợp lệ rồi thì thôi
      newUserLogin.status = false;
    }
    setUserLogin(newUserLogin);
  };
  // xây dựng hàm onSubmit
  const handleLogin = (event) => {
    // Ngăn chặn load lại của trình duyệt
    event.preventDefault();
    if (
      userLogin.userName === 'cyberlearn' &&
      userLogin.passWord === 'cyberlearn'
    ) {
      // đăng nhập thành công thì chuyển về trang trước đó
      //   props.history.goBack();
      // chuyển đến trang chỉ định sau khi xử lý thì sử dụng push hoặc có thể là replace, tuy nhiên giữa replace và push nó sẽ có điểm khác biệt
      props.history.goBack();
      // push chuyển hướng đến path tương ứng
      // Còn thằng replace thì nó sẽ back về cái trang trước khi mình vào trang login(tại vì replace chỉ thay đổi nội dung)
      localStorage.setItem('userLogin', JSON.stringify(userLogin))

      // Muốn là khi Login thành công thì sẽ lưu trữ vào localStorage.
      // Kiểm tra như vậy thì mới cho người dùng nhấn vào trang profile của người dùng còn không thì phải bắt buộc người dùng Login vào
    } else {
      alert('Login fail !!');
      return; // thất bại thì không làm gì hết
    }
  };
  // Kiểm tra nếu tài khoản là cyberlearn thì cho nó pass về trang home
  

  // Trong đó có thuộc tính là location giúp chúng ta lấy ra cái key ngẫu nhiên và lấy ra đường dẫn của pathName, search là những gì mà chúng ta tiềm kiếm phía sau của đường dẫn

  return (
    <form onSubmit={handleLogin} className="container">
      <h3 className="display-4 text-info">Login</h3>
      <div className="form-group">
        <p>UserName</p>
        <input
          className="form-control"
          name="userName"
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <p>PassWord</p>
        <input
          type="password"
          className="form-control"
          name="passWord"
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <button className="btn btn-success">Đăng nhập</button>
      </div> 

      <Prompt when={userLogin.status} message={(location) => {
        return 'Bạn có chắc là muốn rời khỏi trang hay không!'
      }} />
    </form>
  );
};

export default Login;
