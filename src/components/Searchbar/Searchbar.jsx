import PropTypes from 'prop-types';
import React from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import css from './Searchbar.module.css';

function Searchbar({ onSubmit }) {
  const [searchNames, setSearchNames] = useState('');

  const handleNameChange = evt =>
    setSearchNames(evt.currentTarget.value.toLowerCase());

  const handleSubmit = evt => {
    evt.preventDefault();

    if (searchNames.trim() === '') {
      toast.error('Введите название картинки.');
      return;
    }

    onSubmit(searchNames);
    setSearchNames('');
    evt.target.reset();
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button className={css.SearchFormButton} type="submit">
          <span className="button-label">Search</span>
        </button>

        <input
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchNames}
          onChange={handleNameChange}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;


