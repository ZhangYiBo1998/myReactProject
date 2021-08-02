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
        pieceStatus: 1,// 黑棋：1，白棋：-1，空：0
        coordinateObj: {},// 坐标对象，同时存储已选择棋格的值，如：{'1-1':1,'1-2':0,'1-3':-1}
        historyArr: [],// 历史记录
        canControl: !0,
        isWin: 0,// 1胜者黑棋，-1胜者白棋，0没有胜者
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
                            coordinate: { row: rindex, column: cindex, value: state.coordinateObj[`${rindex}-${cindex}`] || 0 },
                            pieceStatus: state.pieceStatus,
                            canControl: state.canControl,
                            changeStatus: changeStatus,
                            size: state.size,
                        }
                        return <Piece key={`column-${cindex}`} {...propsObj} />;
                    })}
                </div>
            );
        })
    }

    const changeStatus = (pieceStatus, coordinate) => {
        let isWin = !1;
        const newCoordinateObj = { ...state.coordinateObj, [`${coordinate.row}-${coordinate.column}`]: pieceStatus };

        // 每走一步棋就检测是否赢得比赛
        (!isWin) && (isWin = check(coordinate.row, coordinate.column, pieceStatus, newCoordinateObj, 1));
        (!isWin) && (isWin = check(coordinate.row, coordinate.column, pieceStatus, newCoordinateObj, 2));
        (!isWin) && (isWin = check(coordinate.row, coordinate.column, pieceStatus, newCoordinateObj, 3));
        (!isWin) && (isWin = check(coordinate.row, coordinate.column, pieceStatus, newCoordinateObj, 4));
        isWin && message.success(`${pieceStatus === 1 ? '黑' : '白'}棋连成五子,${pieceStatus === 1 ? '黑' : '白'}棋赢了`);
        setState({
            ...state,
            pieceStatus: pieceStatus * (-1),
            coordinateObj: newCoordinateObj,
            historyArr: [`${coordinate.row}-${coordinate.column}`, ...state.historyArr],
            canControl: !isWin, //比赛结束禁止继续操作棋盘
            isWin: isWin && pieceStatus,
        });
    }

    // 检测是否赢棋
    const check = (row, column, pieceStatus, coordinateObj, direction = 1) => {
        let currentRow = row, currentColumn = column, num = 1, turnAroundFlag = !1;
        // const { coordinateObj } = state;
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
            if (coordinateObj[`${currentRow}-${currentColumn}`] === pieceStatus) {
                num = num + 1;
            } else if (coordinateObj[`${currentRow}-${currentColumn}`] !== pieceStatus) {
                if (turnAroundFlag) {
                    break;
                }
                currentRow = row;
                currentColumn = column;
                turnAroundFlag = !0;
            }
        }

        if (num === 5) {
            return !0;
        }
        return !1;
    }

    // 清除棋子状态
    const clearPiece = () => {
        const initObj = {
            pieceStatus: 0,
            coordinateObj: {},
            historyArr: [],
            canControl: !0,
            isWin: 0,
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
            pieceStatus: 0,
            coordinateObj: {},
            historyArr: [],
        }
        setState({ ...state, ...initObj, })
    }

    // 悔棋
    const repentance = () => {
        const newCoordinateObj = { ...state.coordinateObj };
        const arr = state.historyArr;
        delete newCoordinateObj[arr[0]];
        arr.shift();

        setState({ ...state, coordinateObj: newCoordinateObj, historyArr: arr })
    }

    return (
        <div className='Gobang'>
            <h1>五子棋游戏</h1>
            <div className='body'>
                <div className='Pieces'>
                    {init()}
                </div>
                <Scoreboard pieceStatus={state.pieceStatus} isWin={state.isWin} changeChessboardSize={changeChessboardSize}
                    clearPiece={clearPiece} repentance={repentance} />
            </div>

        </div>
    )
}
