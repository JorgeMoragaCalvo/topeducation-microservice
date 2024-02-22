import React, { useState, useEffect } from 'react';
import ReportServiceInstance from '../services/ReportService';
import NavBarComponent from './NavBarComponent';

function ReportListComponent(){
    const[reportEntity, setReportEntity] = useState([]);

    useEffect(() => {
        ReportServiceInstance.getAllReport().then((res) => {
            console.log("Response data Report: ", res.data);
            setReportEntity(res.data);
        });
    }, []);

    return(
        <div className='general'>
            <NavBarComponent />
            <div align="center" className='container-2'>
                <h1 className='text-center mt-5' style={{ fontSize: '24px' }}><b>LISTA DE REPORTES</b></h1>
                <table border="1" className='table table-striped'>
                    <thead className='table-dark'>
                        <tr>
                            <th>Rut</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Tipo de Pago</th>
                            <th>Cuotas</th>
                            <th>Descuento</th>
                            <th>Total</th>
                            <th>Test</th>
                            <th>Promedio</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            reportEntity.map((report) => (
                                <tr key={report.id}>
                                    <td>{report.rut}</td>
                                    <td>{report.name}</td>
                                    <td>{report.lastName}</td>
                                    <td>{report.paymentType}</td>
                                    <td>{report.dues}</td>
                                    <td>{report.discount}%</td>
                                    <td>${report.totalPay}</td>
                                    <td>{report.totalExams}</td>
                                    <td>{report.averageScore}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ReportListComponent;
