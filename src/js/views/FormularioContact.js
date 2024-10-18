import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import BotonInfo from "../component/BotonInfo";

const FormularioContact = () => {
  const { actions } = useContext(Context);
  const [error, setError] = useState(false);
  const [confirmacionEnvio, setConfirmacionEnvio] = useState(false);
  const [newContact, setNewContact] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const navigate = useNavigate(); 

  
  const handleChange = (e) => {
    setNewContact({ ...newContact, [e.target.name]: e.target.value });
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();

    
    if (
      [newContact.name, newContact.email, newContact.phone, newContact.address].includes("")
    ) {
      setError(true);
      return;
    } else {
      setError(false);
      console.log(newContact);
      actions.addContact(newContact); 
      setConfirmacionEnvio(true);

      
      setTimeout(() => {
        setNewContact({ name: "", email: "", phone: "", address: "" });
        setConfirmacionEnvio(false);
        navigate("/listcontacts"); 
      }, 1000);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="w-50 mx-auto">
        <h1 className="text-center pb-3">Agregar nuevo contacto <hr /></h1>

        {error && <BotonInfo clase="btn-danger" texto="Todos los campos son obligatorios" />}
        {confirmacionEnvio && <BotonInfo clase="btn-success" texto="Agregado correctamente" />}

        <div className="mb-3">
          <label htmlFor="fullname" className="form-label">Nombre y apellidos</label>
          <input
            type="text"
            className="form-control"
            id="fullname"
            name="name"
            value={newContact.name}
            onChange={handleChange}
            placeholder="Nombre y apellidos"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={newContact.email}
            onChange={handleChange}
            placeholder="Email"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Teléfono</label>
          <input
            type="tel"
            className="form-control"
            id="phone"
            name="phone"
            value={newContact.phone}
            onChange={handleChange}
            placeholder="Teléfono"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Dirección</label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            value={newContact.address}
            onChange={handleChange}
            placeholder="Dirección"
          />
        </div>
        <button type="submit" className="btn btn-dark w-100">Agregar contacto</button>

        <Link to="/listcontacts" className="btn btn-info w-100 my-3">
          Volver a la lista de contactos
        </Link>
      </form>
    </div>
  );
};

export default FormularioContact;
