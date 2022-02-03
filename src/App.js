import HomePage from "./pages/homepage.component"; 
import './App.css';
import { Route,Routes  } from 'react-router-dom'; 
function App() {
  const HatPage = () => {
    return (
      <div className="">
        <h1>Hats</h1>
      </div>
    )
  }
  return (
    <div > 
      <Routes>
        <Route exact path='/' element={<HomePage/>}/>      
        <Route path='/hats' element={<HatPage/>} />
      </Routes>
 
    </div>
  );
}

export default App;
