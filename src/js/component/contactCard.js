import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

const ContactCard = ({ contact }) => {
    const { actions } = useContext(Context);

    const handleDelete = () => {
        if (window.confirm("¿Estás seguro de eliminar este contacto?")) {
            actions.deleteContact(contact.id);
        }
    };

    return (
        <div className="card mb-3" style={{ maxWidth: "700px" }}>
            <div className="row g-0">
                <div className="col-md-4" style={{marginTop : "10px" }}>
                    <img
                        src="https://images.squarespace-cdn.com/content/v1/5d77a7f8ad30356d21445262/1695000300830-5TKAFHC2EBYTTM2QUWUP/fotos-de-perfil-blanco-y-negro.jpg"
                        alt="contact"
                        className="img-fluid "
                        style={{ width:"150px", height: "150px"}}
                    />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{contact.full_name}</h5>
                        <p className="card-text">
                            <i className="fas fa-map-marker-alt"></i> {contact.address}
                        </p>
                        <p className="card-text">
                            <i className="fas fa-phone"></i> {contact.phone}
                        </p>
                        <p className="card-text">
                            <i className="fas fa-envelope"></i> {contact.email}
                        </p>
                        <div className="d-flex justify-content-end">
                            <Link to={`/edit/${contact.id}`} className="btn btn-outline-warning me-2">
                                <i className="fas fa-pencil-alt"></i>
                            </Link>
                            <button onClick={handleDelete} className="btn btn-outline-danger">
                                <i className="fas fa-trash-alt"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactCard;
