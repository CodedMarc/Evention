import { useDisclosure, Flex,  Button,  VStack } from "@chakra-ui/react";
import Drawer from './drawer'
import { Link } from "react-router-dom";
import {useRef}from "react";
export default function MobileDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  return (
      <Flex display={{ base: "flex", md: "none"}}>

        <Button ref={btnRef} onClick={onOpen}>
          <span className="fa-solid fa-bars"></span>
        </Button>
        

        <Drawer
          isOpen={isOpen}
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <VStack alignItems="left">
            
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
          </VStack>
        </Drawer>
      </Flex>
    );
};