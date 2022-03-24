import React from 'react';
import { Redirect } from 'react-router-dom';

const Profile = () => {
  // Trang chứa thông tin của người dùng, đòi hỏi người dùng phải Login thì mới vào được
  // Kiểm tra trong localStorage đã có tên tk là cyberlearn đăng nhập vào chưa, Nếu có rồi thì mới cho vào Profile
  if (localStorage.getItem('userLogin')) {
    // Nếu đăng nhập rồi thì mới cho vào trang profile
    return (
      <div>
        <h1 className="text-info">
          Hello mình là Trọng là học viên của cybersoft
        </h1>
        <span className="text-warning">
          Mình là học viên khóa bootcamp 26 tại CyberSoft
        </span>
      </div>
    );
  } else {
    alert('Vui lòng đăng nhập để vào trang này!'); // và Trả người về trang Login
    return <Redirect to="/login" />; // Nếu chưa đăng nhập thì chuyển nó về trang Login
  }
};

export default Profile;
