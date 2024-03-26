import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const loadTodosFromLocalStorage = () => {
  const storedTodos = localStorage.getItem('todos');
  return storedTodos ? JSON.parse(storedTodos) : [];
};

const todoSlice = createSlice({
  name: 'todos',
  initialState: loadTodosFromLocalStorage(),
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
        const newState = [...state, action.payload];
        localStorage.setItem('todos', JSON.stringify(newState));
        return newState;
      },
    },
    deleteTodo: (state, action) => {
      const newState = state.filter(todo => todo.id !== action.payload);
      localStorage.setItem('todos', JSON.stringify(newState));
      return newState;
    },
  },
});

export const { addTodo, deleteTodo } = todoSlice.actions;
export const todoReducer = todoSlice.reducer;
