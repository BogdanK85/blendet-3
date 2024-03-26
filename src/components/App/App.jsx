import {
  Container,
  Header,
  SearchForm,
  Section,
  Text,
  TodoList,
  Filter,
} from 'components';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTodos } from 'redux/selectors';
import { addTodo } from 'redux/todoSlice';

export const App = () => {
  const todos = useSelector(selectTodos);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      dispatch(addTodo(JSON.parse(storedTodos))); // Припускається, що у вас є дія setTodos для оновлення стору Redux
    }
  }, [dispatch]);
  return (
    <>
      <Header />
      <Section>
        <Container>
          <SearchForm />

          {todos.length === 0 ? (
            <Text textAlign="center">There are no any notes ... </Text>
          ) : (
            <>
              <Filter />
              <TodoList />
            </>
          )}
        </Container>
      </Section>
    </>
  );
};
