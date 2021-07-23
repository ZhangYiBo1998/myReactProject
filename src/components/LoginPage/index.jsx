import { Button, Checkbox, Form, Input } from 'antd';
import React, { useState } from 'react';
import './index.css';


export default function LoginPage() {
    const [state, setstate] = useState({
        userName: '',
        password: '',
        remember: !1,
        buttonDisable: !0,
    })

    const onFinish = (values) => {
        console.log('Success:', values);
        //Object.assign合并对象函数的第一个参数是合并后的对象
        //setState()的参数必须是不同的对象，才能更新状态
        // const obj = {};
        // Object.assign(obj, state, values)
        // setstate(obj);

        //在对象上使用扩展运算符，相当于对象合并
        setstate({ ...state, ...values });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const register = () => {
        console.log("去注册");
    }


    return (
        <div className="loginPage">
            <div className="bg-skyblue background bg-image">
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
                                <Button type="primary" htmlType="submit">
                                    登录
                                </Button>
                                <Button type="link" htmlType="button" onClick={register}>
                                    去注册
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>

                </div>
            </div>
        </div>
    )
}

