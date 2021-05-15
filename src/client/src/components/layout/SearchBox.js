import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { withRouter } from 'react-router';

const SearchBox = ({ history, type }) => {
    const [keyword, setKeyword] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            history.push(`/search/${type}/${keyword}`);
        } else {
            history.push('/');
        }
    }

    return (
        <Form onSubmit={submitHandler} inline>
            <Form.Control
                type="text"
                name="q"
                onChange={e => setKeyword(e.target.value)}
                placeholder={`Search by ${type}...`}
                className="mr-sm-2 ml-sm-5"
            />
            <button type={'submit'} className={'btn btn-large waves-effect waves-light hoverable blue accent-3'}>
                Search
            </button>
        </Form>
    )
}

export default withRouter(SearchBox);
