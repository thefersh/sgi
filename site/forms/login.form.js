import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import { useForm } from "react-hook-form";
import axios from 'axios';

export function FormLogin(){
    const { register, handleSubmit, watch, errors } = useForm();

    const onSubmit = data => {
        axios.post('/api/v1/auth/login', data).then(r => {
            if(r.status === 200) {
                console.log(r);
            }
        }).catch(s => alert('Hubo un problema, intenelo mas tarde'))
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
        <Button variant="primary" type="submit">Iniciar Sesion</Button>
    </Form>
    );
}