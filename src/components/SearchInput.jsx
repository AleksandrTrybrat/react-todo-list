// import { Flex, Input, Select } from '@chakra-ui/react';
// import PropTypes from 'prop-types';
// import { useDispatch } from 'react-redux';
// import { updateSelectedOption } from '../redux/todo/todoSlice';

// const SearchInput = ({ searchInput, setSearchInput, filter, setFilter }) => {
//   const dispatch = useDispatch();

//   const handleFilterChange = (e) => {
//     const { value } = e.target;
//     setFilter(value);
//     dispatch(updateSelectedOption(value));
//   };

//   const handleSearchChange = (e) => {
//     setSearchInput(e.target.value);
//   };

//   return (
//     <>
//       <Flex mb="50px" gap={10}>
//         <Select
//           size="md"
//           variant="outline"
//           bg="white"
//           value={filter}
//           // onChange={(e) => setFilter(e.target.value)}
//           onChange={handleFilterChange}
//           width="250px"
//         >
//           <option value="all">All Tasks</option>
//           <option value="completed">Completed Tasks</option>
//           <option value="uncompleted">Uncompleted Tasks</option>
//         </Select>

//         <Input
//           mb={5}
//           width="300px"
//           backgroundColor="#fff"
//           _focus={{ borderColor: 'blue.500', backgroundColor: 'white' }}
//           _hover={{ borderColor: 'blue.500' }}
//           size="md"
//           variant="filled"
//           value={searchInput}
//           onChange={handleSearchChange}
//           color="teal"
//           placeholder="Search tasks"
//           _placeholder={{ color: 'inherit' }}
//         />
//       </Flex>
//     </>
//   );
// };

// SearchInput.propTypes = {
//   searchInput: PropTypes.string,
//   setSearchInput: PropTypes.func,
//   filter: PropTypes.string,
//   setFilter: PropTypes.func,
// };

// export default SearchInput;

import { useEffect, useState } from 'react';
import { Flex, Input, Select } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const SearchInput = ({ searchInput, setSearchInput, setFilter }) => {
  const [selectedOption, setSelectedOption] = useState(
    localStorage.getItem('selectedOption') || 'all'
  );

  useEffect(() => {
    setFilter(selectedOption);
  }, [selectedOption, setFilter]);

  const handleFilterChange = (e) => {
    const { value } = e.target;
    setSelectedOption(value);
    localStorage.setItem('selectedOption', value);
  };

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <>
      <Flex mb="50px" gap={10}>
        <Select
          size="md"
          variant="outline"
          bg="white"
          value={selectedOption}
          onChange={handleFilterChange}
          width="250px"
        >
          <option value="all">All Tasks</option>
          <option value="completed">Completed Tasks</option>
          <option value="uncompleted">Uncompleted Tasks</option>
        </Select>

        <Input
          mb={5}
          width="300px"
          backgroundColor="#fff"
          _focus={{ borderColor: 'blue.500', backgroundColor: 'white' }}
          _hover={{ borderColor: 'blue.500' }}
          size="md"
          variant="filled"
          value={searchInput}
          onChange={handleSearchChange}
          color="teal"
          placeholder="Search task"
          _placeholder={{ color: 'inherit' }}
        />
      </Flex>
    </>
  );
};

SearchInput.propTypes = {
  searchInput: PropTypes.string,
  setSearchInput: PropTypes.func,
  filter: PropTypes.string,
  setFilter: PropTypes.func,
};

export default SearchInput;
