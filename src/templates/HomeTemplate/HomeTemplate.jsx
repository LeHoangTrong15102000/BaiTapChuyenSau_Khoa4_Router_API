import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import Header from '../../components/Home/Header/Header';

export const HomeTemplate = (props) => {
  // trả về cái thẻ Route thì nó phải truyền vào cho mình props là 1 cái component

  const { Component, ...restParam } = props; // Bóc tách ra các component khác nhau
  // Mình sẽ sử dụng cái t hẻ này thay cho thẻ Route, mình định nghĩa ra một thẻ mang tính chất của thẻ Route mà nó chứa phần giao diện của Template
  return (
    <Route
      {...restParam}
      render={(propsRoute) => {
        return (
          <>
            <Header />
            {/* Render tất cả các props của thằng Route vào Component */}

            {/* tham số component chính là thằng Home truyền vào, ở trên mình bóc tách ra và đem Component render tại đây */}
            <Component {...propsRoute} />
          </>
        );
      }}
    />
  );
};
