import { useState } from 'react';
import Router from 'next/router';
import {
  Progress,
  Box,
  ButtonGroup,
  Button,
  Heading,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  FormHelperText,
  InputRightElement,
  Center,
  Text
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import ImageUploading from 'react-images-uploading';
import axios from 'axios';
import { v2 as cloudinary } from 'cloudinary';

const Form1 = (props: any) => {
  const { 
    name,
    setName, 
    username,
    setUsername, 
    email,
    setEmail,
    pass, 
    setPass 
  } = props;
  const [show, setShow] = useState(false);
  const handleClick = () => {
    setShow(!show);
  }
  return (
    <>
      <Heading w="100%" color="white" textAlign={'center'} fontWeight="900" mb="2%">
        Sign up and Make Plans!
      </Heading>
      <Flex>
        <FormControl mr="5%">
          <FormLabel htmlFor="name" color="white" fontWeight={'normal'}>
            name
          </FormLabel>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} color="white" _placeholder={{ opacity: 0.5, color: 'white' }} placeholder="display name" />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="username" color="white" fontWeight={'normal'}>
            username
          </FormLabel>
          <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} color="white" _placeholder={{ opacity: 0.5, color: 'white' }} placeholder="@username" />
        </FormControl>
      </Flex>
      <FormControl mt="2%">
        <FormLabel htmlFor="email" color="white" fontWeight={'normal'}>
          email address
        </FormLabel>
        <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} color="white" _placeholder={{ opacity: 0.5, color: 'white' }} type="email" />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="password" color="white" fontWeight={'normal'} mt="2%">
          password
        </FormLabel>
        <InputGroup size="md">
          <Input
            value={pass} onChange={(e) => setPass(e.target.value)} 
            color="white"
           _placeholder={{ opacity: 0.5, color: 'white' }} 
            pr="4.5rem"
            type={show ? 'text' : 'password'}
            placeholder="Enter password"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
        <FormHelperText color="white">at least 8 characters</FormHelperText>
        <FormHelperText color="white">at least 1 letter</FormHelperText>
        <FormHelperText color="white">at least 1 number</FormHelperText>
      </FormControl>
    </>
  );
};

const Form2 = (props: any) => {
  const {name, username, file, setFile} = props;
  const [preview, setPreview] = useState(null)
  const [error, setError] = useState(null);
  const onChange = (imageList: any, addUpdateIndex: any) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setFile(imageList[0].file);
    setPreview(imageList[0]['data_pp'])
  };
  return (
    <>
      <Heading w="100%" color="white" textAlign={'center'} fontSize="4xl" fontWeight="bold" mb="2%">
        {
          !file ?
          'Upload A Profile Pic!'
          :
          'Looks good enough to party!'

        }
      </Heading>

      <Box display="flex" justifyContent={'center'} alignItems='center'>
        <Box borderRadius="10px" pt="5" pb="5" pl="5" w={'80'} border="1px solid white" bgColor="rgba(255,255,255,0.2)" display="flex" alignContent={'center'} justifyContent='flex-start'>
          <Box 
          className="signup-pp-preview"
          border="3px solid black" 
          bgColor="cyan.600"
          color="white"
          borderRadius="200px" 
          maxW="100px"
          maxH="100px"
          w="100px"
          h="100px"
          overflow="hidden"
          position={'relative'}
          display="flex"
          justifyContent='center'
          alignItems='center'>
            {
              preview ?
              <Image className="signup-pp-preview" src={preview} alt="avatar" fill={true} />
              :
              <Text fontWeight="700" fontSize={'5xl'}>{name[0].toUpperCase()}</Text>
            }
          </Box>

          <Box ml="3"display='flex' flexDirection='column' justifyContent='center'>
            <Text fontWeight="600" lineHeight="35px" fontSize={'4xl'}>{name}</Text>
            <Text fontWeight="300" fontSize={'large'}>@{username}</Text>
          </Box>
        </Box>      

      </Box>

      <ImageUploading
        value={file}
        onChange={onChange}
        maxNumber={1}
        acceptType={['jpg', 'gif', 'png', 'jpeg']}
        maxFileSize={3000000}
        dataURLKey="data_pp"
        onError={(errors, files) => {
          if (errors.maxFileSize) {
            setError(`Image must be under 3MB. (received ${(files[0].file.size / 1000000).toFixed(2)}MB)`);
            setTimeout(() => {
              setError(null)
            }, 5000);
          } else if (errors.acceptType) {
            setError('File type not supported...');
            setTimeout(() => {
              setError(null)
            }, 3000);
          }
        }}
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          errors,
          dragProps,
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            {!file ?
            <Button
              variant={'outline'}
              border="rgba(0,0,0,0)"
              w="100%"
              display='flex'
              justifyContent={'center'}
              alignItems='center'
              _hover={{bgColor: undefined}}
              color={isDragging ? 'red' : 'white'}
              onClick={onImageUpload}
              {...dragProps}
            >
              <Text textDecoration={'underline'}>
                Select A Photo
              </Text>
            </Button>
            :
            <Button
              variant={'outline'}
              border="rgba(0,0,0,0)"
              w="100%"
              display='flex'
              justifyContent={'center'}
              alignItems='center'
              _hover={{bgColor: undefined}}
              color={isDragging ? 'red' : 'white'}
              onClick={() => onImageRemove(1)}
              {...dragProps}
            >
              <Text textDecoration={'underline'}>
                Remove
              </Text>
            </Button>
            }
            {error ? <Center color="red.800" fontWeight="700" fontSize={'large'}>{error}</Center> : null}
          </div>
        )}
      </ImageUploading>
      
    </>
  );
};



export default function Multistep() {
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33.33);
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [file, setFile] = useState(null);
  
  const createUser = async () => {
    const config = {
      headers: { 'content-type': 'multipart/form-data' },
      timeout: 10000,
    };
    const formData = new FormData();
    formData.append('profilePicture', file);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('pass', pass);
    formData.append('username', username);
    const result = await axios.post('http://localhost:3000/api/user', formData, config)
    const url = result.data.secure_url;

    console.log(result);
    if (result.data.success === false && result.data.data == 'Email or Username already in use.') {
      setProgress(60);
      setStep(1);
      toast({
        title: 'Issue creating account.',
        description: "Email or Username already in use.",
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } else if (!result.data.success) {
      toast({
        title: 'Issue creating account.',
        description: "Unknown error occured, sorry :(",
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Account Created!',
        description: "Logging you in now, please wait...",
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setTimeout(() => {
        Router.push('/');
      }, 1000);
    }

    return result;
  }

  const next = () => {
    // validate first and last name have length & no spaces
    if (name.length < 1) return setError('Error: No Name Entered.');
    if (name.length > 30) return setError('Error: Name must be under 30 characters');
    // validate username (not against db)
    if (username.length < 3) return setError('Error: Username must be greater than 3 characters')
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    if (!usernameRegex.test(username)) return setError('Error: Username should not contain any special characters');
    // validate email is email
    if (email.length < 2) return setError('Error: No Email Entered')
    const emailRegex = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm;
    if (!emailRegex.test(email)) return setError('Error: Invalid Email Probably...');
    // validate password has minimum 8 chars, one letter, one number
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    if (!passwordRegex.test(pass)) return setError('Error: Password vibes are off.');
    setError('');
    setStep(step + 1);
    if (step === 3) {
      return setProgress(100);
    } else {
      return setProgress(progress + 33.33);
    }
  }

  const fillOrOutline = () => {
    if (step === 1 && name.length && username.length && email.length && pass.length) {
      return 'solid'
    } else {
      return 'outline'
    }
    
  }

  const prevent = (e: any) => {
    return e.preventDefault()
  }




  return (
    <Box
    pl="4"
    pr="4"
    minH={'100vh'}
    maxH={'100vh'}
    overflow='hidden'
    bgGradient="linear(to-r, blue.500,purple.400)">
      <Center color="white" fontSize={'3xl'} fontWeight="900"pt={3}>
        <Link href="/"> - EVENTION -</Link>
      </Center>
      <Box
        borderWidth="1px"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        maxWidth={800}
        bgColor="rgba(200,200,200,0.1)"
        p={6}
        m="10px auto"
        onSubmit={prevent}
        as="form">
        <Progress
          border="1px solid white"
          borderRadius='10px'
          hasStripe
          value={progress}
          mb="5%"
          mx="5%"
          bgGradient="linear(to-r, blue.500,purple.400)"
          colorScheme={progress !== 100 ? 'red' : 'green'}
          isAnimated></Progress>
        {step === 1 ? 
        <Form1 
        name={name}
        setName={setName} 
        email={email}
        setEmail={setEmail}
        pass={pass} 
        setPass={setPass}
        username={username}
        setUsername={setUsername} /> 
        :
        <Form2 
        name={name}
        username={username}
        file={file}
        setFile={setFile} /> 
        }
        {error.length > 1 ? <Text pl={2} fontSize={'2xl'} mt="2%" bgColor="white" color="red.400" fontFamily={"sans-serif"} fontWeight={700}>{error}</Text> : null}
        <ButtonGroup mt="3%" w="100%">
          <Flex w="100%" justifyContent="space-between">
            <Flex>
              <Button
                onClick={() => {
                  setStep(step - 1);
                  setProgress(progress - 33.33);
                }}
                isDisabled={step === 1}
                bgGradient="linear(to-r, blue.500,purple.400)"
                color="white"
                variant="solid"
                _hover={{bgGradient: "linear(to-r, blue.400,purple.400)"}}
                borderRadius={100}
                boxShadow='-1px 2px 1px rgba(21,21,21,0.35)'
                w="7rem"
                >
                Back
              </Button>
              {step !== 2 ?
              <Button
                w="7rem"
                isDisabled={step === 2}
                onClick={next}
                colorScheme="blue"
                bgColor={fillOrOutline() === 'solid' ? 'white' : undefined}
                color="blue.300"
                variant={fillOrOutline()}>
                Next
              </Button>
              :
              null
              }
            </Flex>
            {step === 2 ? (
              <Button
                w="7rem"
                borderRadius={100}
                boxShadow='2px 3px 1px rgba(21,21,21,0.35)'
                colorScheme="red"
                variant="solid"
                bgGradient="linear(to-r, red.600,red.500)"
                onClick={createUser}>
                Create
              </Button>
            ) : null}
          </Flex>
        </ButtonGroup>
      </Box>
    </Box>
  );
}

