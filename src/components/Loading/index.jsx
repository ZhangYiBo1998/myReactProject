import { Spin } from 'antd';
import React from 'react';
import './index.css';

export default function Loading(props) {
    const { fullScreen, fullContainer, size = 'large' } = props;
    return (
        <div className={`LoadingBox ${fullScreen && "fullScreen"} ${fullContainer && "fullContainer"}`}>
            <Spin size={size} />
        </div>
    )
}
