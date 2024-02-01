import { Button, Checkbox, Grid, Input, Text } from '@chakra-ui/react';

import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import {
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from '../features/api/apiSlice';

const TodoListPage = ({ todo }) => {
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const editTitleInputRef = useRef(null);

  useEffect(() => {
    if (isEditing) {
      editTitleInputRef?.current?.focus();
    }
  }, [isEditing]);


  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // dispatch(handleEdit({ id: todo.id, title: editedTitle }));
    updateTodo({ ...todo, title: editedTitle });
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedTitle(todo.title);
  };

  const handleCheckboxChange = () => {
    updateTodo({ ...todo, isCompleted: !todo.isCompleted }); // Изменяем состояние задачи
  };

  return (
    <div style={{ backgroundColor: 'white' }}>
      <Grid
        mb={5}
        borderRadius="xl"
        p="5px"
        justifyContent={'center'}
        alignItems={'center'}
        gridTemplateColumns={'50px 1fr 80px 80px'}
      >
        <Checkbox
          disabled={isEditing}
          size="lg"
          colorScheme="green"
          sx={{
            '&:not(:checked)': {
              borderColor: 'green',
            },
          }}
          isChecked={todo.isCompleted}
          onChange={() => handleCheckboxChange()}
          // onChange={() => toggleTodoHandler(todo.id, todo.isCompleted)}
        />
        {isEditing ? (
          <Input
            type="text"
            size="sm"
            variant="flushed"
            fontSize="20px"
            ref={editTitleInputRef}
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
        ) : (
          <Text
            as="p"
            fontSize="2xl"
            textAlign={'center'}
            textDecoration={todo.isCompleted ? 'line-through' : ''}
            fontWeight={todo.isCompleted ? '700' : ''}
            color={todo.isCompleted ? 'red' : ''}
          >
            {todo.title}
          </Text>
        )}
        {isEditing ? (
          <Button
            colorScheme="teal"
            size="md"
            mr={3}
            onClick={handleSaveClick}
            ml={2}
          >
            Save
          </Button>
        ) : (
          <Button colorScheme="teal" size="md" mr={3} onClick={handleEditClick}>
            Edit
          </Button>
        )}
        {isEditing ? (
          <Button colorScheme="red" size="md" onClick={handleCancelClick}>
            Cancel
          </Button>
        ) : (
          <Button
            colorScheme="red"
            size="md"
            onClick={() => deleteTodo({ id: todo.id })}
          >
            Delete
          </Button>
        )}
      </Grid>
    </div>
  );
};

TodoListPage.propTypes = {
  todo: PropTypes.object,
  isLoading: PropTypes.bool,
};

export default TodoListPage;
