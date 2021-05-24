import { useEffect } from "react"
import { Col, Row, Table } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { myOrdersAction } from "../../actions/orderActions"
import Message from '../layout/Message'

const BoughtOrders = ({history}) => {
    const dispatch = useDispatch()

    const {user} = useSelector(state => state.auth)

    const {orders, error} = useSelector(state => state.myOrdersState)

    useEffect(() => {
        if (!user) {
            history.push('/login')
        } else {
            dispatch(myOrdersAction())
        }
    }, [dispatch, user, history])

    const addReview = (orderId) => {
        history.push(`/add-review/${orderId}`)
    }

    return (
        <div className={'container'}>
            <div className={'col s12 center-align'}>
                <Row className='justify-content-md-center'>
                    <Col md={12}>
                        <h2>Orders you requested</h2>
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
                                            <button className={'btn btn-large waves-effect waves-light hoverable blue accent-3'}
                                                    style={{
                                                        width: '150px',
                                                        borderRadius: '3px',
                                                        letterSpacing: '1.5px',
                                                        marginTop: '1rem'
                                                    }}
                                                    disabled={order.reviewScore !== 0}
                                                    onClick={() => {
                                                        addReview(order._id)
                                                    }}>
                                                Review
                                            </button>
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

export default BoughtOrders
