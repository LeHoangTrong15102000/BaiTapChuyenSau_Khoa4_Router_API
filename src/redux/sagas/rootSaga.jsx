// Saga để quản lí những cái action , dựa vào action type để quản lí
import {
  fork,
  take,
  takeEvery,
  takeLatest,
  delay,
  call,
  put,
  all,
} from 'redux-saga/effects';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { GET_TASK_API } from '../constants/TodoListTypes';
import * as TodoListSaga from './TodoListSagaAction';
// Bây giờ tìm hiểu saga trước rồi mới lên đọc tài liệu hiêu sâu Saga nó định nghĩa cái gì

/**
 * Sau này ta sẽ phân các thằng này ra file riêng của saga, rồi import vào
 */

// eslint-disable-next-line require-yield
export function* rootSaga() {
  // yield fork(getTaskAPI); // Khi mà thằng saga chạy tới đây thì nó sẽ gọi useFork, fork() nhận vào một cái action
  // // fork() là hàm bất đồng bộ, có n fork() thì nó sẽ chạy n chức vụ khác nhau và không có đợi nhau - non blocking: chạy độc lập nhau
  // console.log('rootSaga');
  // Vì trong đây thì nó sẽ không gọi generator liền mà nó dùng một số các khái niệm của nó tự kích hoạt ngầm, vì vậy phải biết một số các cơ chế của generator function
  // Tóm lại fork() ban đầu lên thì nó sẽ chạy tất cả các function của saga
  // yield takeEvery('getTaskApiAction', getTaskAPI); // nó sẽ theo dõi action getTaskApi khi mà được dispatch thì nó sẽ gọi hàm getTaskApi
  // nó sẽ theo dõi action nào có tên là getTaskApiAction được dispatch lên bởi useDispatch thì tại hàm đó nó sẽ lắng nghe và xử lý sự kiện phía bên dưới action đó

  // yield takeLatest("getTaskApiAction", getTaskAPI); // lấy ra thz dispatch cuối cùng được gọi lên.

  // Sẽ viết 1 thằng tổng để theo dỗi những action được truyền lên từ saga
  // Nó sẽ nhận vào một cái mảng là tất cả các nghiệp vụ mà chúng ta theo dõi (theo dõi những function takeLatest())
  yield all([
    // Nghiệp vụ theo dõi các action saga todoList
    // Sẽ dùng cái hàm tổng để gọi tới từng takeLatest (nghiệp vụ của function)
    TodoListSaga.followActionGetTaskApi(),
    TodoListSaga.followActionAddTaskApi(),
  ]);
}

// Mặc định ban đầu những thằng fork() nó sẽ chạy hết tuy nhiên nó sẽ bị chặn lại bởi take() khi nào take được gọi thì đoạn code trong đó mới được thực thi
