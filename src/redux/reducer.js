import { combineReducers } from 'redux';
import { ADD_FILTER, ADD_TODO, DELETE_TODO } from './actionTypes';
const todoInitialState = [];

const todoReducer = (state = todoInitialState, { type, payload }) => {
  switch (type) {
    case ADD_TODO:
      return [...state, payload];
    case DELETE_TODO:
      return state.filter(todo => todo.id !== payload);
    default:
      return state;
  }
};

const filterInitialState = '';

const filterReducer = (state = filterInitialState, { type, payload }) => {
  switch (type) {
    case ADD_FILTER:
      return payload;

    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  todos: todoReducer,
  filter: filterReducer,
});
