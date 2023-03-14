import { lazy } from "react";
import HomePage from "../pages/Home";
import Initialization from "../pages/Home/Initialization";
import LoginPage from "../pages/Login";

//定义导航路由,最多不要超过3级，否则样式会出错
//name:路由名字
//icon:路由图标
//path:路由路径
//component:路由跳转的组件
//childen:次级路由
//showChilden:是否默认加载次级路由，设置为true时加载
export const navRouterArr = [
  {
    name: "首页",
    icon: "",
    path: "/home/index",
    component: Initialization,
  },
  {
    name: "游戏",
    icon: "",
    path: "/home/game",
    childen: [
      {
        name: "五子棋",
        icon: "",
        path: "/home/game/gobang",
        component: lazy(() => import("../pages/Home/Game/Gobang")), //路由懒加载
      },
      {
        name: "坦克大战",
        icon: "",
        path: "/home/game/tank",
        component: lazy(() => import("../pages/Home/Game/Tank")),
      },
    ],
    showChilden: true,
  },
  {
    name: "SVG练习",
    icon: "",
    path: "/home/SVGStudy",
    component: lazy(() => import("../pages/Home/SVGStudy")),
  },
  {
    name: "微信链接工具",
    icon: "",
    path: "/home/WXModuleTool",
    component: lazy(() => import("../pages/Home/WXModuleTool")),
  },
  {
    name: "关于我",
    icon: "",
    path: "/home/about",
    component: lazy(() => import("../pages/Home/About")), //路由懒加载
  },
];

//创建路由,暂时无用
export const createNavRouter = (params) => {
  const obj = {
    name: "",
    icon: "",
    path: "/",
    component: null,
  };
  navRouterArr.push({
    ...obj,
    ...params,
  });
};

export const pageRouterArr = [
  {
    name: "首页",
    path: "/home",
    component: HomePage,
  },
  {
    name: "登录页",
    path: "/login",
    component: LoginPage,
  },
  {
    name: "个人中心",
    path: "/userCenter",
    component: lazy(() => import("../pages/UserCenter")),
  },
  {
    name: "设置中心",
    path: "/settingCenter",
    component: lazy(() => import("../pages/SettingCenter")),
  },
];
