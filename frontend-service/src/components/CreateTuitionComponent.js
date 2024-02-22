import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
//import HeaderComponent from "./headers/HeaderComponent";
import { Form, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import TuitionServiceInstance from '../services/TuitionService';
import NavBarComponent from './NavBarComponent';

import "../styles/add.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/background.css';


function CreateTuitionComponent(props){
    const initialState = {
        rut: "",
        registrationDate: "",
        paymentType: "",
    };

    const[input, setInput] = useState(initialState);
    const navigate = useNavigate();
    const navigateHome = () => {
        navigate('/tuition-list');
    };

    const changeRutHandler = event => {
        setInput({ ...input, rut: event.target.value});
    };

    const changeRegistrationDateHandler = event => {
        setInput({ ...input, registrationDate: event.target.value});
    };

    const changePaymentTypeHandler = event => {
        setInput({ ...input, paymentType: event.target.value});
    };

    const enterTuition = (event) => {
        Swal.fire({
            title: "¿Desea registrar una matricula?",
            text: "Asegurese de ingresar los datos correctamente",
            icon: "question",
            showDenyButton: true,
            confirmButtonText: "Confirmar",
            confirmButtonColor: "rgb(68, 194, 68)",
            denyButtonText: "Cancelar",
            denyButtonColor: "rgb(190, 54, 54)",
        }).then((result) => {
            if(result.isConfirmed){
                console.log(input.title);
                let newTuition = {
                    rut: input.rut,
                    registrationDate: input.registrationDate,
                    paymentType: input.paymentType,
                };
                console.log(newTuition);
                TuitionServiceInstance.createTuition(newTuition);
                Swal.fire({
                    title: "Enviado",
                    timer: 2000,
                    icon: "success",
                    timerProgressBar: true,
                    didOpen: () => {
                        Swal.showLoading()
                    },
                })
                navigateHome();
            }
        });
    };

    return(
        <div className='general background-image'>
            <NavBarComponent />
            <div className='container-create'>
                <h1 className='text-center mt-4' style={{ fontSize: '24px' }}>CREAR MATRICULA</h1>
                <Form className='mt-4'>
                    <Form.Group className='mb-3' controlId='rut' value = {input.rut} onChange={changeRutHandler}>
                        <Form.Label className='add'>RUT</Form.Label>
                        <Form.Control className='add custom-input' type='text' name='rut' placeholder='11111111-1'></Form.Control>
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='registrationDate' value = {input.registrationDate} onChange={changeRegistrationDateHandler}>
                        <Form.Label className='add'>FECHA MATRICULA</Form.Label>
                        <Form.Control className='add custom-input' type='text' name='registrationDate' placeholder='dd-mm-aaaa'></Form.Control>
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='paymentType'>
                        <label className='add form-label'>TIPO DE PAGO</label>
                        { /*<Form.Label className='add'>Tipo Pago:</Form.Label>*/ }
                        <div className='select-wraper'>
                            <select className='add' name='paymenType' required value={input.paymentType} onChange={changePaymentTypeHandler}>
                                <option value="" disabled selected hidden>Selecciona un tipo</option>
                                <option value="Contado">Contado</option>
                                <option value="Cuotas">Cuotas</option>
                            </select>
                        </div>
                    </Form.Group>
                    <Button className='boton' onClick={enterTuition}>Registrar Matrícula</Button>
                </Form>
            </div>
        </div>
    );
}

export default CreateTuitionComponent;