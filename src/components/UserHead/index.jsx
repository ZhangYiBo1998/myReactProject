import { LogoutOutlined, MoreOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Menu } from 'antd';
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom'; //使普通组件也能使用路由组件的参数
import { getCookie } from '../../Global';
import ReactLogo from '../ReactLogo';
import './index.css';

function UserHead(props) {
    const [state] = useState({
        userName: getCookie('userInfo').userName,
    })

    function handleMenuClick(e) {
        // console.log('click', e);
        if (e.key === "1") {
            props.history.push('/userCenter');
            return;
        }
        if (e.key === "2") {
            props.history.push('/settingCenter');
            return;
        }
        if (e.key === "3") {
            props.history.push('/login');
            return;
        }
    }

    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="1" icon={<UserOutlined />}>
                个人中心
            </Menu.Item>
            <Menu.Item key="2" icon={<SettingOutlined />}>
                设置
            </Menu.Item>
            <Menu.Item key="3" icon={<LogoutOutlined />}>
                退出
            </Menu.Item>
        </Menu>
    );

    return (
        <div className='UserHead'>
            <div className='logoBox'>
                <ReactLogo size='small' />
            </div>
            <div className='right'>
                <div className='userInfo'>
                    <div className='imgBox'>
                        {/* <img src="/" alt="头像" /> */}
                        <Avatar size={50} icon={<UserOutlined />} />
                    </div>
                    <div className='userName'>
                        <Dropdown.Button overlay={menu} placement="bottomCenter" icon={<MoreOutlined className='more' />}>
                            {state.userName}
                        </Dropdown.Button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default withRouter(UserHead)