// Chứa cấu hình của RootReducer.
import { combineReducers, createStore } from 'redux';

const rootReducer = combineReducers({
  // Các Reducer được khai báo tại đây
});

const store = createStore(rootReducer);

export default store;
