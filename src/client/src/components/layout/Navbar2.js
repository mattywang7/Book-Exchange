import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {Link} from "react-router-dom";

const Navbar2 = () => {
    const dispatch = useDispatch()

    const {user} = useSelector(state => state.auth)

    return (
        <div className={"navbar-fixed"}>
            <nav className={"z-depth-0"}>
                <div className={"nav-wrapper white"}>
                    <Link to={"/"} style={{fontFamily: 'monospace'}} className={'col s5 brand-logo center black-text'}>
                        <i className={'material-icons'}>code</i>
                        Book Exchange Online Store
                    </Link>
                    {user === null ? (
                        <div className={'col s6'}>
                            <Link to={'/login'}
                                  style={{
                                      width: '140px',
                                      borderRadius: '3px',
                                      letterSpacing: '1.5px'
                                  }}
                                  className={'btn btn-large btn-flat waves-effect white black-text'}>
                                Log In
                            </Link>
                        </div>
                    ) : (
                        <div className={'col s6'}>
                            <Link to={'/dashboard'}
                                  style={{
                                      width: '140px',
                                      borderRadius: '3px',
                                      letterSpacing: '1.5px'
                                  }}
                                  className={'btn btn-large btn-flat waves-effect white black-text'}>
                                Dashboard
                            </Link>
                        </div>
                    )}
                </div>
            </nav>
        </div>
    )
}

export default Navbar2
