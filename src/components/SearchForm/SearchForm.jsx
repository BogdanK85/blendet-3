import React, { useState } from 'react';

// import { FiSearch } from 'react-icons/fi';
import { FaPlus } from 'react-icons/fa';
import { FormBtn, InputSearch, SearchFormStyled } from './SearchForm.styled';
import { addTodo } from 'redux/todoSlice';
import { useDispatch } from 'react-redux';

export const SearchForm = ({ onSubmit }) => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  const handleInput = e => {
    setQuery(e.currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    dispatch(addTodo(query));

    setQuery('');
  };

  return (
    <SearchFormStyled onSubmit={handleSubmit}>
      <FormBtn type="submit">
        {/* <FiSearch size="16px" /> */}
        <FaPlus size="16px" />
      </FormBtn>
      <InputSearch
        onChange={handleInput}
        placeholder="What do you want to add some note?"
        name="search"
        required
        value={query}
        autoFocus
      />
    </SearchFormStyled>
  );
};
