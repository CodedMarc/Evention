import { Box } from "@chakra-ui/react"
import Event from "./components/Event"


const Login = () => {
  return (
    <Box p={6}>
      <Event />
      <Box as="form" display="flex" flexDir={'column'} justifyContent='center' alignItems={'center'}>
        <label htmlFor="username-input">Username</label>
        <input id="username-input" name="username-input" type="text" placeholder="Username or Email" required />
        <label htmlFor="password-input">Password</label>
        <input id="password-input" name="password-input" type="password" placeholder="Password" required />
        <input type="submit" value="Enter" />
      </Box>
    </Box>
  )
}

export default Login