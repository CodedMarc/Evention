import { useDisclosure, Flex,  Button,  VStack } from "@chakra-ui/react";
import { DrawerExample as Drawer } from './drawer'
import Link from "next/link";
import {useRef}from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from "@fortawesome/free-solid-svg-icons";
export default function MobileDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  return (
      <Flex display={{ base: "flex", md: "none"}}>

        <Button ref={btnRef} onClick={onOpen}>
          <FontAwesomeIcon icon={faBars}/>
        </Button>
        

        <Drawer
          isOpen={isOpen}
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <VStack alignItems="left">
            
            <Link href="#">
              <Button variant="nav">Host An Event</Button>
            </Link>
            <Link href="#">
              <Button variant="nav">Trending</Button>
            </Link>
            <Link href="#">
              <Button variant="nav">Sign Up</Button>
            </Link>
            <Link href="#">
              <Button variant="nav">Log in</Button>
            </Link>
          </VStack>
        </Drawer>
      </Flex>
    );
};