import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import Form from './form/Form';
import ContactsList from './form/ContactList';
import css from './App.module.css';
import Filter from './form/Filter';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const localData = localStorage.getItem('contacts');

    if (localData) {
      this.setState({ contacts: JSON.parse(localData) });
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  formSubmithandler = data => {
    const contact = {
      ...data,
      id: nanoid(),
    };
    console.log(contact);
    if (
      this.state.contacts.some(
        item => item.name.toLowerCase() === contact.name.toLowerCase()
      )
    ) {
      toast(`${contact.name} is already in contacts`);
      return;
    }

    this.setState(prevState => ({
      contacts: [contact, ...prevState.contacts],
    }));
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  filterContact = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  render() {
    const normalizeFilter = this.state.filter.toLowerCase();
    const visibleFilter = this.state.contacts.filter(contacts =>
      contacts.name.toLowerCase().includes(normalizeFilter)
    );

    const { filter } = this.state;

    return (
      <div className={css.style}>
        <h1>Phonebook</h1>
        <Form onSubmit={this.formSubmithandler} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.filterContact} />
        <ContactsList
          contactList={visibleFilter}
          ondeleteContact={this.deleteContact}
        />
        <ToastContainer />
      </div>
    );
  }
}

export default App;
