import { useState } from 'react';
import FormAddTodo from './components/FormAddTodo';
import TodoListPage from './components/TodoListPage';
import { v4 as uuidv4 } from 'uuid';
import Loader from './components/Loader';
import SearchInput from './components/SearchInput';
import { useGetTodosQuery } from './features/api/apiSlice';

function App() {
  const { data: todos, isLoading } = useGetTodosQuery();
  // isSuccess,
  // isError,
  // error,

  const [searchInput, setSearchInput] = useState('');
  const [filter, setFilter] = useState('all');

  // const loadData = () => {
  //   isLoading;

  //   setTimeout(() => {
  //     !isLoading;
  //   }, 2000);
  // };

  let filteredTodo = todos;

  if (filter === 'completed') {
    filteredTodo = todos?.filter((item) => item.isCompleted);
  } else if (filter === 'uncompleted') {
    filteredTodo = todos?.filter((item) => !item.isCompleted);
  }

  filteredTodo = filteredTodo?.filter((item) =>
    item.title.toLowerCase().includes(searchInput?.toLowerCase()?.trim())
  );

  return (
    <div>
      <SearchInput
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        setFilter={setFilter}
      />
      <FormAddTodo />
      {isLoading ? (
        <Loader loading={true} />
      ) : (
        <>
          {filteredTodo?.length === 0 && (
            <p
              style={{
                textAlign: 'center',
                fontSize: '24px',
                fontWeight: '700',
                color: 'red',
              }}
            >
              Task not found
            </p>
          )}
          {filteredTodo?.map((todo) => (
            <TodoListPage key={uuidv4()} todo={todo} />
          ))}
        </>
      )}
      {/* <Button onClick={loadData}>Update Tasks</Button> */}
    </div>
  );
}

export default App;
