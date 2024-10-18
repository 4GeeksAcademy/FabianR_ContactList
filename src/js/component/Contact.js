import React from "react";
import { MdOutlineEmail } from "react-icons/md";
import { BsPersonCircle } from "react-icons/bs";
import { FaPhoneAlt, FaAddressCard } from "react-icons/fa";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

const Contact = ({ item, index, onEdit, onDelete }) => {
  const { name, phone, email, address } = item;

  const displayName = name || "Nombre no disponible";
  const displayPhone = phone || "Teléfono no disponible";
  const displayEmail = email || "Email no disponible";
  const displayAddress = address || "Dirección no disponible";

  return (
    <div>
      <ul className="list-group m-2">
        {/* Nombre */}
        <li className="list-group-item d-flex justify-content-between align-items-center">
          {displayName}
          <span className="badge bg-primary rounded-pill">
            <BsPersonCircle />
          </span>
        </li>

        {/* Teléfono */}
        <li className="list-group-item d-flex justify-content-between align-items-center">
          {displayPhone}
          <span className="badge bg-primary rounded-pill">
            <FaPhoneAlt />
          </span>
        </li>

        {/* Email */}
        <li className="list-group-item d-flex justify-content-between align-items-center">
          {displayEmail}
          <span className="badge bg-primary rounded-pill">
            <MdOutlineEmail />
          </span>
        </li>

        {/* Dirección */}
        <li className="list-group-item d-flex justify-content-between align-items-center">
          {displayAddress}
          <span className="badge bg-primary rounded-pill">
            <FaAddressCard />
          </span>
        </li>

        {/* Botones para Editar y Eliminar */}
        <li className="list-group-item d-flex justify-content-between align-items-center">
          <button 
            className="btn btn-outline-info m-1" 
            onClick={() => onEdit(index)}
          >
            <AiFillEdit /> Editar
          </button>
          <button 
            className="btn btn-outline-danger m-1" 
            onClick={() => onDelete(index)}
          >
            <AiFillDelete /> Eliminar
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Contact;
