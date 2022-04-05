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
import DemoHOCModal from './pages/DemoHOCModal/DemoHOCModal';
import { Modal } from 'bootstrap';
import ModalPopup from './HOC/Modal/ModalPopup';
import { HomeTemplate } from './templates/HomeTemplate/HomeTemplate';

// <Modal /> trong thằng App mặc định là nó ẩn nên(chứ thật ra là nó luôn luôn hiển thị)

function App() {
  return (
    <BrowserRouter>
      <ModalPopup />
      <LoadingComponent />
      <Switch>
        {/* Trong render nó trả về cho chúng ta cái component(function đối với react là component) trong component có thể kế thừa các cái Route của nó là path và exact(những thuộc tính từ cái thẻ root) thì nó sẽ trả cho chúng ta trong cái params của hàm render */}
        {/* Modal nhận một props từ redux là một component, và khi nó sử dụng với thẻ Route nhận tham số là component thì nó sẽ sinh ra Route có component vì vậy nó sẽ chứa thuộc tính của component và chứa thuộc tính của Route */}
        {/* nó nhận vào một props là home nên tạo nện một cái component là home mâng các tính chất của Route, Mình muốn là chỉ thằng home mới có được header */}
        {/* Các thuộc tính như history, map, thì nó đều truyền vào được thằng home với propsRoute */}

        {/* <Route
          exact
          path="/home"
          render={(propsRoute) => {
            return (
              <div>
                <Header />

                <Home {...propsRoute} />
              </div>
            );
          }}
        /> */}

        {/*  Truyền các thuộc tính y như thẻ Route bình thường, truyền thêm thuộc tính là Component, Khi mà render ra thì nó sẽ render ra thẻ Route */}
        {/* Thì lúc này thằng {Home} truyền vào chính là tham số Component ta định nghĩa bên template */}
        <HomeTemplate path="/home" exact Component={Home} />

        {/* Ví dụ trang contact cũng muốn kế thừa từ template khác thì sao */}
        {/* <Route
          exact
          path="/contact"
          render={(propsRoute) => {
            return (
              <div style={{ backgroundColor: '#fff', color: 'red' }}>
                <Contact {...propsRoute} />
              </div>
            );
          }}
        /> */}

        <HomeTemplate path="/contact" exact Component={Contact} />
        {/* Để thằng about cũng có thuộc tính Header thì sửa Route lại thành HomeTemplate và thêm thuộc tính Component trong HomeTemplate */}
        <HomeTemplate exact path="/about" Component={About} />

        <HomeTemplate exact path="/login" Component={Login} />

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
