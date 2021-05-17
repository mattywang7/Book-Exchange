import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestBookAction } from "../../actions/bookAction";
import { addOrderAction } from "../../actions/orderActions";

const AddNewOrder = ({ history }) => {

    const dispatch = useDispatch()

    const [text, setText] = useState('')

    const {success, order, error} = useSelector(state => state.addOrderState)

    // useEffect(() => {
    //     if (success) {
    //         history.push('/dashboard')
    //     }
    // }, [success, order, history])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(addOrderAction({
            text: text,
            exchanged: false
        }, history))
    }

    return (
        <div className={'container'}>
            <div className={'row'}>
                <form onSubmit={submitHandler}>
                    <div className={'input-field col s12'}>
                        <input onChange={e => setText(e.target.value)}
                            value={text}
                            id={'textForSeller'}
                            type={'text'} />
                        <label htmlFor={'textForSeller'}>Please leave a message to the seller...</label>
                    </div>
                    <div className={'col s12'} style={{ paddingLeft: '11.250px' }}>
                        <button style={{
                            width: '150px',
                            borderRadius: '3px',
                            letterSpacing: '1.5px',
                            marginTop: '1rem'
                        }}
                            type={'submit'}
                            className={'btn btn-large waves-effect waves-light hoverable blue accent-3'}>
                            Request
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddNewOrder
