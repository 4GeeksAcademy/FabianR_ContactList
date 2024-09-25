import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate, useParams, Link } from "react-router-dom";

export const AddContact = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const { contactId } = useParams();
    const existingContact = store.contacts.find(contact => contact.id == contactId);

    const [contact, setContact] = useState(existingContact || {
        full_name: "",
        email: "",
        phone: "",
        address: ""
    });

    const handleChange = (e) => {
        setContact({
            ...contact,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!contact.full_name || !contact.email || !contact.phone || !contact.address) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(contact.email)) {
            alert("Por favor, ingresa un correo electrónico válido.");
            return;
        }

        if (!/^\d+$/.test(contact.phone)) {
            alert("El teléfono debe contener solo números.");
            return;
        }

        if (existingContact) {
            actions.updateContact(contact);
        } else {
            actions.addContact(contact);
        }
        navigate("/");
    };

    return (
        <div className="container">
            <h1 className="text-center mb-4">{existingContact ? "Actualizar Contacto" : "Agregar Contacto"}</h1>
            <form onSubmit={handleSubmit} className="row g-3">
                <div className="col-md-6">
                    <label htmlFor="full_name" className="form-label">Full Name</label>
                    <input type="text" name="full_name" className="form-control" placeholder="Nombre" value={contact.full_name} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input type="email" name="email" className="form-control" placeholder="Email" value={contact.email} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input type="tel" name="phone" className="form-control" placeholder="Teléfono" value={contact.phone} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input type="text" name="address" className="form-control" placeholder="Dirección" value={contact.address} onChange={handleChange} required />
                </div>
                <div className="col-12 text-center">
                    <button type="submit" className="btn btn-primary">{existingContact ? "Actualizar" : "Agregar"}</button>
                </div>
            </form>

            
            <div className="mt-3 text-center">
                <Link to="/" className="bbtn btn-link">Volver a Contactos</Link>
            </div>
        </div>
    );
};
