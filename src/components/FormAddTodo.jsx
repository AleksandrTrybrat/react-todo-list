// import { useState } from 'react';
// import { addTodoRedux } from '../redux/todo/todoSlice';
// import { useDispatch } from 'react-redux';
import { Button, Input } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

import { useAddTodoMutation, useGetTodosQuery } from '../features/api/apiSlice';
import { useState } from 'react';

const FormAddTodo = () => {
  // eslint-disable-next-line no-unused-vars
  const [newTodo, setNewTodo] = useState('');
  const [addTodo] = useAddTodoMutation();
  const { refetch: refetchTodos } = useGetTodosQuery();

  const addTodoHandler = async (values) => {
    // let now = new Date();
    if (values.newTodo) {
      await addTodo({
        id: uuidv4(),
        title: values.newTodo,
        isCompleted: false,
        // creationDate: now.toLocaleTimeString('ua-Ua'),
        creationDate: new Date().toISOString(),
      }).unwrap();
      setNewTodo('');
      refetchTodos();
    }
  };

  return (
    <>
      <Formik
        initialValues={{ newTodo: '' }}
        validationSchema={Yup.object({
          newTodo: Yup.string()
            .min(5, 'Too short')
            .max(10, 'Too long')
            .required('Required'),
        })}
        onSubmit={(values, { resetForm }) => {
          addTodoHandler(values);
          resetForm();
        }}
      >
        {({ errors }) => (
          <Form style={{ marginBottom: '30px' }}>
            <Field
              as={Input}
              name="newTodo"
              backgroundColor="#fff"
              _focus={{ borderColor: 'blue.500', backgroundColor: 'white' }}
              _hover={{ borderColor: 'blue.500' }}
              type="text"
              placeholder="Add task"
              size="md"
              variant="filled"
              width={500}
              mr={8}
              // onBlur={handleBlur}
              // onFocus={() => {
              //   if (touched.todoValue && errors.todoValue) {
              //     handleChange('todoValue')('');
              //   }
              // }}
            />
            <Button type="submit" colorScheme="green" size="md">
              Add
            </Button>
            {errors.newTodo && (
              <div style={{ color: 'red' }}>{errors.newTodo}</div>
            )}
          </Form>
        )}
      </Formik>
    </>
  );
};

export default FormAddTodo;

// {
//   // ! без Yup
//   {
//     /* <Formik
//         initialValues={{ todoValue: '' }}
//         validate={(values) => {
//           const errors = {};

//           if (!values.todoValue) {
//             errors.todoValue = 'Required';
//           } else if (values.todoValue.length < 5) {
//             errors.todoValue = 'Too short';
//           } else if (values.todoValue.length > 10) {
//             errors.todoValue = 'Too long';
//           }

//           return errors;
//         }}
//         onSubmit={(values, { resetForm }) => {
//           addTodoHandler(values);
//           resetForm();
//         }}
//       >
//         <Form style={{ marginBottom: '30px' }}>
//           <Field
//             as={Input}
//             name="todoValue"
//             backgroundColor="#fff"
//             _focus={{ borderColor: 'blue.500', backgroundColor: 'white' }}
//             _hover={{ borderColor: 'blue.500' }}
//             type="text"
//             placeholder="Add task"
//             size="md"
//             variant="filled"
//             width={500}
//             mr={8}
//           />
//           <Button type="submit" colorScheme="green" size="md">
//             Add
//           </Button>
//           <ErrorMessage
//             name="todoValue"
//             component="p"
//             style={{ color: 'red' }}
//           />
//         </Form>
//       </Formik> */
//   }
//   // !!!!!!!!!!
//   // const [todoValue, setTodoValue] = useState('');

//   // const addTodoHandler = () => {
//   //   let now = new Date();
//   //   const todo = {
//   //     id: uuidv4(),
//   //     title: todoValue,
//   //     isCompleted: false,
//   //     creationDate: now.toLocaleTimeString('ua-Ua'),
//   //   };

//   //   dispatch(addTodoRedux(todo));
//   //   setTodoValue('');
//   // };
//   // !!!!!!!!!!
//   /* <FormControl
//         as="form"
//         display="flex"
//         mb={5}
//         onSubmit={(e) => e.preventDefault()}
//       >
//         <Input
//           backgroundColor="#fff"
//           _focus={{ borderColor: 'blue.500', backgroundColor: 'white' }}
//           _hover={{ borderColor: 'blue.500' }}
//           type="text"
//           placeholder="Add task"
//           size="md"
//           variant="filled"
//           width={500}
//           mr={5}
//           value={todoValue}
//           onChange={(e) => setTodoValue(e.target.value)}
//         />
//         <Button
//           type="submit"
//           colorScheme="green"
//           size="md"
//           onClick={() => addTodoHandler()}
//           onKeyDown={(e) => e.key === 'Enter' && addTodoHandler()}
//         >
//           Add
//         </Button>
//       </FormControl> */
// }
