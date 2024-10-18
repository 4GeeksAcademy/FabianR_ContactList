import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";

const EditContact = ({ contactId }) => {
  const { store, actions } = useContext(Context);
  const [contact, setContact] = useState({
    full_name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const contactToEdit = store.contacts.find((c) => c.id === contactId);
    if (contactToEdit) {
      setContact(contactToEdit);
    }
  }, [store.contacts, contactId]);

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Intentando editar contacto:", contact);
    actions.editContact(contact, contactId); 
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="full_name">Nombre y Apellidos</label>
        <input
          type="text"
          className="form-control"
          id="full_name"
          name="full_name"
          value={contact.full_name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          value={contact.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="phone">Teléfono</label>
        <input
          type="text"
          className="form-control"
          id="phone"
          name="phone"
          value={contact.phone}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary mt-3">
        Guardar cambios
      </button>
    </form>
  );
};

export default EditContact;
