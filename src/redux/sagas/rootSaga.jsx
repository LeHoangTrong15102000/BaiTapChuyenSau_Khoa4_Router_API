// Saga để quản lí những cái action , dựa vào action type để quản lí
import { fork, take, takeEvery, takeLatest, delay } from 'redux-saga/effects';
import { useSelector, useDispatch } from 'react-redux';

// Tọa 1 hàm Iterator function
// eslint-disable-next-line require-yield
function* getTaskAPI(action) {
  // Thằng này là một action
  // while (true) {
  //   //a nó phải được gọi thì các đoạn code nó mới được thực thi
  //   yield take('getTaskApiAction'); // Theo dỗi action xem action nào dispatch thì mới làm các công việc bên dưới, thì dispatch đúng tên action thì nó mới chạy những dòng lệnh phía sau nó
  //   // Tuy nhiên thầng yield take() thì nó chỉ lắng nghe sự kiện lần đầu khi mà xong thì nó , thì đó là do saga định nghĩa, phải có thz take() kế tiếp được gọi thì nó mới chạy tiếp
  //   // Muốn mỗi lần mình dispatch thì nó gọi thì đưa nó vào vòng lặp vô tận
  //   console.log('GetTaskAPI');
  //   // Tóm lại khi có tín hiệu dispatch lên thì nó mới chạy những dòng lên phía sau
  // }
  // Mình muốn cái ứng dụng vừa bật lên thì nó sẽ gọi cái hàm này
  // Đâu phải lúc nào lên mình cũng gọi thằng này, phải gọi cái action gì đó thì nó mới gọi
  // Ở dưới đây có thể là call API , dispatch lên reducer
  yield delay(3000);
  console.log('getTaskApi', action);
}

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

  yield takeLatest('getTaskApiAction', getTaskAPI); // lấy ra thz dispatch cuối cùng được gọi lên.
}

// Mặc định ban đầu những thằng fork() nó sẽ chạy hết tuy nhiên nó sẽ bị chặn lại bởi take() khi nào take được gọi thì đoạn code trong đó mới được thực thi
