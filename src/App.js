import HomePage from "./pages/homepage/homepage.component"; 
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import WithSpinner from "./components/with-spinner/with-spinner.component";


import SignInAndSignUpPage from "./pages/signIn-and-signUp/signin-and-signUp.component";
import CheckoutPage from "./pages/checkout/checkout.component";
import CollectionPage from './pages/collection/collection.component';

import './App.css';

// import { firestore } from './config/firebase.config'
import { convertCollectionsSnapshotToMap,firestore } from './config/firebase.config';
import { collection,onSnapshot } from 'firebase/firestore';


import {   useEffect } from 'react';
import { Route, Routes, Navigate, Outlet } from 'react-router-dom';
import { createStructuredSelector } from "reselect";
import { auth, createUserProfileDocument  } from './config/firebase.config'; 

import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions'; 
import { selectCurrentUser } from "./redux/user/user.selector";
 
import { fetchCollectionsStartAsync } from "./redux/shop/shop.actions";
import { selectCollectionsForPreview,selectIsCollectionFetching,selectIsCollectionLoaded} from './redux/shop/shop.selector'; 
import CollectionPageContainer from "./pages/collection/collection.container";


function App({ setCurrentUser, currentUser,collectionsArray,updateCollections,isCollectionFetching,fetchCollectionsStartAsync,isCollectionsLoaded }) {
     
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
    })
     return unsubscribe;
   }, [setCurrentUser]);
  
  useEffect(() => {
    fetchCollectionsStartAsync();
  }, []);
 
  const PrivateRoute = ({ children }) => {  

    return currentUser ? (<Navigate to="/" />) : (children)
  }
  
  
  return (
    <div >
      <Header /> 
      <Routes>
        <Route  path='/' element={<HomePage/>}/>      
        <Route   path='/shop' element={<ShopPage/>}/>
            <Route  path='/shop/:collectionId' element={<CollectionPageContainer />}/>
         
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
  currentUser: selectCurrentUser,
  collectionsArray: selectCollectionsForPreview,
  isCollectionFetching: selectIsCollectionFetching,
  
})
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  fetchCollectionsStartAsync:()=>dispatch(fetchCollectionsStartAsync())
  
});

export default connect(mapStateToProps,mapDispatchToProps)(App);
