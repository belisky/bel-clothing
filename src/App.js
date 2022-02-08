import HomePage from "./pages/homepage/homepage.component"; 
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/signIn-and-signUp/signin-and-signUp.component";
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { auth, createUserProfileDocument } from './config/firebase.config'; 
import {   useEffect } from 'react';
import { onSnapshot } from 'firebase/firestore';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions'; 
 
 function App({setCurrentUser}) {
   useEffect(() => {
     const unsubscribe=auth.onAuthStateChanged(async (userAuth) => {
       if (userAuth) {
         const userRef = await createUserProfileDocument(userAuth);
         onSnapshot(userRef, (doc) => {
            console.log(doc.data())
           setCurrentUser({              
               id: doc.id,
               ...doc.data()
           })
         })
         // console.log('currentuser;',currentUser);
        }
       setCurrentUser({currentUser:userAuth});
     })
     return unsubscribe;
  },[]);
  
  
  return (
    <div >
      <Header /> 
      <Routes>
        <Route exact path='/' element={<HomePage/>}/>      
        <Route path='/shop' element={<ShopPage/>} />
        <Route path='/signin' element={<SignInAndSignUpPage/>} />
      </Routes>
 
    </div>
  );
 }

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(null,mapDispatchToProps)(App);
