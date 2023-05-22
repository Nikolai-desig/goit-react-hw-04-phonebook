import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './Form.module.css';
import { nanoid } from 'nanoid';

function Phonebook({ onSubmit }) {
  const [name, setName] = useState(() => {
    return JSON.parse(localStorage.getItem('name')) ?? '';
  });

  const [number, setNumber] = useState(() => {
    return JSON.parse(localStorage.getItem('number')) ?? '';
  });

  const handleChange = e => {
    const { name, value } = e.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const handleSumbit = e => {
    const id = nanoid();
    e.preventDefault();
    onSubmit({ name: name, number: number, id: id });
    reset();
  };



  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <form className={css.form} onSubmit={handleSumbit}>
      <label className={css.label}>
        Name
        <input
          className={css.submit}
          type="text"
          value={name}
          onChange={handleChange}
          placeholder="Enter Name"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>

      <label className={css.label}>
        Number
        <input
          className={css.submit}
          type="tel"
          value={number}
          onChange={handleChange}
          placeholder="Enter Number"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button
        className={css.button}
        type="submit"
        disabled={!name || !number}
      >
        Add contact
      </button>
    </form>
  );
}

Phonebook.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Phonebook;
