// Những cái dùng chung cho hệ thống
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styleLoading from './LoadingComponent.module.css';

const LoadingComponent = (props) => {
  // Nội dung sẽ là hiển thị ra tấm hình loading
  return (
    <div className={styleLoading.bgLoading}>
      <img
        src={require('../../../assets/ImgLoading/loading.gif')}
        alt="ImgLoading"
      />
    </div>
  );
};

export default LoadingComponent;
