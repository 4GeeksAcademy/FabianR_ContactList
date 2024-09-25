import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import ContactCard from "../component/contactCard";
import { useNavigate } from "react-router-dom";

export const Contact = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate(); 

    useEffect(() => {
        actions.loadContacts(); 
    }, []);

    return (
        <div className="container">
            <h1>Contactos</h1>
            <button className="btn btn-primary" onClick={() => navigate("/add")}>
                Agregar Contacto
            </button>
            <div className="row mt-3">
                {Array.isArray(store.contacts) && store.contacts.length > 0 ? (
                    store.contacts.map(contact => (
                        <ContactCard key={contact.id} contact={contact} />
                    ))
                ) : (
                    <p>No hay contactos disponibles</p>
                )}
            </div>
        </div>
    );
};
