import React, { useEffect, useState } from 'react';
import './index.css';

export default function Piece(props) {
    const [state, setState] = useState({
        empty: !0,//初始化时棋盘为空
        isBlack: props.isBlack,//判断是否是黑棋
        coordinate: props.coordinate,
        oldState: {},
    })

    function changeStatus() {
        if (!state.empty) {
            return;
        }
        setState({ ...state, oldState: { ...state, oldState: {} }, empty: !1, isBlack: props.isBlack });
        props.changeStatus(props.isBlack, state.coordinate);
    }

    useEffect(() => {
        // 监听props.clear的值变化，如果变化为true，就执行初始化
        !state.empty && setState({
            empty: !0,//初始化时棋盘为空
            isBlack: props.isBlack,//判断是否是黑棋
            coordinate: props.coordinate,
            oldState: {},
        })
    }, [props.clear])

    return (
        <div className={`Piece ${props.size > 10 ? 'small' : 'normal'}`} onClick={changeStatus}>
            {
                !state.empty && (state.isBlack ?
                    <div className='piece Black'></div> :
                    <div className='piece White'></div>)
            }
        </div>
    )
}
