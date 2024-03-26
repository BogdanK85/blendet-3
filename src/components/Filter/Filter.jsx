import { FiSearch } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { addFilter } from 'redux/filterSlice';
import { FilterBtn, FormFilter, Input } from './Filter.styled';

export const Filter = () => {
  const dispatch = useDispatch();

  return (
    <FormFilter>
      <Input
        onChange={e => {
          dispatch(addFilter(e.target.value));
        }}
        type="text"
        placeholder="Search some note"
      />
      <FilterBtn type="button">
        <FiSearch size="16px" />
        {/* <FaPlus size="16px" /> */}
      </FilterBtn>
    </FormFilter>
  );
};
