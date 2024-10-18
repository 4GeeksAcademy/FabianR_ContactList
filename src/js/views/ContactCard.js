import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const ContactCard = () => {
  const { store } = useContext(Context);
  const { id } = useParams(); 
  const [contact, setContact] = useState(null);

  useEffect(() => {
    const foundContact = store.contacts.find((contact) => contact.id === parseInt(id));

    if (foundContact) {
      setContact(foundContact);
    } else {
      console.log("Contacto no encontrado");
    }
  }, [store.contacts, id]);

  if (!contact) {
    return <p>Cargando contacto...</p>; 
  }

  return (
    <div className="jumbotron border w-50 mx-auto p-4">
      <h1 className="display-4 my-3 text-center">Datos del contacto</h1>
      <hr className="my-4" />
      <p>Nombre y apellidos: {contact.name}</p>
      <p>Teléfono: {contact.phone}</p>
      <p>Email: {contact.email}</p>
      <p>Dirección: {contact.address}</p>
      <hr className="my-4" />

      <Link to="/listcontacts">
        <span className="btn btn-dark w-100" role="button">
          Volver a la lista de contactos
        </span>
      </Link>
    </div>
  );
};
