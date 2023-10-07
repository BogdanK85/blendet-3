import { useDispatch } from 'react-redux';
import { addFilter } from 'redux/actions';

export const Filter = () => {
  const dispatch = useDispatch();

  return (
    <input
      onChange={e => {
        dispatch(addFilter(e.target.value));
      }}
      type="text"
    />
  );
};
