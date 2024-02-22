import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
//import HeaderComponent from "./headers/HeaderComponent";
import { Form, Button } from 'react-bootstrap';
import NavBarComponent from './NavBarComponent';
//import Form from 'react-bootstrap/Form';
//import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';
import StudentServiceInstance from '../services/StudentService';
import "../styles/add.css";
import '../styles/background.css'

import 'bootstrap/dist/css/bootstrap.min.css'

function AddStudentComponent(props) {

    const initialState = {
        rut: "",
        name: "",
        lastName: "",
        birthDate: "",
        schoolType: "",
        schoolName: "",
        graduationYear: "",
    };

    const [input, setInput] = useState(initialState);
    const navigate = useNavigate();
    const navigateHome = () => {
        //navigate("/");
        navigate('/student-list');
    };

    const changeRutHandler = event => {
        setInput({ ...input, rut: event.target.value});
    };

    const changeNameHandler = event => {
        setInput({ ...input, name: event.target.value});
    };

    const changeLastNameHandler = event => {
        setInput({ ...input, lastName: event.target.value});
    };

    const changeBirthDateHandler = event => {
        setInput({ ...input, birthDate: event.target.value});
    };

    const changeSchoolTypeHandler = event => {
        setInput({ ...input, schoolType: event.target.value});
    };

    const changeSchoolNameHandler = event => {
        setInput({ ...input, schoolName: event.target.value});
    };
    
    const changeGraduationYearHandler = event => {
        setInput({ ...input, graduationYear: event.target.value});
    };

    const enterStudent = (event) => {
        Swal.fire({
            title: "¿Desea registrar el estudiante?",
            text: "En caso de error, no puede modificar datos",
            icon: "question",
            showDenyButton: true,
            confirmButtonText: "Confirmar",
            confirmButtonColor: "rgb(68, 194, 68)",
            denyButtonText: "Cancelar",
            denyButtonColor: "rgb(190, 54, 54)",
        }).then((result) => {
            if(result.isConfirmed){
                console.log(input.title);
                let newStudent = {
                    rut: input.rut,
                    name: input.name,
                    lastName: input.lastName,
                    birthDate: input.birthDate,
                    schoolType: input.schoolType,
                    schoolName: input.schoolName,
                    graduationYear: input.graduationYear,
                };
                console.log(newStudent);
                StudentServiceInstance.createStudent(newStudent);
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
            { /* <HeaderComponent /> */ }
            <NavBarComponent />
            <div className='container-create'>
                <h1 className='text-center mt-5 form-title'>COMPLETA EL FORMULARIO</h1>
                <Form className='mt-4'>
                    <Form.Group className='mb-3' controlId='rut' value = {input.rut} onChange={changeRutHandler}>
                        <Form.Label className='add form-label'>RUT</Form.Label>
                        <Form.Control className='add custom-input' type='text' name='rut' placeholder='11111111-1'></Form.Control>
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='name' value = {input.name} onChange={changeNameHandler}>
                        <Form.Label className='add form-label'>NOMBRE</Form.Label>
                        <Form.Control className='add custom-input' type='text' name='name'></Form.Control>
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='lastName' value = {input.lastName} onChange={changeLastNameHandler}>
                        <Form.Label className='add form-label'>APELLIDO</Form.Label>
                        <Form.Control className='add custom-input' type='text' name='lastName'></Form.Control>
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='birthDate' value = {input.birthDate} onChange={changeBirthDateHandler}>
                        <Form.Label className='add form-label'>FECHA NACIMIENTO</Form.Label>
                        <Form.Control className='add custom-input' type='text' name='birthDate' placeholder='dd-mm-aaaa'></Form.Control>
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='schoolType'>
                        <label className='add form-label'>TIPO DE COLEGIO</label>
                        <div className='select-wrapper'>
                            <select className='add' name='schoolType' required value={input.schoolType} onChange={changeSchoolTypeHandler}>
                                <option value="" disabled selected hidden>Selecciona un tipo</option>
                                <option value="Municipal">Municipal</option>
                                <option value="Subvencionado">Subvencionado</option>
                                <option value="Privado">Privado</option>
                            </select>
                        </div>
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='schoolName' value = {input.schoolName} onChange={changeSchoolNameHandler}>
                        <Form.Label className='add form-label'>NOMBRE COLEGIO</Form.Label>
                        <Form.Control className='add custom-input' type='text' name='schoolName'></Form.Control>
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='graduationYear' value = {input.graduationYear} onChange={changeGraduationYearHandler}>
                        <Form.Label className='add form-label'>AñO EGRESO</Form.Label>
                        <Form.Control className='add custom-input' type='text' name='graduationYear'></Form.Control>
                    </Form.Group>
                    <Button className='boton' onClick={enterStudent}>ENVIAR FORMULARIO</Button>
                </Form>
            </div>
        </div>
    )
}

export default AddStudentComponent;