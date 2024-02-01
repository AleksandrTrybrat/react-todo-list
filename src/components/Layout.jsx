import { Outlet } from 'react-router-dom';
import Header from './Header';
import { Center, Container, Flex } from '@chakra-ui/react';

const Layout = () => {
  return (
    <>
      <Flex minHeight="100vh" direction="column">
        <Flex align="center" justify="center" h={10}>
          <Header />
        </Flex>
        <Flex
          flex="1"
          justify="center"
          align="center"
          backgroundColor="#e6e4e4"
        >
          <Container minWidth="1000px" padding="15px">
            <Center>
              <Outlet />
            </Center>
          </Container>
        </Flex>
        {/* Дополнительный контент или футер */}
      </Flex>
    </>
  );
};

export default Layout;
