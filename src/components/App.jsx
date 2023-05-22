import React, { useEffect, useState } from 'react';
// import { nanoid } from 'nanoid';
import Form from './form/Form';
import ContactsList from './form/ContactList';
import css from './App.module.css';
import Filter from './form/Filter';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [contacts, setContacts] = useState(
    () =>
      JSON.parse(localStorage.getItem('contacts')) ?? [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ]
  );
  const [filter, setFilter] = useState('')
  
  useEffect(() => {
    localStorage.setItem('Contacts', JSON.stringify(contacts));
  }, [contacts]);


  const formSubmithandler = data => {
   if (
     !contacts.find(
       contact => data.name.toLocaleLowerCase() === contact.name.toLowerCase()
     )
   ) {
     setContacts(prevState => (prevState ? [...prevState, data] : [data]));
   } else {
     toast(`${data.name} is already in contacts.`);
   }
  };

  const deleteContact = contactId => {
    setContacts(prevState => prevState.filter(contact => contact.id !== contactId))
  } 


  const filterContact = e => {
    setFilter( e.currentTarget.value );
  };

 
    const normalizeFilter = filter.toLowerCase();
    const visibleFilter = contacts.filter(contacts =>
      contacts.name.toLowerCase().includes(normalizeFilter)
    );


    return (
      <div className={css.style}>
        <h1>Phonebook</h1>
        <Form onSubmit={formSubmithandler} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={filterContact} />
        <ContactsList
          contactList={visibleFilter}
          ondeleteContact={deleteContact}
        />
        <ToastContainer />
      </div>
    );

}

export default App;
