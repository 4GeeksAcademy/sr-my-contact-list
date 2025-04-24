import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

export const EditContact = () => {
    const { store, actions } = useContext(Context);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (store.editingContact) {
            setFormData(store.editingContact);
        }
    }, [store.editingContact]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await actions.actualizarContacto(formData, store.editingContact.id);
        if (success) {
            navigate('/');
        } else {
            alert("Ocurrió un error al actualizar el contacto.");
        }
    };

    return (
        <div className="container">
            <h1 className="text-center">
                <i className="fa-solid fa-face-smile mx-2"></i>Crear Nuevo Contacto
            </h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nombre y Apellido</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
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
                        value={formData.address}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary col-12">Guardar</button>
            </form>
            <Link
                to="/"
                className="back-contacts-link"
            >
                Volver A Mis Contactos
            </Link>
        </div>
    );
};