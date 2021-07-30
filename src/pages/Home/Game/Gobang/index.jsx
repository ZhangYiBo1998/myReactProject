import { message } from 'antd';
import React, { useState } from 'react';
import './index.css';
import Piece from './Piece';
import Scoreboard from './Scoreboard';


export default function Gobang() {
    const [state, setState] = useState({
        checkerboard: {
            rowArr: new Array(10).fill(1),
            columnArr: new Array(10).fill(1),
        },
        size: 10,
        isBlack: !0,
        coordinateObj: {},//坐标对象
        clear: !1,
        historyArr: [],//历史记录
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
                            coordinate: { row: rindex, column: cindex },
                            isBlack: state.isBlack,
                            size: state.size,
                            clear: state.clear,
                            changeStatus: changeStatus,
                        }
                        return <Piece key={`column-${cindex}`} {...propsObj} />;
                    })}
                </div>
            );
        })
    }

    const changeStatus = (isBlack, coordinate) => {
        let isWin = !1;
        const newCoordinateObj = { ...state.coordinateObj, [`${coordinate.row}-${coordinate.column}`]: isBlack }
        setState({ ...state, isBlack: !isBlack, coordinateObj: newCoordinateObj, historyArr: [`${coordinate.row}-${coordinate.column}`, ...state.historyArr] });
        // 每走一步棋就检测是否赢得比赛
        isWin = (!isWin) && check(coordinate.row, coordinate.column, isBlack, 1);
        isWin = (!isWin) && check(coordinate.row, coordinate.column, isBlack, 2);
        isWin = (!isWin) && check(coordinate.row, coordinate.column, isBlack, 3);
        (!isWin) && check(coordinate.row, coordinate.column, isBlack, 4);
    }

    // 检测是否赢棋
    const check = (row, column, isBlack, direction = 1) => {
        let currentRow = row, currentColumn = column, num = 1, turnAroundFlag = !1;
        const { coordinateObj } = state;
        const directionObj = {
            1: () => { !turnAroundFlag ? currentRow-- : currentRow++; },
            2: () => { !turnAroundFlag ? currentColumn-- : currentColumn++; },
            3: () => {
                if (!turnAroundFlag) {
                    currentRow--;
                    currentColumn--;
                } else {
                    currentRow++;
                    currentColumn++;
                }
            },
            4: () => {
                if (!turnAroundFlag) {
                    currentRow++;
                    currentColumn--;
                } else {
                    currentRow--;
                    currentColumn++;
                }
            },
        }

        while (num <= 4) {
            directionObj[direction]();
            if (coordinateObj[`${currentRow}-${currentColumn}`] === isBlack) {
                num = num + 1;
            } else if (coordinateObj[`${currentRow}-${currentColumn}`] !== isBlack) {
                if (turnAroundFlag) {
                    break;
                }
                currentRow = row;
                currentColumn = column;
                turnAroundFlag = !0;
            }
        }

        if (num === 5) {
            message.success(`${isBlack ? '黑' : '白'}棋连成五子,${isBlack ? '黑' : '白'}棋赢了`);
            return !0;
        }
        return !1;
    }

    // 清除棋子状态
    const clearPiece = () => {
        const initObj = {
            isBlack: !0,
            coordinateObj: {},
            clear: !state.clear,
            historyArr: [],
        }
        setState({ ...state, ...initObj })
    }

    // 改变棋盘大小
    const changeChessboardSize = (size) => {
        const initObj = {
            size: size,
            checkerboard: {
                rowArr: new Array(size).fill(1),
                columnArr: new Array(size).fill(1),
            },
            isBlack: !0,
            coordinateObj: {},
            clear: !state.clear,
            historyArr: [],
        }
        setState({ ...state, ...initObj, })
    }

    // 悔棋
    const repentance = () => {

    }

    return (
        <div className='Gobang'>
            <h1>五子棋游戏</h1>
            <div className='body'>
                <div className='Pieces'>
                    {init()}
                </div>
                <Scoreboard isBlack={state.isBlack} changeChessboardSize={changeChessboardSize} clearPiece={clearPiece} repentance={repentance} />
            </div>

        </div>
    )
}
