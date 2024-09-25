const getState = ({ getStore, getActions, setStore }) => {
    const apiUrl = "https://playground.4geeks.com/contact";  
    const agendaSlug = "yasin";  

    return {
        store: {
            contacts: [] 
        },
        actions: {
         
            fetchAPI: async (endpoint, options = {}) => {
                try {
                  
                    console.log("Realizando solicitud a la API:", `${apiUrl}${endpoint}`);

                    const response = await fetch(`${apiUrl}${endpoint}`, options);

                   
                    console.log("Estado de la respuesta:", response.status);

                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(`Error en la solicitud: ${errorData.message || response.statusText}`);
                    }
                    
                    const jsonData = await response.json();
                    
                   
                    console.log("Datos recibidos:", jsonData);

                    return jsonData;
                } catch (error) {
                    console.error("Error en la llamada al API:", error);
                    return null;
                }
            },

            
            loadContacts: async () => {
                try {
                    const data = await getActions().fetchAPI(`/agendas/${agendaSlug}/contacts`);
                    
                    
                    if (data && Array.isArray(data.contacts)) {
                        setStore({ contacts: data.contacts });
                        console.log("Contactos guardados en el store:", data.contacts);
                    } else {
                        console.error("Los datos recibidos no contienen un array de contactos:", data);
                    }
                } catch (error) {
                    console.error("Error al cargar los contactos:", error);
                }
            },

           
            addContact: async (contact) => {
                try {
                    console.log("Agregando contacto:", contact);

                    const response = await fetch(`${apiUrl}/agendas/${agendaSlug}/contacts`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(contact)
                    });

                   
                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(`Error en la solicitud: ${errorData.message || response.statusText}`);
                    }

                    const newContact = await response.json();

                    const store = getStore();
                    setStore({ contacts: [...store.contacts, newContact] });
                    console.log("Nuevo contacto agregado:", newContact);
                } catch (error) {
                    console.error("Error agregando el contacto:", error);
                }
            },

            
            updateContact: async (updatedContact) => {
                try {
                    console.log("Actualizando contacto:", updatedContact);

                    const response = await getActions().fetchAPI(`/agendas/${agendaSlug}/contacts/${updatedContact.id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(updatedContact)
                    });

                    if (response) {
                        const store = getStore();
                        const updatedContacts = store.contacts.map(contact =>
                            contact.id === updatedContact.id ? updatedContact : contact
                        );
                        setStore({ contacts: updatedContacts });
                        console.log("Contacto actualizado en el store:", updatedContacts);
                    }
                } catch (error) {
                    console.error("Error actualizando el contacto:", error);
                }
            },

           
            deleteContact: async (contactId) => {
                try {
                    console.log("Eliminando contacto con ID:", contactId);

                    const response = await getActions().fetchAPI(`/agendas/${agendaSlug}/contacts/${contactId}`, {
                        method: "DELETE"
                    });

                    if (response !== null) {
                        const store = getStore();
                        const filteredContacts = store.contacts.filter(contact => contact.id !== contactId);
                        setStore({ contacts: filteredContacts });
                        console.log("Contacto eliminado. Estado actualizado:", filteredContacts);
                    }
                } catch (error) {
                    console.error("Error eliminando el contacto:", error);
                }
            }
        }
    };
};

export default getState;
