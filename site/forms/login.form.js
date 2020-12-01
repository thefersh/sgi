import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import { useForm } from "react-hook-form";
import axios from 'axios';
import cookie from 'js-cookie';

export function FormLogin(){
    const { register, handleSubmit, watch, errors } = useForm();
    let [submit, setStatus] = React.useState(false);

    const onSubmit = data => {
        setStatus(true);
        axios.post('/api/v1/auth/login', data).then(r => {
            if(r.status === 200) {
                cookie.set('authorization', r.data.data);
                localStorage.setItem('authorization', r.data.data);
                window.location.href = "/";
            }
            setStatus(false);
        }).catch(s => {
            alert('Datos invalidos');
            setStatus(false);
        });
    };

    return (
    <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="formBasicEmail">
            <Form.Label>Correo Electronico</Form.Label>
            <Form.Control type="email" placeholder="mi@email.com" name="flogine" ref={register({ required: true })} />
            {errors.floginp && <Form.Control.Feedback type="invalid" className="d-block">Este Campo es Requerido</Form.Control.Feedback>}
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type="password" placeholder="contraseña" name="floginp" ref={register({ required: true, minLength: 4 })}/>
            {errors.floginp && <Form.Control.Feedback type="invalid" className="d-block">Este Campo es Requerido</Form.Control.Feedback>}
        </Form.Group>
        <Button variant="primary" type="submit" className={submit ? 'disabled': ''}>Iniciar Sesion { submit ? <Spinner animation="border" role="status" size="sm"><span className="sr-only">Loading...</span></Spinner> : '' }</Button>
    </Form>
    );
}