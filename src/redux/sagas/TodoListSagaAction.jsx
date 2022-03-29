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
import {
  ADD_TASK_API,
  GET_TASKLIST_API,
  GET_TASK_API,
} from '../constants/TodoListTypes';
import { todoListService } from '../../services/TodoListService';
import { STATUS_CODE } from '../../utils/constants/settingSystem';
import { DISPLAY_LOADING, HIDE_LOADING } from '../constants/LoadingConst';

// Tọa 1 hàm Iterator function
// eslint-disable-next-line require-yield

// Những action định nghĩa theo dõi 1 function thì ta sẽ viết bên đây, còn những action trả về một object thì viết bên folder actions bình thường
/**
 * 29/03/2022 Trọng viêt chức năng getTask
 * Action saga lấy danh sach task từ api
 */
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

  // Put action để hiển thị loading(thì phương thức put giống như dispatch)

  yield put({
    // Put có thể dispatch cả action saga và action thường
    type: DISPLAY_LOADING, // Ban đầu là loading dữ liệu
  });

  yield delay(800);

  // Sau khi lấy dữ liệu về
  try {
    // Thì sử dung hàm delay để kéo dài quá trình loading dữ liệu

    let { data, status } = yield call(todoListService.getTaskApi); // 1 cái hàm trả về promise`, tại vì thằng call nhận vào một function trả về giá trị promise

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        // Put lên Reduce
        type: GET_TASK_API,
        taskList: data,
      });
    } else {
      console.log('Error');
    }
    // Tiếp đến là ẩn loading đi
  } catch (err) {
    console.log(err.response.data);
  }

  // Sau khi lấy giá trị thành công dung put (giống dispatch bên thunk)
  yield put({
    type: HIDE_LOADING,
  });

  // console.log('result', data);
}

// Viết hàm thêm Task

// Tách ra để có thể quản lí các nghiệp vụ cho từng file
export function* followActionGetTaskApi() {
  yield takeLatest(GET_TASKLIST_API, getTaskApiAction); // Thay vì viết trong rootReducer thì sẽ tách nó ra rồi export cái function chứa nó vào rootReducer
}

/**
 * 29/3/2022 Trọng viết chức năng là addTask
 * Action saga addTask vào danh sách task đang có trong api
 */
function* addTaskApiAction(action) {
  // Khi mà dispatch lên thì nó sẽ gọi hàm ở đây thực thi
  // Gọi Api -> goi APi thì viêt bên folder service , để sau này dễ quản lí code hơn
  // Hiển thị loading
  // Thành công thì load lại task = cách gọi lai action saga getTaskApi
}

export function* followActionAddTaskApi() {
  yield takeLatest(ADD_TASK_API, addTaskApiAction); // Làm việc thông qua những thằng số chứ không để  giá trị cứng nữa
  // Để mà nó lặng nghe sự kiện addTask được thì phải đưa cái action vào rootSaga
}

/**
 * 29/3/2022 Trong viết chức năng doneTask
 */

/**
 * 29/3/2022 Trong viết chức năng deleteTask
 */

/**
 * 29/3/2022 Trong viết chức năng rejectTask
 */
