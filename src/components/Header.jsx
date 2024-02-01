import { NavLink as RouterNavLink } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { Link as ChakraLink } from '@chakra-ui/react';

const Header = () => {
  return (
    <>
      <ChakraLink
        as={RouterNavLink}
        to="/"
        fontSize="20px"
        mr={10}
        _activeLink={{
          color: 'red',
        }}
      >
        Home
      </ChakraLink>
      <ChakraLink
        as={RouterNavLink}
        to="/todos"
        fontSize="20px"
        mr={10}
        _activeLink={{
          color: 'red',
        }}
      >
        Todo
      </ChakraLink>
      <ChakraLink
        as={RouterNavLink}
        to="/about"
        fontSize="20px"
        _activeLink={{
          color: 'red',
        }}
      >
        About
      </ChakraLink>
    </>
  );
};

export default Header;
