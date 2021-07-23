import 'antd/dist/antd.css';
import { BrowserRouter, NavLink, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <div className="App bg-image bg-skyblue">
        {/* <LoginPage /> */}
        {/* <div style={{ display: "none" }}> */}
        <NavLink className="list-group-item" to="/about">About</NavLink>
        <NavLink className="list-group-item" to="/home">Home</NavLink>
        {/* </div> */}

        {/* 注册路由 */}
        <Switch>
          {/* Switch可以让注册的路由只匹配一次 */}
          {/* exact属性开启严格匹配，但尽量不用 */}
          <Route path="/login" component={LoginPage} />
          <Route path="/home" component={HomePage} />
          {/* Redirect表示重定向，当都没有匹配上的时候，根据Redirect显示对应组件 */}
          <Redirect to='/login' />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
