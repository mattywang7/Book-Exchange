import { useEffect } from "react"
import { Col, Row, Table } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { myOrdersAction } from "../../actions/orderActions"
import Message from '../layout/Message'

const MyOrders = ({history}) => {
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

    return (
        <Row className='justify-content-md-center'>
            <Col md={12}>
                <h2>My Orders</h2>
                {!orders ? (
                    <>
                    </>
                ) : error ? (
                    <Message variant='danger'>{error}</Message>
                ) : (
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>buyerId</th>
                                <th>sellerId</th>
                                <th>bookId</th>
                                <th>exchanged</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.buyerId}</td>
                                    <td>{order.sellerId}</td>
                                    <td>{order.bookId}</td>
                                    <td>{order.exchanged}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Col>
        </Row>
    )
}

export default MyOrders