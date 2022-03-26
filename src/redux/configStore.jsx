// Chứa cấu hình của RootReducer.
import { applyMiddleware, combineReducers, createStore } from 'redux';
import TodoListReducer from './reducers/TodoListReducer';
import reduxThunk from 'redux-thunk';

const rootReducer = combineReducers({
  // Các Reducer được khai báo tại đây
  TodoListReducer,
});

const store = createStore(rootReducer, applyMiddleware(reduxThunk));

export default store;
