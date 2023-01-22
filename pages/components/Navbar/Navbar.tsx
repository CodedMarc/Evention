import {  Image, Flex, Button,  HStack , chakra } from '@chakra-ui/react';
import Link from 'next/link';
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
  
        <Image src={'https://avatars.githubusercontent.com/u/73245838?v=4'} alt="" h="50px" />

        <HStack as="nav" spacing="5" display={{ base: "none", md: "flex" }} >
            <Link href="#">
              <Button variant="nav">Host An Event</Button>
            </Link>
            <Link href="#">
              <Button variant="nav">Trending</Button>
            </Link>
            <Link href="/signup">
              <Button variant="nav">Sign Up</Button>
            </Link>
            <Link href="#">
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