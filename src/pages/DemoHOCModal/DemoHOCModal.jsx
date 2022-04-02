import React from 'react';
import { useDispatch } from 'react-redux';
import Login from '../Login/Login';
import Register from '../Register/Register';

// Để bật được modal thì modal phải được hiển thị trong ứng dụng của chúng ta
// Bấm vào nút nào thì sẽ dispatch lên Reducer nút đó
const DemoHOCModal = (props) => {
  const dispatch = useDispatch();
  return (
    <div>
      {/* Button trigger modal */}
      <button
        onClick={() => {
          dispatch({
            type: 'OPEN_FORM', // type giống nhau khác nhau giá trị Component truyền lên
            Component: <Login />,
          });
        }}
        type="button"
        className="btn btn-primary btn-lg"
        data-toggle="modal"
        data-target="#modelId"
      >
        Đăng nhập
      </button>
      <button
        onClick={() => {
          dispatch({
            type: 'OPEN_FORM',
            Component: <Register />,
          });
        }}
        type="button"
        className="btn btn-success btn-lg"
        data-toggle="modal"
        data-target="#modelId"
      >
        Đăng ký
      </button>
    </div>
  );
};

export default DemoHOCModal;
