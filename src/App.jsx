import 'antd/dist/antd.css';
import React, { useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import { getCookie } from './Global';
import { pageRouterArr } from './routes/routes';

function App() {
  const [state] = useState({
    isLogin: !!getCookie('userName'),
    routers: pageRouterArr,
  })

  return (
    <BrowserRouter>
      <div className="App bg-image bg-skyblue">
        {/* 注册路由 */}
        <Switch>
          {/* Switch可以让注册的路由只匹配一次 */}
          {/* exact属性开启严格匹配，但尽量不用 */}
          {
            pageRouterArr.map((obj) => {
              return (
                <Route key={obj.path} {...obj} />
              )
            })
          }
          {/* Redirect表示重定向，当都没有匹配上的时候，根据Redirect显示对应组件 */}
          <Redirect to={state.isLogin ? '/home' : '/login'} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
