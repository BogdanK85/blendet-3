import { combineReducers } from 'redux';
import { filterReducer } from './filterSlice';
import { todoReducer } from './todoSlice';
import { configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  todos: todoReducer,
  filter: filterReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
