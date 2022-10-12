import './App.css';
import Navbar from './components/Navbar/Navbar';
import Home from './Home';
import Trending from './components/Events/Trending';
function App() {


  return (
    <div className="App">
      <Navbar />
      <Home />
      <Trending />
    </div>
  );
}

export default App;
