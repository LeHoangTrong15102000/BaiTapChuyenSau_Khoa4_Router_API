import React, { useState } from 'react';

const Login = (props) => {
  // giá trị ban đầu của userLogin là userName: '', passWord: ''
  const [userLogin, setUserLogin] = useState({ userName: '', passWord: '' });
  //   console.log(userLogin); // xem mỗi lần nhập liệu thì nó có vào được cái form hay không
  // Định nghĩa hàm handleChange
  const handleChange = (event) => {
    let { value, name } = event.target;
    // Mỗi lần thay đổi mình sẽ sétUserLogin lại cho nó
    setUserLogin({
      ...userLogin,
      [name]: value,
    });
  };
  // xây dựng hàm onSubmit
  const handleLogin = (event) => {
    // Ngăn chặn load lại của trình duyệt
    event.preventDefault();
    if (
      userLogin.userName === 'cyberlearn.vn' &&
      userLogin.passWord === 'cyberlearn.vn'
    ) {
      // đăng nhập thành công thì chuyển về trang trước đó
      //   props.history.goBack();
      // chuyển đến trang chỉ định sau khi xử lý thì sử dụng push hoặc có thể là replace, tuy nhiên giữa replace và push nó sẽ có điểm khác biệt
      props.history.push('/contact');
      // push chuyển hướng đến path tương ứng
      // Còn thằng replace thì nó sẽ back về cái trang trước khi mình vào trang login(tại vì replace chỉ thay đổi nội dung)
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
    </form>
  );
};

export default Login;
