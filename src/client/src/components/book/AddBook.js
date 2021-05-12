// import React, {useEffect, useState} from "react";
// import {useDispatch, useSelector} from "react-redux";
// import {BOOK_ADD_SUCCESS} from "../../actions/types";
// import {addBook} from "../../actions/bookAction";
// import {Link} from "react-router-dom";
// import FormContainer from "../layout/FormContainer";
// import Message from "../layout/Message";
// import {Button, Form} from "react-bootstrap";
//
// const AddBook = ({history}) => {
//     const [title, setTitle] = useState('')
//     const [author, setAuthor] = useState('')
//     const [category, setCategory] = useState('')
//     const [condition, setCondition] = useState(0)
//     const [price, setPrice] = useState(0)
//
//     const dispatch = useDispatch()
//     const {user} = useSelector(state => state.auth)
//     const {success, error} = useSelector(state => state.addBook)
//
//     if (!user) {
//         alert('THere is no user now!')
//     } else {
//         alert('There is indeed one user!')
//     }
//
//     useEffect(() => {
//         if (!user) {
//             history.push('/login')
//         }
//         if (success) {
//             dispatch({
//                 type: BOOK_ADD_SUCCESS
//             })
//             alert('add success!')  // TODO for dev display
//         }
//     }, [dispatch, user, success, history])
//
//     const submitHandler = e => {
//         e.preventDefault()
//         dispatch(addBook({user: user.id, title, author, category, condition, price}))
//     }
//
//     return (
//         <>
//             <Link to={'/'} className={'btn btn-dark my-3'}>
//                 Go Back
//             </Link>
//             <FormContainer>
//                 <h1>New Book</h1>
//                 {error && <Message variant={'danger'}>{error}</Message> }
//                 <Form onSubmit={submitHandler}>
//                     <Form.Group controlId={'title'}>
//                         <Form.Label>Title</Form.Label>
//                         <Form.Control type={'text'}
//                                       placeholder={'Enter title'}
//                                       value={title}
//                                       onChange={e => setTitle(e.target.value)}>
//                         </Form.Control>
//                     </Form.Group>
//                     <Form.Group controlId={'author'}>
//                         <Form.Label>Author</Form.Label>
//                         <Form.Control type={'text'}
//                                       placeholder={'Enter author'}
//                                       value={author}
//                                       onChange={e => setAuthor(e.target.value)}>
//                         </Form.Control>
//                     </Form.Group>
//                     <Form.Group controlId={'category'}>
//                         <Form.Label>Category</Form.Label>
//                         <Form.Control type={'text'}
//                                       placeholder={'Enter category'}
//                                       value={category}
//                                       onChange={e => setCategory(e.target.value)}>
//                         </Form.Control>
//                     </Form.Group>
//                     <Form.Group controlId={'condition'}>
//                         <Form.Label>Condition</Form.Label>
//                         <Form.Control type={'number'}
//                                       placeholder={'Enter Condition'}
//                                       value={condition}
//                                       onChange={e => setCondition(e.target.value)}>
//                         </Form.Control>
//                     </Form.Group>
//                     <Form.Group controlId={'price'}>
//                         <Form.Label>Price</Form.Label>
//                         <Form.Control type={'number'}
//                                       placeholder={'Enter Price'}
//                                       value={price}
//                                       onChange={e => setPrice(e.target.value)}>
//                         </Form.Control>
//                     </Form.Group>
//                     <Button type={'submit'} variant={'primary'}>
//                         Put Book On Store
//                     </Button>
//                 </Form>
//             </FormContainer>
//         </>
//     )
// }
//
// export default AddBook
