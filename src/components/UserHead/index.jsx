import { LogoutOutlined, MoreOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Menu } from 'antd';
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom'; //使普通组件也能使用路由组件的参数
import { getCookie } from '../../utils';
import ReactLogo from '../ReactLogo';
import './index.css';

function UserHead(props) {
    const [state] = useState({
        userName: getCookie('userInfo').userName,
    })

    function handleMenuClick(e) {
        // console.log('click', e);
        if (e.key === "userCenter") {
            props.history.push('/userCenter');
            return;
        }
        if (e.key === "settingCenter") {
            props.history.push('/settingCenter');
            return;
        }
        if (e.key === "Github") {
            window.open('https://github.com/ZhangYiBo1998/my_react_project');
            return;
        }
        if (e.key === "signOut") {
            props.history.push('/login');
            return;
        }
    }

    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="userCenter" icon={<UserOutlined />}>
                个人中心
            </Menu.Item>
            <Menu.Item key="settingCenter" icon={<SettingOutlined />}>
                设置
            </Menu.Item>
            <Menu.Item key="Github" icon={<SettingOutlined />}>
                Github
            </Menu.Item>
            <Menu.Item key="signOut" icon={<LogoutOutlined />}>
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
                        {/* <Dropdown.Button overlay={menu} trigger={['click']} icon={<MoreOutlined className='more' />}>
                            {state.userName}
                        </Dropdown.Button> */}
                        <Dropdown overlay={menu} trigger={['click']}>
                            <span style={{ cursor: 'pointer' }} onClick={e => e.preventDefault()}>
                                {state.userName} <MoreOutlined className='more' />
                            </span>
                        </Dropdown>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default withRouter(UserHead)