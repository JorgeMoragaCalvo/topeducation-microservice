import React, { useState } from 'react';
import ReportServiceInstance from '../services/ReportService';
import NavBarComponent from './NavBarComponent';
import { Button } from 'react-bootstrap';
import '../styles/background.css';

function RutCapture() {
    const [rut, setRut] = useState('');
    const [reportEntity, setReportEntity] = useState(null);

    const handleRutChange = (event) => {
        const { value } = event.target;
        setRut(value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        // Llamar al servicio ReportServiceInstance para obtener el informe
        ReportServiceInstance.getReport(rut).then((res) => {
            console.log("Response data Report: ", res.data);
            setReportEntity(res.data);
        });
    }

    return (
        <div className='background-image'>
            <NavBarComponent />
            <h1 className='mt-4' style={{ fontSize: '24px' }}>INGRESE SU RUT PARA CREAR REPORTE</h1>
            <form onSubmit={handleSubmit}>
                <label style={{ fontSize: '12px' }}>
                    RUT
                    <input
                        className='custom-input'
                        type="text"
                        value={rut}
                        placeholder='11111111-1'
                        onChange={handleRutChange}
                    />
                </label>
                <Button className='boton mt-3' type="submit">CREAR REPORTE</Button>
            </form>
            {/* {rutCaptured && <p>RUT: {rut}</p>} */ }
            {reportEntity && (
                <div align="center" className='container-2'>
                    <h1 className='text-center'><b>Informe</b></h1>
                    <p>RUT: {reportEntity.rut}</p>
                    <p>Nombre: {reportEntity.name}</p>
                    <p>Apellido: {reportEntity.lastName}</p>
                    <p>Tipo de pago: {reportEntity.paymentType}</p>
                    <p>No. Cuotas: {reportEntity.dues}</p>
                    <p>Descuento: {reportEntity.discount}%</p>
                    <p>Total a pagar: ${reportEntity.totalPay}</p>
                    <p>Ensayos rendidos: {reportEntity.totalExams}</p>
                    <p>Promedio ensayos: {reportEntity.averageScore}</p>
                </div>
            )}
        </div>
    );
}

export default RutCapture;
