import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const todoSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: {
      prepare: text => {
        return {
          payload: {
            text,
            id: nanoid(),
          },
        };
      },
      reducer: (state, action) => {
        return [...state, action.payload];
      },
    },
    deleteTodo: (state, action) => {
      return state.filter(todo => todo.id !== action.payload);
    },
  },
});

export const { addTodo, deleteTodo } = todoSlice.actions;
export const todoReducer = todoSlice.reducer;
