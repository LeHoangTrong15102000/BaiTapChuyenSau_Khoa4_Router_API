// Những cái dùng chung cho hệ thống
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styleLoading from './LoadingComponent.module.css';

const LoadingComponent = (props) => {
  // Nội dung sẽ là hiển thị ra tấm hình loading

  // Dùng Selector để lấy dữ liệu của thằng Loading về
  let { isLoading } = useSelector(state => state.LoadingReducer)
  if (isLoading) {
    return (
      <div className={styleLoading.bgLoading}>
        <img
          src={require('../../../assets/ImgLoading/loading.gif')}
          alt="ImgLoading"
        />
      </div>
    );
  } else {
    return ''; // Ngược lại thì không trả lại gì hết
  }
};

export default LoadingComponent;
