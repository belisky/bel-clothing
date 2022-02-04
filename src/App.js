import HomePage from "./pages/homepage/homepage.component"; 
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/signIn-and-signUp/signin-and-signUp.component";
import './App.css';
import { Route,Routes  } from 'react-router-dom'; 
function App() {
   
  return (
    <div >
      <Header/> 
      <Routes>
        <Route exact path='/' element={<HomePage/>}/>      
        <Route path='/shop' element={<ShopPage/>} />
        <Route path='/signin' element={<SignInAndSignUpPage/>} />
      </Routes>
 
    </div>
  );
}

export default App;
