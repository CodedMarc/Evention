import { Box, Button, Heading } from "@chakra-ui/react"

const Event = (props: any) => {
  return (
    <Box border="4px solid black" color="black" p={6}>
      <Heading>Uptown</Heading>
      <Box bgColor="black" w={'400px'} h={'400px'}>
        Image
      </Box>
      <Box>
        let's go uptown this weekend.
      </Box>
      <h1>When: Friday, 10pm</h1>
      <h1>Posted By: Marc</h1>
      <Button>I'm going</Button>
      <ul>
        <li>@Marc</li>
        <li>@Ash</li>
        <li>@Devin</li>
        <li>@Bryan</li>
      </ul>
    </Box>
  )
}

export default Event