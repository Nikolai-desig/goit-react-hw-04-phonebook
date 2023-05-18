import React from 'react';
import PropTypes from 'prop-types';
import css from './Contactlist.module.css'


const ContactsList = ({ contactList, ondeleteContact }) => {
  return (
    <ul className={css.list}>
      {contactList.map(({ id, name, number }) => (
        <li className={css.item} key={id}>
          <p className={css.names}>
            {name}
            <span className={css.number}>{number}</span>
          </p>
          <button
            onClick={() => ondeleteContact(id)}
            className={css.button}
            type="button"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      onDeleteContact: PropTypes.func.isRequired,
    })
  ),
};

export default ContactsList;
