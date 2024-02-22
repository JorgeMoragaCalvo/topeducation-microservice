import React, { useState, useEffect } from 'react';
import TuitionServiceInstance from '../services/TuitionService';
import NavBarComponent from './NavBarComponent';
import '../styles/tuitionlist.css';

function TuitionListComponent(){
    const[tuitionEntity, setTuitionEntity] = useState([]);

    useEffect(() => {
        TuitionServiceInstance.getTuition().then((res) => {
            console.log("Response data Tuition: ", res.data);
            setTuitionEntity(res.data);
        });
    }, []);

    return(
        <div className='general'>
            <NavBarComponent />
            <div align="center" className='container-2 tuition'>
                <h1 className='text-center mt-5' style={{ fontSize: '24px' }}><b>LISTA DE MATRICULAS</b></h1>
                <table border="1" className='table table-striped'>
                    <thead className='table-dark'>
                        <tr>
                            <th>Rut</th>
                            <th>Fecha</th>
                            <th>Forma de Pago</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tuitionEntity.map((tuition) => (
                                <tr key={tuition.rut}>
                                    <td>{tuition.rut}</td>
                                    <td>{tuition.registrationDate}</td>
                                    <td>{tuition.paymentType}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TuitionListComponent;
