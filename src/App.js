import HomePage from "./pages/homepage/homepage.component"; 
import ShopPage from "./pages/shop/shop.component";
import './App.css';
import { Route,Routes  } from 'react-router-dom'; 
import Header from "./components/header/header.component";
function App() {
   
  return (
    <div >
      <Header/> 
      <Routes>
        <Route exact path='/' element={<HomePage/>}/>      
        <Route path='/shop' element={<ShopPage/>} />
      </Routes>
 
    </div>
  );
}

export default App;
