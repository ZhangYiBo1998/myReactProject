import { Button } from 'antd';
import React, { useState } from 'react';
import './index.css';

export default function Scoreboard(props) {
    const { isBlack } = props;
    const [state, setstate] = useState({
        toBig: !0,
    })

    // 改变棋盘大小
    const changeChessboardSize = () => {
        setstate({ toBig: !state.toBig });
        props.changeChessboardSize(state.toBig ? 17 : 10);
    }

    // 清空棋盘
    const clearPiece = () => {
        props.clearPiece();
    }

    // 悔棋
    const repentance = () => {
        props.repentance();
    }

    return (
        <div className='Scoreboard'>
            <h2 className='title'>记分板</h2>
            <div className='pieceBox'>
                {isBlack ? <div className='piece Black'></div> : <div className='piece White'></div>}
            </div>
            <div>
                <p>当前执棋是{isBlack ? '黑' : '白'}棋</p>
                <Button onClick={changeChessboardSize}>更换{state.toBig ? '大' : '小'}棋盘</Button>
                <Button onClick={clearPiece}>清空棋盘</Button>
                <Button onClick={repentance}>悔棋</Button>
            </div>
        </div>
    )
}
