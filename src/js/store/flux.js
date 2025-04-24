const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			
			contacts: [
				{
					name: "FIRST CONTACT",
					phone: "1"
				},
				{
					name: "SECOND CONTACT",
					phone: "2"
				}
			],

			editingContact: null
		},
		
		actions: {

			agregarContacto: (newContact) => {
                const store = getStore();
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newContact)
                };
                
                fetch('https://playground.4geeks.com/contact/agendas/saray_agenda_123/contacts', requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        setStore({ contacts: [...store.contacts, data] });
                    })
                    .catch(error => console.error('Error:', error));
				},

				actualizarContacto: async (contactoActualizado, id) => {
					const store = getStore();
					const requestOptions = {
						method: 'PUT',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify(contactoActualizado)
					};
				
					try {
						const response = await fetch(`https://playground.4geeks.com/contact/agendas/saray_agenda_123/contacts/${id}`, requestOptions);
						if (!response.ok) {
							console.error('Error al actualizar el contacto');
							return false;
						}
						const data = await response.json();
				
						const updatedContacts = store.contacts.map(contact =>
							contact.id === id ? { ...contact, ...data } : contact
						);
						setStore({ contacts: updatedContacts });
						return true;
					} catch (error) {
						console.error('Error en fetch:', error);
						return false;
					}
				},

				editarContacto: (contacto) => {
					setStore({ editingContact: contacto }); // Simplemente guarda el contacto a editar en el estado
				},
			
			eliminarContacto: (id) => {
				console.log('Se va a eliminar el contacto desde flux' + id)
				const requestOptions = {
					method: "DELETE",
					redirect: "follow"
				  };
				  
				  fetch("https://playground.4geeks.com/contact/agendas/saray_agenda_123/contacts/" + id, requestOptions)
					.then((response) => response.text())
					.then((result) => {
						console.log((result))
						fetch('https://playground.4geeks.com/contact/agendas/saray_agenda_123/contacts')
						.then( (response) => response.json() )
						.then( (data) => setStore({ contacts: data.contacts }) )
					})
					.catch(error => console.error('Error:', error));
			},

			
			loadSomeData: () => {
				
				fetch('https://playground.4geeks.com/contact/agendas/saray_agenda_123/contacts')
				.then( (response) => response.json() )
				.then( (data) => setStore({ contacts: data.contacts }) )
				}
			}
		}
	};

export default getState;