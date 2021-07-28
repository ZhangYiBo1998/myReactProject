import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Loading from '../../components/Loading';
import UserHead from '../../components/UserHead';
import { navRouterArr } from '../../routes/routes';
import './index.css';
import Navigation from './Navigation';

export default function Home(props) {

    function secondryRoute(arr) {
        return arr.map((obj) => {
            const hasChilden = obj.childen && obj.childen.length;
            return (hasChilden ?
                secondryRoute(obj.childen)
                : <Route key={obj.path} path={obj.path} component={obj.component} />
            )
        })
    }

    return (
        <div className='homePage'>
            <UserHead />
            <div className="page-box">
                <Navigation />
                <div className='page-body'>
                    <Suspense fallback={<Loading fullContainer />}>
                        {/* 注册路由 */}
                        <Switch>
                            {/* Switch可以让注册的路由只匹配一次 */}
                            {/* exact属性开启严格匹配，但尽量不用 */}
                            {secondryRoute(navRouterArr)}
                            {/* Redirect表示重定向，当都没有匹配上的时候，根据Redirect显示对应组件 */}
                            <Redirect to={navRouterArr[0].path} />
                        </Switch>
                    </Suspense>
                </div>

            </div>
        </div>
    )
}
