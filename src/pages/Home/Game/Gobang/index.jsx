import React, { useState } from 'react';
import './index.css';
import Piece from './Piece';

export default function Gobang() {
    const [state, setstate] = useState({
        checkerboard: {
            rowArr: new Array(10).fill(1),
            columnArr: new Array(10).fill(1),
        },
        isBlack: !0,
        Arr: []
    })

    // 初始化棋盘
    const init = () => {
        const { rowArr, columnArr } = state.checkerboard;
        return rowArr.map((obj, rindex) => {
            return (
                <div className="row" key={`row-${rindex}`}>
                    {columnArr.map((obj, cindex) => {
                        // 需要传递的props参数
                        const propsObj = {
                            location: { row: rindex, column: cindex },
                            isBlack: state.isBlack,
                            changeStatus: changeStatus,
                        }
                        return <Piece key={`column-${cindex}`} {...propsObj} />;
                    })}
                </div>
            );
        })
    }

    const changeStatus = (isBlack) => {
        setstate({ ...state, isBlack })
    }

    return (
        <div className='Gobang'>
            <h1>五子棋游戏</h1>
            <div className='Pieces'>
                {init()}
            </div>

        </div>
    )
}
