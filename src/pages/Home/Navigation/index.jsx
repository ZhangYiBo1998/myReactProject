import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import ReactLogo from '../../../components/ReactLogo';
import { navRouterArr } from '../../../routes/routes';
import './index.css';

export default function Navigation() {
    const [state, setstate] = useState({
        secondaryRouting: [!1],
    })


    return (
        <div className='Navigation'>
            <div className='head'>
                <ReactLogo />
            </div>
            {
                navRouterArr.map((obj) => {

                    return (
                        <div key={obj.path} className="itemBox" >
                            <NavLink activeClassName="active" className="item" to={obj.path}>{obj.name}</NavLink>
                            {
                                (obj.secondaryRouting && obj.secondaryRouting.length > 0) ?
                                    (
                                        obj.secondaryRouting.map((secondary) => {
                                            return <NavLink key={secondary.path} activeClassName="active" className="item item-secondaryRouting" to={secondary.path}>{secondary.name}</NavLink>
                                        })
                                    )
                                    : null
                            }
                        </div>
                    )


                })
            }
        </div>
    )
}
