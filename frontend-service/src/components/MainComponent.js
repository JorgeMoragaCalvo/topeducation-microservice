import React from 'react';
import NavBarComponent from './NavBarComponent';
import '../styles/main.css';
import logo from '../images/image2.jpg';
import '../styles/background.css';


function MainComponent(){
    return (
        <div className='general background-image'>
            <NavBarComponent />
            <div className='main-content'>
                <div className='welcome-section'>
                    <div className='welcome-text'>
                        <h1 className='mt-5'>BIENVENIDO/A A</h1>
                        <h1>TOP EDUCATION</h1>
                    </div>
                    <div className='logo-container'>
                        <img src={logo} alt='Logo Top Education' className='logo-img' />
                        <div className='image-text'>
                            <h2>PREPARA LA PAES 2024 CON EL SELLO</h2>
                            <h2>TOP EDUCATION</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainComponent;
