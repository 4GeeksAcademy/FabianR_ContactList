import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import Contact from "../component/Contact";
import { AiOutlineEdit, AiFillAlert } from "react-icons/ai";
import { RiDeleteBin2Fill } from "react-icons/ri";

import "../../styles/demo.css";

export const ListContacts = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const handleEdit = (id) => {
    actions.filterContactEdit(id);
    navigate("/editformulario");
  };

  const handleDelete = (id) => {
    actions.deleteContact(id); 
  };

  return (
    <div className="container">
      <h1 className="text-center pb-3">Lista de contactos <hr /></h1>
      <ul className="list-group my-2 w-50 mx-auto">
        {store.contacts.length ? (
          store.contacts.map((item) => (
            <li key={item.id} className="list-group-item">
              <div className="align-items-center d-flex justify-content-around">
                <button
                  className="btn btn-secondary w-75"
                  onClick={() => navigate("/contactcard/" + item.id)}
                >
                  Ver info del contacto
                </button>
                <div className="w-25 d-flex justify-content-around">
                  

                  <RiDeleteBin2Fill
                    data-bs-toggle="modal"
                    data-bs-target={`#modal-${item.id}`} 
                  />
                </div>
              </div>

              <Contact item={item} />

              <div
                className="modal fade"
                id={`modal-${item.id}`}
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="exampleModalLabel">
                        Confirmar eliminación del contacto
                      </h1>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      Estás seguro que quieres eliminar el contacto?
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        No, volver
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary"
                        data-bs-dismiss="modal"
                        onClick={() => handleDelete(item.id)}
                      >
                        Sí, eliminar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))
        ) : (
          <div className="mx-auto d-flex justify-content-around m-5 border border-danger rounded py-3">
            <h1><AiFillAlert /> No tienes contactos...</h1>
          </div>
        )}
      </ul>
      <br />
      <div className="d-flex justify-content-center gap-3">
        <button
          onClick={() => navigate("/FormularioContact")}
          className="btn btn-success w-50"
        >
          Añadir nuevo contacto
        </button>
      </div>
    </div>
  );
};
