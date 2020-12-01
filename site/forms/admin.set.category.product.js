import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import { useForm } from "react-hook-form";
import axios from 'axios';
import cookie from 'js-cookie';

axios.defaults.headers.common['authorization'] = localStorage.getItem('authorization') || cookie.get('authorization');

export function FormAdminSetCategoryProduct(props){
    const { register, handleSubmit, errors } = useForm();
    let [submit, setStatus] = React.useState(false);
    let category = []
    
    axios.get('/api/v1/product/category').then(r => category = r.data);

    const onSubmit = data => { console.log(data) };

    return (
    <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group>
            <Form.Label>Example select</Form.Label>
            <Form.Control as="select" name="select" >
                <option value="1">1</option>
                <option value="2">2</option>
            </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit" className={submit ? 'disabled': ''}>Cambiar Categoria{ submit ? <Spinner animation="border" role="status" size="sm"><span className="sr-only">Loading...</span></Spinner> : '' }</Button>
    </Form>
    );
}