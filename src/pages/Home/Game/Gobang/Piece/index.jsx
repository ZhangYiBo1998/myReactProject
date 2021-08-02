// import React, { useEffect, useState } from 'react';
import React, { Component } from 'react';
import './index.css';

// function Piece(props) {
//     const [state, setState] = useState({
//         pieceStatus: 0,//黑棋：1，白棋：-1，空：0
//         coordinate: props.coordinate,//{row:横坐标,column:纵坐标,value:值}
//     })

//     function changeStatus() {
//         if (state.pieceStatus) {
//             return;
//         }
//         // 可能在悔棋功能中存在bug
//         setState({ ...state, pieceStatus: props.pieceStatus || 1 });
//         props.changeStatus(props.pieceStatus || 1, state.coordinate);
//     }

//     useEffect(() => {
//         // 监听props.pieceStatus的值变化，如果变化为0，就执行清空棋盘操作
//         state.pieceStatus && props.pieceStatus === 0 && setState({
//             pieceStatus: 0,//判断是否是黑棋
//             coordinate: props.coordinate,
//         })
//     }, [props.pieceStatus])

//     return (
//         <div className={`Piece ${props.size > 10 ? 'small' : 'normal'}`} onClick={changeStatus}>
//             {
//                 (!!props.coordinate.value) && (props.coordinate.value === 1 ?
//                     <div className='piece Black'></div> :
//                     <div className='piece White'></div>)
//             }
//         </div>
//     )
// }

class Piece extends Component {
    state = {
        pieceStatus: 0,//黑棋：1，白棋：-1，空：0
        coordinate: this.props.coordinate,//{row:横坐标,column:纵坐标,value:值}
    }
    changeStatus = () => {
        if ((!this.props.canControl) || this.state.pieceStatus) {
            return;
        }
        // 可能在悔棋功能中存在bug
        this.setState({ pieceStatus: this.props.pieceStatus || 1 });
        this.props.changeStatus(this.props.pieceStatus || 1, this.state.coordinate);
    }
    componentDidUpdate() {
        // 监听props.pieceStatus的值变化，如果变化为0，就执行清空棋盘操作
        this.state.pieceStatus && this.props.pieceStatus === 0 && this.setState({
            pieceStatus: 0,//判断是否是黑棋
            coordinate: this.props.coordinate,
        })
    }

    render() {
        const { size, coordinate } = this.props;
        return (
            <div className={`Piece ${size > 10 ? 'small' : 'normal'}`} onClick={this.changeStatus}>
                {
                    (!!coordinate.value) && (coordinate.value === 1 ?
                        <div className='piece Black'></div> :
                        <div className='piece White'></div>)
                }
            </div>
        );
    }
}

export default Piece;