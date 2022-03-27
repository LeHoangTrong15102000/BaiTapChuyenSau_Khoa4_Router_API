// Chứa cấu hình của RootReducer.
import { applyMiddleware, combineReducers, createStore } from 'redux';
import TodoListReducer from './reducers/TodoListReducer';
import reduxThunk from 'redux-thunk';
// middleware saga
// Redux thunk chỉ cần import vào middleWare là được, còn ReduxSaga thì nó phải gọi một hàm thì nó mới tạo ra middleWare đó
import createMiddleWareSaga from 'redux-saga'
import {rootSaga} from './sagas/rootSaga'

// Gọi một cái biến là middleWareSaga
const middleWareSaga = createMiddleWareSaga()

// Run middlWare của saga



const rootReducer = combineReducers({
  // Các Reducer được khai báo tại đây
  TodoListReducer,
});

const store = createStore(rootReducer, applyMiddleware(reduxThunk, middleWareSaga));// Sau khi gắn vào ApplyMiddleWare thì ta gọi hàm run() generator function

middleWareSaga.run(rootSaga)// rootSaga là một iterator function, tại vì hàm run() nó nhận vào 1 generator function

export default store;
