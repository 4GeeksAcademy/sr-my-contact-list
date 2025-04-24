import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

import "../../styles/demo.css";

export const Demo = () => {
    const { actions } = useContext(Context);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        actions.agregarContacto(formData);
        setFormData({
            name: '',
            email: '',
            phone: '',
            address: ''
        });
    };

    return (
        <div className="container">
            <div className="d-flex justify-content-center">
			<h1 className="text-center">
                <i className="fa-solid fa-face-smile mx-2"></i>Crear Nuevo Contacto
            </h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nombre y Apellido</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="name" 
                        name="name" 
                        placeholder="Full Name" 
                        value={formData.name} 
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="email" 
                        name="email" 
                        placeholder="Enter email" 
                        value={formData.email} 
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Teléfono</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="phone" 
                        name="phone" 
                        placeholder="Enter phone" 
                        value={formData.phone} 
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Dirección</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="address" 
                        name="address" 
                        placeholder="Enter address" 
                        value={formData.address} 
                        onChange={handleInputChange}
                    />
                </div>
                <button className="btn btn-primary col-12">Guardar</button>
            </form>
            <br />
            <Link to="/" 
                        className="back-contacts-link"
                    >
                        Volver A Mis Contactos
            </Link>
        </div>
    );
};