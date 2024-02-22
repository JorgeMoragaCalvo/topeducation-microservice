import React, { useState, useEffect } from 'react';
import TestScoreServiceInstance from '../services/TestScoreService';
import NavBarComponent from './NavBarComponent';
import '../styles/testlist.css';

function TestsListComponent(){
    const[testsEntity, setTestsEntity] = useState([]);

    useEffect(() => {
        TestScoreServiceInstance.getTests().then((res) => {
            console.log("Response data Tuition: ", res.data);
            setTestsEntity(res.data);
        });
    }, []);

    return(
        <div className='general'>
            <NavBarComponent />
            <div align="center" className='container-2'>
                <h1 className='text-center mt-5' style={{ fontSize: '24px' }}><b>LISTA DE EXAMENES</b></h1>
                <table border="1" className='table table-striped custom-table'>
                    <thead className='table-dark'>
                        <tr>
                            <th>Rut</th>
                            <th>Pruebas</th>
                            <th>Puntaje Promedio</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            testsEntity.map((test) => (
                                <tr key={test.rut}>
                                    <td>{test.rut}</td>
                                    <td>{test.totalTests}</td>
                                    <td>{test.testAverage}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TestsListComponent;
