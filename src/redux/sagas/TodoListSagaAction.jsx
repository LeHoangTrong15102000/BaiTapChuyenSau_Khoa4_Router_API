// Saga để quản lí những cái action , dựa vào action type để quản lí
import {
  fork,
  take,
  takeEvery,
  takeLatest,
  delay,
  call,
  put,
} from 'redux-saga/effects';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { GET_TASK_API } from '../constants/TodoListTypes';
import { todoListService } from '../../services/TodoListService';

// Tọa 1 hàm Iterator function
// eslint-disable-next-line require-yield

// Những action định nghĩa theo dõi 1 function thì ta sẽ viết bên đây, còn những action trả về một object thì viết bên folder actions bình thường
function* getTaskApiAction(action) {
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

  // Nó như async await nê phải dùng hàm call mới được
  // Nó sẽ nhận vào một cái hàm trả về promise
  // console.log('actionSaga', action);
  let { data, status } = yield call(todoListService.getTaskApi); // 1 cái hàm trả về promise`, tại vì thằng call nhận vào một function trả về giá trị promise

  // Sau khi lấy giá trị thành công dung put (giống dispatch bên thunk)
  yield put({
    // Put lên Reduce
    type: GET_TASK_API,
    taskList: data,
  });

  // console.log('result', data);
}

// Viết hàm thêm Task

// Tách ra để có thể quản lí các nghiệp vụ cho từng file
export function* followActionGetTaskApi() {
  yield takeLatest('getTaskApiAction', getTaskApiAction); // Thay vì viết trong rootReducer thì sẽ tách nó ra rồi export cái function chứa nó vào rootReducer
}
