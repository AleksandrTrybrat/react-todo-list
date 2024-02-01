import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todos: [],
  selectedOption: 'all',
};

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    // добавление
    addTodoRedux: (state, action) => {
      state.todos.push(action.payload);
    },
    // зачеркивание выбраной туду
    checkCompletedTodoRedux: (state, action) => {
      const toggleTodo = state.todos.find((todo) => todo.id === action.payload);
      toggleTodo.isCompleted = !toggleTodo.isCompleted;
    },

    // удаление
    removeTodoRedux: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    // Редактирование задачи
    handleEdit: (state, action) => {
      const updatedTodo = state.todos.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, title: action.payload.title }
          : todo
      );
      state.todos = updatedTodo;
    },
    // Update the selected option
    updateSelectedOption: (state, action) => {
      state.selectedOption = action.payload;
    },
  },
});

export const {
  addTodoRedux,
  checkCompletedTodoRedux,
  removeTodoRedux,
  handleEdit,
  updateSelectedOption,
} = todoSlice.actions;
export default todoSlice.reducer;
