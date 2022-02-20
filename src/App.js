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


import { updateCollections } from "./redux/shop/shop.actions";

import {   useEffect,useState } from 'react';
import { Route, Routes,Navigate,Outlet } from 'react-router-dom';
import { auth, createUserProfileDocument  } from './config/firebase.config'; 
 
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions'; 
import { selectCurrentUser } from "./redux/user/user.selector";
import {createStructuredSelector} from 'reselect'

import { selectCollectionsForPreview } from './redux/shop/shop.selector'; 


function App({ setCurrentUser, currentUser,collectionsArray,updateCollections }) {
     
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

       //addCollectionAndDocuments('collections',collectionsArray.map(({title,items})=>({title,items})))
       
    
     })
     return unsubscribe;
   }, [setCurrentUser]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const collectionRef = collection(firestore, 'collections')
    const unsubscribe = onSnapshot(collectionRef, (doc) => {
      const collectionsMap = convertCollectionsSnapshotToMap(doc)
      updateCollections(collectionsMap);
      setLoading(prev => !prev);
    })


    return unsubscribe

  }, []);
 
  const PrivateRoute = ({ children }) => {  

    return currentUser ? (<Navigate to="/" />) : (children)
  }
  const CollectionsPageWithSpinner = WithSpinner(CollectionPage)
  
  
  return (
    <div >
      <Header /> 
      <Routes>
        <Route  path='/' element={<HomePage/>}/>      
        <Route   path='/shop' element={<ShopPage isLoading={loading} />}/>
            <Route  path='/shop/:collectionId' element={<CollectionsPageWithSpinner isLoading={loading} />}/>
         
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
  collectionsArray:selectCollectionsForPreview
})
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))

});

export default connect(mapStateToProps,mapDispatchToProps)(App);
