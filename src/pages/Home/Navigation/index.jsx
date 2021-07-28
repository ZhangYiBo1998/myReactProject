import { DownOutlined, UpOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import ReactLogo from '../../../components/ReactLogo';
import { navRouterArr } from '../../../routes/routes';
import './index.css';

export default function Navigation() {
    const [state, setstate] = useState({
        navRouterArr: navRouterArr,
    })

    //展开路由和次级路由
    function routingMenu(arr, padding_left = 0, font_size = 1.3) {
        const paddingLeft = padding_left;// 次级菜单依次向右缩进样式
        const fontSize = font_size;// 次级菜单文字样式
        return arr.map((obj) => {
            const hasChilden = obj.childen && obj.childen.length;
            obj.arrowIcon = hasChilden && obj.showChilden ? <UpOutlined /> : <DownOutlined />;
            return (
                <div key={obj.path}>
                    <div className="itemBox" onClick={() => hasChilden && showChilden(obj)}>
                        {
                            hasChilden ?
                                <div className='item'>{obj.name}</div> :
                                <NavLink activeClassName="active" className='item' style={{ paddingLeft: `${paddingLeft}px`, fontSize: `${fontSize}em`, }} to={obj.path}>
                                    {obj.name}
                                </NavLink>
                        }
                        <div className='arrowIcon'>
                            {hasChilden && obj.arrowIcon}
                        </div>
                    </div>
                    {
                        // 使次级菜单依次向右缩进15px，使次级菜单文字依次减小0.2em
                        obj.showChilden && hasChilden && routingMenu(obj.childen, paddingLeft + 15, fontSize - 0.2)
                    }
                </div>
            )

        })
    }

    function showChilden(itemObj) {
        // 点击显示或隐藏次级菜单
        // 因为指向itemObj的指针还是属于state.navRouterArr，所以可以直接改变itemObj的值
        itemObj.showChilden = !itemObj.showChilden;
        setstate({
            ...state,
            navRouterArr: [...state.navRouterArr],
        });
    }

    return (
        <div className='Navigation'>
            <div className='head'>
                {/* animation关键字让icon旋转 */}
                <ReactLogo animation />
            </div>
            {routingMenu(state.navRouterArr)}
        </div>
    )
}
