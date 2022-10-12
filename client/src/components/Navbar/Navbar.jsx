import {  Image, Flex, Button,  HStack , chakra } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import MobileNav from './MobileNav';
const Navbar = () => {

  return (
    <chakra.header id="header">
      <Flex
        w="100%"
        px="6"
        py="5"
        align="center"
        justify="space-between"
      >
  
        <Image src={'https://avatars.githubusercontent.com/u/73245838?v=4'} h="50px" />

        <HStack as="nav" spacing="5" display={{ base: "none", md: "flex" }} >
            <Link>
              <Button variant="nav">Host An Event</Button>
            </Link>
            <Link>
              <Button variant="nav">Trending</Button>
            </Link>
            <Link>
              <Button variant="nav">Sign Up</Button>
            </Link>
            <Link>
              <Button variant="nav">Log in</Button>
            </Link>
        </HStack>

        <HStack>
          <Button>
            Get Started
          </Button>
            <MobileNav />
        </HStack>
        
      </Flex>
    </chakra.header>
  )
}

export default Navbar