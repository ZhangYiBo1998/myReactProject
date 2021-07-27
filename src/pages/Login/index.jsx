import { Button, Checkbox, Form, Input, message } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import { saveCookie } from '../../utils';
import { proxy53000 } from '../../utils/proxy_variable';
import './index.css';

export default function Login(props) {
    const [state, setState] = useState({
        isLogin: !0,
    })

    const onFinish = (values) => {
        //Object.assign合并对象函数的第一个参数是合并后的对象
        //setState()的参数必须是不同的对象，才能更新状态
        // const obj = {};
        // Object.assign(obj, state, values)
        // setState(obj);
        // 简写方式：
        // setState({...state,...values})

        axios({
            method: "GET",
            url: `/${proxy53000}/user?userName=${values.userName}`,
        }).then(
            res => {
                const data = res.data[0] || {};
                if (state.isLogin) {
                    // 登录
                    if (data.userName === values.userName && data.password === values.password) {
                        // 储存cookie，以便检测是否登录
                        values.remember && saveCookie([
                            {
                                objKey: "userInfo",
                                objValue: {
                                    userName: values.userName
                                }
                            },
                        ]);

                        // props.history.push('/home');
                        //跳转主页/home路由，replace()让用户登录后无法返回登录页
                        props.history.replace('/home');
                        message.success('登录成功');
                    } else {
                        message.error('登录失败');
                    }
                    return false;
                } else {
                    //注册
                    if (data.userName) {
                        message.error('注册失败，用户已存在');
                        return false;
                    } else {
                        // 链式调用axios，避免回调地狱
                        return axios({
                            method: "post",
                            url: `/${proxy53000}/user`,
                            data: {
                                userName: values.userName,
                                password: values.password,
                                power: "normal"
                            }
                        })
                    }
                }
            }
        ).then(
            res => {
                if (!res) {
                    // 如果返回false，则不执行后续代码
                    return;
                }
                setState({ ...state, isLogin: !0 });
                message.success('注册成功');
            }
        ).catch(error => {
            console.log("错误信息：\n", error);
        })

    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const changeLoginStatus = (e) => {
        //更改页面状态为登录页面还是注册页面
        setState({ ...state, ...{ isLogin: !state.isLogin } });
    }

    return (
        <div className="loginPage">
            <div className="login-box">
                <div className='image-box'>
                    <span className='title'>WelCome!!!</span>
                </div>

                {/* 使用antd的表单组件 */}
                <div>
                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        labelAlign='left'
                        wrapperCol={{ span: 16 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}>
                        <Form.Item
                            label="用户名"
                            name="userName"
                            rules={[
                                { required: true, message: '用户名不能为空!' },
                                // { type: 'string', min: 6, message: '用户名位数不低于6位!' },
                            ]}>
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="密码"
                            name="password"
                            rules={[
                                { required: true, message: '密码不能为空!' },
                                { type: 'string', min: 6, message: '密码位数不低于6位!' },
                            ]}>
                            <Input.Password />
                        </Form.Item>

                        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                            <Checkbox>记住我</Checkbox>
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type={state.isLogin ? "primary" : ""} htmlType="submit">
                                {state.isLogin ? '登录' : '注册'}
                            </Button>
                            <Button type="link" htmlType="button" onClick={changeLoginStatus}>
                                {state.isLogin ? '去注册' : '去登录'}
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )
}
