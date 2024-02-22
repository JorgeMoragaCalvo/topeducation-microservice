import React, { useState, useEffect } from 'react';
import StudentServiceInstance from '../services/StudentService';
import HeaderComponent from './headers/HeaderComponent';
import NavBarComponent from './NavBarComponent';

function StudentListComponent(){
    const[studentEntity, setStudentEntity] = useState([]);

    useEffect(() => {
        StudentServiceInstance.getStudents().then((res) => {
            console.log("Response data Student: ", res.data);
            setStudentEntity(res.data);
        });
    }, []);

    return(
        <div className='general'>
            <NavBarComponent />
            <HeaderComponent />
            <div align="center" className='container-2'>
                <h1 className='text-center mt-4' style={{ fontSize: '24px', fontFamily: 'monospace' }}>
                    <b>LISTADO DE ESTUDIANTES</b></h1>
                <table border="1" className='table table-striped'>
                    <thead className='table-dark'>
                        <tr>
                            <th>Rut</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Fecha Nacimiento</th>
                            <th>Tipo Colegio</th>
                            <th>Nombre Colegio</th>
                            <th>Anio Egreso</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            studentEntity.map((student) => (
                                <tr key={student.rut}>
                                    <td>{student.rut}</td>
                                    <td>{student.name}</td>
                                    <td>{student.lastName}</td>
                                    <td>{student.birthDate}</td>
                                    <td>{student.schoolType}</td>
                                    <td>{student.schoolName}</td>
                                    <td>{student.graduationYear}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default StudentListComponent;
