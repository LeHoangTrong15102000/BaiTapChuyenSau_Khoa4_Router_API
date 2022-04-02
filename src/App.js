import React from 'react';
// import Example from './ReactRouter/Example';
import {
  BrowserRouter,
  NavLink,
  Route,
  Routes,
  Switch,
} from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Header from './components/Home/Header/Header';
import Login from './pages/Login/Login';
import Detail from './pages/Detail/Detail';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import Profile from './pages/Profile/Profile';
import TodoListRFC from './pages/TodoList/TodoListRFC';
import TodoList from './pages/TodoList/TodoList';
import TodoListRedux from './pages/TodoList/TodoListRedux';
import TodoListSaga from './pages/BaiTapTodoListSaga/TodoListSaga';
import LoadingComponent from './components/GlobalSetting/LoadingComponent/LoadingComponent';
import DemoHOCModal from './pages/DemoHOCModal/DemoHOCModal'
import { Modal } from 'bootstrap';
import ModalPopup from './HOC/Modal/ModalPopup';

// <Modal /> trong thằng App mặc định là nó ẩn nên(chứ thật ra là nó luôn luôn hiển thị)

function App() {
  return (
    <BrowserRouter>
      <Header />
      <ModalPopup />
      <LoadingComponent />
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/detail/:id" component={Detail} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/todolistrfc" component={TodoListRFC} />
        <Route exact path="/todolistrcc" component={TodoList} />
        <Route exact path="/todolistredux" component={TodoListRedux} />
        <Route exact path="/todolistsaga" component={TodoListSaga} />
        <Route exact path="/demohocmodal" component={DemoHOCModal} />

        <Route exact path="/" component={Home} />
        {/* Chuyển tới trang 404 ERROR khi người dùng nhập vào tầm bậy */}
        <Route path="*" component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
