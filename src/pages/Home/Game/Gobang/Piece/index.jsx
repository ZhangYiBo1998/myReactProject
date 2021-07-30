import React, { useEffect, useState } from 'react';
import './index.css';

function Piece(props) {
    const [state, setState] = useState({
        pieceStatus: 0,//黑棋：1，白棋：-1，空：0
        coordinate: props.coordinate,//{row:横坐标,column:纵坐标,value:值}
    })

    function changeStatus() {
        if (state.pieceStatus) {
            return;
        }
        // 可能在悔棋功能中存在bug
        setState({ ...state, pieceStatus: props.pieceStatus || 1 });
        props.changeStatus(props.pieceStatus || 1, state.coordinate);
    }

    useEffect(() => {
        // 监听props.pieceStatus的值变化，如果变化为0，就执行清空棋盘操作
        state.pieceStatus && props.pieceStatus === 0 && setState({
            pieceStatus: 0,//判断是否是黑棋
            coordinate: props.coordinate,
        })
    }, [props.pieceStatus])

    return (
        <div className={`Piece ${props.size > 10 ? 'small' : 'normal'}`} onClick={changeStatus}>
            {
                // (!!state.pieceStatus) && (state.pieceStatus === 1 ?
                //     <div className='piece Black'></div> :
                //     <div className='piece White'></div>)

                (!!props.coordinate.value) && (props.coordinate.value === 1 ?
                    <div className='piece Black'></div> :
                    <div className='piece White'></div>)
            }
        </div>
    )
}

/*  React.memo是一个高阶组件，类似于React.PureComponent，只不过用于函数组件而非class组件。
    如果你的函数组件在相同props下渲染出相同结果，你可以把它包裹在React.memo中来通过缓存渲染结果来实现性能优化。
    这意味着React会跳过组件渲染，而使用上次渲染结果。
    React.memo默认只会浅比较props，如果需要定制比较，你可以给第二个参数传入自定义比较函数
*/
export default Piece;