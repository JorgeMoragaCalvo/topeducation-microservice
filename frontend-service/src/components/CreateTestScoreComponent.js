import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import TestScoreServiceInstance from '../services/TestScoreService';
import NavBarComponent from './NavBarComponent';

import "../styles/add.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/background.css';

function CreateTestScoreComponent(props){
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const navigateHome = () => {
        navigate('/tests');
    };

    const handleFileUpload = async () => {
        Swal.fire({
            title: "¿Desea cargar el archivo?",
            text: "Una vez cargado, no podrá modificarse",
            icon: 'question',
            showDenyButton: true,
            confirmButtonText: "Confirmar",
            confirmButtonColor: "rgb(68, 194, 68)",
            denyButtonText: "Cancelar",
            denyButtonColor: "rgb(190, 54, 54)",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await TestScoreServiceInstance.processExcelFile();
    
                    if (response.data === "Excel file processed successfully") {
                        setMessage("Excel file processed successfully");
                        Swal.fire({
                            title: message,
                            icon: 'success',
                        });
                        navigateHome();
                    } else {
                        setMessage("Error processing Excel file");
                        Swal.fire({
                            title: message,
                            icon: 'error',
                        });
                    }
                } catch (error) {
                    const errorMessage = "Error al cargar el archivo Excel: " + error.message;
                    setMessage(errorMessage);
                    Swal.fire({
                        title: errorMessage,
                        icon: 'error',
                    });
                }
                //navigateHome();
            }
        });
    };
    


    /*
    const uploadFile = (event) => {
        Swal.fire({
            title: "¿Desea cargar el archivo?",
            text: "Una vez cargado, no podra modificarse",
            icon: 'question',
            showDenyButton: true,
            confirmButtonText: "Confirmar",
            confirmButtonColor: "rgb(68, 194, 68)",
            denyButtonText: "Cancelar",
            denyButtonColor: "rgb(190, 54, 54)",
        }).then((result) => {
            if(result.isConfirmed){
                console.log(input.title);
                TestScoreServiceInstance.processExcelFile();
                Swal.fire({
                    title: 'Enviado',
                    timer: 2000,
                    icon: 'success',
                    timerProgressBar: true,
                    didOpen: () => {
                        Swal.showLoading()
                    },
                })
                navigateHome();
            }
        });
    };*/
    /*
    const handleFileUpload = () => {
        try {
            const response = TestScoreServiceInstance.processExcelFile();

            if(response === "Excel file processed successfully"){
                setMessage("Excel file processed successfully");
                Swal.fire({
                    title: message,
                    icon: 'success',
                });
                
            } else {
                setMessage("Error processing Excel file");
                Swal.fire({
                    title: message,
                    icon: 'error',
                });
            }
        } catch(error) {
            const errorMessage = "Error al cargar el archivo Excel: " + error.message;
            setMessage(errorMessage);
            setMessage("Error al cargar el archivo Excel: " + error.message);
        }
        navigateHome();
    };*/


    return(
        <div className='general background-image'>
            <NavBarComponent />
            <div className='container-create'>
                <h1 className='text-center mt-5' style={{ fontSize: '24px', fontWeight: 'bolder', fontFamily: 'Lucida Sans' }}>
                    CARGAR ARCHIVO EXCEL DE NOTAS</h1>
                <Button className='boton mt-4' onClick={handleFileUpload}>CARGAR ARCHIVO</Button>
            </div>
        </div>
    )
}

export default CreateTestScoreComponent;