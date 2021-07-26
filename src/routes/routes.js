import Game from '../components/Game';
import Gobang from '../components/Game/Gobang';
import HomePage from '../pages/Home';
import LoginPage from '../pages/Login';
// import { lazy } from 'react';

//定义导航路由
export const navRouterArr = [{
    name: '首页',
    path: '/home/index',
    component: Gobang,
}, {
    name: '游戏',
    path: '/home/game',
    component: Game,
    secondaryRouting: [{
        name: '五子棋',
        path: '/home/game/gobang',
        component: Gobang,
    }, ]
}, {
    name: '表单',
    path: '/home/form',
    component: Gobang,
}, ]

export const pageRouterArr = [{
    name: '首页',
    path: '/home',
    component: HomePage,
}, {
    name: '登录页',
    path: '/login',
    component: LoginPage,
}, ]