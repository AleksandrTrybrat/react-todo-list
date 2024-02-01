import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5050' }),
  tagTypes: ['Todos'],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => '/todos',
      providesTags: ['Todos'],
    }),
    addTodo: builder.mutation({
      query: (todo) => ({
        url: '/todos',
        method: 'POST',
        body: todo,
      }),
      invalidateTags: ['Todos'],
    }),
    updateTodo: builder.mutation({
      query: (todo) => ({
        url: `/todos/${todo.id}`,
        method: 'PATCH',
        body: todo,
      }),
      invalidatesTags: ['Todos'],
    }),
    deleteTodo: builder.mutation({
      query: ({ id }) => ({
        url: `/todos/${id}`,
        method: 'DELETE',
        body: id,
      }),
      invalidatesTags: ['Todos'],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = apiSlice;

// import axios from 'axios';

// axios.defaults.baseURL = 'http://localhost:5050/';

// export const allGetTodo = async () => {
//   const response = await axios.get('todos');
//   return response.data;
// };

// export const addTodo = async (newTodo) => {
//   return axios.post('todos', newTodo);
// };

// export const removeTodoApi = async (id) => {
//   return axios.delete(`todos/${id}`);
// };

// export const checkCompletedTodoApi = async (id, isCompleted) => {
//   return axios.put(`todos/${id}`, { isCompleted });
// };
