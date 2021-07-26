import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { navRouterArr } from '../../routes/routes';
import './index.css';
import Navigation from './Navigation';

export default function Home() {
    return (
        <div className='homePage'>
            <div className="page-box">
                <Navigation />
                <div className='page-body'>
                    {/* 注册路由 */}
                    <Switch>
                        {/* Switch可以让注册的路由只匹配一次 */}
                        {/* exact属性开启严格匹配，但尽量不用 */}
                        {
                            navRouterArr.map((obj) => {
                                return (
                                    <Route key={obj.path} path={obj.path} component={obj.component} />
                                )
                            })
                        }
                        {/* Redirect表示重定向，当都没有匹配上的时候，根据Redirect显示对应组件 */}
                        <Redirect to={navRouterArr[0].path} />
                    </Switch>
                </div>

            </div>
        </div>
    )
}
