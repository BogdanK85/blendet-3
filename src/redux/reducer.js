import { ADD_TODO, DELETE_TODO } from './actionTypes';

const todoInitialState = { items: [] };

export const todoReducer = (state = todoInitialState, { type, payload }) => {
  switch (type) {
    case ADD_TODO:
      return { items: [...state.items, payload] };
    case DELETE_TODO:
      return { items: state.items.filter(todo => todo.id !== payload) };
    default:
      return state;
  }
};
