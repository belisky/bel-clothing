import HomePage from "./pages/homepage/homepage.component"; 
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/signIn-and-signUp/signin-and-signUp.component";
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { auth, createUserProfileDocument } from './firebase/firebase.config'; 
import { useState, useEffect } from 'react';
import { onSnapshot } from 'firebase/firestore';
 
 function App() {
  const [currentUser, setCurrentUser] = useState({});
   useEffect(() => {
     const unsubscribe=auth.onAuthStateChanged(async (userAuth) => {
       if (userAuth) {
         const userRef = await createUserProfileDocument(userAuth);
         onSnapshot(userRef, (doc) => {
            
           setCurrentUser({              
               id: doc.id,
               ...doc.data()
           })
         })
          console.log('currentuser;',currentUser);
        }
       //setCurrentUser(user,()=>(console.log(currentUser)));
     })
     return unsubscribe;
  },[]);
  
  
  return (
    <div >
      <Header currentUser={currentUser}/> 
      <Routes>
        <Route exact path='/' element={<HomePage/>}/>      
        <Route path='/shop' element={<ShopPage/>} />
        <Route path='/signin' element={<SignInAndSignUpPage/>} />
      </Routes>
 
    </div>
  );
}

export default App;
