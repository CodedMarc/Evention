import { Grid, GridItem } from "@chakra-ui/react"
import { useSelector, useDispatch } from 'react-redux';
import { login, logout} from './redux/userSlice';
import SearchEvent from "./components/Search/SearchEvent";
const Home = () => {
  const age = useSelector(state => state.user.age);
  const dispatch = useDispatch();

  return (
    <div id="Home">
        <SearchEvent />
        <h1>HeLLO Redux Test</h1>
        <h1>Age: {age}</h1>
        <button onClick={() => dispatch(login())}>Login</button>
        <button onClick={() => dispatch(logout())}>Logout</button>

    </div>
  )
}

export default Home
