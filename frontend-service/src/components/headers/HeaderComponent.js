import React from 'react';
import { useNavigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css'

function HeaderComponent(){
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/");
    }
    return(
        <div>
            <header className='header'>
                <div className='logo'>
                    <h1 onClick={handleClick} style={{ fontSize: '24px' }} className='mt-4'>TOP EDUCATION</h1>
                </div>
                <nav></nav>
                <a className='btn' href='/add-student'><button className='btn btn-primary' style={{ fontSize: '14px' }}>
                    AGREGAR ESTUDIANTE</button></a>
            </header>
        </div>
    )
}

export default HeaderComponent;