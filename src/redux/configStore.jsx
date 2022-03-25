// Chứa cấu hình của RootReducer.
import { combineReducers, createStore } from 'redux';
import TodoListReducer from './reducers/TodoListReducer';

const rootReducer = combineReducers({
  // Các Reducer được khai báo tại đây
  TodoListReducer,
});

const store = createStore(rootReducer);

export default store;
