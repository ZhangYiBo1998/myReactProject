import React, { useState } from 'react';
import './index.css';

export default function Piece(props) {
    const [state, setstate] = useState({
        empty: !0,//初始化时棋盘为空
        isBlack: props.isBlack,//判断是否是黑棋
        coordinate: props.coordinate,
    })

    function changeStatus() {
        if (!state.empty) {
            return;
        }
        setstate({ ...state, empty: !1, isBlack: props.isBlack });
        props.changeStatus(props.isBlack, state.coordinate);
    }

    return (
        <div className='Piece' onClick={changeStatus}>
            {
                (!state.empty) && (state.isBlack ?
                    <div className='piece Black'></div> :
                    <div className='piece White'></div>)
            }
        </div>
    )
}
