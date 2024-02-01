import axios from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';
import {
  addTodo,
  allGetTodo,
  checkCompletedTodoApi,
  removeTodoApi,
} from '../api/api';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  addTodoRedux,
  checkCompletedTodoRedux,
  removeTodoRedux,
} from '../redux/todo/todoSlice';

axios.defaults.baseURL = 'http://localhost:5050/';

// Кастомный хук для запросов
export const useFetchTodos = () => {
  const dispatch = useDispatch();
  const [todoValue, setTodoValue] = useState('');

  const { data, isFetching, refetch, isLoading, isError } = useQuery({
    queryKey: ['todos'],
    queryFn: allGetTodo,
  });

  const { mutateAsync: addNewTodoMutation } = useMutation({
    mutationFn: (newTodo) => addTodo(newTodo),
    onSuccess: (data, newTodo) => {
      dispatch(addTodoRedux(newTodo)); // После успешного добавления из API, вызываем добавление из Redux
    },
  });

  const { mutateAsync: deleteTodoMutation } = useMutation({
    mutationFn: (id) => removeTodoApi(id), // Используйте функцию удаления из API
    onSuccess: (id) => {
      dispatch(removeTodoRedux(id)); // После успешного удаления из API, вызовите удаление из Redux
    },
  });

  const { mutateAsync: checkTodoMutation } = useMutation({
    mutationFn: ({ id, isCompleted }) => checkCompletedTodoApi(id, isCompleted),
    onSuccess: ({ id, isCompleted }) => {
      dispatch(checkCompletedTodoRedux({ id, isCompleted }));
    },
  });

  let now = new Date();

  const addTodoHandler = async () => {
    try {
      const newTodo = {
        id: uuidv4(),
        title: todoValue,
        isCompleted: false,
        creationDate: now.toLocaleTimeString('ua-Ua'),
      };

      await addNewTodoMutation(newTodo);
      await refetch();
      dispatch(addTodo(newTodo));
      setTodoValue('');
    } catch (error) {
      return <div>Something went wrong {error}</div>;
    }
  };

  const removeTodoHandler = (id) => {
    deleteTodoMutation(id);
    refetch();
  };

  const toggleTodoHandler = async (id, isCompleted) => {
    try {
      await checkTodoMutation({ id, isCompleted: !isCompleted });
      dispatch(checkCompletedTodoRedux({ id, isCompleted: !isCompleted }));
    } catch (error) {
      console.error('An error occurred while toggling the todo:', error);
    }
  };

  return {
    data,
    isFetching,
    refetch,
    addTodoHandler,
    todoValue,
    setTodoValue,
    isLoading,
    isError,
    removeTodoHandler,
    toggleTodoHandler,
  };
};
