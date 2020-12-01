import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import InputGroup from 'react-bootstrap/InputGroup';
import { useForm } from "react-hook-form";
import axios from 'axios';
import cookie from 'js-cookie';

axios.defaults.headers.common['authorization'] = localStorage.getItem('authorization') || cookie.get('authorization');

export function FormAdminAddProduct(){
    const { register, handleSubmit, errors } = useForm();
    let [submit, setStatus] = React.useState(false);

    const onSubmit = data => {
        setStatus(true);
        axios.post('/api/v1/product/add/base', data).then(r => {
            if(!r.data.err) {
                window.location.href = r.data.redirect;
                setStatus(false);
            }else {
                alert(r.data.err)
                setStatus(false);
            }
        }).catch(() => {
            alert('Rellene los datos.');
            setStatus(false);
        });
    };

    return (
    <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group>
            <Form.Label>Nombre:</Form.Label>
            <Form.Control type="text" placeholder="Mi Producto" name="fapName" ref={register({ required: true, minLength: 5 })} ></Form.Control>
            {errors.fapName?.type === 'required' ? <Form.Control.Feedback type="invalid" className="d-block">Este Campo es Requerido</Form.Control.Feedback> : ''}
            {errors.fapName?.type === 'minLength' ? <Form.Control.Feedback type="invalid" className="d-block">Minimo 5 caracteres</Form.Control.Feedback> : ''}
        </Form.Group>
        <Form.Group>
            <Form.Label>Precio:</Form.Label>
            <InputGroup className="mb-2">
                <Form.Control type="number" placeholder="0" name="fapPrice" step="any" ref={register({ required: true, minLength: 5 })} ></Form.Control>
                <InputGroup.Prepend><InputGroup.Text>Bs.</InputGroup.Text></InputGroup.Prepend>
            </InputGroup>
            {errors.fapPrice?.type === 'required' ? <Form.Control.Feedback type="invalid" className="d-block">Este Campo es Requerido</Form.Control.Feedback> : ''}
        </Form.Group>
        <Form.Group>
            <Form.Label>Descripsion:</Form.Label>
            <Form.Control as="textarea" name="fapDescription" ref={register({ required: true, minLength: 5, maxLength: 250 })} ></Form.Control>
            {errors.fapDescription?.type === 'required' ? <Form.Control.Feedback type="invalid" className="d-block">Este Campo es Requerido</Form.Control.Feedback> : ''}
            {errors.fapDescription?.type === 'minLength' ? <Form.Control.Feedback type="invalid" className="d-block">Minimo 5 caracteres</Form.Control.Feedback> : ''}
            {errors.fapDescription?.type === 'maxLength' ? <Form.Control.Feedback type="invalid" className="d-block">Maximo 250 caracteres</Form.Control.Feedback> : ''}
        </Form.Group>
        <Button variant="primary" type="submit" className={submit ? 'disabled': ''}>Registrar Producto{ submit ? <Spinner animation="border" role="status" size="sm"><span className="sr-only">Loading...</span></Spinner> : '' }</Button>
    </Form>
    );
}