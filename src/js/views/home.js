import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import contactoImage from "../../img/contacto.png";

export const Home = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [contactToDelete, setContactToDelete] = useState(null);

    const handleDelete = (id) => {
        setContactToDelete(id);
        setShowModal(true);
    };

    const confirmDelete = () => {
        if (contactToDelete) {
            actions.eliminarContacto(contactToDelete);
            setShowModal(false);
        }
    };

    return (
        <div>
            <ul>
                {store.contacts.map((item, index) => {
                    return (
                        <li key={index} className="list-group-item d-flex justify-content-between">
                            <div className="d-flex align-items-center">
                                <p>
                                    <img src={contactoImage} 
                                        className="rounded-circle mr-3" 
                                        style={{width: '50px', height: '50px', objectFit: 'cover'}} />
                                </p>
                                <div>
                                    <p>{item.name}</p>
                                    <p><i className="fa-solid fa-location-dot mx-2"></i>{item.address}</p>
                                    <p><i className="fa-solid fa-phone mx-2"></i>{item.phone}</p>
                                    <p><i className="fa fa-envelope mx-2"></i>{item.email}</p>
                                </div>
                            </div>
                            <div>
                                <span 
                                    onClick={() => {
                                        actions.editarContacto(item);
                                        navigate('/edit-contact');
                                    }} 
                                    style={{cursor: 'pointer', marginRight: '10px'}}
                                >
                                    <i className="fa-solid fa-pencil"></i>
                                </span>
                                <span 
                                    onClick={() => handleDelete(item.id)} 
                                    style={{cursor: 'pointer'}}
                                >
                                    <i className="fa-solid fa-trash-can"></i>
                                </span>
                            </div>
                        </li>
                    );                
                })}
            </ul>

            {/* Modal de confirmación */}
            <div className={`modal ${showModal ? 'show' : ''}`} style={{display: showModal ? 'block' : 'none'}} tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Estas seguro?</h5>
                            <button type="button" className="close" onClick={() => setShowModal(false)} aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Al eliminar un contacto, perderas todos los datos asociados a el.</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={() => setShowModal(false)}>NO</button>
                            <button type="button" className="btn btn-secondary" onClick={confirmDelete}>SI</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ); 
}