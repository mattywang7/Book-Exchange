import React, {Component} from "react";
import PropTypes from 'prop-types'
import {guestBookAction} from "../../actions/bookAction";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import SearchBox from "../layout/SearchBox";

class GuestIndex extends Component {

    render() {
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

}

GuestIndex.propTypes = {
    guestBookAction: PropTypes.func.isRequired,

    guestBookState: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    guestBookState: state.guestBookState
})

export default connect(
    mapStateToProps,
    {guestBookAction}
)(withRouter(GuestIndex))
