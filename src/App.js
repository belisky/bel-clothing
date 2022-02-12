import HomePage from "./pages/homepage/homepage.component"; 
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/signIn-and-signUp/signin-and-signUp.component";
import CheckoutPage from "./pages/checkout/checkout.component";
import CollectionPage from './pages/collection/collection.component';

import './App.css';


import {   useEffect } from 'react';
import { Route, Routes,Navigate,Outlet } from 'react-router-dom';
import { auth, createUserProfileDocument } from './config/firebase.config'; 
import { onSnapshot } from 'firebase/firestore';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions'; 
import { selectCurrentUser } from "./redux/user/user.selector";
import {createStructuredSelector} from 'reselect'


function App({ setCurrentUser, currentUser }) {
     
   useEffect(() => {
     const unsubscribe=auth.onAuthStateChanged(async (userAuth) => {
       if (userAuth) {
         const userRef = await createUserProfileDocument(userAuth);
         onSnapshot(userRef, (doc) => {
            //console.log(doc.data())
           setCurrentUser({              
               id: doc.id,
               ...doc.data()
           })
         })
         // console.log('currentuser;',currentUser);
        }
       setCurrentUser( userAuth);
     })
     return unsubscribe;
  },[]);

  const PrivateRoute = ({ children }) => {  

    return currentUser ? (<Navigate to="/" />) : (children)
  }
  
  
  return (
    <div >
      <Header /> 
      <Routes>
        <Route exact path='/' element={<HomePage/>}/>      
        <Route   path='/shop' element={<ShopPage />}/>
            <Route  path='/shop/:collectionId' element={<CollectionPage/>}/>
         
        <Route  path='/checkout' element={<CheckoutPage />} />
        <Route path='/signin' element={
          <PrivateRoute>
           <SignInAndSignUpPage />
            </PrivateRoute>} />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
          
      </Routes> 
      <Outlet/>
    </div>
  );
 }
const mapStateToProps = createStructuredSelector({
  currentUser:selectCurrentUser
})
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps,mapDispatchToProps)(App);
