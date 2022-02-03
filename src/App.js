import HomePage from "./pages/homepage/homepage.component"; 
import ShopPage from "./pages/shop/shop.component";
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
        <Route path='/shop' element={<ShopPage/>} />
      </Routes>
 
    </div>
  );
}

export default App;
