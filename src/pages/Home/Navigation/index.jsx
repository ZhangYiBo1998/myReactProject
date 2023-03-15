import { MailOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import React, { Component } from 'react';
import { useHistory } from 'react-router-dom';

import ReactLogo from '../../../components/ReactLogo';
import { navRouterArr } from '../../../routes/routes';
import './index.css';

// export default function Navigation() {
//     const [state, setstate] = useState({
//         navRouterArr: navRouterArr,
//     })
//     //展开路由和次级路由
//     function routingMenu(arr, padding_left = 0, font_size = 1.3) {
//         const paddingLeft = padding_left;// 次级菜单依次向右缩进样式
//         const fontSize = font_size;// 次级菜单文字样式
//         return arr.map((obj) => {
//             const hasChilden = obj.childen && obj.childen.length;
//             obj.arrowIcon = hasChilden && obj.showChilden ? <UpOutlined /> : <DownOutlined />;
//             return (
//                 <div key={obj.path}>
//                     <div className="itemBox" onClick={() => hasChilden && showChilden(obj)}>
//                         {
//                             hasChilden ?
//                                 <div className='item'>{obj.name}</div> :
//                                 <NavLink activeClassName="active" className='item' style={{ paddingLeft: `${paddingLeft}px`, fontSize: `${fontSize}em`, }} to={obj.path}>
//                                     {obj.name}
//                                 </NavLink>
//                         }
//                         <div className='arrowIcon'>
//                             {hasChilden && obj.arrowIcon}
//                         </div>
//                     </div>
//                     {
//                         // 使次级菜单依次向右缩进15px，使次级菜单文字依次减小0.2em
//                         obj.showChilden && hasChilden && routingMenu(obj.childen, paddingLeft + 15, fontSize - 0.2)
//                     }
//                 </div>
//             )
//         })
//     }
//     function showChilden(itemObj) {
//         // 点击显示或隐藏次级菜单
//         // 因为指向itemObj的指针还是属于state.navRouterArr，所以可以直接改变itemObj的值
//         itemObj.showChilden = !itemObj.showChilden;
//         setstate({
//             ...state,
//             navRouterArr: [...state.navRouterArr],
//         });
//     }
//     return (
//         <div className='Navigation'>
//             <div className='head'>
//                 {/* animation关键字让icon旋转 */}
//                 <ReactLogo animation />
//             </div>
//             {routingMenu(state.navRouterArr)}
//         </div>
//     )
// }

let _this = null;

class NavigationComponent extends Component {

    state = {
        navRouterArr: [],
    }

    //组件挂完毕
    componentDidMount() {
        console.log('componentDidMount');
        _this = this

        const items = _this.setNavItems(navRouterArr)
        this.setState({ navRouterArr: items })
        console.log(items)
    }

    setNavItems = (arr) => {
        const items = [];
        arr.forEach(item => {
            items.push({
                key: item.path,
                icon: item.icon || <MailOutlined />,
                label: item.name,
                children: item.childen && _this.setNavItems(item.childen),
                type: item.type,
            })
        })
        return items;
    }


    clickMenu = (e) => {
        console.log('click ', e);
        const {history} = this.props;
        // 跳转路由
        history.push(e.key);
    };

    render() {
        const { navRouterArr } = this.state;
        console.log('navRouterArr',navRouterArr)

        return (
            <div className='Navigation'>
                <div className='head'>
                    <ReactLogo animation />
                </div>
                <Menu
                    onClick={this.clickMenu}
                    style={{
                        width: 256,
                    }}
                    defaultSelectedKeys={['/home/index']}
                    defaultOpenKeys={['/home/game']}
                    mode="inline"
                    items={navRouterArr}
                />
            </div>
        )
    }

}


// 高阶组件包装useHistory()功能
// 原因：类组件中无法使用useHistory()，会报错
// error: React Hook "useHistory" cannot be called in a class component.
function NavigationHook(Navigation) {

    return function NavigateCompont() {
        const history = useHistory()

        // 给传入的组件新增一个to方法，传给原始组件的props，在原始组件中通过this.props.to(参数)使用
        // 通过父传子，将useNavigate函数传给子组件，实现在类组件中调用hook函数
        return <Navigation history={history}></Navigation>
    }


}

const Navigation = NavigationHook(NavigationComponent);

export default Navigation;