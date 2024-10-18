

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      url: "https://playground.4geeks.com/contact/agendas/",
      contacts: [],
    },
    actions: {
      createUserAgenda: async (nombre) => {
        try {
          const res = await fetch(getStore().url + nombre, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (!res.ok) {
            throw new Error("Error al crear la agenda.");
          }
          const data = await res.json();
          console.log(data);
        } catch (error) {
          console.log("Error:", error);
        }
      },

      getContacts: async () => {
        try {
          const res = await fetch(getStore().url + "FabianR/contacts");
          if (!res.ok) {
            throw new Error("Error al obtener los contactos.");
          }
          const data = await res.json();
          console.log (data)
          setStore({ contacts: data.contacts });
        } catch (error) {
          console.log("Error al obtener contactos:", error);
        }
      },

      addContact: async (newContact) => {
        console.log (newContact)
        if (!newContact.name || !newContact.email || !newContact.phone) {
          console.log("El contacto debe tener nombre completo, email y teléfono.");
          return;
        }

        try {
          const res = await fetch(getStore().url + "FabianR/contacts", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newContact),
          });

          if (!res.ok) {
            throw new Error("Error al añadir contacto.");
          }

          const data = await res.json(); 
         getActions().getContacts()
        } catch (error) {
          console.log("Error al añadir contacto:", error);
        }
      },

      editContact: async (newContact, id) => {
        if (!newContact.name || !newContact.email || !newContact.phone) {
          console.log("El contacto debe tener nombre completo, email y teléfono.");
          return;
        }

        try {
          const res = await fetch(getStore().url + "FabianR/contacts/" + id, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newContact),
          });

          if (!res.ok) {
            throw new Error("Error al editar contacto.");
          }

          const data = await res.json();
          const updatedContacts = getStore().contacts.map((contact) =>
            contact.id === id ? data : contact
          );
          setStore({ contacts: updatedContacts });
        } catch (error) {
          console.log("Error al editar contacto", error);
        }
      },

      deleteContact: async (id) => {
        try {
          const res = await fetch(getStore().url + "FabianR/contacts/" + id, {
            method: "DELETE",
          });

          if (!res.ok) {
            throw new Error("Error al eliminar contacto.");
          }

          const updatedContacts = getStore().contacts.filter(
            (contact) => contact.id !== id
          );
          setStore({ contacts: updatedContacts });
        } catch (error) {
          console.log("Error al eliminar contacto:", error);
        }
      },
    },
  };
};

export default getState;
