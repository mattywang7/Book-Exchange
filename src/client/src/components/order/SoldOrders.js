import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {markExchangedAction, mySoldOrdersAction} from "../../actions/orderActions";
import {Col, Row, Table} from "react-bootstrap";
import Message from "../layout/Message";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SoldOrders = ({history}) => {
    const dispatch = useDispatch()

    const {user} = useSelector(state => state.auth)

    const {orders, error} = useSelector(state => state.mySoldOrdersState)

    useEffect(() => {
        if (!user) {
            history.push('/login')
        } else {
            dispatch(mySoldOrdersAction())
        }
    }, [dispatch, orders, user, history])

    const markedExchanged = (openOrder) => {
        dispatch(markExchangedAction(openOrder._id))
    }

    const notify = () => {
        toast('The exchange is complete👏!')
    }

    return (
        <div className={'container'}>
            <div className={'col s12'}>
                <Row className='justify-content-md-center'>
                    <Col md={12}>
                        <h2>Orders you sold</h2>
                        {!orders ? (
                            <>
                            </>
                        ) : error ? (
                            <Message variant='danger'>{error}</Message>
                        ) : (
                            <Table striped bordered hover responsive className='table-sm'>
                                <thead>
                                <tr>
                                    <th>Seller</th>
                                    <th>Buyer</th>
                                    <th>Book</th>
                                    <th>Message</th>
                                    <th>Status</th>
                                </tr>
                                </thead>
                                <tbody>
                                {orders.map(order => (
                                    <tr key={order._id}>
                                        <td>{order.sellerName}</td>
                                        <td>{order.buyerName}</td>
                                        <td>{order.bookTitle}</td>
                                        <td>{order.text}</td>
                                        <td>{order.exchanged ? 'Completed' : 'Pending'}</td>
                                        <td>
                                            <button onClick={() => {
                                                markedExchanged(order)
                                                notify()
                                            }}>
                                                mark
                                            </button>
                                            <ToastContainer />
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                        )}
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default SoldOrders
