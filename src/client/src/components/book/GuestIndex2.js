import SearchBox from "../layout/SearchBox";
import React, {useEffect} from "react";
import {useSelector} from "react-redux";

const GuestIndex2 = () => {

    const {user} = useSelector(state => state.auth)

    useEffect(() => {

    }, [user])

    return (
        <div className={'container'}>
            <div className={'row'} style={{marginTop: '2rem'}}>
                <div className={'col s12 center-align'}>
                    <h4>
                        Welcome to Soton's Online Book Store!
                    </h4>
                    <div className={'col s4'}>
                        <SearchBox type={'title'} />
                    </div>
                    <div className={'col s4'}>
                        <SearchBox type={'author'} />
                    </div>
                    <div className={'col s4'}>
                        <SearchBox type={'category'} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GuestIndex2
