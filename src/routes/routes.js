import HomePage from '../pages/Home';
import LoginPage from '../pages/Login';

//定义导航路由
export const navRouterArr = [{
    name: '游戏',
    path: '/game',
    SecondarRouting: [{
        name: '五子棋',
        path: '/game/wuziqi',
    }, ]
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