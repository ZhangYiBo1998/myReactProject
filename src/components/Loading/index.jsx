import { Spin } from 'antd';
import React from 'react';
import './index.css';

export default function Loading(props) {
    return (
        <div className={`LoadingBox ${props.fullScreen && "fullScreen"} ${props.fullContainer && "fullContainer"}`}>
            <Spin size={props.size ? props.size : 'large'} />
        </div>
    )
}
