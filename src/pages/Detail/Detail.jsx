import React from 'react';

const Detail = (props) => {
  return (
    <div>
      {/* Lấy ra tham số thông qua thuộc tính params trên match */}
      Giá trị của tham số: {props.match.params.id}
      {/* Lấy ra đường dẫn thông qua thuộc tính pathName */}
      Path name hiện tại: {props.match.path}
    </div>
  );
};

export default Detail;
