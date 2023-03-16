import { LogoutOutlined, MoreOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Space } from 'antd';
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom'; //使普通组件也能使用路由组件的参数
import { getCookie } from '../../utils';
import ReactLogo from '../ReactLogo';
import './index.css';
// 加载图片文件夹，为动态加载本地图片做准备
const images = require.context('../../img', true);


function UserHead(props) {
    const [state] = useState({
        userInfo: getCookie('userInfo'),
    })

    function handleMenuClick(key) {
        console.log('click', key);

        if (key === "userCenter") {
            props.history.push('/userCenter');
            return;
        }
        if (key === "settingCenter") {
            props.history.push('/settingCenter');
            return;
        }
        if (key === "Github") {
            window.open('https://github.com/ZhangYiBo1998/my_react_project');
            return;
        }
        if (key === "signOut") {
            props.history.push('/login');
            return;
        }
    }

    const items = [
        {
            label: (
                <Space onClick={e => { handleMenuClick('userCenter') }}>
                    <UserOutlined />
                    <span>个人中心</span>
                </Space>
            ),
            key: 'userCenter',
        },
        {
            label: (
                <Space onClick={e => { handleMenuClick('settingCenter') }}>
                    <SettingOutlined />
                    <span>设置</span>
                </Space>
            ),
            key: 'settingCenter',
        },
        {
            label: (
                <Space onClick={e => { handleMenuClick('Github') }}>
                    <SettingOutlined />
                    <span>Github</span>
                </Space>
            ),
            key: 'Github',
        },
        {
            label: (
                <Space onClick={e => { handleMenuClick('signOut') }}>
                    <LogoutOutlined />
                    <span>退出帐号</span>
                </Space>
            ),
            key: 'signOut',
        },
    ];

    return (
        <div className='UserHead'>
            <div className='logoBox'>
                <ReactLogo size='small' />
            </div>
            <div className='right'>
                <div className='userInfo'>
                    <div className='imgBox'>
                        {/* 设置头像 因为是本地图片，只能使用此方法动态加载，网络图片直接可以使用链接*/}
                        {
                            state.userInfo.img ? (
                                <img src={images(`${state.userInfo.img}`).default} style={{ width: "50px", height: "50px", borderRadius: "50%" }} alt="头像" />
                            ) : (
                                <Avatar size={50} icon={<UserOutlined />} />
                            )
                        }
                    </div>
                    <div className='userName'>
                        <Dropdown menu={{ items }} trigger={['click']}>
                            <Space>
                                {state.userInfo.userName}
                                <MoreOutlined />
                            </Space>
                        </Dropdown>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default withRouter(UserHead)