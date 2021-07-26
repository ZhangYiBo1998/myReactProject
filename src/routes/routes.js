import {
    lazy
} from 'react';
import HomePage from '../pages/Home';
import LoginPage from '../pages/Login';

//定义导航路由
export const navRouterArr = [{
    name: '首页',
    icon: '',
    path: '/home/index',
    component: lazy(() => import('../components/Game/Gobang')), //路由懒加载
}, {
    name: '游戏',
    icon: '',
    path: '/home/game',
    component: lazy(() => import('../components/Game')),
    childen: [{
        name: '五子棋',
        icon: '',
        path: '/home/game/gobang',
        component: lazy(() => import('../components/Game/Gobang')),
    }, ],
    displayChilden: true, //第一次进页面默认展示次级路由
}, {
    name: 'SVG练习',
    icon: '',
    path: '/home/form',
    component: lazy(() => import('../components/Game/Gobang')),
    childen: [{
        name: '五子棋',
        icon: '',
        path: '/home/game/gobang',
        component: lazy(() => import('../components/Game/Gobang')),
    }, ],
}, ]


//创建路由,暂时无用
export const createNavRouter = (params) => {
    const obj = {
        name: '',
        icon: '',
        path: '/',
        component: null,
    }
    navRouterArr.push({
        ...obj,
        ...params
    })
}

export const pageRouterArr = [{
    name: '首页',
    path: '/home',
    component: HomePage,
}, {
    name: '登录页',
    path: '/login',
    component: LoginPage,
}, ]